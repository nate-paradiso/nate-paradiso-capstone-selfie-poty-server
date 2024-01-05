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
  console.log(imageId);

  try {
    const imageData = await knex("images").where({ image_id: imageId }).first();
    console.log(imageData);
    if (!imageData) {
      return res.status(404).json({ message: "Image not found" });
    }

    let currentLikes = imageData.likes || 0;
    console.log(currentLikes);
    try {
      await knex("images")
        .where({ image_id: imageId })
        .update({ likes: currentLikes + 1 });

      res.status(200).json({ updatedLikes: currentLikes + 1 });
    } catch (updateError) {
      throw new Error(`Error updating like: ${updateError}`);
    }
  } catch (err) {
    res.status(400).send(`Error updating like on server: ${err}`);
  }
};

export { getAllImages, updateLikes };
