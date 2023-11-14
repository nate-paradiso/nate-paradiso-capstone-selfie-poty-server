import knexinit from "knex";
import knexfile from "../knexfile.js";
const knex = knexinit(knexfile);
console.log(knexfile);

const index = async (_req, res) => {
  try {
    const data = await knex("users");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving Users: ${err}`);
  }
};

const add = async (req, res) => {
  if (!req.body.first_name || !req.body.email || !req.body.last_name || !req.body.user_password) {
    return res.status(400).json({
      message: "Please provide first name, last name, email, and password.",
    });
  }

  try {
    const result = await knex("users").insert(req.body);

    const newUserId = result[0];
    const createdUser = await knex("users").where({ id: newUserId });

    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new user: ${error}`,
    });
  }
};

const getUserId = async (req, res) => {
  try {
    const usersFound = await knex("users").where({ id: req.params.id });

    if (usersFound.length === 0) {
      return res.status(404).json({
        message: `User with ID ${req.params.id} not found`,
      });
    }

    const userData = usersFound[0];
    res.json(userData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve user data for user with ID ${req.params.id}`,
    });
  }
};

const update = async (req, res) => {
  try {
    const rowsUpdated = await knex("users").where({ id: req.params.id }).update(req.body);

    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `User with ID ${req.params.id} not found`,
      });
    }

    const updatedUser = await knex("users").where({
      id: req.params.id,
    });

    res.json(updatedUser[0]);
  } catch (error) {
    res.status(500).json({
      message: `Unable to update user with ID ${req.params.id}: ${error}`,
    });
  }
};

const remove = async (req, res) => {
  try {
    const rowsDeleted = await knex("users").where({ id: req.params.id }).delete();

    if (rowsDeleted === 0) {
      return res.status(404).json({ message: `User with ID ${req.params.id} not found` });
    }

    // No Content response
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete user: ${error}`,
    });
  }
};

const getUserIdImages = async (req, res) => {
  try {
    const data = await knex("users")
      .join("images", "images.user_id", "users.id")
      .where({ user_id: req.params.id })
      .select("title", "category", "filename");
    if (data.length === 0) {
      return res.status(404).json({ message: "No images uploaded" });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(400).send("Error retrieving Users images");
  }
};

const postUserIdImages = async (req, res) => {
  const user_id = req.body.user_id;
  const title = req.body.title;
  const category = req.body.category;
  const filename = req.body.filename;
  // const likes = req.body.likes;

  if (!title && !category === 0) {
    return res.status(400).json({ message: "image upload failed" });
  }
  try {
    const newImageId = await knex("images").insert([
      {
        user_id: parseInt(user_id),
        title: title,
        category: category,
        filename: filename,
        // likes: parseInt(likes),
      },
    ]);
    const createdImage = await knex("images").where({ id: newImageId[0] });

    res.status(200).json(createdImage);
  } catch (err) {
    console.error(err);
    res.status(400).send("Error posting image");
  }
};
export { index, getUserId, add, update, remove, getUserIdImages, postUserIdImages };
