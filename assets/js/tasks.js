
// Tasks module
class Tasks {
    static init() {
        router.addRoute('tasks', Tasks.render);
    }

    static render() {
        if (!state.get('isLoggedIn')) {
            router.navigate('login');
            return;
        }

        const tasksPage = document.getElementById('tasksPage');
        
        tasksPage.innerHTML = `
            ${Sidebar.render()}
            
            <div class="main-content">
                <!-- Header -->
                <header class="bg-white border-bottom shadow-sm px-4 py-3">
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-center">
                            <button class="btn sidebar-toggle d-lg-none me-3" onclick="Sidebar.toggle()">
                                <i class="fas fa-bars"></i>
                            </button>
                            <div>
                                <h4 class="mb-0">My Tasks</h4>
                                <small class="text-muted">Track and submit your assignments</small>
                            </div>
                        </div>
                        
                        <div class="d-flex align-items-center">
                            <div class="me-3">
                                <span class="badge bg-primary">13 Completed</span>
                                <span class="badge bg-warning">2 Pending</span>
                            </div>
                        </div>
                    </div>
                </header>

                <!-- Main Content -->
                <main class="p-4">
                    ${Tasks.renderTaskList()}
                </main>
            </div>
        `;
    }

    static renderTaskList() {
        const weeks = [
            {
                week: 1,
                title: "Frontend Fundamentals",
                tasks: [
                    { id: 1, title: "HTML & CSS Portfolio Page", status: "completed", deadline: "2024-01-08", score: 92 },
                    { id: 2, title: "JavaScript Basics Quiz", status: "completed", deadline: "2024-01-10", score: 88 }
                ]
            },
            {
                week: 2,
                title: "React Development",
                tasks: [
                    { id: 3, title: "React Component Development", status: "completed", deadline: "2024-01-15", score: 95 },
                    { id: 4, title: "State Management Project", status: "completed", deadline: "2024-01-17", score: 90 }
                ]
            },
            {
                week: 3,
                title: "Current Week",
                tasks: [
                    { id: 5, title: "API Integration Project", status: "submitted", deadline: "2024-01-22" },
                    { id: 6, title: "Database Design Challenge", status: "pending", deadline: "2024-01-24" }
                ]
            }
        ];

        return weeks.map(week => `
            <div class="card border-0 shadow mb-4">
                <div class="card-header bg-light border-0">
                    <div class="d-flex align-items-center justify-content-between">
                        <div>
                            <h5 class="mb-1">Week ${week.week}: ${week.title}</h5>
                            <small class="text-muted">${week.tasks.length} tasks</small>
                        </div>
                        <div class="progress" style="width: 6rem; height: 6px;">
                            <div class="progress-bar" style="width: ${week.tasks.filter(t => t.status === 'completed').length / week.tasks.length * 100}%"></div>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    ${week.tasks.map(task => `
                        <div class="task-card border rounded-3 p-4 mb-3" data-task-id="${task.id}">
                            <div class="d-flex align-items-start justify-content-between mb-3">
                                <div class="flex-grow-1">
                                    <h6 class="mb-2">${task.title}</h6>
                                    <div class="d-flex align-items-center">
                                        <small class="text-muted me-3">
                                            <i class="fas fa-calendar-alt me-1"></i>
                                            Due: ${new Date(task.deadline).toLocaleDateString()}
                                        </small>
                                        ${task.score ? `<span class="badge bg-success">${task.score}%</span>` : ''}
                                    </div>
                                </div>
                                <span class="badge status-${task.status}">
                                    ${task.status === 'completed' ? 'Completed' :
                                      task.status === 'submitted' ? 'Submitted' : 'Pending'}
                                </span>
                            </div>
                            
                            ${task.status === 'pending' ? Tasks.renderSubmissionForm(task.id) : ''}
                            ${task.status === 'submitted' ? '<div class="alert alert-info mb-0"><i class="fas fa-clock me-2"></i>Awaiting review...</div>' : ''}
                            ${task.status === 'completed' ? '<div class="alert alert-success mb-0"><i class="fas fa-check-circle me-2"></i>Task completed successfully!</div>' : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    static renderSubmissionForm(taskId) {
        return `
            <div class="bg-light rounded-3 p-3">
                <h6 class="mb-3">Submit Your Work</h6>
                <form onsubmit="Tasks.submitTask(event, ${taskId})">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <div class="form-floating">
                                <input type="url" class="form-control" id="github-${taskId}" placeholder="GitHub Repository URL">
                                <label for="github-${taskId}">
                                    <i class="fab fa-github me-2"></i>GitHub Repository URL
                                </label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-floating">
                                <input type="url" class="form-control" id="docs-${taskId}" placeholder="Google Docs URL">
                                <label for="docs-${taskId}">
                                    <i class="fab fa-google-drive me-2"></i>Google Docs URL
                                </label>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="mb-3">
                                <label for="file-${taskId}" class="form-label">
                                    <i class="fas fa-upload me-2"></i>Upload File (Optional)
                                </label>
                                <input type="file" class="form-control" id="file-${taskId}" accept=".pdf,.docx,.zip">
                                <div class="form-text">Supported formats: PDF, DOCX, ZIP</div>
                            </div>
                        </div>
                        <div class="col-12">
                            <button type="submit" class="btn btn-fluxify" id="submit-${taskId}">
                                <i class="fas fa-paper-plane me-2"></i>Submit Task
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        `;
    }

    static submitTask(event, taskId) {
        event.preventDefault();
        
        const githubUrl = document.getElementById(`github-${taskId}`).value;
        const docsUrl = document.getElementById(`docs-${taskId}`).value;
        const file = document.getElementById(`file-${taskId}`).files[0];
        
        if (!githubUrl && !docsUrl && !file) {
            Utils.showToast('Please provide at least one submission method', 'error');
            return;
        }
        
        Utils.showLoading(`submit-${taskId}`);
        
        // Simulate submission
        setTimeout(() => {
            Utils.showToast('Task submitted successfully! You will receive feedback within 24 hours.');
            
            // Update task status in UI
            const taskCard = document.querySelector(`[data-task-id="${taskId}"]`);
            const statusBadge = taskCard.querySelector('.badge');
            statusBadge.className = 'badge status-submitted';
            statusBadge.textContent = 'Submitted';
            
            // Replace form with awaiting message
            const form = taskCard.querySelector('form').parentElement;
            form.innerHTML = '<div class="alert alert-info mb-0"><i class="fas fa-clock me-2"></i>Awaiting review...</div>';
            
            Utils.hideLoading(`submit-${taskId}`, '<i class="fas fa-paper-plane me-2"></i>Submit Task');
        }, 1500);
    }
}
