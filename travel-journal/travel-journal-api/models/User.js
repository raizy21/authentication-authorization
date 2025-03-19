import mongoose from 'mongoose'; // import mongoose to interact with MongoDB
const { Schema, model } = mongoose; // destructure Schema and model from mongoose
// define a schema for the User model
// The schema defines the structure of the documents in the 'users' collection
const userSchema = new Schema({
  firstName: { type: String, required: [true, 'Firstname is required'] },
  lastName: { type: String, required: [true, 'Lastname is required'] },
  email: { type: String, required: [true, 'Email image is required'], unique: true },
  password: { type: String, required: [true, 'Password is required'], select: false },
  createdAt: { type: Date, default: Date.now }
});

// create a model named 'User' using
// the userSchema. The model is used to interact with the 'users' collection in the MongoDB database
export default model('User', userSchema);
