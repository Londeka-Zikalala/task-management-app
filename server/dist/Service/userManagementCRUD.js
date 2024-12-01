"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//CRUD for user related queries 
const db_1 = __importDefault(require("../db"));
class UserManagement {
    constructor(db) {
        this.db = db;
    }
    // function to register a user by ensuringg that the username and password are unuque
    userRegistration(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            // Insert the username and password into the users table, only when they are unique
            try {
                yield db_1.default.none(`INSERT INTO users (username, password) VALUES ($1,$2) ON CONFLICT DO NOTHING`, [username, password]);
                return 'user registered';
            }
            catch (error) {
                console.error(`Error registering user`, error);
                return 'error registering user';
            }
        });
    }
    //Function to login a user using the password and username 
    userLogin(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // fetch the user 
                const user = yield db_1.default.one(`SELECT * FROM users WHERE username = $1 and password = $2`, [username, password]);
                return user;
            }
            catch (error) {
                console.error(`Error fetching user information`, error);
                return null;
            }
        });
    }
    // function to view all tasks by a user, it joins the tasks table and the users table 
    viewUserTasks(id) {
        return __awaiter(this, void 0, void 0, function* () {
            //fetch tasks for a user using the useridi
            try {
                const userTasks = yield db_1.default.manyOrNone(`SELECT tasks.id, tasks.title, tasks.due_date, tasks.status FROM tasks JOIN  user_tasks ON tasks.id = user_tasks.task_id WHERE user_tasks.user_id = $1 ORDER BY tasks.due_date ASC`, [id]);
                // iterating and filtering throught the Task array for the user's task by due date
                const tasks = [];
                for (const task of userTasks) {
                    tasks.push(Object.assign(Object.assign({}, task), { due_date: new Date(task.due_date) }));
                }
                return tasks;
            }
            catch (error) {
                console.error(`Error fetching user tasks`, error);
                return [];
            }
        });
    }
}
exports.default = UserManagement;
