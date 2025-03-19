// purpose: Middleware to handle async errors in Express routes
const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// this function is a higher-order function that takes an asynchronous function (fn) as an argument and returns a new function that wraps the original function in a Promise. This allows for easier error handling in Express routes, as any errors that occur in the asynchronous function will be caught and passed to the next middleware in the stack using the next() function.
export default asyncHandler;
