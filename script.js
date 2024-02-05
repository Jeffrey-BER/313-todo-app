// References & Variables
const todoInput = document.getElementById("todoInput"); // Reference to the input field
const addTodoBtn = document.getElementById("addTodoBtn"); // Reference to the add todo button
const removeDoneBtn = document.getElementById("removeDoneBtn"); // Reference to the remove done todos button
const todoList = document.getElementById("todoList"); // Reference to the todo list container
const todoForm = document.getElementById("todoForm"); // Reference to the todo form
const filterBtnAll = document.getElementById("allTodos");
const filterBtnOpen = document.getElementById("openTodos");
const filterBtnDone = document.getElementById("doneTodos");

// Listeners (Sttic)
todoForm.addEventListener("submit", addTodo); // Listen for form submission ("submit") and executes the addTodo function
removeDoneBtn.addEventListener("click", removeTasks); // Listener for the deleting the tasks with the value done: true
filterBtnAll.addEventListener("change", updateStateFilter);
filterBtnOpen.addEventListener("change", updateStateFilter);
filterBtnDone.addEventListener("change", updateStateFilter);

// State holder
const state = {
  tasks: [
    { id: "1", description: "Get Back on Track", done: false },
    { description: "love is the solution", done: false },
  ],

  filter: [{ filterState: "all" }],
};

render();

// Render function
function render() {
  removeDuplicateTasks(); // removing duplicated tasks
  todoList.innerHTML = ""; // Clear the list

  // Filter-----------------------------------------------------------------------------
  let filteredTasks = []; // Initialize an empty array to hold filtered tasks
  // Filter tasks based on state.filter.filterState value
  switch (state.filter.filterState) {
    case "all":
      filteredTasks = state.tasks; // Show all tasks
      break;
    case "open":
      filteredTasks = state.tasks.filter((task) => !task.done); // Show open tasks
      break;
    case "done":
      filteredTasks = state.tasks.filter((task) => task.done); // Show done tasks
      break;
    default:
      console.error("Invalid filter state:", state.filter.filterState);
  }

  // Creating elments and its functionality-----------------------------------------------------
  filteredTasks.forEach((todo) => {
    console.log(todo); // Prints out the current
    const newLi = document.createElement("li"); // Create new list item
    const todoText = document.createTextNode(todo.description); // Create text node for todo description
    const checkBox = document.createElement("input"); // Create checkbox input element
    checkBox.type = "checkbox"; // Set input type to checkbox
    checkBox.checked = todo.done; // Set checkbox state based on todo status

    //
    // Adding a eventListener for each task object
    checkBox.addEventListener("change", () => {
      todo.done = !todo.done;
      render();
    });

    // Appending elements
    newLi.appendChild(todoText); // Append todo description text node to list item
    newLi.appendChild(checkBox); // Append checkbox input to list item
    todoList.appendChild(newLi); // Append list item to todo list container

    saveTasksLocalStorage();
  });
}

// ADD Todo Function (to add a todo to the state)
function addTodo(event) {
  console.log("addTodo function activated");

  event.preventDefault(); // Prevent form submission
  const newTodoDescription = todoInput.value.trim(); // Get the value from input field and trim kills spaces at the end

  // if statement is actualy not nas. because of minlength = "5" inside the input tag in html file
  // Check if the input is not empty
  if (newTodoDescription !== "") {
    // Create new todo object
    const newTodo = {
      id: Date.now().toString(),
      description: newTodoDescription,
      done: false,
    };

    state.tasks.push(newTodo); // Add new todo to the state
    todoInput.value = ""; // Clear input field

    render(); // Render updated todo list
  }
}

// Function to remove tasks from the state where done value is true
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

// Function to update state filter based on active button
// Function to update state filter based on active button
function updateStateFilter() {
  // Create an object to map button IDs to filter values
  const filterMap = {
    allTodos: { filterState: "all" },
    openTodos: { filterState: "open" },
    doneTodos: { filterState: "done" },
  };

  // Get the ID of the active button
  const activeButtonId = document.querySelector(
    "input[name='filter']:checked"
  ).id;

  // Use switch statement to handle cases based on active button ID
  switch (activeButtonId) {
    case "allTodos":
    case "openTodos":
    case "doneTodos":
      state.filter = filterMap[activeButtonId];
      break;
    default:
      console.error("Invalid filter button ID:", activeButtonId);
  }

  render(); // Re-render the todo list based on the updated filter
}

// Load tasks from the local storage
function loadTasksLocalStorage() {
  // Retrieve the tasks JSON string from local storage
  const tasksJson = localStorage.getItem("tasks");

  if (tasksJson) {
    // Parse the JSON string back into an array and update state.tasks
    state.tasks = JSON.parse(tasksJson);
  }
}

// Save tasks to the local storage
function saveTasksLocalStorage() {
  // Stringify the tasks array
  localStorage.removeItem("tasks");

  const tasksJson = JSON.stringify(state.tasks);

  // Save the stringified tasks array to local storage
  localStorage.setItem("tasks", tasksJson);
}

// Function to remove duplicate tasks from the state
function removeDuplicateTasks() {
  const uniqueTasks = {}; // Object to track unique tasks

  // Filter out duplicate tasks
  state.tasks = state.tasks.filter((task) => {
    // Check if the task description is already in uniqueTasks
    if (!uniqueTasks[task.description]) {
      // If not, mark it as seen by adding it to uniqueTasks
      uniqueTasks[task.description] = true;
      return true; // Keep the task in the filtered array
    }
    showMessage("Duplicate Detacted");
    return false; // Exclude duplicate task from the filtered array
  });
}

// Function to show a message window
// Function to show a message window
function showMessage(message) {
  const messageContainer = document.getElementById("messageContainer");

  // Create a new message element
  const messageElement = document.createElement("div");
  messageElement.textContent = message;
  messageElement.classList.add("message");

  // Add the message to the container
  messageContainer.appendChild(messageElement);

  // Trigger reflow to apply the CSS transition
  messageContainer.offsetHeight;

  // Show the message
  messageContainer.classList.add("show");

  // Hide the message after a delay
  setTimeout(() => {
    messageContainer.classList.remove("show");

    // Remove all existing message elements
    while (messageContainer.firstChild) {
      messageContainer.removeChild(messageContainer.firstChild);
    }
  }, 2000); // 2 seconds delay
}

// - Initial initialization
loadTasksLocalStorage();
updateStateFilter();
render();
