const router = require("express").Router();
const {
  getARandomUser,
  getAllUsers,
  saveAUser,
  updateUser,
  bulkUpdate,
  deleteUser,
} = require("../controllers/user.controller");
const {
  validateSaveUserRequest,
  isRequestValidated,
  validateUserId,
} = require("../middlewares/validators/user.validators");

router.get("/random", getARandomUser);
router.get("/all", getAllUsers);
router.post("/save", validateSaveUserRequest, isRequestValidated, saveAUser);
router.patch(
  "/update",
  validateUserId,
  updateUser
);
router.patch("/bulk-update", bulkUpdate);
router.delete("/delete", validateUserId, deleteUser);

module.exports = router;
