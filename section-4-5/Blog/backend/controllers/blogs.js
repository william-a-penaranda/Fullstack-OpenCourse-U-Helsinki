const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');



blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    });
  }

  const assignedUser = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    likes: body.likes,
    url: body.url,
    author: body.author,
    user: assignedUser._id,
  });


  const savedBlog = await blog.save();
  assignedUser.blogs = assignedUser.blogs.concat(savedBlog._id);
  await assignedUser.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {

  const blog = await Blog.findById(request.params.id);
  const user = request.user;

  if (!user) {
    return response.status(401).json({
      error: 'Missing token'
    });
  }
  if (!blog.user || (blog.user.toString() === user.toString())) {
    await Blog.findByIdAndDelete(request.params.id);
    return response.status(204).end();
  }
  response.status(401).json({
    error: 'only the user who created the blog can delete it'
  });
});

blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body;


  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    blog,
    { new: true, runValidators: true, context: 'query' }
  ).populate('user', { username: 1, name: 1 });

  response.send(updatedBlog);
});

module.exports = blogsRouter;