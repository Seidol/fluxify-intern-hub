
// Authentication module
class Auth {
    static init() {
        router.addRoute('login', Auth.renderLogin);
        router.addRoute('createPassword', Auth.renderCreatePassword);
    }

    static renderLogin() {
        const loginPage = document.getElementById('loginPage');
        loginPage.innerHTML = `
            <div class="login-bg d-flex align-items-center justify-content-center p-4">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-6 col-lg-5">
                            <div class="text-center mb-4 animate-fade-in">
                                <div class="d-inline-flex align-items-center justify-content-center bg-gradient-fluxify rounded-4 mb-3 shadow" style="width: 4rem; height: 4rem;">
                                    <span class="text-white fw-bold fs-3">F</span>
                                </div>
                                <h1 class="fw-bold text-dark mb-2">
                                    Welcome Back <span class="text-gradient">Intern!</span>
                                </h1>
                                <p class="text-secondary">Access your Fluxify internship portal</p>
                            </div>

                            <div class="card login-card border-0 shadow-lg">
                                <div class="card-header bg-transparent border-0 text-center py-4">
                                    <h4 class="fw-semibold mb-1">Sign In</h4>
                                    <p class="text-muted mb-0">Enter your credentials to access your dashboard</p>
                                </div>
                                <div class="card-body p-4">
                                    <form id="loginForm">
                                        <div class="form-floating mb-3">
                                            <input type="email" class="form-control" id="loginEmail" placeholder="your.email@example.com" required>
                                            <label for="loginEmail">
                                                <i class="fas fa-envelope me-2"></i>Email Address
                                            </label>
                                        </div>

                                        <div class="form-floating mb-4">
                                            <input type="password" class="form-control" id="loginPassword" placeholder="Enter your password" required>
                                            <label for="loginPassword">
                                                <i class="fas fa-lock me-2"></i>Password
                                            </label>
                                        </div>

                                        <button type="submit" id="loginBtn" class="btn btn-fluxify w-100 py-3 mb-3">
                                            <span>Sign In</span>
                                            <i class="fas fa-arrow-right ms-2"></i>
                                        </button>
                                    </form>

                                    <div class="text-center">
                                        <div class="position-relative my-4">
                                            <hr>
                                            <span class="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted small">Or</span>
                                        </div>

                                        <button class="btn btn-outline-secondary w-100 py-3 mb-3" onclick="Auth.checkEmailAccess()">
                                            Check Email Access
                                        </button>

                                        <button class="btn btn-link text-decoration-none fw-medium" style="color: var(--fluxify-purple);">
                                            Forgot Password?
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="text-center mt-4">
                                <small class="text-muted">© 2024 Fluxify Ltd. All rights reserved.</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add event listener for login form
        document.getElementById('loginForm').addEventListener('submit', Auth.handleLogin);
    }

    static renderCreatePassword() {
        const createPasswordPage = document.getElementById('createPasswordPage');
        createPasswordPage.innerHTML = `
            <div class="login-bg d-flex align-items-center justify-content-center p-4">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-6 col-lg-5">
                            <div class="text-center mb-4 animate-fade-in">
                                <div class="d-inline-flex align-items-center justify-content-center bg-gradient-fluxify rounded-4 mb-3 shadow" style="width: 4rem; height: 4rem;">
                                    <span class="text-white fw-bold fs-3">F</span>
                                </div>
                                <h1 class="fw-bold text-dark mb-2">
                                    Create Your <span class="text-gradient">Password</span>
                                </h1>
                                <p class="text-secondary">Set up your secure password to access your portal</p>
                            </div>

                            <div class="card login-card border-0 shadow-lg">
                                <div class="card-header bg-transparent border-0 text-center py-4">
                                    <h4 class="fw-semibold mb-1">Setup Password</h4>
                                    <p class="text-muted mb-0">Choose a strong password for your account</p>
                                </div>
                                <div class="card-body p-4">
                                    <form id="createPasswordForm">
                                        <div class="form-floating mb-3">
                                            <input type="password" class="form-control" id="newPassword" placeholder="Enter your password" required>
                                            <label for="newPassword">
                                                <i class="fas fa-lock me-2"></i>New Password
                                            </label>
                                        </div>

                                        <div class="form-floating mb-4">
                                            <input type="password" class="form-control" id="confirmPassword" placeholder="Confirm your password" required>
                                            <label for="confirmPassword">
                                                <i class="fas fa-lock me-2"></i>Confirm Password
                                            </label>
                                        </div>

                                        <div class="mb-4">
                                            <small class="text-muted">Password requirements:</small>
                                            <div class="mt-2">
                                                <div class="d-flex align-items-center mb-1" id="lengthCheck">
                                                    <div class="rounded-circle me-2" style="width: 8px; height: 8px; background: #ccc;"></div>
                                                    <small class="text-muted">At least 8 characters</small>
                                                </div>
                                                <div class="d-flex align-items-center" id="matchCheck">
                                                    <div class="rounded-circle me-2" style="width: 8px; height: 8px; background: #ccc;"></div>
                                                    <small class="text-muted">Passwords match</small>
                                                </div>
                                            </div>
                                        </div>

                                        <button type="submit" id="createPasswordBtn" class="btn btn-fluxify w-100 py-3 mb-3" disabled>
                                            <span>Create Password</span>
                                            <i class="fas fa-arrow-right ms-2"></i>
                                        </button>
                                    </form>
                                </div>
                            </div>

                            <div class="text-center mt-4">
                                <button class="btn btn-link text-decoration-none fw-medium" style="color: var(--fluxify-purple);" onclick="router.navigate('login')">
                                    <i class="fas fa-arrow-left me-1"></i> Back to Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add event listeners
        document.getElementById('createPasswordForm').addEventListener('submit', Auth.handleCreatePassword);
        document.getElementById('newPassword').addEventListener('input', Auth.validatePasswords);
        document.getElementById('confirmPassword').addEventListener('input', Auth.validatePasswords);
    }

    static handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        Utils.showLoading('loginBtn');
        
        // Simulate API call
        setTimeout(() => {
            if (email === 'admin@fluxify.com') {
                Utils.showToast('Welcome back, Admin!');
                state.set('isLoggedIn', true);
                state.set('user', { email, role: 'admin' });
                router.navigate('admin');
            } else {
                Utils.showToast('Welcome back, Intern!');
                state.set('isLoggedIn', true);
                state.set('user', { email, role: 'intern' });
                router.navigate('dashboard');
            }
            Utils.hideLoading('loginBtn', '<span>Sign In</span><i class="fas fa-arrow-right ms-2"></i>');
        }, 1000);
    }

    static checkEmailAccess() {
        const email = document.getElementById('loginEmail').value;
        
        if (!email) {
            Utils.showToast('Please enter your email address', 'error');
            return;
        }
        
        if (!Utils.validateEmail(email)) {
            Utils.showToast('Please enter a valid email address', 'error');
            return;
        }
        
        Utils.showToast('If your email is registered, you\'ll receive access instructions.');
        router.navigate('createPassword');
    }

    static handleCreatePassword(e) {
        e.preventDefault();
        
        const password = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (password !== confirmPassword) {
            Utils.showToast('Passwords don\'t match!', 'error');
            return;
        }
        
        if (!Utils.validatePassword(password)) {
            Utils.showToast('Password must be at least 8 characters long', 'error');
            return;
        }
        
        Utils.showLoading('createPasswordBtn');
        
        setTimeout(() => {
            Utils.showToast('Password created successfully! Welcome to Fluxify!');
            state.set('isLoggedIn', true);
            state.set('user', { email: 'new.intern@fluxify.com', role: 'intern' });
            router.navigate('dashboard');
            Utils.hideLoading('createPasswordBtn', '<span>Create Password</span><i class="fas fa-arrow-right ms-2"></i>');
        }, 1000);
    }

    static validatePasswords() {
        const password = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const lengthCheck = document.getElementById('lengthCheck').querySelector('div');
        const matchCheck = document.getElementById('matchCheck').querySelector('div');
        const submitBtn = document.getElementById('createPasswordBtn');
        
        // Check length
        if (password.length >= 8) {
            lengthCheck.style.background = '#28a745';
        } else {
            lengthCheck.style.background = '#ccc';
        }
        
        // Check match
        if (password === confirmPassword && password) {
            matchCheck.style.background = '#28a745';
        } else {
            matchCheck.style.background = '#ccc';
        }
        
        // Enable/disable submit button
        submitBtn.disabled = !(password.length >= 8 && password === confirmPassword);
    }

    static logout() {
        state.clear();
        Utils.showToast('Logged out successfully');
        router.navigate('login');
    }
}
