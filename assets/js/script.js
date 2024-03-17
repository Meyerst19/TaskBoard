const addTaskButton = $("#addTaskButton");
const todo = $("#todo-cards");
const inProgress = $("#in-progress-cards");
const done = $("#done-cards");
// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
  if (nextId === null) {
    nextId = -1;
  }

  nextId++;
  localStorage.setItem("nextId", JSON.stringify(nextId));
  return nextId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  const taskCardEl = $("<div>");
  const cardBodyEl = $("<div>");
  const cardTitleEl = $("<h3>");
  const cardDescriptionEl = $("<p>");
  const cardDueDateEl = $("<input>");
  const cardDeleteButton = $("<button>");

  cardTitleEl.text(task.title);
  cardTitleEl.attr("class", "card-title");
  cardBodyEl.attr("class", "card-body");
  cardDescriptionEl.text(task.description);
  cardDescriptionEl.attr("class", "card-text");
  cardDueDateEl.attr("id", `dueDate${task.id}`);
  cardDueDateEl.attr("class", "text-center");
  cardDueDateEl.val(`${dayjs(task.dueDate).format("MM/DD/YYYY")}`);
  cardDeleteButton.attr("class", "btn btn-danger mt-2");
  cardDeleteButton.attr("id", `${task.id}`);
  cardDeleteButton.text("Delete");
  taskCardEl.attr("data-index", `${task.id}`);

  if (dayjs(task.dueDate).diff(dayjs(), "day") < 0) {
    taskCardEl.attr("class", "text-center card text-bg-danger mb-3");
  } else if (dayjs(task.dueDate).diff(dayjs(), "day") < 2) {
    taskCardEl.attr("class", "text-center card text-bg-warning mb-3");
  } else {
    taskCardEl.attr("class", "text-center card text-bg-dark mb-3");
  }

  console.log(dayjs().format("MM/DD/YYYY"));

  console.log(dayjs(task.dueDate).diff(dayjs(), "day"));

  cardBodyEl.append(cardTitleEl);
  cardBodyEl.append(cardDescriptionEl);
  cardBodyEl.append(cardDueDateEl);
  cardBodyEl.append(cardDeleteButton);
  taskCardEl.append(cardBodyEl);

  if (task.location === "todo") {
    todo.append(taskCardEl);
  } else if (task.location === "inProgress") {
    inProgress.append(taskCardEl);
  } else {
    done.append(taskCardEl);
  }

  $(function () {
    $(`#dueDate${task.id}`).datepicker({
      changeMonth: true,
      changeYear: true,
    });
  });

  if (taskList === null) {
    taskList = [];
  }
  taskList.concat(task);
  console.log(taskList);

  cardDeleteButton.on("click", handleDeleteTask);
  taskCardEl.on("mouseup", handleDrop);
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();
  const taskTitleEl = $("#taskTitle");
  const taskDueDateEl = $("#dueDate");
  const taskDescriptionEl = $("#taskDescription");
  const taskId = generateTaskId();
  const task = {
    title: taskTitleEl.val(),
    dueDate: taskDueDateEl.val(),
    description: taskDescriptionEl.val(),
    id: taskId,
    location: "todo",
    delete: false,
  };

  if (taskList === null) {
    taskList = [];
  }

  taskList.push(task);

  createTaskCard(task);

  localStorage.setItem("tasks", JSON.stringify(taskList));

  taskTitleEl.val("");
  taskDueDateEl.val("");
  taskDescriptionEl.val("");
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  console.log(event);
  const index = Number(event.target.attributes[1].nodeValue);
  taskList[index]["delete"] = true;
  console.log(taskList);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  event.target.offsetParent.textContent = "";
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  event.preventDefault();
  console.log(event);
  const parent = event.currentTarget.offsetParent.attributes[0].nodeValue;
  const index = Number(event.currentTarget.dataset.index);
  console.log(index);
  console.log(parent);
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {});

addTaskButton.on("click", handleAddTask);

$(function () {
  $(".dropable").sortable({
    connectWith: "ul",
    dropOnEmpty: true,
  });

  $("#todo-card, #in-progress-cards, #done-cards").disableSelection();
});

//event listener for change of due date to update color
// const inventory = [
//   { name: "apples", quantity: 2 },
//   { name: "bananas", quantity: 0 },
//   { name: "cherries", quantity: 5 },
// ];

// function isCherries(fruit) {
//   return fruit.name === "cherries";
// }

// console.log(inventory.find(isCherries));
// { name: 'cherries', quantity: 5 }
