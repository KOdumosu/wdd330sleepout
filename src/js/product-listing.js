import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

// Load header and footer
loadHeaderFooter();

// Get category from URL, default to 'tents' if missing
const category = getParam('category') || 'tents';

// Update page title to include category
document.querySelector('.title').textContent = `Top Products: ${category.replace('-', ' ')}`;

// Create data source and list element
const dataSource = new ProductData();
const listElement = document.querySelector('.product-list');

// Create product list instance and initialize
const myList = new ProductList(category, dataSource, listElement);
myList.init();