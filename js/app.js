class Todo {
  constructor(title, isAvailable = "yes", id) {
    this.title = title;
    this.isAvailable = isAvailable;
    this.id = id;
  }
}

class TodoApp {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem("works")) || [];
    this.form = document.getElementsByTagName("form")[0];
    this.todoContainer = document.querySelector(".todo-container");
    this.titleInput = document.querySelector(".input-title");

    this.titleInput.addEventListener("blur", (e) => this.validateTitle(e));
    this.form.addEventListener("submit", (e) => this.addTodo(e));
    this.todoContainer.addEventListener("click", (e) =>
      this.handleContainerClick(e)
    );

    this.render();
  }

  validateTitle(e) {
    if (e.target.value == "") {
      e.target.classList.add("border-red-500");
    } else {
      e.target.classList.remove("border-red-500");
    }
  }

  addTodo(e) {
    e.preventDefault();
    const newTodo = new Todo(e.target.title.value, "yes", this.generateId());
    this.todos.push(newTodo);
    this.render();
    e.target.title.value = "";
    localStorage.setItem("works", JSON.stringify(this.todos));
  }

  generateId() {
    return this.todos.length
      ? Math.max(...this.todos.map((todo) => todo.id)) + 1
      : 1;
  }

  render() {
    this.todoContainer.innerHTML = "";
    this.todos.forEach((todo) => {
      let div = document.createElement("div");
      div.classList.add("flex", "justify-between", "items-center", "mb-2");
      if (todo.isAvailable === "no") {
        div.classList.add("opacity-50");
      } else {
        div.classList.remove("opacity-50");
      }
      div.innerHTML = `
        <span>${todo.title}</span>
        <div class="flex items-center">
          <button class="bg-green-600 p-2 rounded-full mr-2 hover:bg-green-800 check-btn" id='${todo.id}'>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.707-4.707a1 1 0 111.414-1.414L8.414 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
          </button>
          <button class="delete-btn bg-gray-600 p-2 rounded-full hover:bg-gray-700" id='${todo.id}'>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      `;
      this.todoContainer.appendChild(div);
    });
  }

  handleContainerClick(e) {
    if (e.target.closest(".delete-btn")) {
      this.deleteTodoById(e.target.closest(".delete-btn").id);
    }
    if (e.target.closest(".check-btn")) {
      this.toggleTodoAvailabilityById(e.target.closest(".check-btn").id);
    }
    localStorage.setItem("works", JSON.stringify(this.todos));
    this.render();
  }

  deleteTodoById(id) {
    this.todos = this.todos.filter((todo) => todo.id != id);
  }

  toggleTodoAvailabilityById(id) {
    this.todos = this.todos.map((todo) => {
      if (todo.id == id) {
        todo.isAvailable = todo.isAvailable === "yes" ? "no" : "yes";
      }
      return todo;
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new TodoApp();
});
