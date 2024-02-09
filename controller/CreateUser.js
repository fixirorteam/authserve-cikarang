const Users = require("../models/UserModels");
const argon2 = require("argon2");

const createEmailAndPasword = async (req, res, next) => {
    const { email, password } = req.body;
  const hashPassword = await argon2.hash(password);

  try {
    await Users.create({
      email,
      password: hashPassword,
    });
    res.status(201).json({
      msg: "Register Berhasil",
    });
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
  
};

const createNameAndRole = async (req, res) => {
    const { email, password, name, role } = req.body;
    const hashPassword = await argon2.hash(password);
  
    try {
      await Users.create({
        email,
        password: hashPassword,
        name,
        role,
      });
      res.status(201).json({
        msg: "Register Berhasil",
      });
    } catch (error) {
      res.status(400).json({
        msg: error.message,
      });
    }
};

module.exports = {
  createEmailAndPasword,
  createNameAndRole,
};
