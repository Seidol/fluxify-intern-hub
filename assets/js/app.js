
// Sidebar functionality
class Sidebar {
    static render() {
        const user = state.get('user');
        const isAdmin = user && user.role === 'admin';
        
        const navigation = [
            { name: "Dashboard", href: isAdmin ? "admin" : "dashboard", icon: "fas fa-home" },
            ...(isAdmin ? [] : [
                { name: "My Tasks", href: "tasks", icon: "fas fa-tasks" },
                { name: "Payment", href: "payment", icon: "fas fa-credit-card" }
            ]),
            { name: "Help Center", href: "help", icon: "fas fa-question-circle" }
        ];

        return `
            <!-- Sidebar Overlay (Mobile) -->
            <div class="sidebar-overlay" onclick="Sidebar.toggle()"></div>
            
            <!-- Sidebar -->
            <nav class="sidebar" id="sidebar">
                <!-- Brand -->
                <div class="d-flex align-items-center p-4 border-bottom">
                    <div class="d-flex align-items-center justify-content-center bg-gradient-fluxify rounded-3 me-3 shadow" style="width: 2.5rem; height: 2.5rem;">
                        <span class="text-white fw-bold">F</span>
                    </div>
                    <div>
                        <h6 class="fw-semibold mb-0">Fluxify</h6>
                        <small class="text-muted">${isAdmin ? 'Admin Portal' : 'Intern Portal'}</small>
                    </div>
                </div>

                <!-- Navigation -->
                <div class="p-3 flex-grow-1">
                    <nav class="nav flex-column gap-2">
                        ${navigation.map(item => `
                            <a href="#${item.href}" class="nav-link ${router.currentRoute === item.href ? 'active' : ''}" onclick="Sidebar.navigate('${item.href}')">
                                <i class="${item.icon} me-3"></i>
                                <span>${item.name}</span>
                            </a>
                        `).join('')}
                    </nav>
                </div>

                <!-- Logout -->
                <div class="p-3 border-top">
                    <button class="btn btn-outline-danger w-100" onclick="Auth.logout()">
                        <i class="fas fa-sign-out-alt me-2"></i>Logout
                    </button>
                </div>
            </nav>
        `;
    }

    static toggle() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.querySelector('.sidebar-overlay');
        const mainContent = document.querySelector('.main-content');
        
        if (window.innerWidth <= 991.98) {
            // Mobile
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
        } else {
            // Desktop
            sidebar.classList.toggle('active');
            mainContent.classList.toggle('sidebar-open');
        }
    }

    static navigate(route) {
        router.navigate(route);
        
        // Close mobile sidebar
        if (window.innerWidth <= 991.98) {
            Sidebar.toggle();
        }
    }
}

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    Auth.init();
    Dashboard.init();
    Tasks.init();
    Payment.init();
    Admin.init();
    
    // Handle responsive sidebar
    window.addEventListener('resize', function() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.querySelector('.sidebar-overlay');
        const mainContent = document.querySelector('.main-content');
        
        if (window.innerWidth > 991.98) {
            overlay.classList.remove('active');
            if (sidebar) {
                sidebar.classList.remove('active');
            }
        }
    });
    
    // Start the application
    console.log('Fluxify Intern Portal loaded successfully!');
});
