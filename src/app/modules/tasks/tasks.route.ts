import express from "express";
import tasksController from "./tasks.controller";

const router = express.Router();

router.post("/create-task", tasksController.createTask);
router.get("/:email", tasksController.myTask);
router.get("/single-task/:id", tasksController.singleTask);
router.delete("/:id", tasksController.deleteTask)
router.patch("/:id", tasksController.editTask)

export default router;
