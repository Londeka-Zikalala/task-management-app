import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userManagementRoutes from './Service/Routes/UserManagementRoutes';
import TaskRoutes from './Service/Routes/TaskManagementRoutes';
import TaskManager from './Service/taskManager';
import UserManagement from './Service/userManagementCRUD';
import db from './db';
import { IDatabase } from 'pg-promise';

//setting up express
const app = express();
const PORT = 3010

// UserManagement endpoints 
const userRoutes = new userManagementRoutes(db)

app.post('/register', userRoutes.registerUser);
app.post('login', userRoutes.loginUser);
app.get('/tasks/user', userRoutes.viewTasksByUser)

//Middleware 

app.use(express.json());
app.use(bodyParser.json());

app.use(cors())

// Endpoints 


app.listen(PORT, () =>{
    console.log(`app started on ${PORT}!`)
})