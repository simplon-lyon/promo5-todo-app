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
  let todoJson = localStorage.getItem("todos"); // Récupération du contenu de la clé "todos" dans le localStorage
  return JSON.parse(todoJson); // Convertir la donnée JSON en donnée javascript
}

let form = document.querySelector("form"); // Récupération du formulaire dans le DOM

form.addEventListener("submit", function(event) {

  let newTodo = {
    title: document.querySelector("form input[name=title]").value, // on créé l'objet todo à partir des données du formulaire
    description: document.querySelector("form input[name=description]").value,
    isDone: false // un todo n'est pas terminé lorsqu'il est créé
  };

  event.preventDefault(); // on stoppe le comportement par défaut du submit
  form.reset(); // comme le submit ne vide plus le formulaire, on le vide à la main

  console.log(newTodo);
});