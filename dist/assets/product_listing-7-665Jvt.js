import{r as c,l as i,a as o}from"./utils-DDBxLPIx.js";/* empty css              */import{P as n}from"./ProductData-DSud-SUY.js";function l(t){var a,r;const e=((a=t.Images)==null?void 0:a.PrimaryMedium)||"placeholder.jpg";return`
    <li class="product-card">
      <a href="/product_pages/product.html?product=${t.Id}">
        <img src="${e}" alt="Image of ${t.Name}">
        <h2 class="card__brand">${((r=t.Brand)==null?void 0:r.Name)||""}</h2>
        <h3 class="card__name">${t.Name}</h3>
        <p class="product-card__price">$${t.FinalPrice}</p>
      </a>
    </li>
  `}class d{constructor(e,a,r){this.category=e,this.dataSource=a,this.listElement=r}async init(){const e=await this.dataSource.getData(this.category);this.renderList(e)}renderList(e){c(l,this.listElement,e,"afterbegin",!0)}}i();const s=o("category")||"tents";document.querySelector(".title").textContent=`Top Products: ${s.replace("-"," ")}`;const m=new n,u=document.querySelector(".product-list"),h=new d(s,m,u);h.init();
