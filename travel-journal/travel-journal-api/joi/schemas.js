import Joi from "joi"; // import Joi from the 'joi' library

// define the schemas for validating user and post data
export const userSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().alphanum().min(8).max(12).required(),
});

// the userSchema is used to validate the data for creating a new user
export const signInSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().alphanum().min(8).max(12).required(),
});

// the postSchema is used to validate the data for creating a new post
export const postSchema = Joi.object({
  title: Joi.string().required(),
  image: Joi.string().required(),
  content: Joi.string().required(),
  author: Joi.string(),
});
