const menuIcon = document.querySelector(".hamburger-container");
const backdrop = document.querySelector(".backdrop");
const nav = document.querySelector("nav");
const closeIcon = document.querySelector(".close-icon");
const mainImages = document.querySelectorAll(".images-container .main-img");
const thumbnails = document.querySelectorAll(".images-container .thumbnails button img");
const lightboxMainImages = document.querySelectorAll(".lightbox .main-img img");
const lightboxThumbnails = document.querySelectorAll(".lightbox .thumbnails button");
const lightbox = document.querySelector(".lightbox");
const iconClose = document.querySelector(".icon-close");
const iconPrev = document.querySelector(".icon-prev");
const iconNext = document.querySelector(".icon-next");
const countEl = document.querySelector(".count");
const minus = document.querySelector(".minus");
const plus = document.querySelector(".plus");
const cartIcon = document.querySelector(".cart svg");
const cartContainer = document.querySelector(".cart-container");
const addToCartBtn = document.querySelector(".add-to-cart-btn");
const cartItems = document.querySelector(".cart-items");
const checkout = document.querySelector(".checkout");
const cartCount = document.querySelector(".cart-count");
const cartEmpty = document.querySelector(".cart-empty");

menuIcon.addEventListener("click", () => {
  backdrop.classList.remove("hidden");
  nav.classList.remove("hidden");
});

closeIcon.addEventListener("click", () => {
  backdrop.classList.add("hidden");
  nav.classList.add("hidden");
});

backdrop.addEventListener("click", () => {
  backdrop.classList.add("hidden");
  nav.classList.add("hidden");
});


//lightbox and main image logic

let currentImageIndex = 0;

const changeImage = (index, mainImages, thumbnails) => {
  mainImages.forEach((img) => {
    img.classList.add("hidden");
  });

  mainImages[index].classList.remove("hidden");
  thumbnails[index].classList.remove("hidden");
  currentImageIndex = index;
};

thumbnails.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    changeImage(index, mainImages, thumbnails);
  });
});

lightboxThumbnails.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    changeImage(index, lightboxMainImages, lightboxThumbnails);
  });
});

mainImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    lightbox.classList.remove("xl:hidden");
    lightbox.classList.add("xl:grid");
    changeImage(index, lightboxMainImages, lightboxThumbnails);
  });
});

iconPrev.addEventListener("click", () => {
    if (currentImageIndex <= 0) {
      changeImage(mainImages.length - 1, lightboxMainImages, lightboxThumbnails);
    } else {
      changeImage(currentImageIndex - 1, lightboxMainImages, lightboxThumbnails);
    }
  });
  
  iconNext.addEventListener("click", () => {
    if (currentImageIndex >= mainImages.length - 1) {
      changeImage(0, lightboxMainImages, lightboxThumbnails);
    } else {
      changeImage(currentImageIndex + 1, lightboxMainImages, lightboxThumbnails);
    }
  });
  
  iconClose.addEventListener("click", () => {
    lightbox.classList.add("xl:hidden");
  });

//cart logic

let count = 0;
let totalCartQty = 0;

const updateCount = (newCount) => {
  count = newCount;
  countEl.textContent = count;
};

minus.addEventListener("click", () => {
  if (count > 0) {
    updateCount(count - 1);
  }
});

plus.addEventListener("click", () => {
  updateCount(count + 1);
});

cartIcon.addEventListener("click", () => {
  cartContainer.classList.toggle("hidden");
  cartContainer.classList.toggle("flex");
});



const addItemToCart = (name, price, imageSrc) => {
  totalCartQty+=count
  cartCount.innerHTML = `<span class="qty text-white text-[10px] font-bold">${totalCartQty}</span>`;
  const totalPrice = count * price;
  cartItems.replaceChildren();
  let cartItem = document.createElement("div");
  cartItem.className = "cart-item flex justify-between items-center w-full";
  cartItem.dataset.quantity = count;
  cartItem.innerHTML = `<img class="size-[50px] rounded-sm" src="${imageSrc}" alt="${name}">
                <div class="text-container flex flex-col">
                  <p class="text-Dark-grayish-blue">${name}</p>
                  <p class="text-Dark-grayish-blue">$${price.toFixed(2)} x ${totalCartQty}  <span class="text-Very-dark-blue font-bold">$${totalPrice.toFixed(2)}</span></p>
                </div>
                <button class="delete-item">
                  <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"/></svg>
                </button>`;

  cartItems.appendChild(cartItem);

  // attach an event listener to the delete button

  const deleteButton = cartItem.querySelector(".delete-item");
  deleteButton.addEventListener("click", (event) => {
    const cartItem1 = event.target.closest(".cart-item");
    removeItemFromCart(cartItem1);
    cartContainer.classList.toggle("hidden");
  cartContainer.classList.toggle("flex");
    checkout.classList.add("hidden");
    cartCount.classList.add("hidden");
    //cartItem = document.createElement("div");
  cartItem.className = "cart-item flex justify-between items-center ";
  cartItem.innerHTML = `<p class="cart-empty font-normal text-Dark-grayish-blue">Your cart is empty</p>`;
  cartItems.appendChild(cartItem);
  });
};



const removeItemFromCart = (cartItem) => {
  cartItem.remove();
  totalCartQty = 0;
  cartCount.innerHTML = `<span class="qty text-white text-[10px] font-bold">${totalCartQty}</span>`;
  
};

addToCartBtn.addEventListener("click", () => {
  
  if (count === 0) return;
  cartCount.classList.remove("hidden");
  cartCount.classList.add("grid");
  checkout.classList.remove("hidden");
  const productName = document.querySelector(".product-name").textContent;
  const productPriceEl = document.querySelector(".current-price");
  const productPrice = parseFloat(productPriceEl.textContent.replace("$", ""));
  const productImg = document
    .querySelector(".images-container .main-img")
    .getAttribute("src");

  addItemToCart(productName, productPrice, productImg);
  //cartContainer.classList.remove("hidden");

  updateCount(0);
});