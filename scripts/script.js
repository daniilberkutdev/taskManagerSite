'use strict';

document.addEventListener('DOMContentLoaded', () => {
	const add_task = document.querySelector('.add-task'),
		task_list = document.querySelector('.task-item-list'),
		task_arr = JSON.parse(localStorage.getItem('tasks')) || [];

	function addTaskToList(e) {
		e.preventDefault();
		let text = e.target.task.value;
		let task = {
			id: Date.now(),
			text: text,
			checked: false,
		};

		task_arr.push(task);
		this.reset();

		localStorage.setItem('tasks', JSON.stringify(task_arr));
		refreshList(task_arr, task_list);
	}

	function refreshList(tasks, tasksList) {
		if (tasks.length === 0) tasksList.innerHTML = 'Пусто';
		else {
			tasksList.innerHTML = '';
			tasks.forEach((task) => {
				tasksList.innerHTML += `<li data-index="${task.id}" class='task-item'>
						<label for="item${task.id}">
							<input type="checkbox" id="item${task.id}" data-index="${task.id}" ${task.checked ? 'checked' : ''}> ${task.text} 
						</label>
						<label for="nothing"> ${getTimeCreation(task.id)}
							<input type="button" value="X" class="delete-task-btn">
						</label>
					</li>`;
			});
		}
	}

	function getTimeCreation(timestamp) {
		let time = {
			hours: new Date(timestamp).getHours() > 10 ? new Date(timestamp).getHours() : '0' + new Date(timestamp).getHours(),
			minutes: new Date(timestamp).getMinutes() > 10 ? new Date(timestamp).getMinutes() : '0' + new Date(timestamp).getMinutes(),
			seconds: new Date(timestamp).getSeconds() > 10 ? new Date(timestamp).getSeconds() : '0' + new Date(timestamp).getSeconds(),
		};
		return `${time.hours}:${time.minutes}:${time.seconds}`;
	}

	function toggleClick(e) {
		if (!e.target.matches('input')) return;
		else if (e.target.classList.contains('delete-task-btn')) {
			deleteTask(e.target.parentNode.parentNode);
		} else {
			task_arr.forEach((task, index) => {
				if (+task.id === +e.target.dataset.index) {
					task_arr[index].checked = !task_arr[index].checked;
					return;
				}
			});
			localStorage.setItem('tasks', JSON.stringify(task_arr));
			refreshList(task_arr, task_list);
		}
	}

	function deleteTask(taskToDelete) {
		task_arr.forEach((task, index) => {
			if (+task.id === +taskToDelete.dataset.index) {
				task_arr.splice(index, 1);
				return;
			}
		});
		localStorage.setItem('tasks', JSON.stringify(task_arr));
		refreshList(task_arr, task_list);
	}

	add_task.addEventListener('submit', addTaskToList);
	task_list.addEventListener('click', toggleClick);
	refreshList(task_arr, task_list);
});
