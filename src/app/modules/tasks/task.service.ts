import { ITask } from "./tasks.interface";
import { Task } from "./tasks.model";

const createTask = async (task: ITask): Promise<ITask | null> => {
  const createdTask = await Task.create(task);
  if (!createdTask) {
    throw new Error("Failed to create user");
  }
  return createdTask;
};

const myTask = async (email: string) => {
  const result = await Task.find({ email });
  return result;
};

const singleTask = async (id: string): Promise<ITask | null> => {
  const result = await Task.findOne({ _id: id });
  return result;
};

const editTask = async (id: string, data: ITask) => {
  console.log(id, data, 23);

  const result = await Task.updateOne(
    { _id: id },
    { $set: data },
    {
      runValidators: true,
    }
  );

  console.log(result, 32);

  return result;
};
const editCompleted = async (id: string, data: ITask) => {
  console.log(id, data, 38);

  const result = await Task.updateOne(
    { _id: id },
    { $set: data },
    {
      runValidators: true,
    }
  );

  console.log(result, 32);

  return result;
};

const deleteTask = async (id: string) => {
  const result = await Task.deleteOne({ _id: id });
  return result;
};

export default {
  createTask,
  myTask,
  singleTask,
  deleteTask,
  editTask,
  editCompleted,
};
