import { saveToStorage, getTodos } from './update';

export const handleDragStart = (evt) => {
  evt.dataTransfer.setData('text/plain', evt.target.dataset.index);
};

export const sortList = () => {
  const lists = document.querySelectorAll('.todoList li');
  lists.forEach((list, index) => {
    list.dataset.index = index;
    list.querySelector('input').id = `todo-${index}`;
    list.querySelector('label').setAttribute('for', `todo-${index}`);
  });
};

export const cancelDefault = (e) => {
  e.preventDefault();
  e.stopPropagation();
  return false;
};

export const handleDrop = (e) => {
  cancelDefault(e);
  const todos = getTodos();

  // get new and old index
  const oldIndex = e.dataTransfer.getData('text/plain');
  let newIndex = e.target.parentElement.dataset.index;

  if (!newIndex) {
    newIndex = e.target.closest('li').dataset.index;
  }

  const ul = document.querySelector('.todoList');
  const draggedLi = ul.children[oldIndex];
  const droppedLi = ul.children[newIndex];
  droppedLi.before(draggedLi);

  const currentTodo = todos.find((td) => td.index === parseInt(oldIndex, 10));

  todos.forEach((td) => {
    if (oldIndex < newIndex) {
      if (td === currentTodo) {
        td.index = parseInt(newIndex, 10) - 1;
      } else if (td.index > oldIndex && td.index < newIndex) {
        td.index -= 1;
      }
    } else if (oldIndex > newIndex) {
      if (td === currentTodo) {
        td.index = parseInt(newIndex, 10);
      } else if (td.index < oldIndex && td.index >= newIndex) {
        td.index += 1;
      }
    }
  });

  sortList();
  saveToStorage(todos);
};
