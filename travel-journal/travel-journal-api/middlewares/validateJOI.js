import ErrorResponse from '../utils/ErrorResponse.js'; // import ErrorResponse class for error handling

// middleware to validate request body using JOI schema
const validateJOI = schema => (req, res, next) => {
  // check if the request method is not GET, if so, validate the request body against the JOI schema
  const { error } = schema.validate(req.body);
  // error is a JOI validation error object that contains information about the validation failure
  return error ? next(new ErrorResponse(error.message, 400)) : next();
};

// this middleware function is used to validate the request body against a JOI schema. It takes a schema as an argument and returns a middleware function that can be used in an Express route handler. The middleware function checks if the request method is not GET, and if so, it validates the request body against the provided JOI schema. If there is a validation error, it creates a new ErrorResponse object with the error message and a status code of 400 (Bad Request), and passes it to the next middleware in the stack. If there are no validation errors, it calls the next middleware in the stack without any arguments.
export default validateJOI;
