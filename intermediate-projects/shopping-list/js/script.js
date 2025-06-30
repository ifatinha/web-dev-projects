document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#shopping-form");
  const inputItem = document.querySelector("#item-input");
  const addButton = document.querySelector("#addBtn");
  const list = document.querySelector("#shopping-list");
  let items = [];

  if (!form || !inputItem || !addButton || !list) {
    console.error("Elementos do DOM não encontrados.");
    return;
  }

  // Função para salvar os itens no localStorage
  function saveItems() {
    localStorage.setItem("shoppingList", JSON.stringify(items));
  }

  // Função para adicionar um item a lista
  function addItem(text, completed = false) {
    const item = {
      text: text,
      completed,
    };

    items.push(item);
    saveItems();
    addItemToDom(item);
  }

  // Função para alternar estado de conclusão de um item
  function toggleCompleted(id, li) {
    items = items.map((item) => {
      if (item.id === id) {
        item.completed = !item.completed;
        li.classList.toggle("completed");
      }

      return item;
    });

    saveItems();
  }

  // Função para remover um item da lista
  function removeItem(id, li) {
    items = items.filter((item) => item.id !== id);
    list.removeChild(li);
    saveItems();
  }

  // Função para adicionar um item ao DOM
  function addItemToDom(item) {
    const li = document.createElement("li");
    li.textContent = item.id;
    li.className = item.completed ? "completed" : "";

    const span = document.createElement("span");
    span.textContent = item.text;
    span.className = "list-item-text";

    span.addEventListener("click", () => {
      toggleCompleted(item.id, li);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "&times;";
    deleteBtn.className = "delete-btn";

    deleteBtn.addEventListener("click", () => {
      removeItem(item.id, li);
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  }

  // Função para carregar o item no
  function loadItems() {
    const storedItems = localStorage.getItem("shoppingList");
    if (storedItems) {
      items = JSON.parse(storedItems);
      items.forEach((item) => addItemToDom(item));
    }
  }

  // Evento de submit do formulário
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = inputItem.value.trim();
    if (text === "") {
      alert("Por favor, insira um item.");
      return;
    }
    addItem(text);
    inputItem.value = "";
    inputItem.focus();
  });

  loadItems();
});
