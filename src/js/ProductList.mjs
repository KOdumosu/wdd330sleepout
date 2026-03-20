import { renderListWithTemplate } from "./utils.mjs";

// TEMPLATE FUNCTION
function productCardTemplate(product) {
  // Use PrimaryMedium image for the listing
  const imageUrl = product.Images?.PrimaryMedium || "placeholder.jpg"; 

  return `
    <li class="product-card">
      <a href="/product_pages/product.html?product=${product.Id}">
        <img src="${imageUrl}" alt="Image of ${product.Name}">
        <h2 class="card__brand">${product.Brand?.Name || ""}</h2>
        <h3 class="card__name">${product.Name}</h3>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
  `;
}

// PRODUCT LIST CLASS
export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    // Pass the category to getData()
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
  }
}