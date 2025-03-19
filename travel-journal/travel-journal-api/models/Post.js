import mongoose from 'mongoose';  // import mongoose to interact with MongoDB
const { Schema, model } = mongoose; // destructure Schema and model from mongoose

// define a schema for the Post model
const postSchema = new Schema({
  title: { type: String, required: [true, 'Title is required'] },
  author: { type: String, required: [true, 'Author is required'] },
  image: { type: String, required: [true, 'Cover image is required'] },
  content: { type: String, required: [true, 'Body is required'] },
  date: { type: Date, default: Date.now }
});

// create a model named 'Post' using the postSchema
// The model is used to interact with the 'posts' collection in the MongoDB database
export default model('Post', postSchema);
