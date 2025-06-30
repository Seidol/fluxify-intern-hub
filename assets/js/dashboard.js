
// Dashboard module
class Dashboard {
    static init() {
        router.addRoute('dashboard', Dashboard.render);
    }

    static render() {
        if (!state.get('isLoggedIn')) {
            router.navigate('login');
            return;
        }

        const dashboardPage = document.getElementById('dashboardPage');
        const user = state.get('user');
        const hasPaid = state.get('hasPaid');
        
        dashboardPage.innerHTML = `
            ${Sidebar.render()}
            
            <div class="main-content">
                <!-- Header -->
                <header class="bg-white border-bottom shadow-sm px-4 py-3">
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-center">
                            <button class="btn sidebar-toggle d-lg-none me-3" onclick="Sidebar.toggle()">
                                <i class="fas fa-bars"></i>
                            </button>
                            <div class="d-flex align-items-center">
                                <img src="https://via.placeholder.com/48" alt="Profile" class="rounded-circle me-3 border" style="width: 48px; height: 48px;">
                                <div>
                                    <h5 class="mb-0">Welcome back, Alex Johnson! 👋</h5>
                                    <small class="text-muted">Week 3 of 8 • ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</small>
                                </div>
                            </div>
                        </div>
                        
                        <div class="d-flex align-items-center">
                            <div class="position-relative me-4">
                                <button class="btn btn-outline-secondary position-relative">
                                    <i class="fas fa-bell"></i>
                                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        3
                                    </span>
                                </button>
                            </div>
                            
                            <div class="text-end">
                                <div class="small fw-medium text-dark">Task Progress</div>
                                <div style="width: 8rem;">
                                    <div class="progress mb-1" style="height: 8px;">
                                        <div class="progress-bar" role="progressbar" style="width: 65%"></div>
                                    </div>
                                    <div class="small text-muted">13/20 completed</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <!-- Main Content -->
                <main class="p-4">
                    ${!hasPaid ? Dashboard.renderPaymentWarning() : ''}
                    
                    <!-- Dashboard Stats -->
                    <div class="row g-4 mb-4">
                        <div class="col-md-6 col-lg-3">
                            <div class="card text-white" style="background: linear-gradient(135deg, #6f42c1 0%, #8e44ad 100%);">
                                <div class="card-body">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div>
                                            <div class="text-white-50">Completed Tasks</div>
                                            <div class="display-6 fw-bold">13</div>
                                        </div>
                                        <i class="fas fa-check-circle fa-2x text-white-50"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-md-6 col-lg-3">
                            <div class="card text-white" style="background: linear-gradient(135deg, #17a2b8 0%, #00acc1 100%);">
                                <div class="card-body">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div>
                                            <div class="text-white-50">Current Week</div>
                                            <div class="display-6 fw-bold">3</div>
                                        </div>
                                        <i class="fas fa-calendar fa-2x text-white-50"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-md-6 col-lg-3">
                            <div class="card text-white" style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%);">
                                <div class="card-body">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div>
                                            <div class="text-white-50">Average Score</div>
                                            <div class="display-6 fw-bold">95%</div>
                                        </div>
                                        <i class="fas fa-award fa-2x text-white-50"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-md-6 col-lg-3">
                            <div class="card text-white" style="background: linear-gradient(135deg, #fd7e14 0%, #f8c555 100%);">
                                <div class="card-body">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div>
                                            <div class="text-white-50">Progress</div>
                                            <div class="display-6 fw-bold">65%</div>
                                        </div>
                                        <i class="fas fa-chart-line fa-2x text-white-50"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    ${hasPaid ? Dashboard.renderTasks() : ''}
                    
                    <!-- Quick Actions -->
                    <div class="row g-4">
                        <div class="col-md-6">
                            <div class="card h-100 border-0 shadow" style="cursor: pointer;" onclick="router.navigate('tasks')">
                                <div class="card-body d-flex align-items-center">
                                    <div class="p-3 rounded-3 me-4" style="background: rgba(106, 27, 154, 0.1);">
                                        <i class="fas fa-tasks fa-2x" style="color: var(--fluxify-purple);"></i>
                                    </div>
                                    <div>
                                        <h5 class="card-title mb-1">View All Tasks</h5>
                                        <p class="card-text text-muted">See your complete task list and deadlines</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-md-6">
                            <div class="card h-100 border-0 shadow" style="cursor: pointer;" onclick="router.navigate('payment')">
                                <div class="card-body d-flex align-items-center">
                                    <div class="p-3 rounded-3 me-4" style="background: rgba(0, 172, 193, 0.1);">
                                        <i class="fas fa-credit-card fa-2x" style="color: var(--fluxify-cyan);"></i>
                                    </div>
                                    <div>
                                        <h5 class="card-title mb-1">Payment Status</h5>
                                        <p class="card-text text-muted">Check your payment and billing information</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        `;
    }

    static renderPaymentWarning() {
        return `
            <div class="card payment-warning border-0 shadow mb-4 animate-fade-in">
                <div class="card-body">
                    <div class="d-flex align-items-start">
                        <i class="fas fa-exclamation-triangle text-warning fa-2x me-3 mt-1"></i>
                        <div class="flex-grow-1">
                            <h5 class="card-title text-warning mb-2">Payment Required</h5>
                            <p class="card-text mb-3">
                                You haven't paid the 30,000 RWF internship fee. Please complete your payment to access all tasks and features.
                            </p>
                            
                            <div class="bg-white rounded-3 p-3 border mb-3">
                                <h6 class="fw-semibold mb-2">Payment Details:</h6>
                                <div class="small text-muted">
                                    <div><strong>MTN Mobile Money:</strong> +250 XXX XXX XXX</div>
                                    <div><strong>Bank Account:</strong> Fluxify Ltd - Account #XXXXXXXXX</div>
                                    <div><strong>Amount:</strong> 30,000 RWF</div>
                                </div>
                            </div>
                            
                            <div class="d-flex align-items-center">
                                <button class="btn btn-success me-3" onclick="Payment.claimPayment()">
                                    <i class="fas fa-check-circle me-2"></i>I Have Paid
                                </button>
                                <small class="text-muted">
                                    <i class="fas fa-envelope me-1"></i>This will notify our team for verification
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static renderTasks() {
        const tasks = [
            { id: 1, title: "React Component Development", status: "completed", deadline: "2024-01-15", score: 95 },
            { id: 2, title: "API Integration Project", status: "submitted", deadline: "2024-01-18", score: null },
            { id: 3, title: "Database Design Challenge", status: "pending", deadline: "2024-01-22", score: null },
            { id: 4, title: "UI/UX Mockup Creation", status: "pending", deadline: "2024-01-25", score: null }
        ];

        return `
            <div class="card border-0 shadow mb-4 animate-fade-in">
                <div class="card-header bg-transparent border-0">
                    <h5 class="card-title mb-1">Recent Tasks</h5>
                    <p class="card-text text-muted">Your latest assignments and their status</p>
                </div>
                <div class="card-body">
                    ${tasks.map(task => `
                        <div class="d-flex align-items-center justify-content-between p-3 border rounded-3 mb-3 task-item">
                            <div class="d-flex align-items-center">
                                <div class="rounded-circle me-3" style="width: 12px; height: 12px; background: ${
                                    task.status === 'completed' ? '#28a745' :
                                    task.status === 'submitted' ? '#ffc107' : '#6c757d'
                                };"></div>
                                <div>
                                    <h6 class="mb-1">${task.title}</h6>
                                    <small class="text-muted">Due: ${task.deadline}</small>
                                </div>
                            </div>
                            
                            <div class="d-flex align-items-center">
                                ${task.score ? `<span class="badge bg-success me-2">${task.score}%</span>` : ''}
                                <span class="badge status-${task.status}">
                                    ${task.status === 'completed' ? 'Completed' :
                                      task.status === 'submitted' ? 'Submitted' : 'Pending'}
                                </span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
}
