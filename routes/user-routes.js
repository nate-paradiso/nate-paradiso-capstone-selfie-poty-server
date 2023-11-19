import { Router } from "express";
const router = Router();
import {
  getAll,
  getUserId,
  register,
  login,
  currentUser,
  update,
  remove,
  getUserIdImages,
  postUserIdImages,
} from "../controllers/user-controller.js";

import { uploadMulter } from "../middleware/multer.js";

router.route("/").get(getAll);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/current").get(currentUser);

router.route("/:id").get(getUserId).patch(update).delete(remove);

router.route("/:id/images").get(getUserIdImages);
router.route("/:id/images/upload").post(uploadMulter.single("image"), postUserIdImages);

export default router;
