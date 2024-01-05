import knexinit from "knex";
import knexfile from "../knexfile.js";
const knex = knexinit(knexfile);

const getAllImages = async (_req, res) => {
  try {
    const data = await knex("images");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving images: ${err}`);
  }
};

const updateLikes = async (req, res) => {
  const { imageId } = req.body;

  try {
    const imageData = await knex("images").where({ image_id: imageId }).first();

    if (!imageData) {
      return res.status(404).json({ message: "Image not found" });
    }

    const currentLikes = imageData.likes || 0;
    await knex("images")
      .where({ image_id: imageId })
      .update({ likes: currentLikes + 1 });

    res.status(200).json({ message: "Like updated successfully" });
  } catch (err) {
    res.status(400).send(`Error updating like: ${err}`);
  }
};

export { getAllImages, updateLikes };
