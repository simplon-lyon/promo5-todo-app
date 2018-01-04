"use strict";

// let todoList = [
//   {title: "to do", description: "a thing to do.", isDone: false},
//   {title: "to do", description: "a thing to do.", isDone: false},
//   {title: "to do", description: "a thing to do.", isDone: false},
//   {title: "to do", description: "a thing to do.", isDone: false},
//   {title: "to do", description: "a thing to do.", isDone: false},
//   {title: "to do", description: "a thing to do.", isDone: false},
//   {title: "to do", description: "a thing to do.", isDone: false}
// ];

let todo = {title: "to do", description: "a thing to do.", isDone: false};

function setTodos(todos) {
  let todoJson = JSON.stringify(todos);    // Convertir la donnée en string (JSON)
  localStorage.setItem("todos", todoJson); // Enregistrer la donnée convertie dans le localStorage
}

function getTodos() {
  let todoJson = localStorage.getItem("todos"); // Récupérer le contenu de la clé "todos" dans le localStorage
  return JSON.parse(todoJson); // Convertir la donnée JSON en donnée javascript
}

document.querySelector("form").addEventListener("submit", function(event) {
  let newTodoTitle = document.querySelector("form input[name=title]").value;
  let newTodoDescription = document.querySelector("form input[name=description]").value;
  event.preventDefault();
});