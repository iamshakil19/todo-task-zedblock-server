import express from "express";
import usersController from "./users.controller";

const router = express.Router();

router.post("/create-user", usersController.createUser);
router.post("/login", usersController.login);
export default router;
