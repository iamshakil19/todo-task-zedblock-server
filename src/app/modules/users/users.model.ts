import { Model, Schema, model } from "mongoose";
import { IUser } from "./users.interface";
import bcrypt from "bcryptjs";

// type UserModel = Model<IUser, object>;

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [30, "Name is too large"],
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "Email address is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const password = this.password;
  const hashedPassword = bcrypt.hashSync(password);
  this.password = hashedPassword;
  next();
});

export const User = model<IUser>("User", userSchema);
