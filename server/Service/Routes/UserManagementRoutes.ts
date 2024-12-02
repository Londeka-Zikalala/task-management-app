import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt';
import { UsersRoutes } from "../IUsers";
import { Users } from "../IUsers";
import { IDatabase } from "pg-promise";
import jwt from 'jsonwebtoken'
import UserManagement from "../userManagementCRUD";
import db from "../../db";

export default class userManagementRoutes implements UsersRoutes{
    private userManagement : UserManagement
        constructor(db: IDatabase<any>){
            this.userManagement = new UserManagement(db)
        }
// register the user 
        async registerUser(req:Request,res:Response,next:NextFunction): Promise<void> {
           
           try{

            let username:string = req.body;
            let password:string = req.body; 

            //  Check if the input fields are not empty 
            if(!username || !password){
                res.status(400).json({message: `Username and Password are required`})
            }

            // Check if username already exists in the dta base 

            let existingUser = await this.userManagement.userLogin(username,password)

            if(existingUser){
                res.status(400).json({message: `Username already registered, go to login`})
            }

            const hashPassword = await bcrypt.hash(password, 10)
            let user = this.userManagement.userRegistration(username, hashPassword)
            res.status(201).json({message: `Registration successful!`})


           } 
           catch(error){
                console.error(`Error registering user`, error)
                next(error)
           }
        }

        // Route logic for the login endpoint 

        async loginUser(req: Request, res: Response, next: NextFunction): Promise<void> {
            
           try{
            let username: string = req.body;
            let password: string = req.body; 

            // login the user 

            let existingUser = await this.userManagement.userLogin(username, password);

            if(!existingUser){
                res.status(400).json({message: `Username not found, go to register`});
            } else{
                //Check if password matches the users's password
                let validatePassword = await bcrypt.compare(password, existingUser.password)

                if(!validatePassword){
                    res.status(400).json({message: `Password incorrect`})
                }

                // get a token for the user 
                let token = jwt.sign({id: existingUser.id, username: existingUser.username, password: existingUser.password}, process.env.SECRET_KEY as string, {expiresIn:'1h'})

                res.status(201).json({message: `Login successful!`, token})
            }
           } catch(error){
            console.error(`Login failed`, error)
            next(error)
           }

        } 


        // JWT middleware to authenticat token 
        const = function authenticateToken(req: Request, res: Response, next: NextFunction){
            let token = req.headers.authorization?.split('')[1];
            if(!token){
                return res.status(401).json({message: `Tokem not authorised`});
            }
            jwt.verify(token, process.env.SECRET_KEY as string, (err, decoded)=>{
                    if(err){
                        return res.status(401).json({message: `Token not found`})
                    }
                  req.user = decoded as Users
                    next()
            })
        }

        //  View the tasls by the logged in user

            async viewTasksByUser(req: Request, res: Response, next: NextFunction): Promise<any> {
                try{
                    let userId : number = req.user.id

                    //get the tasks by user 
    
                       let tasks = await this.userManagement.viewUserTasks(userId)
    
                       if(tasks.length <= 0 ){
    
                        return res.status(401).json({message:`No tasks found`})
    
                       }else{
                        return res.status(400).json({message:`Taks found`, tasks})
                       }
                }catch(error){
                    console.error(`Error fetching tasks`, error)
                }
            }


}