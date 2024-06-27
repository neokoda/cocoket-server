const prisma = require("../../db");

const createUser = async (userData) => {
  const user = await prisma.user.create({
    data: userData,
  });
  return user;
};

const findUserByUsername = async (username) => {
  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });
  return user;
};

const updateUserPoints = async (id, newPoints) => {
  const updatedUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      points: newPoints,
    },
  });
  return updatedUser;
};

module.exports = { findUserByUsername, createUser, updateUserPoints };
