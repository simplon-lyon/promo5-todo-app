"use strict"; // on active le mode strict de javascript https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Strict_mode

function saveTodoList(todoList) {
  // Convertir la donnée en string (JSON)
  let todoListJson = JSON.stringify(todoList);
  // Enregistrer la donnée convertie dans le localStorage
  localStorage.setItem("todoList", todoListJson);
}

function getTodoList() {
  // Récupération du contenu de la clé "todoList" dans le localStorage
  let todoJson = localStorage.getItem("todoList");
  // Convertir la donnée JSON en donnée javascript
  let todoList = JSON.parse(todoJson);
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
  // on récupère la todo list
  let todoList = getTodoList();
  // on inverse la propriété isDone du todo de rang index dans todoList
  todoList[index]["isDone"] = !todoList[index]["isDone"];
  // on sauvegarde la todo list modifiée dans le localStorage
  saveTodoList(todoList);
}

function deleteTodo() {
  // on récupère la todo list
  let todoList = getTodoList();
  // pour chaque todo de notre todo list
  for (let index = 0; index < todoList.length; index++) {
    // si la propriété isDone est vraie, on retire le todo du tableau
    if (todoList[index].isDone) {
      todoList.splice(index,1);
      // /!\ lorsqu'on retire un todo du tableau, on décrémente l'index pour ne pas sauter d'élément
      index--;
    }
  }
  // on sauvegarde la todo list modifiée dans le localStorage
  saveTodoList(todoList);
  // et on met à jour l'affichage
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
    // on ajoute l'événement "onchange" dans le layout.
    // L'appel de la fonction checkTodo() se fait dans le HTML, c'est pour cela qu'on cherche à éviter au maximum
    // de créer des événments dans le HTML : le code est morcelé dans plusieurs fichiers...
    // On passe l'index en paramètre de la fonction checkTodo() afin de retrouver le todo à "checker"
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
// Récupération du formulaire dans le DOM
let form = document.querySelector("form");
// On ajoute un écouteur d'évenement sur l'évenement "submit" du form
form.addEventListener("submit", function(event) {
  // On récupère la valeur des inputs contenant le titre et la descritption du todo
  let title = document.querySelector("form input[name=title]").value;
  let description = document.querySelector("form input[name=description]").value;
  // on stoppe le comportement par défaut du submit
  event.preventDefault();
  // comme le submit ne vide plus le formulaire, on le vide à la main
  form.reset();
  // on ajoute le todo à la todo list dans le localStorage
  addTodo(title, description);

});
// Récupèration du bouton de suppression dans le DOM
let deleteButton = document.querySelector("input[type=button]");
// On ajoute un écouteur d'événement sur l'événement "click" du bouton
deleteButton.addEventListener("click", function(event) {
  // on supprime les todos qui ont isDone à true
  deleteTodo();
});

// on affiche la todo list à l'ouverture de la page
updateDisplay();