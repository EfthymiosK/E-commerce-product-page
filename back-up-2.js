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
    lightbox.classList.remove("hidden");
    lightbox.classList.add("grid");
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
    lightbox.classList.add("hidden");
  });


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
});