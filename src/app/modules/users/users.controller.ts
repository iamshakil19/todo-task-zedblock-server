import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import usersService from "./users.service";
import generateToken from "../../../token";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await usersService.createUser(req.body);
    const token = generateToken(result);

    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: {
        user: result,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create user",
      error,
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        error: "Please provide your credentials",
      });
    }

    const user = await usersService.login(email);

    if (!user) {
      return res.status(401).send({
        success: false,
        error: "No user found. Please create an account",
      });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(403).send({
        success: false,
        error: "Password is incorrect",
      });
    }

    const token = generateToken(user);

    const { password: pwd, ...others } = user.toObject();

    res.status(200).json({
      success: true,
      message: "Successfully logged in",
      data: {
        user: others,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create user",
      error,
    });
  }
};

export default { createUser, login };
