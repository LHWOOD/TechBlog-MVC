const { Post } = require("../models");

const postData = [
  {
    title: "test1",
    content: "testing 1, 2, 3",
    user_id: 1,
  },
  {
    title: "test2",
    content: "testing 4, 5, 6",
    user_id: 2,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
