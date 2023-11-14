const knex = require("knex")(require("../knexfile.js"));

const index = async (_req, res) => {
  try {
    const data = await knex("images");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving Users: ${err}`);
  }
};

module.exports = {
  index,
};
