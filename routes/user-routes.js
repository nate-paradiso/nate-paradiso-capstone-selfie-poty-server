const router = require("express").Router();
const userController = require("../controllers/user-controller");

router.route("/").get(userController.index).post(userController.add);
router
  .route("/:id")
  .get(userController.getUserId)
  .patch(userController.update)
  .delete(userController.remove);

module.exports = router;
