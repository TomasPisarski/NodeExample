import express, { Request,Response } from 'express'
import noteController from './Controllers/noteController'
import dotenv from 'dotenv'

dotenv.config();
const app = express()

app.listen(process.env.PORT || '5000', () => {
    console.log("hola")
})

app.post('/addNote',noteController.addNote)