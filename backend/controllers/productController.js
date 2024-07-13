const { getDb } = require('../config/db');

// Fonction pour obtenir le prochain identifiant disponible
const getNextId = async () => {
  const db = getDb();
  const lastProduct = await db.collection('products').find().sort({ _id: -1 }).limit(1).toArray();
  return lastProduct.length > 0 ? lastProduct[0]._id + 1 : 1;
};

// Fonction pour obtenir tous les produits
const getProducts = async (req, res) => {
  const db = getDb();
  try {
    const products = await db.collection('products').find().toArray();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

// Fonction pour ajouter un nouveau produit
const addProduct = async (req, res) => {
  const { name, type, price, rating, warranty_years, available } = req.body;

  // Vérifier si tous les champs sont présents
  if (!name || !type || !price || !rating || !warranty_years || available === undefined) {
    return res.status(400).send({ message: 'All fields are required' });
  }

  const db = getDb();

  try {
    // Obtenir le prochain identifiant disponible
    const id = await getNextId();
    // Insérer le nouveau produit dans la base de données
    const result = await db.collection('products').insertOne({
      _id: id,
      name,
      type,
      price,
      rating,
      warranty_years,
      available,
    });
    // Obtenir le produit inséré pour le renvoyer dans la réponse
    const insertedProduct = await db.collection('products').findOne({ _id: id });
    res.status(201).json(insertedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

// Fonction pour mettre à jour un produit existant
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, type, price, rating, warranty_years, available } = req.body;

  // Vérifier si tous les champs sont présents
  if (!name || !type || !price || !rating || !warranty_years || available === undefined) {
    return res.status(400).send({ message: 'All fields are required' });
  }

  const db = getDb();

  try {
    // Mettre à jour le produit dans la base de données
    const result = await db.collection('products').findOneAndUpdate(
      { _id: parseInt(id) },
      { $set: { name, type, price, rating, warranty_years, available } },
      { returnDocument: 'after' } // Retourner le document après mise à jour
    );
    if (!result.value) {
      console.log(`Product with id ${id} not found`);
      return res.status(404).send({ message: 'Product not found' });
    }
    console.log(`Product with id ${id} updated successfully`, result.value);
    res.json(result.value);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

// Fonction pour supprimer un produit existant
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const db = getDb();

  try {
    // Supprimer le produit de la base de données
    const result = await db.collection('products').findOneAndDelete({ _id: parseInt(id) });
    if (!result.value) {
      return res.status(404).send({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
