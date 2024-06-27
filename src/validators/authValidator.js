const { check } = require("express-validator");

const register = [
  // fullName validation
  check("fullName")
    .notEmpty()
    .withMessage("Nama lengkap harus diisi.")
    .isLength({ min: 4, max: 80 })
    .withMessage("Nama lengkap harus memiliki 4-80 karakter.")
    .matches(/^[a-zA-Z0-9 ]+$/)
    .withMessage("Nama lengkap hanya boleh mengandung huruf, angka, dan spasi."),
  
  // password validation
  check("password")
    .notEmpty()
    .withMessage("Password harus diisi.")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password harus memiliki 8-20 karakter.")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9@$!%*?&]+$/)
    .withMessage("Password harus mengandung setidaknya satu huruf besar, satu huruf kecil, dan satu angka.")
    .trim()
    .escape(),
  
  // birthDate validation
  check("birthDate")
    .notEmpty()
    .withMessage("Tanggal lahir harus diisi.")
    .isISO8601()
    .withMessage("Tanggal lahir harus dalam format tanggal YYYY-MM-DD.")
    .toDate(),

  // address validation
  check("address")
    .notEmpty()
    .withMessage("Alamat harus diisi."),

  // username validation
  check("username")
    .notEmpty()
    .withMessage("Username harus diisi.")
    .isLength({ min: 3, max: 20 })
    .withMessage("Username harus memiliki 3-20 karakter.")
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage("Username hanya boleh mengandung huruf, angka, dan garis bawah."),
];

const login = [
  check("username")
    .notEmpty()
    .withMessage("Username harus diisi."),
  check("password")
    .notEmpty()
    .withMessage("Password harus diisi.")
    .trim()
    .escape(),
];

module.exports = { register, login };
