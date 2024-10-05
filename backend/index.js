import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import router from "./routes/blog.route.js";
dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use("/api/blogs", router);

console.log(`process.env.PORT : `, process.env.PORT);
console.log(`MONGO_URI : `, process.env.MONGO_URI);

app.listen(port, () => {
  connectDB();
  console.log(`Oh boy server runs at 3000`);
});
