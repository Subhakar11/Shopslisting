import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
import { createShop, updateShop, listShops, getShop } from '../controllers/shopController.js';
import { shopValidators } from '../utils/validators.js';

const router = Router();
router.get('/', listShops);
router.get('/:id', getShop);
router.post('/', auth, upload.single('image'), shopValidators, createShop);
router.put('/:id', auth, upload.single('image'), shopValidators, updateShop);
export default router;
