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
  validateUpdateUserRequest,
} = require("../validators/user.validators");

router.get("/random", getARandomUser);
router.get("/all", getAllUsers);
router.post("/save", validateSaveUserRequest, isRequestValidated, saveAUser);
router.patch(
  "/update",
  validateUpdateUserRequest,
  isRequestValidated,
  updateUser
);
router.patch("/bulk-update", bulkUpdate);
router.delete("/delete", deleteUser);

module.exports = router;
