const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config(); // Charger les variables d'environnement

// URL de connexion à MongoDB
const url = process.env.MONGODB_URI;
// Nom de la base de données
const dbName = process.env.DB_NAME;

let db; // Variable pour stocker la connexion à la base de données

// Fonction pour se connecter à la base de données
const connectDB = async () => {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    // Essayer de se connecter au serveur MongoDB
    await client.connect();
    console.log("Connected successfully to server");
    db = client.db(dbName); // Assigner la connexion de la base de données à la variable db
  } catch (err) {
    // En cas d'erreur, afficher le message d'erreur et terminer le processus
    console.error("Failed to connect to the database", err);
    process.exit(1);
  }
};

// Fonction pour obtenir l'objet de la base de données
const getDb = () => db;

module.exports = { connectDB, getDb };
