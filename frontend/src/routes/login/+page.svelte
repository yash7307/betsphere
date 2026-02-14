<script>
    import { goto } from '$app/navigation';
    import { login, register } from '$lib/stores/auth.js';
    import { success, error as showError } from '$lib/stores/toast.js';
    import { helpers } from '$lib/utils/helpers.js';

    let activeTab = $state('login');
    let loading = $state(false);
    let showPassword = $state(false);

    // Login form
    let loginEmail = $state('');
    let loginPassword = $state('');

    // Register form
    let regName = $state('');
    let regEmail = $state('');
    let regPhone = $state('');
    let regPassword = $state('');
    let regConfirmPassword = $state('');

    async function handleLogin() {
        if (!loginEmail || !loginPassword) {
            showError('Please fill in all fields');
            return;
        }
        if (!helpers.validateEmail(loginEmail)) {
            showError('Please enter a valid email');
            return;
        }

        loading = true;
        const result = await login({ email: loginEmail, password: loginPassword });
        loading = false;

        if (result.success) {
            success(`Welcome back! ${result.demo ? '(Demo Mode)' : ''}`);
            goto('/');
        } else {
            showError(result.error);
        }
    }

    async function handleRegister() {
        if (!regName || !regEmail || !regPassword) {
            showError('Please fill in all required fields');
            return;
        }
        if (!helpers.validateEmail(regEmail)) {
            showError('Please enter a valid email');
            return;
        }
        if (regPassword !== regConfirmPassword) {
            showError('Passwords do not match');
            return;
        }
        if (regPassword.length < 6) {
            showError('Password must be at least 6 characters');
            return;
        }

        loading = true;
        const result = await register({
            name: regName,
            email: regEmail,
            phone: regPhone,
            password: regPassword
        });
        loading = false;

        if (result.success) {
            success(`Account created! ${result.demo ? '(Demo Mode)' : ''}`);
            goto('/');
        } else {
            showError(result.error);
        }
    }
</script>

<div class="auth-page">
    <div style="text-align:center;margin-bottom:32px;">
        <h1 style="font-size:28px;font-weight:800;color:var(--color-primary);margin-bottom:8px;">
            BetSphere
        </h1>
        <p style="color:var(--color-text-muted);font-size:14px;">
            Your Premier Cricket Betting Platform
        </p>
    </div>

    <!-- Tabs -->
    <div class="auth-tabs">
        <button class="auth-tab {activeTab === 'login' ? 'active' : ''}" onclick={() => activeTab = 'login'}>
            Login
        </button>
        <button class="auth-tab {activeTab === 'register' ? 'active' : ''}" onclick={() => activeTab = 'register'}>
            Register
        </button>
    </div>

    <!-- Login Form -->
    {#if activeTab === 'login'}
        <form class="auth-form" onsubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            <div class="form-group">
                <label for="login-email">Email</label>
                <input
                    id="login-email"
                    type="email"
                    placeholder="Enter your email"
                    bind:value={loginEmail}
                />
            </div>
            <div class="form-group">
                <label for="login-password">Password</label>
                <div class="input-group">
                    <input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        bind:value={loginPassword}
                    />
                    <button type="button" class="toggle-password" onclick={() => showPassword = !showPassword}>
                        {showPassword ? '🙈' : '👁️'}
                    </button>
                </div>
            </div>
            <button type="submit" class="btn btn-primary btn-lg" style="width:100%;" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    {/if}

    <!-- Register Form -->
    {#if activeTab === 'register'}
        <form class="auth-form" onsubmit={(e) => { e.preventDefault(); handleRegister(); }}>
            <div class="form-group">
                <label for="reg-name">Full Name</label>
                <input id="reg-name" type="text" placeholder="Enter your name" bind:value={regName} />
            </div>
            <div class="form-group">
                <label for="reg-email">Email</label>
                <input id="reg-email" type="email" placeholder="Enter your email" bind:value={regEmail} />
            </div>
            <div class="form-group">
                <label for="reg-phone">Phone (optional)</label>
                <input id="reg-phone" type="tel" placeholder="+91 XXXXX XXXXX" bind:value={regPhone} />
            </div>
            <div class="form-group">
                <label for="reg-password">Password</label>
                <div class="input-group">
                    <input
                        id="reg-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a password"
                        bind:value={regPassword}
                    />
                    <button type="button" class="toggle-password" onclick={() => showPassword = !showPassword}>
                        {showPassword ? '🙈' : '👁️'}
                    </button>
                </div>
            </div>
            <div class="form-group">
                <label for="reg-confirm">Confirm Password</label>
                <input
                    id="reg-confirm"
                    type="password"
                    placeholder="Confirm your password"
                    bind:value={regConfirmPassword}
                />
            </div>
            <button type="submit" class="btn btn-primary btn-lg" style="width:100%;" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
            </button>
        </form>
    {/if}

    <!-- Social Divider -->
    <div class="auth-divider">Or continue with</div>
    <div class="social-buttons">
        <button class="social-btn">
            <span>🔵</span> Google
        </button>
        <button class="social-btn">
            <span>📘</span> Facebook
        </button>
    </div>
</div>
