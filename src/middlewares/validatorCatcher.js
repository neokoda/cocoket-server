const { validationResult } = require("express-validator");
const utils = require("../utils");

const validatorCatcher = (req, res, next) => {
  const errorValidator = validationResult(req, { strictParams: ["body"] });
  if (!errorValidator.isEmpty()) {
    return utils.apiResponse(422, req, res, {
      status: false,
      message: errorValidator.array()[0].msg
    });
  }

  next();
};

module.exports = validatorCatcher;