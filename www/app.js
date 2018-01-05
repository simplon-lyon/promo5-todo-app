"use strict"; // on active le mode strict de javascript https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Strict_mode

function saveTodoList(todoList) {
  let todoListJson = JSON.stringify(todoList);    // Convertir la donnée en string (JSON)
  localStorage.setItem("todoList", todoListJson); // Enregistrer la donnée convertie dans le localStorage
}

function getTodoList() {
  let todoJson = localStorage.getItem("todoList"); // Récupération du contenu de la clé "todoList" dans le localStorage
  let todoList = JSON.parse(todoJson); // Convertir la donnée JSON en donnée javascript
  // si le localStorage est vide, alors notre todoList est un tableau vide
  if (!todoList) {
    todoList = [];
  }
  // on retourne la todoList à l'instruction qui à appelée la fonction
  return todoList;
}

function addTodo(title, description) {
  // on ajoute un todo dans la liste présente dans le localStorage
  let newTodo = {isDone: false};
  newTodo.title = title;
  newTodo.description = description;
  // on récupère la list du localStorage
  let todoList = getTodoList();
  // on push le nouveau todo dans la liste
  todoList.push(newTodo);
  // on enregistre la liste dans le local storage
  saveTodoList(todoList);
  // on rafraichi l'affichage de la todo list
  updateDisplay();
}

function checkTodo(index) {
  let todoList = getTodoList();

  todoList[index]["isDone"] = !todoList[index]["isDone"];
  console.log(todoList[index]["isDone"]);
  
  saveTodoList(todoList);
}

function deleteTodo() {
  let todoList = getTodoList();

  for (let index = 0; index < todoList.length; index++) {
    if (todoList[index].isDone) {
      todoList.splice(index,0);
      index--;
    }
  }

  saveTodoList(todoList);
  updateDisplay();
}

function updateDisplay() {
  let todoList = getTodoList();
  let ul = document.querySelector("ul");
  // on supprime tout les items déjà présent dans la liste HTML
  while (ul.firstChild) {
    ul.firstChild.remove();
  }

  todoList.forEach(function(todo, index) {
    // on créé les éléments HTML qui composent notre todo
    let li = document.createElement("li");
    let div = document.createElement("div");
    let h2 = document.createElement("h2");
    let p = document.createElement("p");
    let checkbox = document.createElement("input");
    // on précise que l'input est une checkbox en ajoutant l'attribut type="checkbox" sur l'input
    checkbox.setAttribute("type", "checkbox");
    //
    checkbox.setAttribute("onchange", "checkTodo(" + index + ")");
    // si le todo est fini (isDone === true) alors on ajoute l'attribut checked à notre checkbox
    if (todo.isDone) {
      checkbox.setAttribute("checked", "");
    }

    // on ajoute le titre et la description du todo à nos éléments HTML
    h2.textContent = todo.title;
    p.textContent = todo.description;

    // on ajoute les éléments à notre liste HTML
    ul.appendChild(li);
    li.appendChild(div);
    li.appendChild(checkbox);
    div.appendChild(h2);
    div.appendChild(p);
  });
}

let form = document.querySelector("form"); // Récupération du formulaire dans le DOM

form.addEventListener("submit", function(event) {

  let title = document.querySelector("form input[name=title]").value;
  let description = document.querySelector("form input[name=description]").value;

  event.preventDefault(); // on stoppe le comportement par défaut du submit
  form.reset(); // comme le submit ne vide plus le formulaire, on le vide à la main
  // on ajoute le todo à la todo list dans le localStorage
  addTodo(title, description);

});

let deleteButton = document.querySelector("input[type=button]");

deleteButton.addEventListener("click", function(event) {
  deleteTodo();
});

// on affiche la todo list à l'ouverture de la page
updateDisplay();