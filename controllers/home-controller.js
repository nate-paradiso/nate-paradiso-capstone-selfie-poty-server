import knexinit from "knex";
import knexfile from "../knexfile";
const knex = knexinit(knexfile);

const getAllImages = async (_req, res) => {
  try {
    const data = await knex("images");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving images: ${err}`);
  }
};

module.exports = {
  getAllImages,
};
