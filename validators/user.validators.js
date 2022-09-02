const { check, validationResult } = require("express-validator");
exports.validateSaveUserRequest = [
  check("name").notEmpty().withMessage("name is required"),
  check("gender").notEmpty().withMessage("gender is required"),
  check("contact").notEmpty().withMessage("contact is required"),
  check("address").notEmpty().withMessage("address is required"),
  check("photoURL").notEmpty().withMessage("photoURL is required"),
];

exports.validateUpdateUserRequest = [
  check("id").notEmpty().withMessage("Id is required"),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
