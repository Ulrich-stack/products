const { getDb } = require('../config/db');

// Fonction pour obtenir le prochain identifiant disponible
const getNextId = async () => {
  const db = getDb();
  const lastProduct = await db.collection('products').find().sort({ _id: -1 }).limit(1).toArray();
  return lastProduct.length > 0 ? lastProduct[0]._id + 1 : 1;
};

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

const addProduct = async (req, res) => {
    const { name, type, price, rating, warranty_years, available } = req.body;
  
    if (!name || !type || !price || !rating || !warranty_years || available === undefined) {
      return res.status(400).send({ message: 'All fields are required' });
    }
  
    const db = getDb();
  
    try {
      const id = await getNextId();
      const result = await db.collection('products').insertOne({
        _id: id,
        name,
        type,
        price,
        rating,
        warranty_years,
        available,
      });
      const insertedProduct = await db.collection('products').findOne({ _id: id });
      res.status(201).json(insertedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  };
  
  const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, type, price, rating, warranty_years, available } = req.body;
  
    if (!name || !type || !price || !rating || !warranty_years || available === undefined) {
      return res.status(400).send({ message: 'All fields are required' });
    }
  
    const db = getDb();
  
    try {
      const result = await db.collection('products').findOneAndUpdate(
        { _id: parseInt(id) },
        { $set: { name, type, price, rating, warranty_years, available } },
        { returnDocument: 'after' }
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
  
  const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const db = getDb();
  
    try {
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
