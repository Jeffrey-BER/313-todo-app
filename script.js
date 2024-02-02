// References & Variables
const todoInput = document.getElementById("todoInput"); // Reference to the input field
const addTodoBtn = document.getElementById("addTodoBtn"); // Reference to the add todo button
const removeDoneBtn = document.getElementById("removeDoneBtn"); // Reference to the remove done todos button
const todoList = document.getElementById("todoList"); // Reference to the todo list container
const todoForm = document.getElementById("todoForm"); // Reference to the todo form

// Listeners Sttic
todoForm.addEventListener("submit", addTodo); // Listen for form submission ("submit") and executes the addTodo function
removeDoneBtn.addEventListener("click", removeTasks); // Listener for the deleting the tasks with the value done: true

// State holder
const state = {
  tasks: [
    { description: "Get Back on Track", done: false },
    { description: "love is the solution", done: false },
  ],
};

// Render function
function render() {
  todoList.innerHTML = ""; // Clear the list

  state.tasks.forEach((todo) => {
    const newLi = document.createElement("li"); // Create new list item
    const todoText = document.createTextNode(todo.description); // Create text node for todo description
    const checkBox = document.createElement("input"); // Create checkbox input element
    checkBox.type = "checkbox"; // Set input type to checkbox
    checkBox.checked = todo.done; // Set checkbox state based on todo status

    newLi.appendChild(todoText); // Append todo description text node to list item
    newLi.appendChild(checkBox); // Append checkbox input to list item
    todoList.appendChild(newLi); // Append list item to todo list container
  });
}

// ADD Todo Function (to add a todo to the state)
function addTodo(event) {
  event.preventDefault(); // Prevent form submission
  const newTodoDescription = todoInput.value.trim(); // Get the value from input field

  // if statement is actualy not nas. because of minlength = "5" inside the input tag in html file
  if (newTodoDescription !== "") {
    // Check if the input is not empty
    const newTodo = { description: newTodoDescription, done: false }; // Create new todo object
    state.tasks.push(newTodo); // Add new todo to the state
    render(); // Render updated todo list
    todoInput.value = ""; // Clear input field
  }
}

// Function to remove tasks from the state where done is true
function removeTasks() {
  // Loop through the tasks array in reverse order to avoid index shifting
  console.log("removeTask function is called");

  for (let i = state.tasks.length - 1; i >= 0; i--) {
    if (state.tasks[i].done) {
      state.tasks.splice(i, 1); // Remove task at index i
    }
  }

  render();
}

// Load tasks from the local storage
function loadTasksLocalStorage() {}

// Save tasks to the local storage
function saveTasksLocalStorage() {}

// - Initial initialization
render();
