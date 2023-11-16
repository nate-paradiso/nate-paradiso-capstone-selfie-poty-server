// import seed data files, arrays of objects
import usersData from "../seed-data/users.js";
import imagesData from "../seed-data/images.js";

export const seed = async function (knex) {
  await knex("images").del();
  await knex("users").del();
  await knex("users").insert(usersData);
  await knex("images").insert(imagesData);
};
