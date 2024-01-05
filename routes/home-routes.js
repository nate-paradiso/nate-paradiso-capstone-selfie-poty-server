import { Router } from "express";
const router = Router();
import { getAllImages, updateLikes } from "../controllers/home-controller.js";

router.route("").get(getAllImages).patch(updateLikes);

export default router;
