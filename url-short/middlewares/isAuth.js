import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import database from "../database/connection.js";
dotenv.config();

async function isAuth(req, res, next) {
  const headers = req.headers;
  const token = headers?.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    //user validation
    const query = `
        SELECT * FROM users WHERE id = $1 AND email = $2 AND username = $3
        `;
    const resDb = await database.query(query, [
      decoded.id,
      decoded.email,
      decoded.username,
    ]);

    if (resDb.rows.length === 0) {
      //err message must be generic
      return res.status(401).json({ message: "Unauthorized" });
    }
    // reassign req.user to decoded token
    req.user = {
      id: decoded.id,
      email: decoded.email,
      username: decoded.username,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

export default isAuth;
