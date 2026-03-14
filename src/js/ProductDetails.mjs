// src/js/ProductDetails.mjs
import { setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // Get product details
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();

    // Add listener to "Add to Cart" button
    const btn = document.getElementById('addToCart');
    if (btn) {
      btn.addEventListener('click', this.addProductToCart.bind(this));
    }
  }

  renderProductDetails() {
    if (!this.product) return;

    // Update page elements dynamically
    document.querySelector('.product-detail h3').textContent = this.product.Brand.Name;
    document.querySelector('.product-detail h2').textContent = this.product.Name;
    document.querySelector('.product-detail img').src = this.product.Image;
    document.querySelector('.product-detail img').alt = `Image of ${this.product.Name}`;
    document.querySelector('.product-card__price').textContent = `$${this.product.FinalPrice}`;
    document.querySelector('.product__color').textContent = this.product.Color || '';
    document.querySelector('.product__description').textContent = this.product.Description || '';

    // Update button data-id
    const btn = document.getElementById('addToCart');
    if (btn) btn.dataset.id = this.product.Id;
  }

  addProductToCart() {
    // Get current cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(this.product);
    setLocalStorage('cart', cart);
    alert(`${this.product.Name} added to cart!`);
  }
}