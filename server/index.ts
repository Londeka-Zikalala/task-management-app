import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { Jwt } from 'jsonwebtoken';
import { json } from 'stream/consumers';
import cors from 'cors';

//setting up express
const app = express();
const PORT = 3010

//Middleware 

app.use(express.json())
app.use(cors())

app.listen(PORT, () =>{
    console.log(`app started on ${PORT}!`)
})