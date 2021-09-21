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

     container.appendChild(li);
   });
   
 }
}

const todoList = new TodoList();
todoList.displayList();