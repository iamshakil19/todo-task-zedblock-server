import jwt from "jsonwebtoken";
import config from "./config";
import { IUser } from "./app/modules/users/users.interface";

const generateToken = (userInfo: IUser) => {
  const payload = {
    email: userInfo.email,
  };
  const token = jwt.sign(payload, config.access_token_secret, {
    expiresIn: "7d",
  });
  return token;
};

export default generateToken;
