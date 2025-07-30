import { Request, Response } from "express";
import model from "../model/taskModel";

export const createTask = async (req: Request, res: Response) => {
    try {
        const { title, description} = req.body;
        const  { userId } = req.params
        const task = await model.create({ title, description, user: userId });
        if (task) {
            res.status(201).json({
                message: "task created succesfully",
                data: task
            });
        } else {
            res.status(404).json({
                message: "task not  created succesfully",
            });
        }
    } catch (error) {
        res.status(404).json({
            message: "Error creating task",
            data: error
        });
    }
};

export const getUserTasks = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const task = await model.find({ user: userId });
        if (task) {
            res.status(200).json({
                message: "Usertask gotten succesfully",
            });
        } else {
            res.status(404).json({
                message: "Usertask not gotten succesfully",
            });
        }
    } catch (error) {
        res.status(404).json({
            message: "Error getting  Usertask",
            data: error
        });
    }
}

export const updateTask = async (req: Request, res: Response) => {
    try {
        const { taskId } = req.params;

        const task = await model.findByIdAndUpdate(taskId, req.body, { new: true });
        if (task) {
             res.status(201).json({
                message: "task updated  succesfully",
            });
        } else {
            res.status(404).json({
                message: "task  not  updated  succesfully",
            });
        }
    } catch (error) {
        res.status(404).json({
            message: "Error updating task",
            data: error
        });
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const { taskId } = req.params;

        const task = await model.findByIdAndDelete(taskId);
        if (task) {
            res.status(200).json({
                message: "Task deleted",
            });
        } else {
            res.status(404).json({
                message: "Task not deleted",
            });
        }
    } catch (error) {
        res.status(404).json({
            message: "Error deleting  task",
            data: error
        });
    }
}

export const markTaskDone = async (req: Request, res: Response) => {
    try {
        const { taskId } = req.params;

        const task = await model.findByIdAndUpdate(taskId, { isDone: true }, { new: true });
        if (task) {
            res.status(200).json({
                message: "task done succesfully",
                task
            });

        } else {
            res.status(404).json({
                message: "task  not done succesfully",
            });
        }
    } catch (error) {
        res.status(404).json({
            message: "Error geting task done",
            data: error
        });
    }
}
