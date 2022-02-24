/* -------------- GLOBAL VARIABLES -------------- */

const sticky = window.pageYOffset,
  navbar = document.querySelector(".nav"),
  items = document.querySelectorAll(".landing__li"),
  buttonsAdd = document.querySelectorAll(".landing__add"),
  buttonsSub = document.querySelectorAll(".landing__substract"),
  inputs = document.querySelectorAll(".landing__input"),
  buttonConfirmOrder = document.querySelector("#buttonConfirm"),
  buttonAddItem = document.querySelector("#buttonAdd"),
  form = document.querySelector(".landing__form"),
  modal = document.querySelector(".landing__modal"),
  modalListContainer = document.querySelector(".modal__list"),
  // modalList = document.querySelector(".order__line"),
  modalClose = document.querySelector(".modal__close"),
  cart = document.querySelector(".nav__cart"),
  emptyOrder = document.querySelector(".empty__order");

let orderList = []; //Empty array for storing the items order
// let emptyOrder; // Variable to use when cart is empty
let orderLine; //Variable to use when a new order line is created
let modalList;

//Constructor for storing order data as an object
class Order {
  constructor(item, quantity, price) {
    this.item = item;
    this.quantity = quantity;
    this.price = price;
  }
}

/* -------------- INITIAL CONDITIONS -------------- */

modal.style.display = "none";

/* -------------- FUNCTIONS -------------- */

// For setting the nabvar sticky to the top page after 640px of scrolling down
window.onscroll = () => {
  if (window.pageYOffset > 640) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
};

// For adding a unit to the order each time the button + is pressed
buttonsAdd.forEach((button, i) => {
  buttonsAdd[i].addEventListener("click", () => {
    let number = parseInt(inputs[i].value);
    inputs[i].value = number + 1;
  });
});

// For substracting a unit to the order each time the button - is pressed
buttonsSub.forEach((button, i) => {
  buttonsSub[i].addEventListener("click", () => {
    let number = parseInt(inputs[i].value);
    if (number == 0) {
      inputs[i].value = number;
    } else {
      inputs[i].value = number - 1;
    }
  });
});

/* ---- OPEN ORDER ---- */

// For rendering the shopping cart with the items, their quantities and prices
const openOrder = () => {
  modal.style.display = "flex";

  // console.log(order);
  let orderJson = localStorage.getItem("ordenFinal"); //Get JSON object from localStorage
  console.log(typeof orderJson);
  let order = JSON.parse(orderJson); // Convert JSON objecto to an array of objects
  console.log(order);

  // let order = JSON.parse(orderListLocalStorage);

  // let order = JSON.parse(orderListLocalStorage);
  // order.forEach((e, i) => {
  //   console.log(order[i]);
  // });

  //Si no hay ningun elemento agregado al pedido, muestro mensaje
  // console.log(order.length);
  if (order.length == 0) {
    // emptyOrder = document.createElement("li");
    // emptyOrder.textContent = "¡UPS! AQUÍ NO HAY NADA";
    // emptyOrder.style.width = "100%";
    // emptyOrder.style.textAlign = "center";
    // emptyOrder.style.margin = "40px auto";
    // modalListContainer.append(emptyOrder);
    emptyOrder.style.display = "inline-block"; //Display empty cart message
  } else {
    order.forEach((e, i) => {
      // let orderLineJson = JSON.parse(order[i]);
      // console.log(orderLineJson);

      modalList = document.createElement("div");
      orderLine = document.createElement("li");
      let lineItem = document.createElement("span");
      let lineQuantity = document.createElement("span");
      let linePrice = document.createElement("span");

      modalList.classList.add("modal__line");

      //Estilos para el contenedor de la lista
      orderLine.classList.add("order__line");

      //Estilos para el contenedor de las lineas
      modalList.classList.add("modal__list");

      //Estilos para cada elemento span de la linea
      lineItem.classList.add("line__item");
      lineQuantity.classList.add("line__quantity");
      linePrice.classList.add("line__price");

      //Inserción de los elementos en el body del modal
      lineItem.append(order[i].item);
      lineQuantity.append(order[i].quantity);
      linePrice.append(order[i].price * order[i].quantity);
      orderLine.append(lineItem, lineQuantity, linePrice);
      modalList.append(orderLine);
    });
    modalListContainer.append(modalList);
    console.log("orderList antes", orderList);
    orderList = [];
    console.log("orderList despues", orderList);
    emptyOrder.style.display = "none";
  }
};

/* ---- SEND ORDER ---- */

//For instantiating objects in order to create the order list when the button ENVIAR AL CARRITO is clicked
const sendOrder = (event) => {
  event.preventDefault();
  inputs.forEach((input, i) => {
    if (inputs[i].value > 0) {
      let price = items[i].lastElementChild.textContent.split("$"); //Tomo valor del precio
      let newOrder = new Order(inputs[i].name, inputs[i].value, price[1]); //Instancio (creo) objeto con los valores de name, quantity y price
      // let newOrderJson = JSON.stringify(newOrder); //Convierto a string el objeto completo
      orderList.push(newOrder); //Concateno ese objeto convertido a string dentro de un array, es decir creo un array de strings
    }
    // inputs[i].value = 0;
  });
  let orderListJson = JSON.stringify(orderList);
  console.log(orderListJson);
  console.log(typeof orderListJson);
  // console.log(orderList[1]);
  localStorage.setItem("ordenFinal", orderListJson); //store a JSON object in localStorage called "ordenFinal"

  // let holis = localStorage.getItem("ordenFinal");
  // let holisJson = JSON.parse(holis);
  // console.log(holisJson);
  openOrder();
};

/* ---- ADD MORE ITEMS ---- */

// For closing the modal window and add more items
const addMoreItems = () => {
  modal.style.display = "none";
  orderList = [];
  if (emptyOrder) {
    // modalListContainer.removeChild(emptyOrder);
    emptyOrder.style.display = "none";
  }
};

/* ---- CONFIRM ORDER ---- */

//For closing the modal window, displaying a confirmation message and removing the order from the local storage
const confirmOrder = () => {
  // console.log(emptyOrder);
  // if (emptyOrder) {
  //   modalList.removeChild(emptyOrder);
  // } else if (modalList) {
  //   modalListContainer.removeChild(modalList);
  // }
  console.log(orderLine);
  if (orderLine) {
    // console.log(orderLine.length);
    window.alert("¡Excelente elección! Tu pedido ya fue enviado");
    // modalListContainer.removeChild(modalList);
    modalList.remove();
    localStorage.removeItem("ordenFinal");
    // modalList.removeChild(orderLine);
    inputs.forEach((input, i) => {
      inputs[i].value = 0;
    });
    modal.style.display = "none";
  } else {
    // debugger;
    window.alert("Tu carrito está vacio! Armá tu pedido y luego confirmá");
  }
};

//For closing the shopping cart by clicking on the button AGREGAR and be able to add more items to the cart
const closeCart = () => {
  modal.style.display = "none";
  if (orderLine) {
    // modalListContainer.removeChild(modalList);
  } else if (emptyOrder) {
    // modalListContainer.removeChild(emptyOrder);
    emptyOrder.style.display = "none";
  }
};

/* -------------- LISTENERS -------------- */

//Listener para cuando haga click en ENVIAR AL CARRITO
form.addEventListener("submit", sendOrder);

//Listener para carrito de compras
cart.addEventListener("click", openOrder);

buttonConfirmOrder.addEventListener("click", confirmOrder);

//Listener para cerrar carrito desde botón AGREGAR, e ir a agregar mas items
buttonAddItem.addEventListener("click", addMoreItems);

//Listener para cerrar carrito con cruz superior
modalClose.addEventListener("click", closeCart);
