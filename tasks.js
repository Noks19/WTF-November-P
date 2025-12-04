  document.addEventListener('DOMContentLoaded', function() {
            // DOM Elements
            const addTaskBtn = document.getElementById('add-task-btn');
            const addTaskForm = document.getElementById('add-task-form');
            const cancelTaskBtn = document.getElementById('cancel-task');
            const saveTaskBtn = document.getElementById('save-task');
            const taskTitleInput = document.getElementById('task-title');
            const taskDueInput = document.getElementById('task-due');
            const activeTasksList = document.getElementById('active-tasks');
            const completedTasksList = document.getElementById('completed-tasks');
            const taskTabs = document.querySelectorAll('.task-tab');
            const taskLists = document.querySelectorAll('.task-list');
            const emptyActive = document.getElementById('empty-active');
            const emptyCompleted = document.getElementById('empty-completed');
            const addFirstTaskBtn = document.getElementById('add-first-task');
            const activeCountElem = document.getElementById('active-count');
            const completedCountElem = document.getElementById('completed-count');
            const aiSummaryText = document.getElementById('ai-summary-text');
            
            // Sample tasks data
            let tasks = [
                { id: 1, text: "Prepare presentation for Monday meeting", due: "Today", completed: false },
                { id: 2, text: "Review quarterly reports", due: "Tomorrow", completed: false }
            ];
            
            // Initialize the task manager
            function init() {
                updateTaskLists();
                updateStats();
                updateAISummary();
            }
            
            // Update task lists
            function updateTaskLists() {
                // Clear lists
                activeTasksList.innerHTML = '';
                completedTasksList.innerHTML = '';
                
                // Filter tasks
                const activeTasks = tasks.filter(task => !task.completed);
                const completedTasks = tasks.filter(task => task.completed);
                
                // Render active tasks
                if (activeTasks.length > 0) {
                    activeTasks.forEach(task => {
                        activeTasksList.appendChild(createTaskElement(task));
                    });
                    emptyActive.style.display = 'none';
                } else {
                    emptyActive.style.display = 'block';
                }
                
                // Render completed tasks
                if (completedTasks.length > 0) {
                    completedTasks.forEach(task => {
                        completedTasksList.appendChild(createTaskElement(task));
                    });
                    emptyCompleted.style.display = 'none';
                } else {
                    emptyCompleted.style.display = 'block';
                }
            }
            
            // Create a task element
            function createTaskElement(task) {
                const taskElement = document.createElement('div');
                taskElement.className = `task-item ${task.completed ? 'completed' : ''}`;
                taskElement.dataset.id = task.id;
                
                taskElement.innerHTML = `
                    <div class="task-checkbox ${task.completed ? 'checked' : ''}">
                        <i class="fas fa-check"></i>
                    </div>
                    <div class="task-text">${task.text}</div>
                    <div class="task-date">${task.due}</div>
                `;
                
                // Add event listener to checkbox
                const checkbox = taskElement.querySelector('.task-checkbox');
                checkbox.addEventListener('click', function() {
                    toggleTaskCompletion(task.id);
                });
                
                return taskElement;
            }
            
            // Toggle task completion
            function toggleTaskCompletion(taskId) {
                const taskIndex = tasks.findIndex(task => task.id === taskId);
                if (taskIndex !== -1) {
                    tasks[taskIndex].completed = !tasks[taskIndex].completed;
                    updateTaskLists();
                    updateStats();
                    updateAISummary();
                }
            }
            
            // Update statistics
            function updateStats() {
                const activeCount = tasks.filter(task => !task.completed).length;
                const completedCount = tasks.filter(task => task.completed).length;
                
                activeCountElem.textContent = activeCount;
                completedCountElem.textContent = completedCount;
            }
            
            // Update AI summary
            function updateAISummary() {
                const activeTasks = tasks.filter(task => !task.completed);
                const completedTasks = tasks.filter(task => task.completed);
                
                if (activeTasks.length === 0 && completedTasks.length === 0) {
                    aiSummaryText.textContent = "You have no tasks. Add a task to get started.";
                } else if (activeTasks.length === 0) {
                    aiSummaryText.textContent = "All tasks completed! Great job!";
                } else if (activeTasks.length === 1) {
                    aiSummaryText.textContent = `You have 1 active task: "${activeTasks[0].text}".`;
                } else {
                    // Find a task due today if any
                    const todayTask = activeTasks.find(task => task.due === "Today");
                    if (todayTask) {
                        aiSummaryText.textContent = `You have ${activeTasks.length} active tasks. Focus on completing "${todayTask.text}" today.`;
                    } else {
                        aiSummaryText.textContent = `You have ${activeTasks.length} active tasks. Consider setting priorities for your tasks.`;
                    }
                }
            }
            
            // Show add task form
            function showAddTaskForm() {
                addTaskForm.classList.add('active');
                taskTitleInput.value = '';
                taskDueInput.value = 'Today';
                taskTitleInput.focus();
            }
            
            // Hide add task form
            function hideAddTaskForm() {
                addTaskForm.classList.remove('active');
            }
            
            // Add a new task
            function addNewTask() {
                const title = taskTitleInput.value.trim();
                const due = taskDueInput.value;
                
                if (title === '') {
                    alert('Please enter a task title');
                    return;
                }
                
                // Create new task
                const newTask = {
                    id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
                    text: title,
                    due: due,
                    completed: false
                };
                
                // Add to tasks array
                tasks.push(newTask);
                
                // Update UI
                updateTaskLists();
                updateStats();
                updateAISummary();
                
                // Hide form and reset
                hideAddTaskForm();
                
                // Switch to active tab if not already
                switchTab('active');
            }
            
            // Switch between active and completed tabs
            function switchTab(tabName) {
                // Update tabs
                taskTabs.forEach(tab => {
                    if (tab.dataset.tab === tabName) {
                        tab.classList.add('active');
                    } else {
                        tab.classList.remove('active');
                    }
                });
                
                // Update task lists visibility
                taskLists.forEach(list => {
                    if (list.id === `${tabName}-tasks`) {
                        list.classList.add('active');
                    } else {
                        list.classList.remove('active');
                    }
                });
            }
            
            // Event Listeners
            addTaskBtn.addEventListener('click', showAddTaskForm);
            addFirstTaskBtn.addEventListener('click', showAddTaskForm);
            
            cancelTaskBtn.addEventListener('click', hideAddTaskForm);
            
            saveTaskBtn.addEventListener('click', addNewTask);
            
            // Allow pressing Enter to save task
            taskTitleInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    addNewTask();
                }
            });
            
            // Task tab switching
            taskTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    const tabName = this.dataset.tab;
                    switchTab(tabName);
                });
            });
            
            // Initialize the app
            init();
        });