
// Admin module
class Admin {
    static init() {
        router.addRoute('admin', Admin.render);
    }

    static render() {
        if (!state.get('isLoggedIn') || state.get('user').role !== 'admin') {
            router.navigate('login');
            return;
        }

        const adminPage = document.getElementById('adminPage');
        
        adminPage.innerHTML = `
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
                                <h4 class="mb-0">Admin Dashboard</h4>
                                <small class="text-muted">Manage interns and oversee the program</small>
                            </div>
                        </div>
                        
                        <button class="btn btn-fluxify" data-bs-toggle="modal" data-bs-target="#addInternModal">
                            <i class="fas fa-plus me-2"></i>Add New Intern
                        </button>
                    </div>
                </header>

                <!-- Main Content -->
                <main class="p-4">
                    <!-- Stats Cards -->
                    <div class="row g-4 mb-4">
                        <div class="col-md-3">
                            <div class="card text-white bg-primary">
                                <div class="card-body">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div>
                                            <div class="text-white-50">Total Interns</div>
                                            <div class="h3 fw-bold mb-0">24</div>
                                        </div>
                                        <i class="fas fa-users fa-2x text-white-50"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-md-3">
                            <div class="card text-white bg-success">
                                <div class="card-body">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div>
                                            <div class="text-white-50">Paid Interns</div>
                                            <div class="h3 fw-bold mb-0">18</div>
                                        </div>
                                        <i class="fas fa-check-circle fa-2x text-white-50"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-md-3">
                            <div class="card text-white bg-warning">
                                <div class="card-body">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div>
                                            <div class="text-white-50">Pending Payments</div>
                                            <div class="h3 fw-bold mb-0">6</div>
                                        </div>
                                        <i class="fas fa-exclamation-triangle fa-2x text-white-50"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-md-3">
                            <div class="card text-white bg-info">
                                <div class="card-body">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div>
                                            <div class="text-white-50">Active Tasks</div>
                                            <div class="h3 fw-bold mb-0">48</div>
                                        </div>
                                        <i class="fas fa-tasks fa-2x text-white-50"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Interns Table -->
                    ${Admin.renderInternsTable()}
                </main>
            </div>

            <!-- Add Intern Modal -->
            ${Admin.renderAddInternModal()}
        `;

        // Initialize modal
        Admin.initializeModal();
    }

    static renderInternsTable() {
        const interns = [
            { id: 1, name: "Alex Johnson", email: "alex@example.com", status: "paid", progress: 65, week: 3 },
            { id: 2, name: "Sarah Wilson", email: "sarah@example.com", status: "pending", progress: 0, week: 1 },
            { id: 3, name: "Mike Davis", email: "mike@example.com", status: "paid", progress: 80, week: 4 },
            { id: 4, name: "Emma Brown", email: "emma@example.com", status: "paid", progress: 45, week: 2 }
        ];

        return `
            <div class="card border-0 shadow">
                <div class="card-header bg-transparent border-0">
                    <h5 class="card-title mb-0">Enrolled Interns</h5>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-hover mb-0">
                            <thead class="table-light">
                                <tr>
                                    <th>Intern</th>
                                    <th>Email</th>
                                    <th>Payment Status</th>
                                    <th>Progress</th>
                                    <th>Current Week</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${interns.map(intern => `
                                    <tr>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                <img src="https://via.placeholder.com/32" alt="${intern.name}" class="rounded-circle me-3" style="width: 32px; height: 32px;">
                                                <span class="fw-medium">${intern.name}</span>
                                            </div>
                                        </td>
                                        <td>${intern.email}</td>
                                        <td>
                                            <span class="badge ${intern.status === 'paid' ? 'bg-success' : 'bg-warning'}">
                                                ${intern.status === 'paid' ? 'Paid' : 'Pending'}
                                            </span>
                                        </td>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                <div class="progress me-2" style="width: 80px; height: 6px;">
                                                    <div class="progress-bar" style="width: ${intern.progress}%"></div>
                                                </div>
                                                <small>${intern.progress}%</small>
                                            </div>
                                        </td>
                                        <td>Week ${intern.week}</td>
                                        <td>
                                            <div class="btn-group btn-group-sm">
                                                <button class="btn btn-outline-primary" onclick="Admin.viewIntern(${intern.id})">
                                                    <i class="fas fa-eye"></i>
                                                </button>
                                                ${intern.status === 'pending' ? `
                                                    <button class="btn btn-outline-success" onclick="Admin.confirmPayment(${intern.id})">
                                                        <i class="fas fa-check"></i>
                                                    </button>
                                                ` : ''}
                                                <button class="btn btn-outline-danger" onclick="Admin.removeIntern(${intern.id})">
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    static renderAddInternModal() {
        return `
            <div class="modal fade" id="addInternModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Add New Intern</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <form id="addInternForm">
                                <div class="mb-3">
                                    <label for="internName" class="form-label">Full Name</label>
                                    <input type="text" class="form-control" id="internName" required>
                                </div>
                                <div class="mb-3">
                                    <label for="internEmail" class="form-label">Email Address</label>
                                    <input type="email" class="form-control" id="internEmail" required>
                                </div>
                                <div class="mb-3">
                                    <label for="internPhone" class="form-label">Phone Number (Optional)</label>
                                    <input type="tel" class="form-control" id="internPhone">
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-fluxify" onclick="Admin.addIntern()">
                                <i class="fas fa-plus me-2"></i>Add Intern
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static initializeModal() {
        // Modal is initialized by Bootstrap automatically
    }

    static addIntern() {
        const name = document.getElementById('internName').value;
        const email = document.getElementById('internEmail').value;
        const phone = document.getElementById('internPhone').value;

        if (!name || !email) {
            Utils.showToast('Please fill in all required fields', 'error');
            return;
        }

        if (!Utils.validateEmail(email)) {
            Utils.showToast('Please enter a valid email address', 'error');
            return;
        }

        // Simulate adding intern
        Utils.showToast(`Intern ${name} added successfully! Access email sent to ${email}`);
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('addInternModal'));
        modal.hide();
        
        // Reset form
        document.getElementById('addInternForm').reset();
        
        // Refresh the page to show updated list
        setTimeout(() => {
            Admin.render();
        }, 1000);
    }

    static viewIntern(internId) {
        Utils.showToast(`Viewing details for intern ID: ${internId}`);
    }

    static confirmPayment(internId) {
        Utils.showToast(`Payment confirmed for intern ID: ${internId}`, 'success');
        setTimeout(() => {
            Admin.render();
        }, 1000);
    }

    static removeIntern(internId) {
        if (confirm('Are you sure you want to remove this intern?')) {
            Utils.showToast(`Intern removed successfully`, 'success');
            setTimeout(() => {
                Admin.render();
            }, 1000);
        }
    }
}
