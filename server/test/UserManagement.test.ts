import UserManagement from "../Service/userManagementCRUD";
import TaskManager from "../Service/taskManager";
import assert from "assert";
import db from "../db";

describe('UserManagement class tests', function(){
        let userManagement : UserManagement
        let taskManager:  TaskManager

        //before the tests run clear the users abd user_tasks tables and initialise userManagement
        this.beforeAll(async function(){
            await db.none(`TRUNCATE TABLE users RESTART IDENTITY CASCADE`); 
            await db.none(`TRUNCATE TABLE user_tasks RESTART IDENTITY CASCADE`);
            await db.none(`TRUNCATE TABLE tasks RESTART IDENTITY CASCADE`);

            userManagement = new UserManagement(db)
            taskManager = new TaskManager(db)

        })

        // Test that a user is registed 
        it(`should register a new user`, async function (){
            let username: string = "Londeka";
            let password: string = "Password";
          let user: any = await userManagement.userRegistration(username, password)
          
            // Fetch the user
                
                assert.strictEqual(user, 'user registered');
        }); 

        it(`should login an existing user and give an error when user does not exist`, async function(){
            let username: string = "Thandi";
            let password: string = "Thandii"; 
            let existingUser: string = "Londeka"; 
            let existingPassword: string = "Password"

           let failedLogIn =  await userManagement.userLogin(username,password)
           let successfulLogin = await userManagement.userLogin(existingUser,existingPassword)
            // Failed logged in assert
            assert.strictEqual(failedLogIn, null);
            // Successful login assert
            assert.strictEqual(successfulLogin?.username, existingUser);
            assert.strictEqual(successfulLogin?.password, existingPassword);
            
        })

        it(`should get tasks for a specific user ordered by duedate`, async function(){
            //Login user 
            let existingUser: string = "Londeka"; 
            let existingPassword: string = "Password"
           let user:any = await userManagement.userLogin(existingUser,existingPassword)
           console.log(user.id)

            // Create two tasks 
            let title : string = 'Print all application papers';
            let description: string = 'Print all applications for the internship opening';
            let due_date: Date = new Date('2024-12-05');
            let status: Boolean = false;

            let title2: string = 'Send interview invitations';
            let description2 : string = 'Send interview invitatiobn emails to 10 candidates by Friday';
            let due_date2: Date = new Date('2024-12-01');
            let status2: Boolean = false;
                
            await taskManager.createTask(user.id, title,description,due_date, false);
            await taskManager.createTask(user.id, title2, description2, due_date2, false); 
            console.log(user.id)

            // get the tasks for Londeka 
          let userTasks:any =  await userManagement.viewUserTasks(user.id)
            assert.deepEqual(userTasks, 
                [
                    {
                      due_date: '2024-11-30T22:00:00.000Z',
                      id: 2,
                      status: false,
                      title: 'Send interview invitations'
                    },
                    {
                      due_date: '2024-12-04T22:00:00.000Z',
                      id: 1,
                      status: false,
                      title: 'Print all application papers'
                    }
                  ]    
            
            )

        })
        


})