const carousel = document.querySelector('.carousel-container');
const prvBtn = document.querySelector('.prev-btn');
const nxtBtn = document.querySelector('.nxt-btn');
const deck = document.querySelector('.deck-container');
const deckItems = Array.from(deck.children);
// console.log(deckItems);
const images = document.querySelectorAll('.deck-container img');

let rotateDeg = 0;

const rotateCarousel = () => {
  carousel.style.transform = `rotateY(${rotateDeg}deg)`;
};

function handleNextTouch() {
  rotateDeg -= 45;
  rotateCarousel();
};

function handlePrevTouch() {
  rotateDeg += 45;
  rotateCarousel();
};

function handleNextClick() {
  rotateDeg -= 45;
  rotateCarousel();
};

function handlePrevClick() {
  rotateDeg += 45;
  rotateCarousel();
}

const mediaQuery = window.matchMedia("(max-width: 1024px) and (orientation: landscape)");

function screenSize(e) {
  nxtBtn.removeEventListener("touchstart", handleNextTouch);
  prvBtn.removeEventListener("touchstart", handlePrevTouch);
  nxtBtn.removeEventListener("click", handleNextClick);
  prvBtn.removeEventListener("click", handlePrevClick);

  if (e.matches) {
    nxtBtn.addEventListener("touchstart", handleNextTouch);
    prvBtn.addEventListener("touchstart", handlePrevTouch);
  } else {
    nxtBtn.addEventListener("click", handleNextClick);
    prvBtn.addEventListener("click", handlePrevClick);
  };
};

screenSize(mediaQuery);

mediaQuery.addEventListener("change", screenSize);

let cardCounter = 0;

const cardDeck = () => {
  let totalItems = deckItems.length;
  deckItems.forEach((deckObject, i) => {
    let index = (i - cardCounter + totalItems) % totalItems;
    deckObject.style.zIndex = totalItems - index;
    deckObject.style.transform = `translateY(${index * 5}px) rotateZ(${index * 2}deg) translateX(${index * 1}px)`;
  });
};

cardDeck();

let startX;
let startY;

images.forEach((imgObject) => {
  imgObject.addEventListener('touchstart', (e) => {
    let touches = e.changedTouches[0];
    
    console.log(touches);

    startX = touches.clientX;
    startY = touches.clientY;

    console.log(startX + ": startX");
    console.log(startY + ": startY");

    
  });
});

let endX; 
let endY;

images.forEach((imgObject) => {
  imgObject.addEventListener('touchend', (e) => {
    let touches = e.changedTouches[0];
  
    endX = touches.clientX;
    endY = touches.clientY;

    console.log(endX + ": endX");
    console.log(endY + ": endY");

    const clicked = Math.abs(endX - startX) < 10 && Math.abs(endY - startY) < 3;


    console.log(clicked);

    if (clicked) {
    cardCounter = (cardCounter + 1) % deckItems.length;
    cardDeck();
    }
  });
});

let lastTouch = 0;

document.addEventListener("touchend", (e) => {
  const now = Date.now();
  if (now - lastTouch <= 440) {
    e.preventDefault();
  }
  lastTouch = now;
});

