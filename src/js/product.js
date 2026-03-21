// src/js/product.js
import { getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';

// Get product ID from URL query string
const productId = getParam('product');

// Create data source
const dataSource = new ProductData('tents');

// Initialize ProductDetails
const product = new ProductDetails(productId, dataSource);
product.init();