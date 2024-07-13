const { MongoClient } = require('mongodb');
const assert = require('assert');
const dotenv = require('dotenv');

dotenv.config(); // Charger les variables d'environnement

// Connection URL
const url = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

let db;

const connectDB = async () => {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log("Connected successfully to server");
    db = client.db(dbName);
  } catch (err) {
    console.error("Failed to connect to the database", err);
    process.exit(1);
  }
};

const getDb = () => db;

module.exports = { connectDB, getDb };
