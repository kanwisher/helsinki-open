/* eslint-disable id-length */
const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, curr) => {
    return acc + curr.likes;
  }, 0)
}

const favoriteBlog = (blogs) => {
  return [...blogs].sort((a, b) => {
    return b.likes - a.likes
  })[0] || 'Empty'
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}