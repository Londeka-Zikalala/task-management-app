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
const userManagementCRUD_1 = __importDefault(require("../Service/userManagementCRUD"));
const taskManager_1 = __importDefault(require("../Service/taskManager"));
const assert_1 = __importDefault(require("assert"));
const db_1 = __importDefault(require("../db"));
describe('UserManagement class tests', function () {
    let userManagement;
    let taskManager;
    //before the tests run clear the users abd user_tasks tables and initialise userManagement
    this.beforeAll(function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.default.none(`TRUNCATE TABLE users RESTART IDENTITY CASCADE`);
            yield db_1.default.none(`TRUNCATE TABLE user_tasks RESTART IDENTITY CASCADE`);
            yield db_1.default.none(`TRUNCATE TABLE tasks RESTART IDENTITY CASCADE`);
            userManagement = new userManagementCRUD_1.default(db_1.default);
            taskManager = new taskManager_1.default(db_1.default);
        });
    });
    // Test that a user is registed 
    it(`should register a new user`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            let username = "Londeka";
            let password = "Password";
            let user = yield userManagement.userRegistration(username, password);
            // Fetch the user
            assert_1.default.strictEqual(user, 'user registered');
        });
    });
    it(`should login an existing user and give an error when user does not exist`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            let username = "Thandi";
            let password = "Thandii";
            let existingUser = "Londeka";
            let existingPassword = "Password";
            let failedLogIn = yield userManagement.userLogin(username, password);
            let successfulLogin = yield userManagement.userLogin(existingUser, existingPassword);
            // Failed logged in assert
            assert_1.default.strictEqual(failedLogIn, null);
            // Successful login assert
            assert_1.default.strictEqual(successfulLogin === null || successfulLogin === void 0 ? void 0 : successfulLogin.username, existingUser);
            assert_1.default.strictEqual(successfulLogin === null || successfulLogin === void 0 ? void 0 : successfulLogin.password, existingPassword);
        });
    });
    it(`should get tasks for a specific user ordered by duedate`, function () {
        return __awaiter(this, void 0, void 0, function* () {
            //Login user 
            let existingUser = "Londeka";
            let existingPassword = "Password";
            let user = yield userManagement.userLogin(existingUser, existingPassword);
            console.log(user.id);
            // Create two tasks 
            let title = 'Print all application papers';
            let description = 'Print all applications for the internship opening';
            let due_date = new Date('2024-12-05');
            let status = false;
            let title2 = 'Send interview invitations';
            let description2 = 'Send interview invitatiobn emails to 10 candidates by Friday';
            let due_date2 = new Date('2024-12-01');
            let status2 = false;
            yield taskManager.createTask(user.id, title, description, due_date, false);
            yield taskManager.createTask(user.id, title2, description2, due_date2, false);
            console.log(user.id);
            // get the tasks for Londeka 
            let userTasks = yield userManagement.viewUserTasks(user.id);
            assert_1.default.deepEqual(userTasks, [
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
            ]);
        });
    });
});
