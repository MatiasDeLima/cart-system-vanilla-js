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

const cart = document.getElementById('cart');
const cartButton = document.getElementById('cart-button');
const cartClose = document.getElementById('cart-close');

if(cartButton) {
    cartButton.addEventListener('click', () => {
        cart.classList.add('show-cart');
    })
}

if(cartClose) {
    cartClose.addEventListener('click', () => {
        cart.classList.remove('show-cart');
    })
}

const scrollHeader = () => {
  const header = document.getElementById('header');

  this.scrollY >= 50 ? header.classList.add('scroll-header')
                     : header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader);

const productList = document.getElementById('product-list');

function loadJSON() {
  fetch('furniture.json')
  .then(Response => Response.json())
  .then(data => {
    let html = '';
    data.forEach(product => {
      html += `
          <article class="furniture__card">
              <img src="${product.imgSrc}" alt="card image" class="furniture__card-img"/>
              <h4 class="furniture__card-name">${product.name}</h4>
              <p class="furniture__card-category">${product.category}</p>
              <span class="furniture__card-price">$${product.price}</span>
              <button class="button">
                <i class="ri-briefcase-line"></i>
              </button>
          </article>
      `;
    });
    productList.innerHTML = html;
  })
  .catch(err => {
    alert(`User live server or local server`);
  })
}

loadJSON();