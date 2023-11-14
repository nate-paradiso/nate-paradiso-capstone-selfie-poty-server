import { Router } from "express";
const router = Router();
import {
  index,
  getUserId,
  add,
  update,
  remove,
  getUserIdImages,
  postUserIdImages,
} from "../controllers/user-controller.js";
import { uploadMulter } from "../middleware/multer.js";

router.route("/").get(index).post(add);
router.route("/:id").get(getUserId).patch(update).delete(remove);

router.route("/:id/images").get(getUserIdImages);
router.route("/:id/images/upload").post(uploadMulter.single("image"), postUserIdImages);

export default router;
