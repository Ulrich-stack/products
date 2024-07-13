const { getDb } = require('../config/db');
const User = require('../models/user');
const generateToken = require('../utils/generateToken');

// Fonction pour enregistrer un nouvel utilisateur
const register = async (email, password) => {
  const db = getDb();
  const userModel = new User(db);

  // Vérifier si l'utilisateur existe déjà
  const userExists = await userModel.findUserByEmail(email);
  if (userExists) {
    throw new Error('User already exists'); // Lancer une erreur si l'utilisateur existe déjà
  }

  // Créer un nouvel utilisateur
  const user = await userModel.createUser(email, password);
  // Retourner les informations de l'utilisateur avec un token
  return {
    _id: user._id,
    email: user.email,
    token: generateToken(user._id),
  };
};

// Fonction pour connecter un utilisateur existant
const login = async (email, password) => {
  const db = getDb();
  const userModel = new User(db);

  // Trouver l'utilisateur par email
  const user = await userModel.findUserByEmail(email);

  // Vérifier si le mot de passe est correct
  if (user && await userModel.comparePassword(password, user.password)) {
    // Retourner les informations de l'utilisateur avec un token
    return {
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    };
  } else {
    throw new Error('Invalid email or password'); // Lancer une erreur si l'email ou le mot de passe est incorrect
  }
};

module.exports = { register, login };
