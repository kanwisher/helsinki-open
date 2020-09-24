/* eslint-disable max-lines-per-function */
const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes helper', () => {
  test('no blogs returns zero likes ', () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  test('list with one blog returns likes that it has', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        // eslint-disable-next-line max-len
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  })

  test('list with multiple blogs returns sum of blog likes', () => {
    const listWithManyBlogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        // eslint-disable-next-line max-len
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        // eslint-disable-next-line max-len
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 0,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        // eslint-disable-next-line max-len
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 16,
        __v: 0
      }
    ];

    const result = listHelper.totalLikes(listWithManyBlogs);
    expect(result).toBe(21);
  })

  test('it returns empty for empty array', () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toBe('Empty');
  });

  test('it returns the only object', () => {
    const likedBlogs = [
      {
        name: 'test',
        likes: 5
      }
    ]

    const result = listHelper.favoriteBlog(likedBlogs);
    expect(result).toEqual({ name: 'test', likes: 5 })
  });
});

describe('favoriteBlog', () => {
  test('it returns the one with the most likes', () => {
    const likedBlogs = [
      {
        name: 'test',
        likes: 5
      },
      {
        name: 'test2',
        likes: 10
      },
      {
        name: 'test3',
        likes: 42
      },
      {
        name: 'test4',
        likes: 0
      }
    ]

    const result = listHelper.favoriteBlog(likedBlogs);
    expect(result).toEqual({ name: 'test3', likes: 42 })
  });
})