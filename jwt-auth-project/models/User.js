import mongoose from "mongoose"; // import mongoose for MongoDB object modeling

// define schema for User model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// export the User model
export default mongoose.model("User", userSchema);
