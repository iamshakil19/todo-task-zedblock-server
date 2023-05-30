import { Model, Schema, model } from "mongoose";
import validator from "validator";
import { IUser } from "./users.interface";
import bcrypt from "bcryptjs";

type UserModel = Model<IUser, object>;

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
      validate: [validator.isEmail, "Provide a valid email"],
      lowercase: true,
      unique: true,
      required: [true, "Email address is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 6,
            maxLength: 15,
            minLowercase: 1,
            minNumbers: 1,
            minUppercase: 1,
            minSymbols: 1,
          }),
        message: "Password {VALUE} is not strong enough.",
      },
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

export const User = model<IUser, UserModel>("User", userSchema);
