import jwt from "jsonwebtoken"; // Import jsonwebtoken for token verification

// verifyToken middleware function to check if the user is authenticated
// This middleware checks if the request contains a valid JWT token in the cookies or headers
// If the token is valid, it adds the user ID to the request object and calls the next middleware
// If the token is invalid or not provided, it returns a 401 Unauthorized error
export const verifyToken = (req, res, next) => {
  // Check if the token is present in the cookies or the Authorization header
  // The token can be sent as a Bearer token in the Authorization header or as a cookie
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  // If the token is not present, return a 401 Unauthorized error
  if (!token)
    //401 Unauthorized error
    return res.status(401).json({ error: "Access denied. No token provided." });

  try {
    // Verify the token using the secret key from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // If the token is valid, add the user ID to the request object
    req.userId = decoded.userId;
    // Call the next middleware in the stack
    next();
  } catch (error) {
    // If the token is invalid, return a 400 Bad Request error
    res.status(400).json({ error: "Invalid token" });
  }
};
