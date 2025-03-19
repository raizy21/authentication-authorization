import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, select: false, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  // role: { ref: "Role", type: Schema.Types.ObjectId },
});

const User = model("User", userSchema);
export default User;
