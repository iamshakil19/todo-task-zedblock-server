import { IUser } from "./users.interface";
import { User } from "./users.model";

const createUser = async (user: IUser): Promise<IUser | null> => {
  console.log(user, 5);

  const createdUser = await User.create(user);
  console.log(createdUser, 6);

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
