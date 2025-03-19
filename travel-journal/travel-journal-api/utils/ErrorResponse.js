
class ErrorResponse extends Error {
  // custom error class for handling errors in the application
  constructor(message, statusCode) {
    super(message);  // call the parent constructor with the error message
    this.statusCode = statusCode; // set the status code for the error
  }
}

// this class extends the built-in Error class to create a custom error class for handling errors in the application. It takes a message and a status code as arguments and sets them as properties of the instance. The message is passed to the parent constructor (Error) to set the error message.
export default ErrorResponse;
