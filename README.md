# TASK MANAGEMENT APP 
---
## Table Of Contents 

1. [Introduction](#Introduction)
2. [Setup Instructions](#Setup)
3. [Installation](#Installation)
4. [Usage Example](#Usage)
5. [File Structure](#Files)

--- 
## Introduction 
This Task Management app was built using Node.js and TypeScript,and React. It allows users to create, update, and delete tasks in their respective accounts.

---
## Prerequisites 

### Before starting, ensure you have the following installed:

1. Node.js (LTS version recommended)
2. npm
3. PostgreSQL (for database)
--- 
## Setup

### 1. git clone https://github.com/Londeka-Zikalala/task-management-app.git
 ### cd task-management-app

### 2. Database setup
- Setup a local database connection , run the scripts in `/sql/Tables.sql`
  a. Tables.sql to create the tables
- Update db.ts by adding your database string to the '' or : **Set up environment variables for PostgreSQL connection:**
     - Create a .env file in the root directory of the app.
     - Add your PostgreSQL connection string to the `.env` file.

--- 
## Installation 

  ### 1. run npm install in each folder server and client

  ### 2. run npm test - if the tests are passing, everything is running smoothly and you're ready to go.

  ### 3. run node server/index.js  to run the server

  ### 4. run npm start in the client folder to start the react app
--- 
## Usage 

### Task Management Routes
- The app has key routes related to user-task management: 

1. GET /tasks/user: Fetches tasks  to a belonging to the logged in user. 
Authentication
2. POST /users/register: Registers a new user
3. POST /users/login: Logs in an existing user and provides a JWT token for authentication.
4. POST /tasks/create: Creates a new task.
5. POST /tasks/update: Updates a task's status to "completed". 
6.  /tasks/delete: Deletes a task.

### Example Usage : 

        Typescript
        ```import axios from 'axios';
        
        const createTask = async () => {
          try {
            const response = await axios.post('http://localhost:3010/tasks/create', {
              user_id: 1,
              title: 'Finish Task Manager App',
              description: 'Complete the task manager app implementation.',
              due_date: '2024-12-31',
              status: false
            });
            console.log(response.data);
          } catch (error) {
            console.error('Error creating task:', error);
          }
        };
        
        createTask();
        ```

  --- 
  ## File Structure {#Files}
  task-management-app/
│
├── client
|── public /                     
|   ├── index.html
├── src/  
|   ├── Types/
|   |    ├── Iusers.tsx  
│   ├── App.tsx           
│   ├──  index.tsx      
│   ├── LoginForm.tsx                     
│   │── Home.tsx  
├── tsconfig.json                    # TypeScript configuration
├── package.json                     # Dependencies and scripts



├── server
│   ├── db.ts                        # Database connection setup
│   ├── service/                      # Business logic for tasks and user management
│   │   ├── TaskManager.ts           # Task management logic (CRUD)
│   │   ├── UserManagement.ts        # User management logic (CRUD)
│   |   ├── routes/                      # Express routes
│   │   |    ├── TaskManagementRoutes.ts  # Routes for task management
│   │   |    ├── UserManagementRoutes.ts  # Routes for user management
│   ├── index.ts                   # Express server initialization
├── .env                             # Environment variables 
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # Project documentation



        



   
