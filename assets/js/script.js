console.log("is this working?");

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
  taskCardEl.attr("id", `taskCard${task.id}`);

  function colorCodeCard(task) {
    if (task.location === "done") {
      taskCardEl.attr("class", "text-center card text-bg-success mb-3");
    } else if (dayjs(task.dueDate).diff(dayjs(), "day") < 0) {
      taskCardEl.attr("class", "text-center card text-bg-danger mb-3");
    } else if (dayjs(task.dueDate).diff(dayjs(), "day") < 2) {
      taskCardEl.attr("class", "text-center card text-bg-warning mb-3");
    } else {
      taskCardEl.attr("class", "text-center card text-bg-dark mb-3");
    }
  }

  colorCodeCard(task);

  function handleChangeDueDate(event) {
    console.log(event);
    index = event.currentTarget.id.slice(7);
    console.log(index);
    taskList[index]["dueDate"] = cardDueDateEl.val();
    localStorage.setItem("tasks", JSON.stringify(taskList));
    colorCodeCard(taskList[index]);
  }

  // console.log(dayjs().format("MM/DD/YYYY"));

  // console.log(dayjs(task.dueDate).diff(dayjs(), "day"));

  cardBodyEl.append(cardTitleEl);
  cardBodyEl.append(cardDescriptionEl);
  cardBodyEl.append(cardDueDateEl);
  cardBodyEl.append(cardDeleteButton);
  taskCardEl.append(cardBodyEl);

  if (task.location === "to-do") {
    todo.append(taskCardEl);
  } else if (task.location === "in-progress") {
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
  // console.log(taskList);

  cardDeleteButton.on("click", handleDeleteTask);
  taskCardEl.on("mousemove", handleDrop);
  cardDueDateEl.on("change", handleChangeDueDate);
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList(taskList) {
  if (taskList !== null) {
    for (i = 0; i < taskList.length; i++) {
      if (taskList[i].delete === false) {
        task = taskList[i];
        createTaskCard(task);
      }
    }
  }
}

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
    location: "to-do",
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
  // console.log(event);
  const parent = event.currentTarget.offsetParent.id;
  const index = Number(event.currentTarget.dataset.index);
  // console.log(index);
  taskList[index]["location"] = parent;
  localStorage.setItem("tasks", JSON.stringify(taskList));
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

renderTaskList(taskList);

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
