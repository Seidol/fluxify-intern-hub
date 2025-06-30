
// Simple Router for SPA navigation
class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = 'login';
        this.init();
    }

    init() {
        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            this.handleRouteChange();
        });
        
        // Load initial route
        this.loadRoute('login');
    }

    addRoute(path, handler) {
        this.routes[path] = handler;
    }

    navigate(path) {
        history.pushState({}, '', `#${path}`);
        this.loadRoute(path);
    }

    loadRoute(path) {
        this.currentRoute = path;
        
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show current page
        const currentPage = document.getElementById(`${path}Page`);
        if (currentPage) {
            currentPage.classList.add('active');
        }
        
        // Execute route handler
        if (this.routes[path]) {
            this.routes[path]();
        }
    }

    handleRouteChange() {
        const hash = window.location.hash.slice(1) || 'login';
        this.loadRoute(hash);
    }
}

// Global router instance
const router = new Router();
