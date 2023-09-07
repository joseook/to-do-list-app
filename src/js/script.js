const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

addTask = () => {
    const task = inputBox.value;
    if (task) {
        const li = document.createElement('li');
        
        // Adicionar ícone de tarefa não concluída
        const icon = document.createElement('span');
        icon.classList.add('task-icon', 'unchecked-icon');
        li.appendChild(icon);
        
        // Adicionar texto da tarefa
        li.appendChild(document.createTextNode(task + " (Criado em: " + new Date().toLocaleString() + ")"));
        
        listContainer.appendChild(li);
        inputBox.value = '';
        
        let span = document.createElement('span');
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        span.addEventListener('click', () => {
            li.remove();
            saveData();
        });

        li.addEventListener('dblclick', () => {
            const taskIcon = li.querySelector('.task-icon');
            if (li.classList.contains('checked')) {
                li.classList.remove('checked');
                taskIcon.classList.remove('checked-icon');
                taskIcon.classList.add('unchecked-icon');
            } else {
                li.classList.add('checked');
                taskIcon.classList.remove('unchecked-icon');
                taskIcon.classList.add('checked-icon');
            }
            saveData();
        });

    } else {
        alert('Please enter a task');
    }
    saveData();
}

saveData = () => {
    localStorage.setItem('tasks', listContainer.innerHTML);
}

loadData = () => {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
        listContainer.innerHTML = tasks;
        reattachEvents();
    } else {
        listContainer.innerHTML = '';
    }
}

reattachEvents = () => {
    const listItems = listContainer.querySelectorAll('li');
    listItems.forEach(li => {
        const span = li.querySelector('span:not(.task-icon)');
        span.addEventListener('click', () => {
            li.remove();
            saveData();
        });

        li.addEventListener('dblclick', () => {
            const taskIcon = li.querySelector('.task-icon');
            if (li.classList.contains('checked')) {
                li.classList.remove('checked');
                taskIcon.classList.remove('checked-icon');
                taskIcon.classList.add('unchecked-icon');
            } else {
                li.classList.add('checked');
                taskIcon.classList.remove('unchecked-icon');
                taskIcon.classList.add('checked-icon');
            }
            saveData();
        });
    });
}

filterTasks = (filterType) => {
    const tasks = listContainer.querySelectorAll('li');
    tasks.forEach(task => {
        switch (filterType) {
            case 'all':
                task.style.display = 'list-item';
                break;
            case 'completed':
                if (task.classList.contains('checked')) {
                    task.style.display = 'list-item';
                } else {
                    task.style.display = 'none';
                }
                break;
            case 'pending':
                if (!task.classList.contains('checked')) {
                    task.style.display = 'list-item';
                } else {
                    task.style.display = 'none';
                }
                break;
        }
    });
}

sortTasks = (sortType) => {
    let tasks = Array.from(listContainer.querySelectorAll('li'));
    if (sortType === 'alpha') {
        tasks.sort((a, b) => a.textContent.localeCompare(b.textContent));
    }
    listContainer.innerHTML = '';
    tasks.forEach(task => listContainer.appendChild(task));
}

window.onload = loadData;
