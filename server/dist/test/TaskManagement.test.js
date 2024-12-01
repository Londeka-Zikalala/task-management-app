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
const taskManager_1 = __importDefault(require("../Service/taskManager"));
const userManagementCRUD_1 = __importDefault(require("../Service/userManagementCRUD"));
const db_1 = __importDefault(require("../db"));
const assert_1 = __importDefault(require("assert"));
describe('TaskManager class tests', function () {
    let userManagement;
    let taskManager;
    this.beforeAll(function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.default.none(`TRUNCATE TABLE user_tasks RESTART IDENTITY CASCADE`);
            yield db_1.default.none(`TRUNCATE TABLE tasks RESTART IDENTITY CASCADE`);
            userManagement = new userManagementCRUD_1.default(db_1.default);
            taskManager = new taskManager_1.default(db_1.default);
        });
    });
    it(`create a task for a user`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            //Create user and get the id 
            let username = 'Thandeka';
            let password = 'Password';
            // task details
            let title = 'recruitment report';
            let description = 'report on iuntern recruitment';
            let due_date = new Date('2024-12-07');
            let status = false;
            yield userManagement.userRegistration(username, password);
            let user = yield userManagement.userLogin(username, password);
            console.log(user);
            // create task 
            let task = yield taskManager.createTask(user.id, title, description, due_date, false);
            assert_1.default.equal(task, 'Task created!');
        });
    });
    it(`should update a task when completed`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            //get task title 
            //Create user and get the id 
            let username = 'Thandeka';
            let password = 'Password';
            // task details
            let title = 'recruitment report';
            let description = 'report on iuntern recruitment';
            let due_date = new Date('2024-12-07');
            let status = false;
            yield userManagement.userRegistration(username, password);
            let user = userManagement.userLogin(username, password);
            // create task 
            let task = yield taskManager.createTask(user.id, title, description, due_date, false);
            //update task 
            let updatedTask = yield taskManager.updateTask(task.title);
            assert_1.default.equal(updatedTask, 'Task completed');
        });
    });
    it(`should delete a task using the title`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            //Create user and get the id 
            let username = 'Thandeka';
            let password = 'Password';
            // task details
            let title = 'recruitment report';
            let description = 'report on iuntern recruitment';
            let due_date = new Date('2024-12-07');
            let status = false;
            yield userManagement.userRegistration(username, password);
            let user = userManagement.userLogin(username, password);
            // create task 
            let task = yield taskManager.createTask(user.id, title, description, due_date, false);
            // delete task 
            let deleteTask = yield taskManager.deleteTask(task.title);
            assert_1.default.equal(deleteTask, 'Task deleted!');
        });
    });
});
