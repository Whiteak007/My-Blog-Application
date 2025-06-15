import jwt from "jsonwebtoken";
import { handleError } from "../helpers/handleError.js";

export const authenticate = async (req, res, next) => {
  try {
    // const token = req.cookies.access_token
    const token =
      req.cookies.access_token || req.headers.authorization?.split(" ")[1];
    // if (!token) {
    //     return next(handleError(403, 'Unauthorized - No token provided'))
    // }
    if (!token) {
      return next(handleError(401, "Authorization token required")); // Changed to 401
    }
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodeToken;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return next(handleError(403, "Invalid token"));
    }
    if (error.name === "TokenExpiredError") {
      return next(handleError(403, "Token expired"));
    }
    next(handleError(500, error.message));
  }
};
