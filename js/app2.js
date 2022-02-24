const beerItemsBody = document.querySelector("#beer-items");
const pizzaItemsBody = document.querySelector("#pizza-items");
const beerTemplate = document.querySelector("#beer__template").content;
const pizzaTemplate = document.querySelector("#pizza__template").content;
// const modalTemplate = document.querySelector("#modal__template").content;
const fragment = document.createDocumentFragment();
let newCart = {};

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

beerItemsBody.addEventListener("click", (e) => addCart(e));

//Function for retreiving data from APIs
const fetchData = async () => {
  try {
    const res = await fetch("/api.json");
    const data = await res.json();

    const res2 = await fetch("/api2.json");
    const data2 = await res2.json();

    renderItems(data);
    renderItems2(data2);
  } catch (error) {
    console.log(error);
  }
};

//Function for rendering beer items on the html body
const renderItems = (data) => {
  data.forEach((product) => {
    beerTemplate.querySelector(".landing__style").textContent = product.title;
    beerTemplate.querySelector(".landing__info").textContent = product.info;
    beerTemplate.querySelector(".landing__price").textContent = product.price;
    beerTemplate.querySelector(".landing__ibus").textContent = product.ibu;
    beerTemplate.querySelector(".landing__vol").textContent = product.abv;
    beerTemplate.querySelector(".landing__add").dataset.id = product.id;
    beerTemplate.querySelector(".landing__substract").dataset.id = product.id;
    const clone = beerTemplate.cloneNode(true);
    fragment.appendChild(clone);
  });
  beerItemsBody.appendChild(fragment);
};

//Function for rendering pizza items on the html body
const renderItems2 = (data2) => {
  data2.forEach((product) => {
    pizzaTemplate.querySelector(".landing__style").textContent = product.title;
    pizzaTemplate.querySelector(".landing__info").textContent = product.info;
    pizzaTemplate.querySelector(".landing__price").textContent = product.price;
    pizzaTemplate.querySelector(".landing__add").dataset.id = product.id;
    pizzaTemplate.querySelector(".landing__substract").dataset.id = product.id;
    const clone = pizzaTemplate.cloneNode(true);
    fragment.appendChild(clone);
  });
  pizzaItemsBody.appendChild(fragment);
};

//Function for sending the product to the cart (depending on if we want to add or susbtract an item)
const addCart = (e) => {
  if (e.target.classList.contains("landing__add")) {
    // console.log(
    //   e.target.parentElement.parentElement.parentElement.querySelector(
    //     ".landing__input"
    //   )
    // );
    setCartPlus(e.target.parentElement.parentElement.parentElement);
  } else if (e.target.classList.contains("landing__substract")) {
    setCartLess(e.target.parentElement.parentElement.parentElement);
  }
  e.stopPropagation();
};

//Function for adding and an item to the cart
const setCartPlus = (objeto) => {
  const product = {
    id: objeto.querySelector(".landing__add").dataset.id,
    title: objeto.querySelector(".landing__style").textContent,
    price: objeto.querySelector(".landing__price").textContent,
    quantity: 1,
  };

  if (newCart.hasOwnProperty(product.id)) {
    objeto.querySelector(".landing__input").value =
      newCart[product.id].quantity + 1;
    product.quantity = newCart[product.id].quantity + 1;
  }

  newCart[product.id] = { ...product };

  console.log(newCart);
};

// Function for substracting an item to the cart
const setCartLess = (objeto) => {
  const product = {
    id: objeto.querySelector(".landing__add").dataset.id,
    title: objeto.querySelector(".landing__style").textContent,
    price: objeto.querySelector(".landing__price").textContent,
    quantity: 1,
  };

  if (newCart.hasOwnProperty(product.id)) {
    if (newCart[product.id].quantity == 0) {
      product.quantity = newCart[product.id].quantity;
    } else {
      product.quantity = newCart[product.id].quantity - 1;
    }
  }

  newCart[product.id] = { ...product };

  console.log(newCart);
};

const openCart = () => {};
