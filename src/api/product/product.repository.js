const prisma = require("../../db");

const findAllProducts = async () => {
  const productsWithStore = await prisma.product.findMany({
    include: {
      Store: true,
    },
  });
  return productsWithStore;
};

module.exports = {
  findAllProducts,
};
