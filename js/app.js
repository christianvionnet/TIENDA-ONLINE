const navbar = document.querySelector(".nav"),
  sticky = window.pageYOffset,
  items = document.querySelectorAll(".landing__style"),
  buttonsAdd = document.querySelectorAll(".landing__add"),
  buttonsSub = document.querySelectorAll(".landing__substract"),
  input = document.querySelectorAll(".landing__input"),
  buttonsConfirm = document.querySelectorAll(".landing__button--green");

window.onscroll = () => {
  if (window.pageYOffset > 640) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
};

buttonsAdd.forEach((button, i) => {
  buttonsAdd[i].addEventListener("click", () => {
    let number = parseInt(input[i].value);
    input[i].value = number + 1;
    // console.log(items[i].textContent);
  });
});

buttonsSub.forEach((button, i) => {
  buttonsSub[i].addEventListener("click", () => {
    let number = parseInt(input[i].value);
    if (number == 0) {
      input[i].value = number;
    } else {
      input[i].value = number - 1;
    }
    // console.log(items[i].textContent);
  });
});

let order = [];

buttonsConfirm.forEach((button, i) => {
  buttonsConfirm[i].addEventListener("click", () => {
    items.forEach((item, i) => {
      if (input[i] != 0) {
        order.push(items[i].textContent);
      }
    });
    console.log(order);
  });
});

// items.forEach((item, i) => {
//   console.log(items[i].textContent);
// });
