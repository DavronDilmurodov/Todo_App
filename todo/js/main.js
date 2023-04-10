let elForm = elSelector(".form");
let elInput = elSelector(".input__main");
let elList = elSelector(".list");
let elTemplate = elSelector(".template").content;
let elCount = elSelector(".count");

let data = JSON.parse(localStorage.getItem("allTodo"));
let allTodo = data ? data : [];

let onEdit = (id) => {
  allTodo.forEach((todo) => {
    if (todo.id === id) {
      let editedTask = prompt("Edit Todo", todo.task);
      todo.task = editedTask;
    }
    onRender(allTodo);
    localStorage.setItem("allTodo", JSON.stringify(allTodo));
  });
};

let onDelete = (id) => {
  let arr = [];

  allTodo.forEach((todo) => {
    if (todo.id !== id) {
      arr.push(todo);
    }
  });
  allTodo = arr;
  onRender(arr);
  localStorage.setItem("allTodo", JSON.stringify(arr));
};

let onComplete = (id, isCompleted) => {
  allTodo.forEach((todo) => {
    if (todo.id === id) {
      todo.isCompleted = isCompleted;
    }
  });
  localStorage.setItem("allTodo", JSON.stringify(allTodo));
  onRender(allTodo);
};

let onRender = (arr) => {
  elList.innerHTML = null;
  elCount.textContent = arr.length;
  arr.forEach((item) => {
    let todo = elTemplate.cloneNode(true);
    let span = todo.querySelector(".span");
    let checkbox = todo.querySelector(".checkbox");
    let elLi = todo.querySelector(".todo");

    if (item.isCompleted) {
      span.classList.add("line-through");
    }

    checkbox.checked = item.isCompleted;

    span.textContent = item.task;
    elLi.dataset.id = item.id;

    elList.appendChild(todo);
  });
};

let onSumbit = (event) => {
  event.preventDefault();

  let inputValue = elInput.value.trim();

  if (!inputValue) {
    alert("Add Todo");
  }

  let newTodo = {
    id: allTodo.at(0) ? allTodo.at(0)?.id + 1 : 1,
    task: inputValue,
    isCompleted: false,
  };

  allTodo.unshift(newTodo);

  elInput.value = null;
  onRender(allTodo);
  localStorage.setItem("allTodo", JSON.stringify(allTodo));
};

let eventDelegation = (event) => {
  let parentElement = event.target.parentNode.closest(".todo");
  let elId = Number(parentElement.dataset.id);

  if (event.target.matches(".btn__edit")) {
    onEdit(elId);
  } else if (event.target.matches(".btn__delete")) {
    onDelete(elId);
  } else if (event.target.matches(".checkbox")) {
    onComplete(elId, event.target.checked);
  }
};

onRender(allTodo);
elForm.addEventListener("submit", onSumbit);
elList.addEventListener("click", eventDelegation);
