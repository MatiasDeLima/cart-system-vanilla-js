function menuEvent() {
  const navMenu = document.getElementById("nav-menu");
  const navToggle = document.getElementById("nav-toggle");
  const navClose = document.getElementById("nav-close");

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.add("show-menu");
    });
  }

  if (navClose) {
    navClose.addEventListener("click", () => {
      navMenu.classList.remove("show-menu");
    });
  }

  const navLink = document.querySelectorAll(".nav__link");

  const linkAction = () => {
    navMenu.classList.remove("show-menu");
  };

  navLink.forEach((n) => n.addEventListener("click", linkAction));
}

menuEvent();

const cart = document.getElementById("cart");
const cartButton = document.getElementById("cart-button");
const cartClose = document.getElementById("cart-close");

if (cartButton) {
  cartButton.addEventListener("click", () => {
    cart.classList.add("show-cart");
  });
}

if (cartClose) {
  cartClose.addEventListener("click", () => {
    cart.classList.remove("show-cart");
  });
}

const scrollHeader = () => {
  const header = document.getElementById("header");

  this.scrollY >= 50
    ? header.classList.add("scroll-header")
    : header.classList.remove("scroll-header");
};
window.addEventListener("scroll", scrollHeader);

const productList = document.getElementById("product-list");
const cartList = document.querySelector(".cart__content");
const cartTotalValue = document.getElementById('cart-total-value');
const cartCountInfo = document.getElementById('cart-count-info');
let cartItemID = 1;

loadJSON();
loadCart();

// add to cart
productList.addEventListener('click', purchaseProduct);

// delete from cart
cartList.addEventListener('click', deleteProduct);

// update cart info
function updateCartInfo(){
  let cartInfo = findCartInfo();
  // console.log(cartInfo)
  cartCountInfo.textContent = cartInfo.productCount; // classes para aparecer o total na tela no icone
  cartTotalValue.textContent = cartInfo.total; // classe para aparecer na tela total
}

// first function
function loadJSON() {
  fetch("furniture.json")
    .then((Response) => Response.json())
    .then((data) => {
      let html = "";
      data.forEach((product) => {
        html += `
          <article class="furniture__card">
              <img src="${product.imgSrc}" alt="card image" class="furniture__card-img"/>
              <h4 class="furniture__card-name">${product.name}</h4>
              <p class="furniture__card-category">${product.category}</p>
              <span class="furniture__card-price">$${product.price}</span>
              <button type="button" class="button add-cart-btn">
                <i class="ri-briefcase-line add-cart-btn"></i>
              </button>
          </article>
      `;
      });
      productList.innerHTML = html;
    })
    .catch((err) => {
      alert(`User live server or local server`);
    });
}

// 2 function
function purchaseProduct(e) {
  // console.log(e.target)
  if(e.target.classList.contains('add-cart-btn')){
    // console.log(e.target)
    let product = e.target.parentElement.parentElement;
    // console.log(product)
    getProductInfo(product);
  }
}

// get product info after add to cart button click
function getProductInfo(product){
  let productInfo = {
      id: cartItemID,
      imgSrc: product.querySelector('.furniture__card img').src,
      name: product.querySelector('.furniture__card-name').textContent,
      category: product.querySelector('.furniture__card-category').textContent,
      price: product.querySelector('.furniture__card-price').textContent
  }
  cartItemID++;
  // console.log(producInfo)
  addToCartList(productInfo);
  saveProductInStorage(productInfo);
}

// 4 function
function addToCartList(product) {
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart__card");
  cartItem.setAttribute("data-id", `${product.id}`);
  cartItem.innerHTML = `
      <div class="cart__card-content">
        <img src="${product.imgSrc}" alt="cart image">
        <div class="card__content-data">
          <h2 class="card__content-title">${product.name}</h2>
          <p class="card__content-category">${product.category}</p>
          <h4 class="card__content-price">${product.price}</h4>
        </div>
      </div>

      <div class="cart__card-actions">
        <button type="button" class="cart-remove-button">Remove</button>

        <div class="cart__card-btns">
          <button class="subtract__button">
            <i class="ri-subtract-line"></i>
          </button>
          <span class="cart__number">0</span>
          <button class="add__button">
            <i class="ri-add-line"></i>
          </button>
        </div>
      </div>
  `;
  cartList.appendChild(cartItem);
}

// save the product in the local storage
function saveProductInStorage(item){
  let products = getProductFromStorage();
  // console.log(products)
  products.push(item);
  localStorage.setItem('products', JSON.stringify(products));
  updateCartInfo();
  // see in console "application" => "Local Storage"
}

// get all the products info if there is any in the local storage
function getProductFromStorage(){
  return localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
  // returns empty array if there isn't any product info
}

// load carts product pega do local storage e mostra no cart
function loadCart(){
  let products = getProductFromStorage();
  if(products.length < 1){
      cartItemID = 1; // if there is no any product in the local storage
  } else {
      cartItemID = products[products.length - 1].id;
      cartItemID++;
      // else get the id of the last product and increase it by 1
  }
  //console.log(cartItemID)
  products.forEach(product => addToCartList(product));

  // calculate and update UI of cart info 
  updateCartInfo();
}

// calculate total price of the cart and other info
function findCartInfo(){
  let products = getProductFromStorage();
  // console.log(products)
  let total = products.reduce((acc, product) => {
      let price = parseFloat(product.price.substr(1)); // removing dollar sign
      return acc += price;
  }, 0); // adding all the prices
  // console.log(total)
  return{
    total: total.toFixed(2),
    productCount: products.length
  }
}

// delete product from cart list and local storage
function deleteProduct(e){
  let cartItem;
  if(e.target.tagName === "BUTTON"){
      cartItem = e.target.parentElement; // erro element
      cartItem.remove(); // this removes from the DOM only
  } else if(e.target.tagName === "I"){
      cartItem = e.target.parentElement.parentElement; // erro element
      cartItem.remove(); // this removes from the DOM only
  }

  let products = getProductFromStorage();
  let updatedProducts = products.filter(product => {
      return product.id !== parseInt(cartItem.dataset.id);
  });
  localStorage.setItem('products', JSON.stringify(updatedProducts)); // updating the product list after the deletion
  updateCartInfo();
}