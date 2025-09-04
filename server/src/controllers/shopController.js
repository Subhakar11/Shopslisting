import { validationResult } from 'express-validator';
import Shop from '../models/Shop.js';
import Product from '../models/Product.js';
import cloudinary from "../config/cloudinary.js";
export const createShop = async (req, res) => {
  try {
    let imageUrl = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "shops",
      });
      imageUrl = result.secure_url; 
      console.log("Uploaded shop image:", imageUrl);
    }

    const shop = new Shop({
      name: req.body.name,
      description: req.body.description,
      imageUrl: imageUrl, 
      owner: req.user.id, 
    });

    await shop.save();
    res.json(shop);
  } catch (err) {
    console.error("Create Shop Error:", err);
    res.status(500).json({ message: "Failed to create shop" });
  }
};


export const updateShop = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const { name, description } = req.body;
    const updates = { name, description };
    if (req.file?.path) updates.imageUrl = req.file.path;
    const shop = await Shop.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      updates,
      { new: true }
    );
    if (!shop) return res.status(404).json({ message: 'Shop not found' });
    res.json(shop);
  } catch (e) {
    res.status(500).json({ message: 'Update shop failed' });
  }
};

export const listShops = async (req, res) => {
  try {
    const includeProducts = String(req.query.includeProducts || 'false') === 'true';
    if (!includeProducts) {
      const shops = await Shop.find().sort({ createdAt: -1 });
      return res.json(shops);
    }
    const shops = await Shop.find().sort({ createdAt: -1 }).lean();
    const shopIds = shops.map(s => s._id);
    const products = await Product.find({ shop: { $in: shopIds } }).lean();
    const productsByShop = products.reduce((acc, p) => {
      const id = String(p.shop);
      acc[id] = acc[id] || [];
      acc[id].push(p);
      return acc;
    }, {});
    const result = shops.map(s => ({ ...s, products: productsByShop[String(s._id)] || [] }));
    res.json(result);
  } catch (e) {
    res.status(500).json({ message: 'List shops failed' });
  }
};

export const getShop = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id).lean();
    if (!shop) return res.status(404).json({ message: 'Shop not found' });
    const products = await Product.find({ shop: shop._id }).sort({ createdAt: -1 }).lean();
    res.json({ ...shop, products });
  } catch (e) {
    res.status(500).json({ message: 'Get shop failed' });
  }
};
