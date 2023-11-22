import { Router } from "express";
const router = Router();
import homeController from "../controllers/home-controller.js";

router.route("").get(homeController.getAllImages);

export default router;
