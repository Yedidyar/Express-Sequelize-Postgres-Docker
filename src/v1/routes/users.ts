import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  createUser,
} from "../controllers/users";
import express from "express";

export const router = express.Router();
router
  .get("/", getAllUsers)
  .get("/:id", getUser)
  .post("/", createUser)
  .put("/:id", updateUser)
  .delete("/:id", deleteUser);
