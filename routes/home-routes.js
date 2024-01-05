import { Router } from "express";
const router = Router();
import { getAllImages, updateLikes } from "../controllers/home-controller.js";

router.route("").get(getAllImages);
router.route("/likes").patch(updateLikes);

export default router;
