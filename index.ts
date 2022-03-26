import express, { Request,Response } from 'express'
import noteController from './controllers/noteController'
import dotenv from 'dotenv'
import path from 'path'
import INote from './interfaces/INote';

dotenv.config();
const app = express()
//@ts-ignore
app.use(express.urlencoded({ extended: false }));
//@ts-ignore
app.use(express.json());
app.set('view engine','pug')
app.use(express.static(path.join(__dirname,'/views/css')))


app.listen(process.env.PORT || '5001', () => {
    console.log("hola")
})

app.get('/', (req:Request,res:Response) => {
    
    let notes =   noteController.getNotes?.(req,res)
    console.log(notes)
    if (notes){
        res.render('index',notes)
    }
})

app.post('/addNote',noteController.addNote)
app.post('/deleteNote',noteController.deleteNote)
app.post('/updateNote',noteController.editNote)