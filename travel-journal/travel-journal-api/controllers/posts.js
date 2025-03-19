import { isValidObjectId } from 'mongoose'; // import isValidObjectId from mongoose to validate MongoDB Object IDs
import Post from '../models/Post.js'; // import Post model to interact with the 'posts' collection in the MongoDB database
import asyncHandler from '../utils/asyncHandler.js'; // import asyncHandler to handle asynchronous requests
import ErrorResponse from '../utils/ErrorResponse.js'; // import ErrorResponse class for error handling


// Get all posts
export const getAllPosts = asyncHandler(async (req, res, next) => {
  // get all posts from the database and populate the author field with user data
  const posts = await Post.find().populate('author');
  // jsonify the posts and send them as a response
  res.json(posts);
});

// Post a new post
export const createPost = asyncHandler(async (req, res, next) => {
  // retrieve the request body and create a new post in the database
  const { body } = req;
  // check if the request body contains an author field, if not, set it to the current user ID
  const newPost = await (await Post.create({ ...body })).populate('author');
  // jsonify the new post and send it as a response with a 201 status code
  res.status(201).json(newPost);
});

// Get a single post by ID
export const getSinglePost = asyncHandler(async (req, res, next) => {
  // destructure the request parameters to get the post ID
  const {
    params: { id }
  } = req;
  // check if the ID is a valid MongoDB Object ID, if not, throw an error
  if (!isValidObjectId(id)) throw new ErrorResponse('Invalid id', 400);
  // find the post by ID in the database and populate the author field with user data
  const post = await Post.findById(id).populate('author');
  // if the post is not found, throw an error with a 404 status code
  if (!post) throw new ErrorResponse(`Post with id of ${id} doesn't exist`, 404);
  // jsonify the post and send it as a response
  res.send(post);
});


// Update a post by ID
export const updatePost = asyncHandler(async (req, res, next) => {
  // destructure the request body and parameters to get the post ID
  const {
    body,
    params: { id }
  } = req;
 // check if the ID is a valid MongoDB Object ID, if not, throw an error 
  if (!isValidObjectId(id)) throw new ErrorResponse('Invalid id', 400);
  // find the post by ID in the database and update it with the request body, then populate the author field with user data
  const updatedPost = await Post.findByIdAndUpdate(id, body, { new: true }).populate('author');
  // if the post is not found, throw an error with a 404 status code
  if (!updatedPost) throw new ErrorResponse(`Post with id of ${id} doesn't exist`, 404);
  // jsonify the updated post and send it as a response
  res.json(updatedPost);
});

// Delete a post by ID
export const deletePost = asyncHandler(async (req, res, next) => {
  // destructure the request parameters to get the post ID
  const {
    params: { id }
  } = req;
  // check if the ID is a valid MongoDB Object ID, if not, throw an error
  if (!isValidObjectId(id)) throw new ErrorResponse('Invalid id', 400);
  // find the post by ID in the database and delete it, then populate the author field with user data
  const deletedPost = await Post.findByIdAndDelete(id).populate('author');
  // if the post is not found, throw an error with a 404 status code
  if (!deletedPost) throw new Error(`Post with id of ${id} doesn't exist`);
  // jsonify the deleted post and send it as a response with a success message
  res.json({ success: `Post with id of ${id} was deleted` });
});
