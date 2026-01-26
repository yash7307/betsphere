// Login/Register Page
const AuthPage = {
    isLoginMode: true,

    render() {
        return `
            <div class="auth-page">
                <div class="auth-container">
                    <div class="auth-header">
                        <div class="auth-logo">
                            <span class="logo-icon">🏏</span>
                            <h1>BetSphere</h1>
                        </div>
                        <p class="auth-subtitle">Premium Cricket Betting Platform</p>
                    </div>

                    <div class="auth-tabs">
                        <button class="auth-tab ${this.isLoginMode ? 'active' : ''}" onclick="AuthPage.switchMode(true)">
                            Login
                        </button>
                        <button class="auth-tab ${!this.isLoginMode ? 'active' : ''}" onclick="AuthPage.switchMode(false)">
                            Register
                        </button>
                    </div>

                    <form class="auth-form" id="auth-form" onsubmit="AuthPage.handleSubmit(event)">
                        ${this.isLoginMode ? this.renderLoginForm() : this.renderRegisterForm()}
                        
                        <button type="submit" class="btn btn-primary btn-lg auth-submit">
                            ${this.isLoginMode ? 'Login' : 'Create Account'}
                        </button>
                    </form>

                    <div class="auth-divider">
                        <span>or continue with</span>
                    </div>

                    <div class="social-login">
                        <button class="social-btn google" onclick="AuthPage.socialLogin('google')">
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Google
                        </button>
                        <button class="social-btn phone" onclick="AuthPage.socialLogin('phone')">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                                <line x1="12" y1="18" x2="12.01" y2="18"/>
                            </svg>
                            Phone
                        </button>
                    </div>

                    ${this.isLoginMode ? `
                        <p class="auth-footer">
                            Don't have an account? 
                            <a href="#" onclick="AuthPage.switchMode(false); return false;">Sign up</a>
                        </p>
                    ` : `
                        <p class="auth-footer">
                            Already have an account? 
                            <a href="#" onclick="AuthPage.switchMode(true); return false;">Login</a>
                        </p>
                    `}

                    <p class="auth-terms">
                        By continuing, you agree to our 
                        <a href="#">Terms of Service</a> and 
                        <a href="#">Privacy Policy</a>
                    </p>
                </div>

                <div class="auth-features">
                    <div class="feature">
                        <span class="feature-icon">🔒</span>
                        <span>Secure</span>
                    </div>
                    <div class="feature">
                        <span class="feature-icon">⚡</span>
                        <span>Instant</span>
                    </div>
                    <div class="feature">
                        <span class="feature-icon">🏆</span>
                        <span>Trusted</span>
                    </div>
                </div>
            </div>
        `;
    },

    renderLoginForm() {
        return `
            <div class="form-group">
                <label for="email">Email Address</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email"
                    placeholder="Enter your email"
                    required
                    autocomplete="email"
                >
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <div class="password-input">
                    <input 
                        type="password" 
                        id="password" 
                        name="password"
                        placeholder="Enter your password"
                        required
                        autocomplete="current-password"
                        minlength="6"
                    >
                    <button type="button" class="toggle-password" onclick="AuthPage.togglePassword()">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="form-extra">
                <label class="remember-me">
                    <input type="checkbox" name="remember" id="remember">
                    <span>Remember me</span>
                </label>
                <a href="#" class="forgot-password" onclick="AuthPage.forgotPassword(); return false;">
                    Forgot password?
                </a>
            </div>
        `;
    },

    renderRegisterForm() {
        return `
            <div class="form-group">
                <label for="username">Username</label>
                <input 
                    type="text" 
                    id="username" 
                    name="username"
                    placeholder="Choose a username"
                    required
                    minlength="3"
                    autocomplete="username"
                >
            </div>
            <div class="form-group">
                <label for="email">Email Address</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email"
                    placeholder="Enter your email"
                    required
                    autocomplete="email"
                >
            </div>
            <div class="form-group">
                <label for="phone">Phone Number</label>
                <input 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    placeholder="+91 XXXXX XXXXX"
                    required
                    autocomplete="tel"
                >
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <div class="password-input">
                    <input 
                        type="password" 
                        id="password" 
                        name="password"
                        placeholder="Create a password (min 6 characters)"
                        required
                        minlength="6"
                        autocomplete="new-password"
                    >
                    <button type="button" class="toggle-password" onclick="AuthPage.togglePassword()">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="form-extra">
                <label class="remember-me">
                    <input type="checkbox" name="terms" id="terms" required>
                    <span>I agree to the Terms & Conditions</span>
                </label>
            </div>
        `;
    },

    switchMode(isLogin) {
        this.isLoginMode = isLogin;
        App.render();
    },

    togglePassword() {
        const passwordInput = document.getElementById('password');
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
    },

    async handleSubmit(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        helpers.showLoading();

        try {
            const endpoint = this.isLoginMode ? '/api/auth/login' : '/api/auth/register';
            const apiUrl = 'http://localhost:5000';

            const response = await fetch(`${apiUrl}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            helpers.hideLoading();

            if (result.success) {
                // Save token and user data
                helpers.storage.set('auth_token', result.token);
                helpers.storage.set('user_data', result.user);

                // Update MOCK_DATA with real user data
                if (result.user) {
                    MOCK_DATA.user = {
                        ...MOCK_DATA.user,
                        ...result.user
                    };
                }

                helpers.showToast(this.isLoginMode ? 'Welcome back! 🎉' : 'Account created! 🎉', 'success');

                // Navigate to home
                App.navigate('home');
            } else {
                helpers.showToast(result.message || 'Authentication failed', 'error');
            }
        } catch (error) {
            helpers.hideLoading();
            console.error('Auth error:', error);

            // Demo mode - allow login without backend
            if (this.isLoginMode) {
                helpers.storage.set('auth_token', 'demo_token');
                helpers.showToast('Welcome to BetSphere! 🎉', 'success');
                App.navigate('home');
            } else {
                helpers.showToast('Registration successful! Please login.', 'success');
                this.switchMode(true);
            }
        }
    },

    socialLogin(provider) {
        helpers.showToast(`${provider} login coming soon!`, 'info');
    },

    forgotPassword() {
        const email = document.getElementById('email')?.value || '';

        const modal = document.createElement('div');
        modal.className = 'modal show';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Reset Password</h3>
                    <button class="close-modal" onclick="this.closest('.modal').remove()">&times;</button>
                </div>
                <div style="padding: 16px;">
                    <p style="margin-bottom: 16px; color: var(--color-text-secondary);">
                        Enter your email address and we'll send you a link to reset your password.
                    </p>
                    <div class="form-group">
                        <input 
                            type="email" 
                            id="reset-email" 
                            placeholder="Enter your email"
                            value="${email}"
                            style="width: 100%;"
                        >
                    </div>
                    <button class="btn btn-primary btn-lg" style="width: 100%; margin-top: 16px;" onclick="AuthPage.sendResetEmail()">
                        Send Reset Link
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    },

    sendResetEmail() {
        const email = document.getElementById('reset-email')?.value;
        if (email) {
            helpers.showToast('Password reset link sent! 📧', 'success');
            document.querySelector('.modal.show')?.remove();
        } else {
            helpers.showToast('Please enter your email', 'error');
        }
    },

    // Check if user is authenticated
    isAuthenticated() {
        return !!helpers.storage.get('auth_token');
    },

    // Logout
    logout() {
        helpers.storage.remove('auth_token');
        helpers.storage.remove('user_data');
        helpers.showToast('Logged out successfully', 'success');
        App.navigate('login');
    }
};

// Export
if (typeof window !== 'undefined') {
    window.AuthPage = AuthPage;
}
