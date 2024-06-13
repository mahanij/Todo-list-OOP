var todos = JSON.parse(localStorage.getItem("works")) || [];

const form = document.getElementsByTagName("form")[0];

const todoContainer = document.querySelector(".todo-container");

const title = document.querySelector(".input-title");

title.addEventListener("blur", (e) => {
  if (e.target.value == "") {
    e.target.classList.add("border-red-500");
  } else {
    e.target.classList.remove("border-red-500");
  }
});

form.addEventListener("submit", (e) => {
  let todoList = {
    title: e.target.title.value,
    isAvailable: "yes",
    id: makeNUmber(todos),
  };
  todos.push(todoList);
  render(todos, todoContainer);
  e.target.title.value = "";
  localStorage.setItem("works", JSON.stringify(todos));
  e.preventDefault();
});

function makeNUmber(array) {
  for (var index = 0; index <= array.length; index++) {}
  return index;
}

render(JSON.parse(localStorage.getItem("works")), todoContainer);

function render(array, container) {
  container.innerHTML = "";
  array.forEach((element) => {
    let div = document.createElement("div");
    div.classList.add("flex", "justify-between", "items-center", "mb-2");
    console.log(element.isAvailable);
    if (!element.isAvailable) {
      div.classList.add("opacity-50");
    } else {
      div.classList.remove("opacity-50");
    }
    div.innerHTML = `
    <span
      > ${element.title} </span
    >
    <div class="flex items-center">
      <button
        class="bg-green-600 p-2 rounded-full mr-2 hover:bg-green-800 check-btn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.707-4.707a1 1 0 111.414-1.414L8.414 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <button class="delete-btn bg-gray-600 p-2 rounded-full hover:bg-gray-700 delet-btn" id='${element.id}'>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  `;
    container.appendChild(div);
  });
  return;
}

delet();

function delet() {
  todoContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      todos = todos.filter((item) => {
        console.log("click", e.target.id);
        return item.id != e.target.id;
      });
    }
    if (e.target.classList.contains("check-btn")) {
      todos.forEach((element) => {
        if ((e.target.id = element.id)) {
          element.isAvailable = !element.isAvailable;
        }
      });
    }
    localStorage.setItem("works", JSON.stringify(todos));
    render(todos, todoContainer);
  });
}
