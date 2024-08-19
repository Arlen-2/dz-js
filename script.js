document.querySelectorAll(".dropdown-toggle").forEach((e) => {
  e.addEventListener("click", (e) => {
    const menu = e.currentTarget.dataset.path;
    document.querySelectorAll(".dropdown-menu").forEach((e) => {
      if (
        !document
          .querySelector(`[data-target=${menu}]`)
          .classList.contains("open")
      ) {
        e.classList.remove("menu-active");
        e.classList.remove("open");
        document
          .querySelector(`[data-target=${menu}]`)
          .classList.add("menu-active");
        intervalId = setTimeout(() => {
          document.querySelector(`[data-target=${menu}]`).classList.add("open");
        }, 0);
      }

      if (
        document
          .querySelector(`[data-target=${menu}]`)
          .classList.contains("open")
      ) {
        clearTimeout(intervalId);
        document
          .querySelector(`[data-target=${menu}]`)
          .classList.remove("menu-active");
        intervalId = setTimeout(() => {
          document
            .querySelector(`[data-target=${menu}]`)
            .classList.remove("open");
        }, 0);
      }

      window.onclick = (e) => {
        if (
          e.target == document.querySelector(`[data-target=${menu}]`) ||
          e.target == document.querySelector(`[data-path=${menu}]`)
        ) {
          return;
        } else {
          document
            .querySelector(`[data-target=${menu}]`)
            .classList.remove("menu-active");
          document
            .querySelector(`[data-target=${menu}]`)
            .classList.remove("open");
        }
      };
    });
  });
});

//asdfghjkl;'

const userCardTemplate = document.querySelector("[data-user-template]");
const userCardContainer = document.querySelector("[data-user-cards-container]");
const searchInput = document.querySelector("[data-search]");

let users = [];

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  users.forEach((user) => {
    const isVisible =
      user.name.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value);
    user.element.classList.toggle("hide", !isVisible);
  });
});

fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => res.json())
  .then((data) => {
    users = data.map((user) => {
      const card = userCardTemplate.content.cloneNode(true).children[0];
      const header = card.querySelector("[data-header]");
      const body = card.querySelector("[data-body]");
      header.textContent = user.name;
      body.textContent = user.email;
      userCardContainer.append(card);
      return { name: user.name, email: user.email, element: card };
    });
  });

///asdfghjkl;'

const modalController = ({ modal, btnOpen, btnClose, time = 300 }) => {
  const buttonElems = document.querySelectorAll(btnOpen);
  const modalElem = document.querySelector(modal);

//   modalElem.style.cssText = `
//       display: flex;
//       visibility: hidden;
//       opacity: 0;
//       transition: opacity ${time}ms ease-in-out;`;

  const closeModal = (event) => {
    const target = event.target;

    if (
      target === modalElem ||
      (btnClose && target.closest(btnClose)) ||
      event.code === "Escape"
    ) {
      modalElem.style.opacity = 0;

      setTimeout(() => {
        modalElem.style.visibility = "hidden";
      }, time);

      window.removeEventListener("keydown", closeModal);
    }
  };

  const openModal = () => {
    modalElem.style.visibility = "visible";
    modalElem.style.opacity = 1;
    window.addEventListener("keydown", closeModal);
  };

  buttonElems.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  modalElem,addEventListener("click", closeModal);
};

modalController({
  modal: ".modal1",
  btnOpen: ".section__button1",
  btnClose: ".modal__close",
});

modalController({
  modal: ".modal2",
  btnOpen: ".section__button2",
  btnClose: ".modal__close",
});

const boxes = Array.from(document.querySelectorAll(".box")); 

boxes.forEach((box) => {
  box.addEventListener("click", boxHandler);
});

function boxHandler(e) {
  e.preventDefault();
  let currentBox = e.target.closest(".box");
  let currentContent = e.target.nextElementSibling; 
  currentBox.classList.toggle("active"); 
  if (currentBox.classList.contains("active")) {
    currentContent.style.maxHeight = currentContent.scrollHeight + "px"; 
  } else {
    currentContent.style.maxHeight = 0; 
  }
}


let more = document.querySelector('.more');
modal = document.querySelector('.modal');
close = document.querySelector('.close');

more.addEventListener('click', function() {
    modal.style.display = 'block';
    modal.classList.add('modal-animation');
});

close.addEventListener('click', function() {
    modal.style.display = 'none';
    modal.classList.remove('modal-animation');
});