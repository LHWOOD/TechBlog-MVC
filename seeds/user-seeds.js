const { User } = require("../models");

const userData = [
  {
    username: "janeDoe",
    password: "test123",
  },
  {
    username: "johnDoe",
    password: "test456",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
