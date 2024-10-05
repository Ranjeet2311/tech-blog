import mongoose from "mongoose";

const testApiSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    email: String,
    shorDescription: String,
    description: String,
  },
  { timestamps: true /*created at | Updated at */ }
);

const BlogAPI = mongoose.model("testApi", testApiSchema);
export default BlogAPI;
