import mongoose, { Model, Schema, model } from "mongoose";
import { ITask } from "./tasks.interface";

type TaskModel = Model<ITask, object>;

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      maxLength: [50, "Title is too large"],
    },
    email: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
      maxLength: [250, "Title is too large"],
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Task = model<ITask, TaskModel>("Task", taskSchema);
