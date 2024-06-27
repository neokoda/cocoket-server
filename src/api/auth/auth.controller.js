const express = require("express");
const authService = require("./auth.service");
const authValidator = require("../../validators/authValidator");
const validatorCatcher = require("../../middlewares/validatorCatcher");
const authenticateToken = require("../../middlewares/authenticateToken");
const utils = require("../../utils");

const router = express.Router();

router.post(
    "/register",
    authValidator.register,
    validatorCatcher,
    async (req, res) => {
      try {
        const sanitizeUser = {
          full_name: req.body.fullName,
          birth_date: new Date(req.body.birthDate),
          address: req.body.address,
          username: req.body.username,
          password: req.body.password,
          points: 0,
        };

        const newUser = await authService.register(sanitizeUser);
        return utils.apiResponse(201, req, res, {
          status: true,
          message: "Pengguna berhasil terdaftar. ",
          body: newUser,
        });

      } catch (err) {
        if (err.isCustomError) {
          return utils.apiResponse(err.statusCode, req, res, {
            status: false,
            message: err.message,
          });
        } else {
          return utils.apiResponse("500", req, res, {
            status: false,
            message: err.message ? err.message : "Terjadi kesalahan. ",
          });
        }
      }
    }
  );
  
router.post(
  "/login",
  authValidator.login,
  validatorCatcher,
  async (req, res) => {
  try {
    const sanitizeUser = {
      username: req.body.username,
      password: req.body.password,
    };

    const accessToken = await authService.login(sanitizeUser);

    return utils.apiResponse(200, req, res, {
      status: true,
      message: "Berhasil log in. ",
      body: { accessToken : accessToken},
    });

    } catch (err) {
    if (err.isCustomError) {
      return utils.apiResponse(err.statusCode, req, res, {
        status: false,
        message: err.message,
      });
    } else {
      return utils.apiResponse(500, req, res, {
        status: false,
        message: err.message ? err.message : "Terjadi kesalahan. ",
      });
    }
  }
});

router.get(
  "/login",
  authenticateToken,
  async (req, res) => {
    try {
        return utils.apiResponse(200, req, res, {
          status: true,
          message: "Informasi pengguna berhasil didapatkan. ",
          body: req.user,
        })

      } catch (err) {
        if (err.isCustomError) {
          return utils.apiResponse(err.statusCode, req, res, {
            status: false,
            message: err.message,
          });
        } else {
          return utils.apiResponse(500, req, res, {
            status: false,
            message: err.message ? err.message : "Terjadi kesalahan. ",
          });
        }
    }
  }
);

router.get(
  "/user",
  async (req, res) => {
    try {
      const username = req.query.username;
      if (!username) {
        return utils.apiResponse(400, req, res, {
          status: false,
          message: "Username diperlukan. ",
        });
      }

      const user = await authService.getUserByUsername(username);

      return utils.apiResponse(200, req, res, {
        status: true,
        message: "Informasi pengguna berhasil didapatkan. ",
        body: user,
      });

    } catch (err) {
      if (err.isCustomError) {
        return utils.apiResponse(err.statusCode, req, res, {
          status: false,
          message: err.message,
        });
      } else {
        return utils.apiResponse(500, req, res, {
          status: false,
          message: err.message ? err.message : "Terjadi kesalahan. ",
        });
      }
    }
  }
);

router.patch(
  "/userPoints",
  async (req, res) => {
    try {
      const { id, pointsToAdd } = req.body;

      if (!id || !pointsToAdd || isNaN(pointsToAdd)) {
        return utils.apiResponse(400, req, res, {
          status: false,
          message: "Data tidak valid.",
        });
      }

      const updatedUser = await authService.updateUserPoints(
        id,
        parseInt(pointsToAdd)
      );

      return utils.apiResponse(200, req, res, {
        status: true,
        message: "Poin user berhasil diperbarui.",
        body: updatedUser,
      });
    } catch (err) {
      if (err.isCustomError) {
        return utils.apiResponse(err.statusCode, req, res, {
          status: false,
          message: err.message,
        });
      } else {
        return utils.apiResponse(500, req, res, {
          status: false,
          message: err.message ? err.message : "Terjadi kesalahan.",
        });
      }
    }
  }
);

module.exports = router;