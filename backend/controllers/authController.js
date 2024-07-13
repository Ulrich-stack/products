const authService = require('../services/authService');

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authService.register(email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authService.login(email, password);
    res.json(user);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = { register, login };
