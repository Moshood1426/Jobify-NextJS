import { UnAuthenticatedError } from "../errors/index.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const auth = async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  
  if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
  const token = bearerToken.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = {userId: payload.userId};
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
};

export default auth;
