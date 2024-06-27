const express = require("express");
const productService = require("./product.service");
const utils = require("../../utils");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    return utils.apiResponse(200, req, res, {
      status: true,
      message: "Produk berhasil didapatkan.",
      body: products,
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
        message: err.message ? err.message : "Terjadi sebuah kesalahan.",
      });
    }
  }
});

module.exports = router;
