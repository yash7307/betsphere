import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { helpers } from '../utils/helpers';
import Button from '../components/UI/Button';

export default function Auth() {
    const [activeTab, setActiveTab] = useState('login');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        phone: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { login, register } = useAuth();
    const { success, error: showError } = useToast();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.email || !formData.password) {
            showError('Please fill in all required fields');
            return;
        }

        if (!helpers.validateEmail(formData.email)) {
            showError('Please enter a valid email address');
            return;
        }

        if (activeTab === 'register' && !formData.name) {
            showError('Please enter your name');
            return;
        }

        setLoading(true);

        if (activeTab === 'login') {
            const result = await login({
                email: formData.email,
                password: formData.password
            });

            if (result.success) {
                success(`Welcome back! ${result.demo ? '(Demo Mode)' : ''}`);
                navigate('/');
            } else {
                showError(result.error);
            }
        } else {
            const result = await register({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password
            });

            if (result.success) {
                success(`Account created! ${result.demo ? '(Demo Mode)' : ''}`);
                navigate('/');
            } else {
                showError(result.error);
            }
        }

        setLoading(false);
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                {/* Logo */}
                <div className="auth-header">
                    <div className="auth-logo">
                        <h1>BetSphere</h1>
                    </div>
                    <p className="auth-subtitle">Premier Cricket Betting Platform</p>
                </div>

                {/* Tabs */}
                <div className="auth-tabs">
                    <button
                        className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
                        onClick={() => setActiveTab('login')}
                    >
                        Login
                    </button>
                    <button
                        className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
                        onClick={() => setActiveTab('register')}
                    >
                        Register
                    </button>
                </div>

                {/* Form */}
                <form className="auth-form" onSubmit={handleSubmit}>
                    {activeTab === 'register' && (
                        <>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="+91 XXXXX XXXXX"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                        </>
                    )}

                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <div className="password-input">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? '👁️' : '👁️‍🗨️'}
                            </button>
                        </div>
                    </div>

                    {activeTab === 'login' && (
                        <div className="form-extra">
                            <label className="remember-me">
                                <input type="checkbox" />
                                <span>Remember me</span>
                            </label>
                            <a href="#" className="forgot-password">Forgot Password?</a>
                        </div>
                    )}

                    <Button
                        variant="primary"
                        type="submit"
                        disabled={loading}
                        className="auth-submit"
                    >
                        {loading ? 'Processing...' : (activeTab === 'login' ? 'Login' : 'Create Account')}
                    </Button>
                </form>

                {/* Social Login */}
                <div className="auth-divider">
                    <span>Or continue with</span>
                </div>

                <div className="social-login">
                    <button className="social-btn">
                        <span>🔍</span>
                        <span>Google</span>
                    </button>
                    <button className="social-btn">
                        <span>📱</span>
                        <span>Phone</span>
                    </button>
                </div>

                {activeTab === 'register' && (
                    <div className="auth-terms">
                        By creating an account, you agree to our{' '}
                        <a href="#">Terms & Conditions</a> and{' '}
                        <a href="#">Privacy Policy</a>
                    </div>
                )}
            </div>
        </div>
    );
}
