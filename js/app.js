const navbar = document.querySelector(".nav"),
  sticky = window.pageYOffset,
  items = document.querySelectorAll(".landing__style"),
  buttonsAdd = document.querySelectorAll(".landing__add"),
  buttonsSub = document.querySelectorAll(".landing__substract"),
  inputs = document.querySelectorAll(".landing__input"),
  buttonsConfirm = document.querySelectorAll(".landing__button--green");

const form = document.querySelector(".landing__form");

const sendOrder = (event) => {
  event.preventDefault();
  inputs.forEach((input, i) => {
    if (inputs[i].value > 0) {
      console.log(inputs[i].name, inputs[i].value);
    }
    inputs[i].value = 0;
  });
};

form.addEventListener("submit", sendOrder);

// const sendForm = (event) => {
//   event.preventDefault();

//   console.log(
//     event.target.nombre,
//     event.target.apellido.value,
//     event.target.telefono.value
//   );
// };

// form.addEventListener("submit", sendForm);

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

let order = [];

// buttonsConfirm.forEach((button, i) => {
//   buttonsConfirm[i].addEventListener("click", () => {
//     inputs.forEach((item, i) => {
//       // if (inputs[i].value > 0) {
//       //   order.push(items[i].textContent);
//       //   console.log(order);
//       // }
//       // console.log(inputs[i].value);
//       inputs[i].value == 0;
//     });
//   });
// });

// items.forEach((item, i) => {
//   console.log(items[i].textContent);
// });
