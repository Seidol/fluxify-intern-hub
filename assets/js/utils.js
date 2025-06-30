
// Utility functions
class Utils {
    static showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toastContainer');
        const toastId = 'toast-' + Date.now();
        
        const toast = document.createElement('div');
        toast.id = toastId;
        toast.className = `toast ${type} show`;
        toast.innerHTML = `
            <div class="toast-body d-flex align-items-center">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} me-2"></i>
                ${message}
                <button type="button" class="btn-close ms-auto" onclick="Utils.hideToast('${toastId}')"></button>
            </div>
        `;
        
        toastContainer.appendChild(toast);
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            Utils.hideToast(toastId);
        }, 3000);
    }

    static hideToast(toastId) {
        const toast = document.getElementById(toastId);
        if (toast) {
            toast.remove();
        }
    }

    static formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    static copyToClipboard(text, label) {
        navigator.clipboard.writeText(text).then(() => {
            Utils.showToast(`${label} copied to clipboard!`);
        });
    }

    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    static validatePassword(password) {
        return password.length >= 8;
    }

    static showLoading(buttonId) {
        const button = document.getElementById(buttonId);
        if (button) {
            button.disabled = true;
            button.innerHTML = `
                <div class="spinner me-2"></div>
                Loading...
            `;
        }
    }

    static hideLoading(buttonId, originalText) {
        const button = document.getElementById(buttonId);
        if (button) {
            button.disabled = false;
            button.innerHTML = originalText;
        }
    }
}

// Global state management
class State {
    constructor() {
        this.data = {
            user: null,
            isLoggedIn: false,
            hasPaid: false,
            tasks: [],
            notifications: 3
        };
    }

    set(key, value) {
        this.data[key] = value;
        this.save();
    }

    get(key) {
        return this.data[key];
    }

    save() {
        localStorage.setItem('fluxifyState', JSON.stringify(this.data));
    }

    load() {
        const saved = localStorage.getItem('fluxifyState');
        if (saved) {
            this.data = { ...this.data, ...JSON.parse(saved) };
        }
    }

    clear() {
        localStorage.removeItem('fluxifyState');
        this.data = {
            user: null,
            isLoggedIn: false,
            hasPaid: false,
            tasks: [],
            notifications: 3
        };
    }
}

// Global state instance
const state = new State();
state.load();
