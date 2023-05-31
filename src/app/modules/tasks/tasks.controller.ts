import { Request, Response } from "express";
import taskService from "./task.service";
import { isValidObjectId } from "mongoose";

const createTask = async (req: Request, res: Response) => {
  try {
    const task = req.body;
    const result = await taskService.createTask(task);
    res.status(200).json({
      success: true,
      message: "Task created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create task",
      error,
    });
  }
};

const myTask = async (req: Request, res: Response) => {
  const { email } = req.params;

  const result = await taskService.myTask(email);
  res.status(200).json({
    success: true,
    data: result,
  });
  try {
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "can't get the data",
      error,
    });
  }
};

const singleTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, error: "Not a valid id" });
    }

    const result = await taskService.singleTask(id);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "can't get the data",
      error,
    });
  }
};

const editTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);

    const data = req.body;
    console.log(data);

    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, error: "Not a valid id" });
    }

    const result = await taskService.editTask(id, req.body);
    if (!result.modifiedCount) {
      return res.status(400).json({
        success: false,
        error: "couldn't update the task with this id",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully update the task",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "could't update the task",
      error,
    });
  }
};

const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).send({ success: false, error: "Not a valid id" });
    }

    const result = await taskService.deleteTask(id);

    if (!result.deletedCount) {
      return res.status(400).send({
        success: false,
        error: "Couldn't delete the product",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task successfully deleted",
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "can't get the data",
      error,
    });
  }
};

export default { createTask, myTask, singleTask, deleteTask, editTask };
