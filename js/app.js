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

//Constructor para guardar los datos de la orden como un objeto
class Order {
  constructor(item, quantity, price) {
    this.item = item;
    this.quantity = quantity;
    this.price = price;
  }
}

//Funcion para instanciar objeto para crear la lista del pedido
//cuando haya hecho click en ENVIAR AL CARRITO
const sendOrder = (event) => {
  event.preventDefault();
  inputs.forEach((input, i) => {
    if (inputs[i].value > 0) {
      let price = items[i].lastElementChild.textContent.split("$"); //Tomo valor del precio
      let newOrder = new Order(inputs[i].name, inputs[i].value, price[1]); //Instancio (creo) objeto con los valores de name, quantity y price
      let newOrderJson = JSON.stringify(newOrder);
      orderList.push(newOrderJson); //Agrego ese objeto dentro de un array, es decir creo un array de objetos
      // localStorage.setItem("ordenFinal", orderLine);
    }
    inputs[i].value = 0;
  });
  console.log(orderList);
  openOrder(orderList);
};

//Listener para cuando haga click en ENVIAR AL CARRITO
form.addEventListener("submit", sendOrder);

let emptyOrder; //Variable a usar cuando el carrito esté vacío
let orderLine; //Variable a usar cuando cree una nueva linea del pedido

//Funcion que renderiza el carrito de compras con los items, cantidad y precio total
const openOrder = (order) => {
  modal.style.display = "flex";
  // console.log(order);

  //Si no hay ningun elemento agregado al pedido, muestro mensaje
  // console.log(order.length);
  if (order.length == 0) {
    emptyOrder = document.createElement("li");
    emptyOrder.textContent = "¡UPS! AQUÍ NO HAY NADA";
    emptyOrder.style.width = "100%";
    emptyOrder.style.textAlign = "center";
    emptyOrder.style.margin = "40px auto";
    modalList.append(emptyOrder);
  } else {
    order.forEach((e, i) => {
      let orderLineJson = JSON.parse(order[i]);
      console.log(orderLineJson);

      orderLine = document.createElement("li");
      let lineItem = document.createElement("span");
      let lineQuantity = document.createElement("span");
      let linePrice = document.createElement("span");

      //Estilos para el contenedor de la lista
      orderLine.classList.add("order__line");

      //Estilos para el contenedor de las lineas
      modalList.classList.add("modal__list");

      //Estilos para cada elemento span de la linea
      lineItem.classList.add("line__item");
      lineQuantity.classList.add("line__quantity");
      linePrice.classList.add("line__price");

      //Inserción de los elementos en el body del modal
      lineItem.append(orderLineJson.item);
      lineQuantity.append(orderLineJson.quantity);
      linePrice.append(orderLineJson.price * orderLineJson.quantity);
      orderLine.append(lineItem, lineQuantity, linePrice);
      modalList.append(orderLine);
    });
    orderList = [];
  }
};

//Listener para carrito de compras
cart.addEventListener("click", openOrder);

//Listener para cerrar carrito con cruz superior
modalClose.addEventListener("click", () => {
  modal.style.display = "none";
  console.log(orderLine);
  console.log(emptyOrder);

  if (orderLine) {
    modalList.removeChild(orderLine);
  } else if (emptyOrder) {
    modalList.removeChild(emptyOrder);
  }
});

//Funcion para cerrar carrito desde botón AGREGAR para agregar mas items
const addMoreItems = () => {
  modal.style.display = "none";
  if (emptyOrder) {
    modalList.removeChild(emptyOrder);
  }
};

//Listener para cerrar carrito desde botón AGREGAR y agregar mas items
buttonAddItem.addEventListener("click", addMoreItems);
