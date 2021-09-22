import './style.css';

class TodoList {
  constructor() {
    this.todos = [
      { description: 'Item 1', completed: false, index: 1 },
      { description: 'Item 2', completed: false, index: 2 },
      { description: 'Item 3', completed: false, index: 3 },
    ];
  }

  displayList() {
    const container = document.querySelector('.todoList');
    this.todos.forEach((todo) => {
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