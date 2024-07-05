const express = require("express");
const blogRouter = express.Router();

const {
  fetchListOfBlogs,
  deleteABlog,
  updateABlog,
  addNewBlog
} = require("../controller/blog-controller");

blogRouter.get("/", fetchListOfBlogs);
blogRouter.post("/", addNewBlog);
blogRouter.put("/:id", updateABlog);
blogRouter.delete("/:id", deleteABlog);

module.exports = blogRouter;
