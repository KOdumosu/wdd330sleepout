import ProductData from './ProductData.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

// Load header and footer
loadHeaderFooter();

// Get product ID from URL
const productId = getParam('product');

if (!productId) {
  document.querySelector('.product-detail').innerHTML = "<p>Product not found.</p>";
} else {
  const dataSource = new ProductData();

  async function displayProduct() {
    try {
      // Get all products in all categories (or adapt as needed)
      const allCategories = ['tents','backpacks','sleeping-bags','hammocks'];
      let product;

      for (const category of allCategories) {
        const products = await dataSource.getData(category);
        product = products.find(p => p.Id === productId);
        if (product) break;
      }

      if (!product) {
        document.querySelector('.product-detail').innerHTML = "<p>Product not found.</p>";
        return;
      }

      // Fill in details
      const img = document.querySelector('.product-detail__image');
      img.src = product.Images?.PrimaryLarge || 'placeholder.jpg';
      img.alt = `Image of ${product.Name}`;

      document.querySelector('.product-detail__brand').textContent = product.Brand?.Name || '';
      document.querySelector('.product-detail__name').textContent = product.Name;
      document.querySelector('.product-detail__price').textContent = `$${product.FinalPrice}`;
      document.querySelector('.product-detail__description').textContent = product.Description || '';

      document.querySelector('.product-detail__title').textContent = `${product.Name} | Sleep Outside`;
    } catch (err) {
      console.error(err);
      document.querySelector('.product-detail').innerHTML = "<p>Error loading product.</p>";
    }
  }

  displayProduct();
}