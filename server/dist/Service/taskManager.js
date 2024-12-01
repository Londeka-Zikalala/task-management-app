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
const db_1 = __importDefault(require("../db"));
class TaskManager {
    constructor(db) {
        this.db = db;
    }
    //Function to create a task 
    createTask(user_id, title, description, due_date, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Insert task information in the table 
                let task = yield db_1.default.one(`INSERT INTO tasks (title, description, due_date, status) VALUES ($1, $2, $3, $4) RETURNING id`, [title, description, due_date, status]);
                let id = task.id;
                // Link the task to a loggned in user 
                yield db_1.default.none(`INSERT INTO user_tasks (user_id, task_id) VALUES ($1, $2)`, [user_id, id]);
                return 'Task created!';
            }
            catch (error) {
                console.error(`Error setting task `, error);
                return 'Error creating task';
            }
        });
    }
    // Function tp update the task status to complete
    updateTask(title) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Set the boolean to true
                yield db_1.default.none(`UPDATE tasks SET status = true WHERE id = $1`, [title]);
                return `Task completed`;
            }
            catch (error) {
                console.error(`Error updating task `, error);
                return `Error updating task`;
            }
        });
    }
    //function to delete task
    deleteTask(title) {
        return __awaiter(this, void 0, void 0, function* () {
            // remove the task based on task title
            try {
                yield db_1.default.none(`DELETE FROM tasks WHERE title = $1`, [title]);
                return `Task deleted!`;
            }
            catch (error) {
                console.error(`error deleting task`, error);
                return `Error deleting task`;
            }
        });
    }
}
exports.default = TaskManager;
