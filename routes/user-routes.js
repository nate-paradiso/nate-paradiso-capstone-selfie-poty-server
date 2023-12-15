import { Router } from "express";

const router = Router();
import {
  getAll,
  // getUserId,
  register,
  login,
  currentUser,
  // update,
  deleteUser,
  getUserIdImages,
  postUserIdImages,
} from "../controllers/user-controller.js";

import { multerUploads } from "../middleware/multer.js";

router.route("/").get(getAll);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/current").get(currentUser).delete(deleteUser);

// router.route("/current/:id").delete(deleteUser);

router.route("/current/:id/images").get(getUserIdImages);
router.route("/current/:id/upload").post(multerUploads, postUserIdImages);

export default router;
