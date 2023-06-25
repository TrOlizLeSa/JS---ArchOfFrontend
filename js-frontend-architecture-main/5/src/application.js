import uniqueId from 'lodash/uniqueId.js';

const renderLists = (about, elements) => {
  elements.listsContainer.innerHTML = '';
  const ul = document.createElement('ul');

  about.lists.forEach(({ number, name }) => {
    const li = document.createElement('li');
    let listItemContent;

    if (number === about.current) {
      listItemContent = document.createElement('b');
      listItemContent.textContent = name;
    } else {
      listItemContent = document.createElement('a');
      listItemContent.setAttribute('href', `#${name.toLowerCase()}`);
      listItemContent.textContent = name;
      listItemContent.addEventListener('click', (e) => {
        e.preventDefault();
        about.current = number;
        renderLists(about, elements);
        renderTasks(about, elements);
      });
    }

    li.append(listItemContent);
    ul.append(li);
  });

  elements.listsContainer.append(ul);
};

const renderTasks = (about, elements) => {
  elements.tasksContainer.innerHTML = '';

  const filteredTasks = about.tasks.filter(({ listId }) => listId === about.current);
  if (filteredTasks.length === 0) return;

  const ul = document.createElement('ul');
  filteredTasks.forEach(({ name }) => {
    const li = document.createElement('li');
    li.textContent = name;
    ul.append(li);
  });

  elements.tasksContainer.append(ul);
};

const addNewList = (about, form, elements) => {
  const value = form.querySelector('input').value;

  const listExists = about.lists.some(item => item.name === value);
  if (!listExists) {
    const list = { number: uniqueId(), name: value };
    about.lists.push(list);
    renderLists(about, elements);
  }

  form.reset();
  form.focus();
};

const addNewTask = (about, form, elements) => {
  const taskName = form.querySelector('input').value;
  const task = { number: uniqueId(), name: taskName, listId: about.current };
  about.tasks.push(task);
  renderTasks(about, elements);

  form.reset();
  form.focus();
};

const todolist = () => {
  const number = uniqueId();
  const about = {
    current: number,
    lists: [{ number: number, name: 'General' }],
    tasks: [],
  };

  const elements = {
    listsContainer: document.querySelector('[data-container="lists"]'),
    tasksContainer: document.querySelector('[data-container="tasks"]'),
  };

  const newListForm = document.querySelector('[data-container="new-list-form"]');
  const newTaskForm = document.querySelector('[data-container="new-task-form"]');

  renderLists(about, elements);
  renderTasks(about, elements);

  newListForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addNewList(about, newListForm, elements);
  });

  newTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addNewTask(about, newTaskForm, elements);
  });
};

export default todolist;
