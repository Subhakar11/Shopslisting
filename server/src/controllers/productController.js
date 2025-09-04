import { validationResult } from 'express-validator';
import Product from '../models/Product.js';
import Shop from '../models/Shop.js';

export const createProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const { shopId, name, price, description } = req.body;
    const shop = await Shop.findOne({ _id: shopId, owner: req.user.id });
    if (!shop) return res.status(404).json({ message: 'Shop not found or not owner' });
    const imageUrl = req.file?.path || '';
    const product = await Product.create({ shop: shopId, name, price, description, imageUrl });
    res.status(201).json(product);
  } catch (e) {
    res.status(500).json({ message: 'Create product failed' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to load product" });
  }
};
export const updateProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const { name, price, description } = req.body;
    const updates = { name, price, description };
    if (req.file?.path) updates.imageUrl = req.file.path;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    const shop = await Shop.findOne({ _id: product.shop, owner: req.user.id });
    if (!shop) return res.status(403).json({ message: 'Not authorized' });

    const updated = await Product.findByIdAndUpdate(product._id, updates, { new: true });
    res.json(updated);
  } catch (e) {
    res.status(500).json({ message: 'Update product failed' });
  }
};
