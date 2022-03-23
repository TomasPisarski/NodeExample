import { Request,Response } from 'express'
import NoteInterface from '../Interfaces/NoteInterface'
import { MongoClient } from "mongodb";

const url = process.env.DBURL
const client:MongoClient = new MongoClient(url)

export default class NoteController {
    static async addNote(req:Request,res:Response){
        const note:NoteInterface = {
            title:req.body.title,
            body:req.body.body,
            colour:req.body.colour
        }
        client.connect(async err => {
            if (err) res.send(err)
            const addedNote = await client.db('NoteApp').collection('Notes').insertOne(note);
            res.send(addedNote);
            client.close;
        })
        
    }
    static async editNote(req:Request,res:Response){
        const note:NoteInterface = {
            title:req.body.title,
            body:req.body.body,
            colour:req.body.colour
        }
        client.connect(async err => {
            if (err) res.send(err)
            await client.db('NoteApp').collection('Notes').findOneAndUpdate(req.body._id,{$set:note})
        })
    }
    static async deleteNote(req:Request,res:Response){
        client.connect(async err => {
            if (err) res.send(err)
            await client.db('NoteApp').collection('Notes').findOneAndDelete(req.body._id)
            res.status(200).send('Note deleted successfully')
        })
    }

}
