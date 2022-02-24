const navbar = document.querySelector(".nav"),
  sticky = window.pageYOffset,
  items = document.querySelectorAll(".landing__li"),
  buttonsAdd = document.querySelectorAll(".landing__add"),
  buttonsSub = document.querySelectorAll(".landing__substract"),
  inputs = document.querySelectorAll(".landing__input"),
  buttonConfirmOrder = document.querySelectorAll("#buttonConfirm"),
  buttonAddItem = document.querySelector("#buttonAdd"),
  form = document.querySelector(".landing__form"),
  modal = document.querySelector(".landing__modal"),
  modalList = document.querySelector(".modal__list"),
  modalClose = document.querySelector(".modal__close");

const cart = document.querySelector(".nav__cart");

modal.style.display = "none";

window.onscroll = () => {
  if (window.pageYOffset > 640) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
};

buttonsAdd.forEach((button, i) => {
  buttonsAdd[i].addEventListener("click", () => {
    let number = parseInt(inputs[i].value);
    inputs[i].value = number + 1;
  });
});

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

let orderList = [];

//Constructor para guardar los datos de la orden
class Order {
  constructor(item, quantity, price) {
    this.item = item;
    this.quantity = quantity;
    this.price = price;
  }
}

//Funcion para instanciar objeto para crear la lista del pedido
const sendOrder = (event) => {
  event.preventDefault();
  inputs.forEach((input, i) => {
    if (inputs[i].value > 0) {
      let price = items[i].lastElementChild.textContent.split("$");
      let newOrder = new Order(inputs[i].name, inputs[i].value, price[1]);
      orderList.push(newOrder);
      // console.log(newOrder);
      // console.log(inputs[i].name, inputs[i].value, price[1]);
    }
    inputs[i].value = 0;
  });
  openOrder(orderList);

  // console.log(orderList.price);
};

form.addEventListener("submit", sendOrder);

// cart.addEventListener("click", openOrder);

let empyOrder;
let orderLine;

//Funcion que renderiza el carrito de compras con los items, cantidad y precio total
const openOrder = (order) => {
  modal.style.display = "flex";
  console.log(order);
  //Si no hay ningun elemento agregado al pedido, muestro mensaje
  if (order.length == 0) {
    empyOrder = document.createElement("li");
    empyOrder.textContent = "¡UPS! AQUÍ NO HAY NADA";
    empyOrder.style.width = "100%";
    empyOrder.style.textAlign = "center";
    empyOrder.style.margin = "40px auto";
    modalList.append(empyOrder);
    // console.log("carrito vacio");
  } else {
    // modalList.removeChild(empyOrder);
    order.forEach((e, i) => {
      // console.log(order[i].item, order[i].quantity, order[i].price);
      console.log(order);
      orderLine = document.createElement("li");
      let lineItem = document.createElement("span");
      let lineQuantity = document.createElement("span");
      let linePrice = document.createElement("span");

      //Estilos para el contenedor de la lista
      orderLine.classList.add("order__line");
      // orderLine.style.width = "100%";
      // orderLine.style.display = "flex";
      // orderLine.style.justifyContent = "space-between";
      // orderLine.style.padding = "10px 20px";

      //Estilos para el contenedor de las lineas
      modalList.classList.add("modal__list");
      // modalList.style.width = "100%";
      // modalList.style.display = "flex";
      // modalList.style.flexDirection = "column";
      // modalList.style.alignItems = "flex-start";

      //Estilos para cada elemento span de la linea
      lineItem.classList.add("line__item");
      lineQuantity.classList.add("line__quantity");
      linePrice.classList.add("line__price");
      // lineItem.style.width = "70%";
      // lineQuantity.style.width = "10%";
      // linePrice.style.width = "15%";

      //Inserción de los elementos en el body del modal
      lineItem.append(order[i].item);
      lineQuantity.append(order[i].quantity);
      linePrice.append(parseInt(order[i].price) * parseInt(order[i].quantity));
      orderLine.append(lineItem, lineQuantity, linePrice);
      modalList.append(orderLine);
    });
    orderList = [];
  }

  // console.log("holas", orderList);
};

//Listener para carrito de compras
cart.addEventListener("click", openOrder);

modalClose.addEventListener("click", () => {
  modal.style.display = "none";
  console.log(orderLine);
  console.log(empyOrder);

  if (orderLine) {
    modalList.removeChild(orderLine);
  } else if (empyOrder) {
    modalList.removeChild(empyOrder);
  }
});

const addMoreItems = () => {
  modal.style.display = "none";
};

buttonAddItem.addEventListener("click", addMoreItems);
