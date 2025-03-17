import { Schema, model } from "mongoose";

const roleSchema = new Schema({
  name: { type: String, unique: true, required: true },
});

const Role = model("Role", roleSchema);
export default Role;
