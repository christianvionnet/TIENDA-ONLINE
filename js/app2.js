const sticky = window.pageYOffset;
const beerItemsBody = document.querySelector("#beer-items"); //Container
const pizzaItemsBody = document.querySelector("#pizza-items"); //Container
const modalContainer = document.querySelector("#modal-container"); //Container
const branchItemsBody = document.querySelector("#branch-items"); //Container
const modalItems = document.querySelector("#modal__template--items").content; //Template
const beerTemplate = document.querySelector("#beer__template").content; //Template
const pizzaTemplate = document.querySelector("#pizza__template").content; //Template
const modalTemplate = document.querySelector("#modal__template").content; //Template
const branchTemplate = document.querySelector("#branch__template").content; //Template
const navbar = document.querySelector(".nav");
const fragment = document.createDocumentFragment();
const buttonSendOrder = document.querySelector("#button-send-order");
const buttonConfirmOrder = modalTemplate.querySelector("#button-confirm-order");
const modalTBody = modalTemplate.querySelector("#modal__tbody");
const modalClose = modalTemplate.querySelector(".modal__close");
const landingModal = modalTemplate.querySelector(".landing__modal");
const buttonMenu = document.querySelector(".nav__menu");
const navMenu = document.querySelector(".nav__container--menu");
const arrowSVG = document.querySelector("#arrow-svg");
// const branchInfo = branchTemplate.querySelectorAll(".branch__info");

let newCart = {}; // It will be our objects collection

// document.addEventListener("scroll", () => {
//   if (scrollY > 4800 && scrollY < 5200) {
//     console.log(branchInfo[1]);

//     if (branchInfo[0].classList.contains("hidden")) {
//       branchInfo[0].classList.remove("hidden");
//     }
//     branchInfo[0].classList.add("hidden");
//   }
// });

buttonMenu.addEventListener("click", () => {
  if (navMenu.classList.contains("translate")) {
    navMenu.classList.remove("translate");
  } else {
    navMenu.classList.add("translate");
  }
});

arrowSVG.addEventListener("click", () => {
  if (navMenu.classList.contains("translate")) {
    navMenu.classList.remove("translate");
  } else {
    navMenu.classList.add("translate");
  }
});

window.onscroll = () => {
  if (window.pageYOffset > 640) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
  if (localStorage.getItem("finalOrder")) {
    newCart = JSON.parse(localStorage.getItem("finalOrder"));
    renderModal();
  }
});

beerItemsBody.addEventListener("click", (e) => addCart(e));
pizzaItemsBody.addEventListener("click", (e) => {
  addCart(e);
});

buttonSendOrder.addEventListener("click", (e) => {
  e.preventDefault();

  localStorage.setItem("finalOrder", JSON.stringify(newCart));

  renderModal();
});

buttonConfirmOrder.addEventListener("click", () => {
  localStorage.removeItem("finalOrder");
  window.alert("¡Listo! Último paso, vamos al pago");
});

modalClose.addEventListener("click", (e) => {
  landingModal.style.visibility = "hidden";
});

//Function for retreiving data from APIs
const fetchData = async () => {
  try {
    const beerAPI = await fetch("/API/api.json");
    const beerData = await beerAPI.json();

    const pizzaAPI = await fetch("/API/api2.json");
    const pizzaData = await pizzaAPI.json();

    const branchAPI = await fetch("/API/api3.json");
    const branchData = await branchAPI.json();

    renderItems(beerData);
    renderItems2(pizzaData);
    renderBranches(branchData);
  } catch (error) {
    console.log(error);
  }
};

//Function for rendering beer items on the html body
const renderItems = (beerData) => {
  beerData.forEach((product) => {
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
const renderItems2 = (pizzaData) => {
  pizzaData.forEach((product) => {
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

const renderBranches = (branchData) => {
  branchData.forEach((branch) => {
    branchTemplate.querySelector("h3").textContent = branch.title;
    branchTemplate.querySelector("p").textContent = branch.address;
    branchTemplate.querySelector("a").setAttribute("src", branch.map);
    branchTemplate.querySelector("img").setAttribute("src", branch.img);
    const clone = branchTemplate.cloneNode(true);
    fragment.appendChild(clone);
  });
  branchItemsBody.appendChild(fragment);
};

//Fuction for taking the final order and rendering the modal with it
const renderModal = () => {
  let finalOrderJson = localStorage.getItem("finalOrder");
  let finalOrder = JSON.parse(finalOrderJson);

  modalTemplate.querySelector(".modal__total").textContent = "0";
  if (Object.values(finalOrder).length == 0) {
    console.log("carrito vacío");
    let emptyCartMessage = document.createElement("div");
    emptyCartMessage.textContent = "¡UPS! TU CARRITO ESTÁ VACÍO";
    emptyCartMessage.style.padding = "2em 0";
    modalTBody.appendChild(emptyCartMessage);
    modalContainer.appendChild(modalTemplate);

    return;
  }

  Object.values(finalOrder).forEach((product) => {
    modalItems.querySelector(".modal__item").textContent = product.title;
    modalItems.querySelector(".modal__quantity").textContent = product.quantity;
    modalItems.querySelector(".modal__price").textContent =
      product.price * product.quantity;
    const clone = modalItems.cloneNode(true);

    const total = Object.values(finalOrder).reduce(
      (acc, { quantity, price }) => acc + quantity * price,
      0
    );
    modalTemplate.querySelector(".modal__total").textContent = total;
    fragment.appendChild(clone);
  });
  modalTBody.appendChild(fragment);

  modalContainer.appendChild(modalTemplate);
};

//Function for sending the product to the cart (depending on if we want to add or susbtract an item)
const addCart = (e) => {
  if (e.target.classList.contains("landing__add")) {
    setCartPlus(e.target.parentElement.parentElement.parentElement);
  }
  if (e.target.classList.contains("landing__substract")) {
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
      delete newCart[product.id];
    } else {
      product.quantity = newCart[product.id].quantity - 1;
      objeto.querySelector(".landing__input").value =
        newCart[product.id].quantity - 1;
    }
  }

  newCart[product.id] = { ...product };
};
