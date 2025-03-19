// purpose: Middleware to handle errors in the Express application
const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // log the error stack to the console for debugging
  res.status(err.statusCode || 500).json({ error: err.message }); // send a JSON response with the error message and status code
};

// this middleware function is used to handle errors that occur in the application. It takes four parameters: err, req, res, and next. The err parameter contains the error object, req is the request object, res is the response object, and next is a callback function to pass control to the next middleware in the stack.
export default errorHandler;
