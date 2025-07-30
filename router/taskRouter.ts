import { Router } from "express";
import {
  createTask,
  getUserTasks,
  updateTask,
  deleteTask,
  markTaskDone,
} from "../controller/taskController";

const router = Router();

router.route("/create/:userId").post(createTask);
router.route("/:taskId").get (getUserTasks);
router.route("/:userId").patch (updateTask);
router.route("/:taskId").delete (deleteTask);
router.route("/done/:taskId").patch (markTaskDone);

export default router;