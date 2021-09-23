import {
  getTodos, orderAndSave, save,
} from './update';

export const createTodo = (desc, todos) => ({
  index: todos.length + 1,
  description: desc,
  completed: false,
});

export const editTodoInStorage = (desc, index) => {
  const todos = getTodos();
  const editedTodos = todos.map((todo) => {
    if (todo.index === index) {
      todo.description = desc;
    }
    return todo;
  });
  save(editedTodos);
};

export const editTodoInList = (desc, index) => {
  document.querySelector(`[data-index="${index}"] .task-info .input-container div:first-child`).textContent = desc;
  document.querySelector(`[data-index="${index}"]:is(input)`).value = desc;
};

export const deleteTodoFromStorage = (index) => {
  const todos = getTodos();
  const filteredTodos = todos.filter((todo) => todo.index !== index);
  orderAndSave(filteredTodos);
};

export const deleteTodoFromList = (index) => {
  const ul = document.querySelector('.todoList');
  const li = document.querySelector(`[data-index="${index}"]:is(li)`);
  ul.removeChild(li);
};

export const clearAll = (todos) => todos.filter((todo) => !todo.completed);

export const clearList = () => {
  document.querySelector('.todoList').innerHTML = '';
};
