const productRepository = require("./product.repository");
const utils = require("../../utils");

const getAllProducts = async () => {
  try {
    const products = await productRepository.findAllProducts();
    return products;
  } catch (error) {
    console.error("Gagal mengambil produk:", error);
    throw utils.customError("500", "Produk gagal diambil.");
  }
};

module.exports = {
  getAllProducts,
};
