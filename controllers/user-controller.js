import knexinit from "knex";
import knexfile from "../knexfile.js";
const knex = knexinit(knexfile);
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
// import { dataUri } from "../middleware/multer.js";
// import { uploader } from "../config/cloudinaryConfig.js";

const getAll = async (_req, res) => {
  try {
    const data = await knex("users");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving Users: ${err}`);
  }
};

const register = async (req, res) => {
  const { first_name, last_name, email, user_password } = req.body;

  if (!first_name || !email || !last_name || !user_password) {
    return res.status(400).json({
      message: "Please provide first name, last name, email, and password.",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(user_password, 10);

    const newUser = {
      first_name,
      last_name,
      email,
      user_password: hashedPassword,
    };

    const insertedIds = await knex("users").insert(newUser);
    const newUserId = insertedIds[0];

    const createdUser = await knex("users").where({ id: newUserId }).first();

    res.status(201).json({
      user: createdUser,
      message: "Welcome to my API",
    });
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new user: ${error}`,
    });
  }
};

const login = async (req, res) => {
  const { email, user_password } = req.body;

  if (!email || !user_password) {
    return res.status(400).send("Please enter the required fields");
  }

  const user = await knex("users").where({ email: email }).first();
  if (!user) {
    return res.status(400).send("Invalid email");
  }
  const isPasswordCorrect = bcrypt.compareSync(user_password, user.user_password);
  if (!isPasswordCorrect) {
    return res.status(400).send("Invalid password");
  }
  const token = jwt.sign({ id: "user.id", email: user.email }, process.env.JWT_KEY, {
    expiresIn: "24h",
  });
  res.json({ token });
};

const currentUser = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Please login");
  }
  const authHeader = req.headers.authorization;
  const authToken = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(authToken, process.env.JWT_KEY);

    const userFound = await knex("users").where({ email: decoded.email }).first();

    delete userFound.password;
    res.json(userFound);
  } catch (error) {
    return res.status(401).send("Invalid auth token");
  }
};

// const getUserId = async (req, res) => {
//   try {
//     const usersFound = await knex("users").where({ id: req.params.id });

//     if (usersFound.length === 0) {
//       return res.status(404).json({
//         message: `User with ID ${req.params.id} not found`,
//       });
//     }

//     const userData = usersFound[0];
//     res.json(userData);
//   } catch (error) {
//     res.status(500).json({
//       message: `Unable to retrieve user data for user with ID ${req.params.id}`,
//     });
//   }
// };

// const update = async (req, res) => {
//   try {
//     const rowsUpdated = await knex("users").where({ id: req.params.id }).update(req.body);

//     if (rowsUpdated === 0) {
//       return res.status(404).json({
//         message: `User with ID ${req.params.id} not found`,
//       });
//     }

//     const updatedUser = await knex("users").where({
//       id: req.params.id,
//     });

//     res.json(updatedUser[0]);
//   } catch (error) {
//     res.status(500).json({
//       message: `Unable to update user with ID ${req.params.id}: ${error}`,
//     });
//   }
// };

const deleteUser = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Please login");
  }
  const authHeader = req.headers.authorization;
  const authToken = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(authToken, process.env.JWT_KEY);

    const deletedUser = await knex("users").where({ email: decoded.email }).del();

    if (deletedUser === 0) {
      return res.status(404).send("User not found");
    }

    res.status(204).send("User deleted successfully");
  } catch (error) {
    return res.status(401).send("Invalid auth token");
  }
};

const getUserIdImages = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await knex("users")
      .join("images", "images.user_id", "users.id")
      .where({ user_id: id })
      .select("title", "category", "image");
    if (data.length === 0) {
      return res.status(404).json({ message: "No images uploaded" });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(400).send("Error retrieving Users images");
  }
};

const postUserIdImages = async (req, res) => {
  try {
    const user_id = parseInt(req.params.id);
    const title = req.body.title;
    const category = req.body.category;
    const image = req.file;

    console.log("Received request to upload image:", {
      user_id,
      title,
      category,
      image: image ? image.originalname : null,
    });

    if (!user_id || !image || !title || !category) {
      console.error("Invalid fields:", { user_id, title, category, image });
      return res.status(400).json({ message: "Invalid fields" });
    }

    if (req.file) {
      try {
        const urlImage = image.path;

        console.log("Image uploaded to Cloudinary:", { urlImage });

        try {
          const newImageId = await knex("images").insert({
            user_id: user_id,
            title: title,
            category: category,
            image: urlImage,
          });

          console.log("Image inserted into the database with ID:", newImageId[0]);

          try {
            const createdImage = await knex("images").where({ image_id: newImageId[0] }).first();
            console.log("Retrieved inserted image data:", createdImage);
            res.status(200).json(createdImage);
          } catch (retrieveError) {
            console.error("Error retrieving inserted image data:", retrieveError);
            return res.status(400).json({ message: "Error retrieving inserted image data" });
          }
        } catch (dbInsertError) {
          console.error("Error inserting image into the database:", dbInsertError);
          return res.status(400).json({ message: "Error inserting image into the database" });
        }
      } catch (uploadError) {
        console.error("Error uploading image to Cloudinary:", uploadError);
        return res.status(400).json({ message: "Error uploading image to Cloudinary" });
      }
    }
  } catch (err) {
    console.error("Error extracting data from req.body and req.file:", err);
    res.status(400).send("Error extracting data from req.body and req.file");
  }
};

export {
  getAll,
  // getUserId,
  register,
  login,
  currentUser,
  // update,
  deleteUser,
  getUserIdImages,
  postUserIdImages,
};
