import { IUser } from "./users.interface";
import { User } from "./users.model";

const createUser = async (user: IUser): Promise<IUser | null> => {
  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new Error("Failed to create user");
  }
  return createdUser;
};
const login = async (email: string) => {
  return await User.findOne({ email });
};

export default {
  createUser,
  login,
};
