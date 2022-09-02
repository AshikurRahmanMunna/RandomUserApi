const fs = require("fs");
const path = require("path");
const { check, validationResult } = require("express-validator");
const parseJsonFromFs = require("../../utilities/parseJsonFromFs");
const userFilePath = path.join(__dirname, "..", "..", "users.json");
exports.validateSaveUserRequest = [
  check("name").notEmpty().withMessage("name is required"),
  check("gender").notEmpty().withMessage("gender is required"),
  check("contact").notEmpty().withMessage("contact is required"),
  check("address").notEmpty().withMessage("address is required"),
  check("photoURL").notEmpty().withMessage("photoURL is required"),
];

exports.validateUserId = (req, res, next) => {
  if (!req.body.id) {
    return res.status(400).json({ error: "Id is required" });
  } else {
    fs.readFile(userFilePath, (err, data) => {
      if (err) {
        return res.status(400).json({
          success: false,
          error: "Something went wrong",
        });
      }
      if (data) {
        const users = parseJsonFromFs(data);
        const userById = users.find((user) => user.id === req.body.id);
        if (userById) {
          next();
        } else {
          return res
            .status(400)
            .json({ success: false, error: "No User Exists By This Id" });
        }
      }
    });
  }
};

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
