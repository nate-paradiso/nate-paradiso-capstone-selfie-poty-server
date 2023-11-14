// import seed data files, arrays of objects
const usersData = require("../seed-data/users");
const imagesData = require("../seed-data/images");

exports.seed = async function (knex) {
  await knex("images").del();
  await knex("users").del();
  await knex("users").insert(usersData);
  await knex("images").insert(imagesData);
};
