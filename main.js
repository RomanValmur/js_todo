window.addEventListener('DOMContentLoaded', () => {
  const todoForm = document.querySelector('#task-form');
  const todoInput = document.querySelector('#task-input');
  const todoList = document.querySelector('.todo__list');
  const todoCounter = document.querySelector('.footer__counter');
  const filterAllButton = document.querySelector('#filter-all');
  const filterActiveButton = document.querySelector('#filter-active');
  const filterCompletedButton = document.querySelector('#filter-completed');
  const clearTodosButton = document.querySelector('#clear-todos');

  let todos = [
    { id: 0, text: '0', isDone: true },
    { id: 1, text: '1', isDone: false },
    { id: 2, text: '2', isDone: true },
    { id: 3, text: '3', isDone: false },
    { id: 4, text: '4', isDone: false },
    { id: 5, text: '5', isDone: true },
  ];

  let filterActiveTodos = () => todos.filter((todo) => todo.isDone === false);
  let filterCompletedTodos = () => todos.filter((todo) => todo.isDone === true);
  let getActiveTodosCount = () => filterActiveTodos().length;

  let nextId = 6;
  let filter = 'all';

  function renderList(list) {
    todoList.innerHTML = '';

    for (let i = 0; i < list.length; i++) {
      const todoItem = document.createElement('li');
      const checkbox = document.createElement('input');
      const deleteButton = document.createElement('button');
      const deleteIcon = document.createElement('img');

      function deleteTodo() {
        let nextTodos = todos.filter((todo) => todo.id !== list[i].id);
        todos = nextTodos;
        renderList(
          filter === 'all'
            ? nextTodos
            : filter === 'active'
            ? filterActiveTodos()
            : filterCompletedTodos()
        );
      }

      function toggleIsDone() {
        if (checkbox.checked) {
          list[i].isDone = true;
          todoItem.classList.add('todo__item_completed');
          renderList(
            filter === 'all'
              ? nextTodos
              : filter === 'active'
              ? filterActiveTodos()
              : filterCompletedTodos()
          );
        } else {
          list[i].isDone = false;
          todoItem.classList.remove('todo__item_completed');
          renderList(
            filter === 'all'
              ? nextTodos
              : filter === 'active'
              ? filterActiveTodos()
              : filterCompletedTodos()
          );
        }
        showTodoCounter();
      }

      todoItem.classList.add('todo__item');
      if (list[i].isDone) {
        checkbox.checked = true;
        todoItem.classList.add('todo__item_completed');
      }
      checkbox.type = 'checkbox';
      checkbox.id = `check-${i}`;
      checkbox.name = 'completed';
      deleteButton.classList.add('item__delete-button');
      deleteIcon.src = 'delete.png';
      deleteIcon.alt = 'delete icon';
      deleteIcon.width = '16';
      deleteIcon.height = '16';

      todoItem.append(checkbox);
      todoItem.append(list[i].text);
      deleteButton.append(deleteIcon);
      todoItem.append(deleteButton);

      deleteButton.addEventListener('click', deleteTodo);
      checkbox.addEventListener('click', toggleIsDone);

      todoList.append(todoItem);
    }

    todoInput.value = '';
    showTodoCounter();
  }

  function addTask(event) {
    event.preventDefault();
    if (todoInput.value) {
      todos.push({
        id: nextId,
        text: todoInput.value,
        isDone: false,
      });
      renderList(todos);
    }
  }

  function clearTodos() {
    todos = [];
    renderList(todos);
  }

  function showTodoCounter() {
    todoCounter.textContent = `${getActiveTodosCount()} items left`;
  }

  function showAllTodos() {
    if (filter === 'all') return;
    renderList(todos);
    filter = 'all';
  }

  function showActiveTodos() {
    if (filter === 'active') return;
    renderList(filterActiveTodos());
    filter = 'active';
  }

  function showCompletedTodos() {
    if (filter === 'comleted') return;
    renderList(filterCompletedTodos());
    filter = 'completed';
  }

  clearTodosButton.addEventListener('click', clearTodos);
  todoForm.addEventListener('submit', addTask);
  filterAllButton.addEventListener('click', showAllTodos);
  filterActiveButton.addEventListener('click', showActiveTodos);
  filterCompletedButton.addEventListener('click', showCompletedTodos);

  renderList(todos);
});
