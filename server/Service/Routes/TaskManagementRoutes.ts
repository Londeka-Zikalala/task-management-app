import { Request, Response, NextFunction } from 'express';
import TaskManager from '../taskManager';
import db from '../../db';
import { IDatabase } from 'pg-promise';

export default class TaskRoutes {
    private taskManager: TaskManager;

    constructor(db: IDatabase<any>) {
        this.taskManager = new TaskManager(db);
    }

    // Route function for creating a task
    async createTask(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { user_id, title, description, due_date, status } = req.body;

            // Validate inputs
            if (!user_id || !title || !description || !due_date || status === undefined) {
                res.status(400).json({ message: 'Missing required fields' });
                return;
            }

            const result = await this.taskManager.createTask(user_id, title, description, new Date(due_date), status);
            res.status(201).json({ message: result });
        } catch (error) {
            console.error('Error creating task:', error);
            next(error);
        }
    }

    // Route function for updating task status
    async updateTaskStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let title= req.body;

            const result = await this.taskManager.updateTask(title)
            res.status(200).json({ message: result });
        } catch (error) {
            console.error('Error updating task:', error);
            next(error);
        }
    }

    // Route function for deleting a task
    async deleteTask(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let id = req.body;
            const result = await this.taskManager.deleteTask(id);
            res.status(200).json({ message: result });
        } catch (error) {
            console.error('Error deleting task:', error);
            next(error);
        }
    }

   
    }