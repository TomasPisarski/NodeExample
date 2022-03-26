import { Request,Response } from 'express'
import { MongoClient } from "mongodb";
import dotenv from 'dotenv'
import INote from '../interfaces/INote';
dotenv.config();

const url = process.env.DBURL || ""
const client:MongoClient = new MongoClient(url)

export default class NoteController {

    static getNotes?(req:Request,res:Response) : Array<INote> | null {
        var notes:Array<INote> = []
        client.connect(err => {
            if (err) return err
            const result = client.db('NoteApp').collection('Notes').find({}).toArray((err, result) => {
                console.log("buscó las notas");
                if (err)
                    return err;
                result?.forEach(note => {
                    var eachNote: INote = {
                        title: note.title,
                        body: note.body,
                        colour: note.colour
                    };
                    notes.push(eachNote);
                });
                console.log(notes);
                return notes;
            })
            })
            return null
    }
    static async addNote(req:Request,res:Response){
        const note:INote = {
            title:req.body.title,
            body:req.body.body,
            colour:req.body.colour
        }
        client.connect(async err => {
            if (err) res.send(err)
            await client.db('NoteApp').collection('Notes').insertOne(note).then(result => {
                res.send(JSON.stringify(result))
            });
        })
        
    }
    static async editNote(req:Request,res:Response){
        const note:INote = {
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
