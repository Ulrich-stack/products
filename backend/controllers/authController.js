const authService = require('../services/authService');

// Fonction pour enregistrer un nouvel utilisateur
const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Appel du service d'enregistrement d'utilisateur
    const user = await authService.register(email, password);
    // Réponse avec un statut 201 (Créé) et l'utilisateur créé
    res.status(201).json(user);
  } catch (error) {
    // En cas d'erreur, réponse avec un statut 400 (Bad Request) et le message d'erreur
    res.status(400).json({ message: error.message });
  }
};

// Fonction pour connecter un utilisateur existant
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Appel du service de connexion d'utilisateur
    const user = await authService.login(email, password);
    // Réponse avec l'utilisateur connecté
    res.json(user);
  } catch (error) {
    // En cas d'erreur, réponse avec un statut 401 (Non autorisé) et le message d'erreur
    res.status(401).json({ message: error.message });
  }
};

module.exports = { register, login };
