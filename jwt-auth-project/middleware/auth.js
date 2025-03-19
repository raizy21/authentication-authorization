import jwt from "jsonwebtoken"; // import jsonwebtoken for creating JWT tokens

export const verifyToken = (req, res, next) => {
  try {
    // check if the token is present in the request headers
   
    const token = req.headers.authorization;

    // debug log to check the token value
    if (!token) {
      // if no token is found, return an error response
      return res
        .status(401)
        .json({ error: "Access Denied. No Token Provided" });
    }

    // debug log to check the token value
    console.log("received Token:", token); 

    // verify the token using the secret key
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      // if no secret key is found, return an error response
      return res.status(500).json({ error: "JWT secret key is missing" });
    }

    // decode the token to get user data
    const decoded = jwt.verify(token.replace("Bearer ", ""), secret);

    // debug log to check the decoded token value
    console.log(" Token Decoded Successfully:", decoded);
    // check if the token is valid and not expired 
    req.user = decoded; // attach user data to request
    // call the next middleware or route handler
    next();
  } catch (err) {
    // handle errors, e.g., token expired or invalid
    console.error("JWT verification error:", err.message);
    return res.status(400).json({ error: "invalid token" });
  }
};
