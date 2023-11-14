const router = require("express").Router();
const homeController = require("../controllers/home-controller.js");

router.route("/home").get(homeController.index);

module.exports = router;
