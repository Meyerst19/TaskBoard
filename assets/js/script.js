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
    nextId = [0];
  }
  console.log(nextId);
  nextId.push(nextId.length);
  localStorage.setItem("nextId", JSON.stringify(nextId));
  return nextId.length - 1;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  const taskCardEl = $("<div>");
  const cardTitleElRow = $("<div>");
  const cardTitleElCol = $("<div>");
  const cardTitleEl = $("<h3>");
  const cardDescriptionElRow = $("<div>");
  const cardDescriptionElCol = $("<div>");
  const cardDescriptionEl = $("<p>");
  const cardDueDateElRow = $("<div>");
  const cardDueDateElCol = $("<div>");
  const cardDueDateEl = $("<input>");
  const cardDeleteButtonRow = $("<div>");
  const cardDeleteButtonCol = $("<div>");
  const cardDeleteButton = $("<button>");

  cardTitleEl.text(task.title);
  cardTitleEl.attr("class", "card-title bg-info-subtle text-info-emphasis");
  cardDescriptionEl.text(task.description);
  cardDescriptionEl.attr(
    "class",
    "card-text bg-info-subtle text-info-emphasis"
  );
  cardDueDateEl.attr("id", `dueDate${task.id}`);
  cardDueDateEl.attr("class", "text-center");
  cardDueDateEl.val(`${dayjs(task.dueDate).format("MM/DD/YYYY")}`);
  cardDeleteButton.attr("class", "btn btn-danger");
  cardDeleteButton.attr("id", `deleteButton${task.id}`);
  cardDeleteButton.text("Delete");
  taskCardEl.attr("id", `card${task.id}`);
  taskCardEl.attr("class", "container text-center card");
  cardTitleElRow.attr("class", "row");
  cardTitleElCol.attr("class", "col");
  cardDescriptionElRow.attr("class", "row");
  cardDueDateElRow.attr("class", "row");
  cardDeleteButtonRow.attr("class", "row");
  cardDescriptionElCol.attr("class", "col");
  cardDueDateElCol.attr("class", "col");
  cardDeleteButtonCol.attr("class", "col");

  console.log(dayjs(task.dueDate).format("MM/DD/YYYY"));

  cardTitleElCol.append(cardTitleEl);
  cardDescriptionElCol.append(cardDescriptionEl);
  cardDueDateElCol.append(cardDueDateEl);
  cardDeleteButtonCol.append(cardDeleteButton);
  cardTitleElRow.append(cardTitleElCol);
  cardDescriptionElRow.append(cardDescriptionElCol);
  cardDueDateElRow.append(cardDueDateElCol);
  cardDeleteButtonRow.append(cardDeleteButtonCol);
  taskCardEl.append(cardTitleElRow);
  taskCardEl.append(cardDescriptionElRow);
  taskCardEl.append(cardDueDateElRow);
  taskCardEl.append(cardDeleteButtonRow);
  task.location.append(taskCardEl);

  $(function () {
    $(`#dueDate${task.id}`).datepicker({
      changeMonth: true,
      changeYear: true,
    });
  });
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();
  const taskTitleEl = $("#taskTitle");
  const taskDueDateEl = $("#dueDate");
  const taskDescriptionEl = $("#taskDescription");
  const taskId = [generateTaskId()];
  const task = {
    title: taskTitleEl.val(),
    dueDate: taskDueDateEl.val(),
    description: taskDescriptionEl.val(),
    id: taskId,
    location: todo,
    delete: false,
  };

  if (taskList === null) {
    taskList = [];
  }

  taskList.push(task);
  console.log(taskList);
  createTaskCard(task);

  taskTitleEl.val("");
  taskDueDateEl.val("");
  taskDescriptionEl.val("");
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

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

//bg-info-subtle
