// Selectors section
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOptions = document.querySelector(".filter-todo");

// Event's goes here
document.addEventListener("DOMContentLoaded", retrieveTodoFromLocalStorage);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
todoList.addEventListener("click", markCompleted);
filterOptions.addEventListener("click", filterTodo);
// functions
function addTodo(event) {
  // disbaling default behaviour of form submission
  event.preventDefault();

  /*
        Need to create structure like this
        div->container
            li->each todo 
            check&delete-button->  div

    */

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // <li> element containing each newly created todo
  const newlyCreatedTodo = document.createElement("li");
  newlyCreatedTodo.innerText = todoInput.value;
  // Saving todo's into local storage
  saveLocalTodos(todoInput.value);
  newlyCreatedTodo.classList.add("todo-item");
  todoDiv.appendChild(newlyCreatedTodo);

  // check-mark button along side of todo
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  // trash button along side of todo
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //   Now finally appending to list
  todoList.appendChild(todoDiv);

  // Clearing out input box
  todoInput.value = "";
}

function deleteTodo(event) {
  // item contains position where click happened
  const item = event.target;

  // Checking to see if clicked item was trash button
  if (item.classList[0] === "trash-btn") {
    const markedTodo = item.parentElement;
    markedTodo.classList.add("fall");
    removeTodoFromLocalStorage(markedTodo);
    markedTodo.addEventListener("transitionend", function () {
      markedTodo.remove();
    });
  }
}

function markCompleted(event) {
  const clickedItem = event.target;
  if (clickedItem.classList[0] === "complete-btn") {
    const markedTodo = clickedItem.parentElement;
    markedTodo.classList.add("completed");
  }
}

function filterTodo(event) {
  const listOfTodo = todoList.childNodes;
  listOfTodo.forEach((todo) => {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        // grabbing all todo's containing complete class
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else todo.style.display = "none";
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else todo.style.display = "none";
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) todos = [];
  else todos = JSON.parse(localStorage.getItem("todos"));

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos)); // stringify converts object into string in this case list to string
}

function retrieveTodoFromLocalStorage() {
  let todos = JSON.parse(localStorage.getItem("todos"));
  if (localStorage.getItem("todos") === null) todos = [];
  else {
    todos.forEach((todo) => {
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");

      // <li> element containing each newly created todo
      const newlyCreatedTodo = document.createElement("li");
      newlyCreatedTodo.innerText = todo;

      newlyCreatedTodo.classList.add("todo-item");
      todoDiv.appendChild(newlyCreatedTodo);

      // check-mark button along side of todo
      const completedButton = document.createElement("button");
      completedButton.innerHTML = '<i class="fas fa-check"></i>';
      completedButton.classList.add("complete-btn");
      todoDiv.appendChild(completedButton);

      // trash button along side of todo
      const trashButton = document.createElement("button");
      trashButton.innerHTML = '<i class="fas fa-trash"></i>';
      trashButton.classList.add("trash-btn");
      todoDiv.appendChild(trashButton);

      //   Now finally appending to list
      todoList.appendChild(todoDiv);
    });
  }
}

function removeTodoFromLocalStorage(todoToRemove) {
  let ListOfTodos;
  const liChildPosition = 0;
  if (localStorage.getItem("todos") === null) ListOfTodos = [];
  else ListOfTodos = JSON.parse(localStorage.getItem("todos"));

  // Need to extract index of todo in local storage list
  // plan is to get text first then index
  // text is at todoToRemove.children -> li -> completed_button -> trash-btn, selecting first children then extracting text
  const todoIndex = todoToRemove.children[liChildPosition].innerText;
  const todoToBeRemoveIndex = ListOfTodos.indexOf(todoIndex);
  // now removing that element form local storage through splice
  // first argument index, second is number of elements
  ListOfTodos.splice(todoToBeRemoveIndex, 1);

  // updating local localStorage
  localStorage.setItem("todos", JSON.stringify(ListOfTodos));
}
