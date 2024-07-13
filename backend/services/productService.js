const { getDb } = require('../config/db');

const createProduct = async (productData) => {
  const db = getDb();
  const result = await db.collection('products').insertOne(productData);
  return result.ops[0];
};

const getProductById = async (id) => {
  const db = getDb();
  const product = await db.collection('products').findOne({ _id: id });
  return product;
};

const getAllProducts = async () => {
  const db = getDb();
  const products = await db.collection('products').find().toArray();
  return products;
};

const updateProduct = async (id, updates) => {
  const db = getDb();
  const result = await db.collection('products').findOneAndUpdate(
    { _id: parseInt(id) },
    { $set: updates },
    { returnOriginal: false }
  );
  return result.value;
};

const deleteProduct = async (id) => {
  const db = getDb();
  const result = await db.collection('products').findOneAndDelete({ _id: parseInt(id) });
  return result.value != null;
};

module.exports = { createProduct, getProductById, getAllProducts, updateProduct, deleteProduct };
