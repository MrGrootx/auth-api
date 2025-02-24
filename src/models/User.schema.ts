import { model, Schema, Model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
});

const User: Model<{
  email: string;
  password: string;
  resetPasswordToken?: string | null;
  resetPasswordExpires?: Date | null;
}> = model("User", userSchema);
export default User;
