import express, { Application, Request, Response } from "express";
import cors from "cors";
import userRouter from "./app/modules/users/users.route";
import taskRouter from "./app/modules/tasks/tasks.route";

const app: Application = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// application routes

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Working Successfully");
});

export default app;
