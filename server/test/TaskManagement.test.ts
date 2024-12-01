import TaskManager from "../Service/taskManager";
import UserManagement from "../Service/userManagementCRUD";
import db from "../db";
import assert from "assert";

describe('TaskManager class tests', function(){
    let userManagement : UserManagement
    let taskManager:  TaskManager

    this.beforeAll(async function(){
        await db.none(`TRUNCATE TABLE user_tasks RESTART IDENTITY CASCADE`);
        await db.none(`TRUNCATE TABLE tasks RESTART IDENTITY CASCADE`);

        userManagement = new UserManagement(db)
        taskManager = new TaskManager(db)

    })

    it(`create a task for a user`, async function(){
        //Create user and get the id 
        let username : string = 'Thandeka'
        let password : string = 'Password'
        // task details
        let title : string = 'recruitment report';
            let description: string = 'report on iuntern recruitment';
            let due_date: Date = new Date('2024-12-07');
            let status: Boolean = false;

        await userManagement.userRegistration(username, password)
    
        let user:any =  await userManagement.userLogin(username, password)
        console.log(user)
        // create task 

         let task: any = await taskManager.createTask(user.id, title, description, due_date, false); 
                assert.equal(task, 'Task created!');
    })

    it(`should update a task when completed`, async function(){
        //get task title 
        //Create user and get the id 
        let username : string = 'Thandeka'
        let password : string = 'Password'
        // task details
        let title : string = 'recruitment report';
            let description: string = 'report on iuntern recruitment';
            let due_date: Date = new Date('2024-12-07');
            let status: Boolean = false;

        await userManagement.userRegistration(username, password)
    
        let user:any =  userManagement.userLogin(username, password)
        // create task 

        let task: any = await taskManager.createTask(user.id, title, description, due_date, false); 

        //update task 

        let updatedTask = await taskManager.updateTask(task.title)

        assert.equal(updatedTask, 'Task completed' )

    })

    it(`should delete a task using the title`, async function(){
        //Create user and get the id 
        let username : string = 'Thandeka'
        let password : string = 'Password'
        // task details
        let title : string = 'recruitment report';
            let description: string = 'report on iuntern recruitment';
            let due_date: Date = new Date('2024-12-07');
            let status: Boolean = false;

        await userManagement.userRegistration(username, password)
    
        let user:any =  userManagement.userLogin(username, password)
        // create task 

        let task: any = await taskManager.createTask(user.id, title, description, due_date, false); 

        // delete task 
      let deleteTask =  await taskManager.deleteTask(task.title);
            assert.equal(deleteTask, 'Task deleted!')
        
    })
})