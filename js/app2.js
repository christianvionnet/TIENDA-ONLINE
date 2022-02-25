const sticky = window.pageYOffset;
const beerItemsBody = document.querySelector("#beer-items");
const pizzaItemsBody = document.querySelector("#pizza-items");
const modalContainer = document.querySelector("#modal-container");
const modalItems = document.querySelector("#modal__template--items").content;
const beerTemplate = document.querySelector("#beer__template").content;
const pizzaTemplate = document.querySelector("#pizza__template").content;
const modalTemplate = document.querySelector("#modal__template").content;
const navbar = document.querySelector(".nav");
const fragment = document.createDocumentFragment();
const buttonSendOrder = document.querySelector("#button-send-order");
const modalTBody = modalTemplate.querySelector("#modal__tbody");
const modalClose = modalTemplate.querySelector(".modal__close");
// const buttonModifyOrder = document

let newCart = {}; // It will be our objects collection

window.onscroll = () => {
  if (window.pageYOffset > 640) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

beerItemsBody.addEventListener("click", (e) => addCart(e));
pizzaItemsBody.addEventListener("click", (e) => {
  addCart(e);
});

buttonSendOrder.addEventListener("click", (e) => {
  e.preventDefault();
  let newCartJson = JSON.stringify(newCart);
  localStorage.setItem("finalOrder", newCartJson);
  renderModal();
});

modalClose.addEventListener("click", (e) => {
  // console.log(e.target.parentElement.parentElement);
  e.target.parentElement.parentElement.style.display = "none";
});

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

//Fuction for taking the final order and rendering the modal with it
const renderModal = () => {
  let finalOrderJson = localStorage.getItem("finalOrder");
  let finalOrder = JSON.parse(finalOrderJson);
  // console.log(modalTemplate);
  // if (modalTemplate) {
  modalTemplate.querySelector(".modal__total").textContent = "0";
  // }

  Object.values(finalOrder).forEach((product) => {
    modalItems.querySelector(".modal__item").textContent = product.title;
    modalItems.querySelector(".modal__quantity").textContent = product.quantity;
    modalItems.querySelector(".modal__price").textContent =
      product.price * product.quantity;
    const clone = modalItems.cloneNode(true);

    modalTemplate.querySelector(".modal__total").textContent =
      parseInt(modalTemplate.querySelector(".modal__total").textContent) +
      parseInt(modalItems.querySelector(".modal__price").textContent);
    fragment.appendChild(clone);
  });
  modalTBody.appendChild(fragment);

  modalContainer.appendChild(modalTemplate);
};

//Function for sending the product to the cart (depending on if we want to add or susbtract an item)
const addCart = (e) => {
  if (e.target.classList.contains("landing__add")) {
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

  objeto.querySelector(".landing__input").value = 1;

  if (newCart.hasOwnProperty(product.id)) {
    objeto.querySelector(".landing__input").value =
      newCart[product.id].quantity + 1;
    product.quantity = newCart[product.id].quantity + 1;
  }

  newCart[product.id] = { ...product };

  // console.log(newCart);
  // renderModal(newCart);
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
      objeto.querySelector(".landing__input").value =
        newCart[product.id].quantity - 1;
    }
  }

  newCart[product.id] = { ...product };

  // console.log(newCart);
  // renderModal(newCart);
};

const openCart = () => {};
