import { v4 as uuidV4 } from 'uuid'

type Task = {
  taskId: string,
  taskName: string,
  done: boolean,
  creationDate: Date
};

const list = document.querySelector<HTMLUListElement>("#list");
const form = document.getElementById("new-task-form") as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>("#new-task-title");
const tasks: Task[] = loadTasks();
tasks.forEach(addTask);




form?.addEventListener("submit", e => {
  e.preventDefault();
  if (!input || input.value === null || input.value === "") return;
  const newTask: Task = {
    taskId: uuidV4(),
    taskName: input.value,
    done: false,
    creationDate: new Date()
  }
  tasks.push(newTask);
  addTask(newTask);
  input.value = "";
}
)

function addTask(task: Task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.addEventListener("change", () => {
    task.done = checkBox.checked;
    saveTasks();
  }
  )
  checkBox.checked = task.done;
  label.append(checkBox, task.taskName);
  item.append(label);
  list?.append(item);
}

function saveTasks() {
  localStorage.setItem("Tasks", JSON.stringify(tasks))
}


function loadTasks(): Task[] {
  const taskJson = localStorage.getItem("Tasks");
  if (taskJson === null) return [];
  return JSON.parse(taskJson);
}
