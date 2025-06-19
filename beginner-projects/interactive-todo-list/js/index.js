document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.querySelector("#task-input");
  const addTaskBtn = document.querySelector("#add-task");
  const taskList = document.querySelector("#task-list");

  // Função para salvar tarefas no localStorage
  function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll("#task-list li").forEach((task) => {
      tasks.push({
        text: task.firstChild.textContent,
        completed: task.classList.contains("completed"),
      });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Função para criar um item na lista, usada para adicionar e para carregar do storage
  function createTaskItem(task) {
    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.completed) {
      li.classList.add("completed");
    }

    li.addEventListener("click", () => {
      li.classList.toggle("completed");
      saveTasks();
    });

    const removeTaskBtn = document.createElement("button");
    removeTaskBtn.textContent = "❌";

    removeTaskBtn.addEventListener("click", () => {
      li.remove();
      saveTasks();
    });

    li.appendChild(removeTaskBtn);
    taskList.appendChild(li);
  }

  // Função para adicionar nova tarefa (quando o usuário clicar no botão)
  function addNewTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
      createTaskItem({ text: taskText, completed: false });
      taskInput.value = "";
      saveTasks();
    }
  }

  // Função para carregar tarefas do localStorage ao abrir a página
  function loadTask() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
      createTaskItem(task);
    });
  }

  //Eventos
  addTaskBtn.addEventListener("click", addNewTask);
  window.addEventListener("load", loadTask);
});
