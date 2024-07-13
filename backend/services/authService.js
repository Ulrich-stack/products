const { getDb } = require('../config/db');
const User = require('../models/user');
const generateToken = require('../utils/generateToken');

const register = async (email, password) => {
  const db = getDb();
  const userModel = new User(db);
  const userExists = await userModel.findUserByEmail(email);

  if (userExists) {
    throw new Error('User already exists');
  }

  const user = await userModel.createUser(email, password);
  return {
    _id: user._id,
    email: user.email,
    token: generateToken(user._id),
  };
};

const login = async (email, password) => {
  const db = getDb();
  const userModel = new User(db);
  const user = await userModel.findUserByEmail(email);

  if (user && await userModel.comparePassword(password, user.password)) {
    return {
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    };
  } else {
    throw new Error('Invalid email or password');
  }
};

module.exports = { register, login };
