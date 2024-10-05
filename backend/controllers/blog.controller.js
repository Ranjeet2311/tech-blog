import mongoose from "mongoose";
import BlogAPI from "../models/blog.model.js";

export const getAlldata = async (req, res) => {
  try {
    const blogs = await BlogAPI.find({});
    res
      .status(200)
      .json({ success: true, message: "data fetch successful", data: blogs });
  } catch (error) {
    console.log(`${error.message}, Couldn't fetch documents `);

    res
      .status(404)
      .json({ success: false, message: "couldn't fetch documents" });
  }
};

export const createBlog = async (req, res) => {
  const inputdata = req.body;

  if (
    !inputdata.title ||
    !inputdata.author ||
    !inputdata.email ||
    !inputdata.shorDescription ||
    !inputdata.description
  ) {
    return res.status(400).json({
      success: false,
      message: "please provide all the required details",
    });
  }

  const newData = new BlogAPI(inputdata);

  try {
    await newData.save();
    res
      .status(201)
      .json({ success: true, message: "added new data", data: newData });
  } catch (error) {
    console.log("Error in creating new entry ", error.message);
    res.status(500).json({
      success: false,
      message: "server error, couldn't add new entry",
    });
  }
};

export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const blog = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log("invalid ObjectId");
    res.status(400).json({ success: false, message: "Invalid document ID" });
  }

  try {
    const updateBlog = await BlogAPI.findByIdAndUpdate(id, blog, {
      new: true,
    });

    if (!updateBlog) {
      return res
        .status(404)
        .json({ success: false, message: "Document not found" });
    }

    res.status(200).json({
      success: true,
      message: "update successful",
      updated: updateBlog,
    });
  } catch (error) {
    console.log("Error in updating the document : ", error.message);
    res.status(500).json({
      success: false,
      message: "couldn't update the document, please try again.",
    });
  }
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log("invalid ObjectId");
    res.status(400).json({ success: false, message: "Invalid document ID" });
  }

  try {
    const deleteBlog = await BlogAPI.findByIdAndDelete(id);

    if (!deleteBlog) {
      res.status(400).json({ success: false, message: "Document not found" });
    }

    res.status(200).json({
      success: true,
      message: "delete successful",
      deleted: deleteBlog,
    });
  } catch (error) {
    console.log("Error in deleting the document : ", error.message);
    res.status(500).json({
      success: false,
      message: "couldn't delete the document, please try again.",
    });
  }
};
