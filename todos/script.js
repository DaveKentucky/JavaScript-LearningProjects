const inputEl = document.querySelector(".todo-input");
const listEl = document.querySelector(".todo-list");
const formEl = document.querySelector(".todo-form");
const deleteEl = document.querySelector(".delete");

const todos = JSON.parse(localStorage.getItem('todos'));
if(todos) {
    todos.forEach(todo => {
        addTodo(todo);
    })
}

formEl.addEventListener('submit', (element) => {
    element.preventDefault();
    addTodo();
})

deleteEl.addEventListener('click', () => {
    const todoListItemsEl = document.querySelectorAll('li');
    todoListItemsEl.forEach(listItem => {
        if(listItem.classList.contains('checked')) {
            listItem.remove();
        }
    });
    updateLocalStorage();
})

function addTodo(todo) {
    let todoText = inputEl.value;

    if(todo) {
        todoText = todo.text;
    }
    
    inputEl.value = '';
    
    if(todoText != '') {
        // create HTML elements
        const todoListEl = document.createElement('li');
        const checkboxEl = document.createElement('input');
        const checkboxLabelEl = document.createElement('label');
        // prepare unique ID for the checkbox
        const id = `checkbox${todoText.replace(/\s+/g, '').slice(0, 4)}`;
        // set checkbox's attributes
        checkboxEl.setAttribute('type', 'checkbox');
        checkboxEl.setAttribute('id', id);
        // set label's attributes
        checkboxLabelEl.setAttribute('for', id);
        checkboxLabelEl.append(todoText);
        // append list item with the checkbox and its label
        todoListEl.appendChild(checkboxEl);
        todoListEl.appendChild(checkboxLabelEl);
        // add item to the list
        listEl.appendChild(todoListEl);

        if(todo && todo.checked) {
            todoListEl.classList.add('checked');
        }
        checkboxEl.addEventListener('click', () => {
            todoListEl.classList.toggle('checked')
            updateLocalStorage();
        })

        updateLocalStorage();
    }
}

function updateLocalStorage() {
    const todos = [];
    const todoListItemsEl = document.querySelectorAll('.todo-list li');
    todoListItemsEl.forEach(item => {
        todos.push({
            text: item.innerText,
            checked: item.classList.contains('checked')
        });
    });

    localStorage.setItem('todos', JSON.stringify(todos));
    toggleDeleteVisibility();
}

function toggleDeleteVisibility() {
    const listItems = document.querySelectorAll('.todo-list li');
    if(listItems.length > 0) {
        deleteEl.style.display = 'block';
    }
    else {
        deleteEl.style.display = 'none';
    }
}