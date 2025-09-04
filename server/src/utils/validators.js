import { body } from 'express-validator';

export const registerValidators = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password min 6 chars')
];

export const loginValidators = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password is required')
];

export const shopValidators = [
  body('name').trim().notEmpty().withMessage('Shop name required'),
  body('description').optional().isString()
];

export const productValidators = [
  body('shopId').trim().notEmpty().withMessage('shopId required'),
  body('name').trim().notEmpty().withMessage('Product name required'),
  body('price').isFloat({ gt: -1 }).withMessage('Price must be >= 0'),
  body('description').optional().isString()
];
