import { router } from "express";
import homeController from "../controllers/home-controller.js";

router.route("").get(homeController.getAllImages);

export default router;
