import { Router } from "express"; // import express Router to create a new router instance
import validateJOI from "../middlewares/validateJOI.js";
import {
  createPost,
  deletePost,
  getAllPosts,
  getSinglePost,
  updatePost,
} from "../controllers/posts.js"; // import post controller functions
import { postSchema } from "../joi/schemas.js"; // import JOI schema for post validation

// create a new router instance for handling post-related routes
const postsRouter = Router();

// define the routes for the posts resource
postsRouter
  .route("/")
  .get(getAllPosts)
  .post(validateJOI(postSchema), createPost);

// define the routes for a single post resource using its ID
postsRouter
  .route("/:id")
  .get(getSinglePost)
  .put(validateJOI(postSchema), updatePost)
  .delete(deletePost);

// export the postsRouter instance to be used in other parts of the application
export default postsRouter;
