const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const api = supertest(app);

const helper = require('./test_helper');
const Blog = require('../models/blog');

const _ = require('lodash');

const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1sdXVra2FpIiwiaWQiOiI2MzY2ZGE2MDZlOTBjYzI1MTE5NmY5OWIiLCJpYXQiOjE2Njc2ODQ5NzN9.8tMvignOQeqJ_HlT0fTzVFGz14NzL469pW6qN2BdcLE';


beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.listWithManyBlogs
    .map(blog => new Blog(blog));

  const promiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArray);
});


test('blog returned ammount is correct', async () => {
  const response = await api.get('/api/blogs')
    .expect(200);

  expect(response.body).toHaveLength(helper.listWithManyBlogs.length);
});

test('resulting id property is called "id" instead of "_id"', async () => {
  const response = await api.get('/api/blogs').expect(200);

  expect(response.body[0].id).toBeDefined();
  expect(response.body[0]._id).not.toBeDefined();
});

test('a new blog is added', async () => {
  const newBlog = {
    title: 'React is actually better than Angular',
    author: 'William Penaranda',
    url: 'http://www.u.arizona.edu/blogPost.html',
    likes: 100,
  };

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${authToken}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.listWithManyBlogs.length + 1);

  const titles = blogsAtEnd.map(blog => blog.title);
  expect(titles).toContain(newBlog.title);
});

test('missing likes ammount defaults to 0', async () => {
  const newBlogMissingLikes = {
    title: 'React is actually better than Angular',
    author: 'William Penaranda',
    url: 'http://www.u.arizona.edu/blogPost.html',
  };

  const resultBlog = await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${authToken}`)
    .send(newBlogMissingLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  expect(resultBlog.body.likes).toBeDefined();
  expect(resultBlog.body.likes).toBe(0);
});

test('missing title or url returns 400 Bad Request', async () => {
  const newBlogWithoutTitle = helper.newBlogEntry;
  delete newBlogWithoutTitle.title;

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${authToken}`)
    .send(newBlogWithoutTitle)
    .expect(400);

  const newBlogWithoutUrl = helper.newBlogEntry;
  delete newBlogWithoutUrl.url;

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${authToken}`)
    .send(newBlogWithoutUrl)
    .expect(400);
});

test('deletion of a blog', async () => {

  const blogsAtStart = await helper.blogsInDb();
  let blogToDelete = await Blog.findOne({ user: '6366da606e90cc251196f99b' });
  blogToDelete = blogToDelete.toJSON();

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `bearer ${authToken}`)
    .expect(204);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);
  expect(blogsAtEnd).not.toContainEqual(blogToDelete);
});

test('deleting a blog without token', async () => {
  const blogsAtStart = await helper.blogsInDb();
  let blogToDelete = await Blog.findOne({ user: '6366da606e90cc251196f99b' });
  blogToDelete = blogToDelete.toJSON();

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(401);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
  expect(blogsAtEnd).toContainEqual(blogToDelete);
});

test('updating the likes of a blog', async () => {
  const blogsAtStart = await helper.blogsInDb();

  const blogToUpdate = _.sample(blogsAtStart);

  const putResponse = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send({ ...blogToUpdate, likes: 31 })
    .expect(200);

  expect(putResponse.body.likes).toBe(31);

});

afterAll(() => {
  mongoose.connection.close();
});