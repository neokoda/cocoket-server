const bcrypt = require("bcryptjs");
const utils = require("../../utils");
const authRepository = require("./auth.repository");
const jwt = require("jsonwebtoken");

const register = async (userData) => {
  try {
    const username = await authRepository.findUserByUsername(userData.username);
    if (username) {
      throw utils.customError("400", "Username sudah dipakai.");
    }

    const hashedPassword = bcrypt.hashSync(userData.password);

    const userHashed = {
      ...userData,
      password: hashedPassword,
    };

    const newUser = await authRepository.createUser(userHashed);

    if (!newUser) {
      throw utils.customError("400", "Registrasi akun baru gagal.");
    }

    return newUser;
  } catch (err) {
    if (err.isCustomError) {
      throw err;
    }
    throw new Error(err);
  }
};

const login = async (incomingUser) => {
  try {
    const userData = await getUserByUsername(incomingUser.username);

    if (!bcrypt.compareSync(incomingUser.password, userData.password)) {
      throw utils.customError("401", "Password salah.");
    } else {
      const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET);
      return accessToken;
    }
  } catch (err) {
    if (err.isCustomError) {
      throw err;
    }
    throw new Error(err);
  }
};

const getUserByUsername = async (username) => {
  const user = await authRepository.findUserByUsername(username);
  if (!user) {
    throw utils.customError("404", "Pengguna tidak ditemukan.");
  }
  return user;
};

const updateUserPoints = async (id, newPoints) => {
  try {
    const updatedUser = await authRepository.updateUserPoints(id, newPoints);
    if (!updatedUser) {
      throw utils.customError("400", "Gagal memperbarui poin pengguna.");
    }
    return updatedUser;
  } catch (err) {
    if (err.isCustomError) {
      throw err;
    }
    throw new Error(err);
  }
};

module.exports = { register, getUserByUsername, login, updateUserPoints };
