import { handleDragStart, handleDrop, cancelDefault } from './services/sort';
import {
  updateStatus, getTodos, saveToStorage, orderAndSave,
} from './services/update';
import {
  createTodo, clearAll, clearList, editTodoInStorage,
  editTodoInList, deleteTodoFromStorage, deleteTodoFromList,
} from './services/todoService';
import './style.css';

class TodoList {
  constructor() {
    this.todos = getTodos();
  }

 handleCompletedStatus = (e) => {
   const todos = getTodos();
   updateStatus(e, todos);
 }

 handleEditTodo = (e) => {
   if (e.keyCode === 13) {
     const { value } = e.target;
     const index = parseInt(e.target.dataset.index, 10) - 1;
     editTodoInStorage(value, index);
     editTodoInList(value, index);
   }
 }

 handleDeleteTodo = (e) => {
   const index = parseInt(e.target.dataset.index, 10) - 1;
   deleteTodoFromList(index);
   deleteTodoFromStorage(index);
 }

 handleClearAllCompleted = () => {
   const todos = getTodos();
   const filteredTodos = clearAll(todos);
   orderAndSave(filteredTodos);
   clearList();
   this.displayList();
 }

 handleNewTodo = (e) => {
   const todos = getTodos();
   if (e.keyCode === 13) {
     const newTodo = createTodo(e.target.value, todos);
     e.target.value = '';
     todos.push(newTodo);
     clearList();
     saveToStorage(todos);
     this.displayList();
   }
 }

 displayList() {
   const container = document.querySelector('.todoList');
   getTodos().forEach((todo, index) => {
     const li = document.createElement('li');
     li.innerHTML = `
                  <div class="task-item">
                    <div class="task-info">
                        <div class="check-container">
                        <input id=todo-${todo.index} type="checkbox" ${todo.completed ? 'checked' : ''}>
                        <label for="todo-${todo.index}" class="checkmark"></span>
                        </div>
                        <div class="input-container">
                        <div>${todo.description}</div>
                        <input data-index="${todo.index}"type="text" class="edit" value="${todo.description}" />
                        </div>
                    </div>
                    <div class="icons">
                      <i class="far fa-trash-alt todo-delete" data-index="${todo.index}"></i>
                      <i class="fas fa-ellipsis-v"></i>
                    </div>
                  </div>
                `;
     li.draggable = true;
     li.dataset.index = index;
     li.addEventListener('dragstart', handleDragStart);
     li.addEventListener('drop', handleDrop);
     li.addEventListener('dragenter', cancelDefault);
     li.addEventListener('dragover', cancelDefault);
     container.appendChild(li);
   });
   document.querySelectorAll('input[type="checkbox"]').forEach((check) => {
     check.addEventListener('change', this.handleCompletedStatus, false);
   });
   document.querySelector('#newTodo').addEventListener('keypress', this.handleNewTodo, false);

   document.querySelector('#clear-all').addEventListener('click', this.handleClearAllCompleted, false);

   document.querySelectorAll('input.edit').forEach((input) => {
     input.addEventListener('keypress', this.handleEditTodo, false);
   });

   document.querySelectorAll('.todo-delete').forEach((trash) => {
     trash.addEventListener('click', this.handleDeleteTodo, false);
   });
 }
}

const todoList = new TodoList();
todoList.displayList();