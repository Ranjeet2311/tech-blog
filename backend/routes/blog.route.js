import express from "express";
import {
  createBlog,
  deleteBlog,
  getAlldata,
  updateBlog,
} from "../controllers/blog.controller.js";

const router = express.Router();
router.get("/", getAlldata);
router.post("/", createBlog);
router.patch("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;
