const _ = require('lodash');
// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, curr) => (
    sum += curr.likes
  ), 0);
};

const favoriteBlog = (blogs) => {
  return (blogs.length === 0
    ? undefined
    : blogs.reduce((fav, curr) => (
      curr.likes > fav.likes
        ? curr
        : fav
    )));
};

const mostBlogs = (blogs) => {
  const blogsPerAuthor = _.countBy(blogs, 'author');
  const mostBlogsAuthor = _.maxBy(_.keys(blogsPerAuthor), (val) => blogsPerAuthor[val]);
  return {
    author: mostBlogsAuthor,
    blogs: blogsPerAuthor[mostBlogsAuthor]
  };
};

const mostLikes = (blogs) => {
  const likesPerAuthor = blogs.reduce((result, value) => {
    !result[value.author]
      ? result[value.author] = value.likes
      : result[value.author] += value.likes;
    return result;
  }, {});
  const mostLikesAuthor = _.maxBy(_.keys(likesPerAuthor), (val) => likesPerAuthor[val]);
  return {
    author: mostLikesAuthor,
    likes: likesPerAuthor[mostLikesAuthor]
  };
};


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
