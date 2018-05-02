const mongoose = require("mongoose");
const Blog = require("../models/Blog");
const moment = require("moment");

exports.blogOverview = async (req, res) => {
  const posts = await Blog.find({})
    .select({ title: 1, author: 1, created: 1, _id: 0 })
    .populate("author", ["name"])
    .limit(12);
  res.render("blog/blog-overview", { posts });
};

exports.singlePost = async (req, res) => {
  const post = await Blog.findOne({ title: req.params.title }).populate(
    "author",
    ["name"]
  );
  res.render("blog/blog-single", { post });
};

exports.addPost = (req, res) => {
  res.render("backend/add-blogpost");
};

exports.createPost = async (req, res) => {
  const blog = await new Blog({
    title: req.body.title,
    content: req.body.content,
    author: req.user._id
  }).save();
  res.redirect("/blog");
};
