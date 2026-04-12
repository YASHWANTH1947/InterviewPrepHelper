import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

/** *check if the user is authenticated by verifying the JWT token in the request cookies. * If the token is valid, attach the user information to the request object and call the next middleware. * If the token is invalid or missing, return a 401 Unauthorized response. * @param {*} req * @param {*} res * @param {*} next */
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    console.log("A token is not pressnt in in the request");
    return res.status(401).json({ message: "Unauthorized, No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (error) {
    console.log("Error inside auth middle ware, jwt token is invalid");
    res.status(401).json({ message: "Unauthorized, Invalid token" });
  }
};

export default authMiddleware;
