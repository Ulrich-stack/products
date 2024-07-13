const { getDb } = require('../config/db');

// Fonction pour créer un nouveau produit
const createProduct = async (productData) => {
  const db = getDb();
  // Insérer le produit dans la collection 'products'
  const result = await db.collection('products').insertOne(productData);
  // Retourner le produit inséré
  return result.ops[0];
};

// Fonction pour obtenir un produit par son identifiant
const getProductById = async (id) => {
  const db = getDb();
  // Trouver le produit avec l'identifiant donné
  const product = await db.collection('products').findOne({ _id: id });
  // Retourner le produit trouvé
  return product;
};

// Fonction pour obtenir tous les produits
const getAllProducts = async () => {
  const db = getDb();
  // Trouver tous les produits dans la collection 'products'
  const products = await db.collection('products').find().toArray();
  // Retourner tous les produits trouvés
  return products;
};

// Fonction pour mettre à jour un produit par son identifiant
const updateProduct = async (id, updates) => {
  const db = getDb();
  // Mettre à jour le produit avec les nouvelles données
  const result = await db.collection('products').findOneAndUpdate(
    { _id: parseInt(id) },
    { $set: updates },
    { returnOriginal: false } // Retourner le document mis à jour
  );
  // Retourner le produit mis à jour
  return result.value;
};

// Fonction pour supprimer un produit par son identifiant
const deleteProduct = async (id) => {
  const db = getDb();
  // Supprimer le produit de la collection 'products'
  const result = await db.collection('products').findOneAndDelete({ _id: parseInt(id) });
  // Retourner vrai si le produit a été supprimé, faux sinon
  return result.value != null;
};

module.exports = { createProduct, getProductById, getAllProducts, updateProduct, deleteProduct };
