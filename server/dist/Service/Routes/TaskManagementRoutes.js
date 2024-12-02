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
const taskManager_1 = __importDefault(require("../taskManager"));
class TaskRoutes {
    constructor(db) {
        this.taskManager = new taskManager_1.default(db);
    }
    // Route function for creating a task
    createTask(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id, title, description, due_date, status } = req.body;
                // Validate inputs
                if (!user_id || !title || !description || !due_date || status === undefined) {
                    res.status(400).json({ message: 'Missing required fields' });
                    return;
                }
                const result = yield this.taskManager.createTask(user_id, title, description, new Date(due_date), status);
                res.status(201).json({ message: result });
            }
            catch (error) {
                console.error('Error creating task:', error);
                next(error);
            }
        });
    }
    // Route function for updating task status
    updateTaskStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let title = req.body;
                const result = yield this.taskManager.updateTask(title);
                res.status(200).json({ message: result });
            }
            catch (error) {
                console.error('Error updating task:', error);
                next(error);
            }
        });
    }
    // Route function for deleting a task
    deleteTask(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.body;
                const result = yield this.taskManager.deleteTask(id);
                res.status(200).json({ message: result });
            }
            catch (error) {
                console.error('Error deleting task:', error);
                next(error);
            }
        });
    }
}
exports.default = TaskRoutes;
