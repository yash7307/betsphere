// Profile Page Component
const ProfilePage = {
    render() {
        const { user } = MOCK_DATA;

        return `
            <div class="profile-page" style="padding: 0; padding-bottom: 24px;">
                <!-- Profile Header -->
                <div style="background: linear-gradient(135deg, #0f4c38 0%, #1a7553 100%); padding: 32px 20px 60px; border-radius: 0 0 32px 32px; margin-bottom: -32px; position: relative;">
                    <div style="text-align: center;">
                        <div style="width: 100px; height: 100px; margin: 0 auto 16px; border-radius: 50%; border: 4px solid var(--color-primary); overflow: hidden; position: relative;">
                            <img src="${user.avatar}" alt="${user.name}" style="width: 100%; height: 100%; object-fit: cover;">
                            <div style="position: absolute; bottom: 0; right: 0; width: 28px; height: 28px; background: var(--color-primary); border-radius: 50%; border: 3px solid #1a7553; display: flex; align-items: center; justify-content: center;">
                                ✓
                            </div>
                        </div>
                        <h2 style="font-size: 22px; font-weight: 800; margin-bottom: 4px;">${user.name}</h2>
                        <div style="font-size: 14px; color: rgba(255,255,255,0.8); margin-bottom: 20px;">${user.username}</div>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: 300px; margin: 0 auto;">
                            <div style="background: rgba(0,0,0,0.2); padding: 16px; border-radius: 12px;">
                                <div style="font-size: 11px; color: rgba(255,255,255,0.7); margin-bottom: 4px; text-transform: uppercase;">Balance</div>
                                <div style="font-size: 20px; font-weight: 800; color: var(--color-primary);">
                                    ${helpers.formatCurrencyShort(user.balance)}
                                </div>
                            </div>
                            <div style="background: rgba(0,0,0,0.2); padding: 16px; border-radius: 12px;">
                                <div style="font-size: 11px; color: rgba(255,255,255,0.7); margin-bottom: 4px; text-transform: uppercase;">Open Bets</div>
                                <div style="font-size: 20px; font-weight: 800; color: white;">
                                    ${user.openBets}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div style="padding: 0 16px; margin-bottom: 24px;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                        <button class="btn btn-primary" onclick="RazorpayPayment.showDepositModal()" style="padding: 14px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                            </svg>
                            Add Funds
                        </button>
                        <button class="btn btn-secondary" onclick="RazorpayPayment.showWithdrawalModal()" style="padding: 14px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M21 12H3M3 12L10 5M3 12L10 19" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                            </svg>
                            Withdraw
                        </button>
                    </div>
                </div>

                <div style="padding: 0 16px;">
                    <!-- Personal Details -->
                    <div class="section-header" style="margin-bottom: 12px;">
                        <h3 style="font-size: 13px; font-weight: 600; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.5px;">
                            Personal Details
                        </h3>
                    </div>

                    <div class="card" style="padding: 0; margin-bottom: 24px; overflow: hidden;">
                        ${this.renderMenuItem('👤', 'Edit Profile', 'Update your personal information', '#')}
                        ${this.renderMenuItem('✉️', 'Email Address', user.email, '#', true)}
                        ${this.renderMenuItem('📱', 'Phone Number', user.phone, '#', true)}
                    </div>

                    <!-- KYC Status -->
                    <div class="card" style="padding: 16px; margin-bottom: 24px; background: linear-gradient(135deg, rgba(0,255,135,0.1) 0%, rgba(0,255,135,0.05) 100%); border: 1px solid rgba(0,255,135,0.3);">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div style="width: 40px; height: 40px; background: var(--color-primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px;">
                                ✓
                            </div>
                            <div style="flex: 1;">
                                <div style="font-weight: 700; font-size: 16px; color: var(--color-primary); margin-bottom: 2px;">
                                    KYC Verified
                                </div>
                                <div style="font-size: 12px; color: var(--color-text-muted);">
                                    Your account is fully verified
                                </div>
                            </div>
                            <span class="badge badge-success" style="padding: 6px 12px;">LEVEL ${user.kycLevel}</span>
                        </div>
                    </div>

                    <!-- Security & Preferences -->
                    <div class="section-header" style="margin-bottom: 12px;">
                        <h3 style="font-size: 13px; font-weight: 600; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.5px;">
                            Security & Preferences
                        </h3>
                    </div>

                    <div class="card" style="padding: 0; margin-bottom: 24px; overflow: hidden;">
                        ${this.renderMenuItem('🔒', 'Change Password', 'Update your password', '#')}
                        ${this.renderMenuItem('👆', 'Biometric Login', 'Enable fingerprint/face login', '#', false, true, true)}
                        ${this.renderMenuItem('🔔', 'Notifications', '3 unread', '#', false, true, false, true)}
                    </div>

                    <!-- Support -->
                    <div class="section-header" style="margin-bottom: 12px;">
                        <h3 style="font-size: 13px; font-weight: 600; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.5px;">
                            Support
                        </h3>
                    </div>

                    <div class="card" style="padding: 0; margin-bottom: 24px; overflow: hidden;">
                        ${this.renderMenuItem('❓', 'Help Center', 'FAQs and guides', '#')}
                        ${this.renderMenuItem('💬', 'Live Chat', 'Online', '#', false, false, false, false, true)}
                    </div>

                    <!-- Logout -->
                    <button class="btn" onclick="ProfilePage.logout()" style="width: 100%; padding: 16px; background: transparent; border: 1px solid var(--color-danger); color: var(--color-danger); font-weight: 700; margin-bottom: 16px;">
                        🚪 Log Out
                    </button>

                    <div style="text-align: center; color: var(--color-text-muted); font-size: 11px; padding: 16px 0;">
                        App Version 3.4.1 (Build 890)
                    </div>
                </div>
            </div>
        `;
    },

    renderMenuItem(icon, title, subtitle, link, noBorder = false, hasToggle = false, toggleState = false, hasBadge = false, isOnline = false) {
        return `
            <a href="${link}" style="
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 16px;
                ${!noBorder ? 'border-bottom: 1px solid var(--color-border);' : ''}
                transition: background var(--transition-fast);
                text-decoration: none;
                color: inherit;
            " ${hasToggle ? `onclick="event.preventDefault(); ProfilePage.toggleSetting(event, '${title}')"` : ''}>
                <div style="font-size: 20px; width: 24px; text-align: center;">${icon}</div>
                <div style="flex: 1;">
                    <div style="font-weight: 600; font-size: 15px; margin-bottom: 2px;">${title}</div>
                    <div style="font-size: 12px; color: var(--color-text-muted);">${subtitle}</div>
                </div>
                ${hasToggle ? `
                    <div class="toggle-switch ${toggleState ? 'active' : ''}" style="
                        width: 48px;
                        height: 28px;
                        background: ${toggleState ? 'var(--color-primary)' : 'var(--color-border)'};
                        border-radius: 14px;
                        position: relative;
                        transition: background var(--transition-base);
                        cursor: pointer;
                    ">
                        <div style="
                            width: 24px;
                            height: 24px;
                            background: white;
                            border-radius: 50%;
                            position: absolute;
                            top: 2px;
                            left: ${toggleState ? '22px' : '2px'};
                            transition: left var(--transition-base);
                        "></div>
                    </div>
                ` : hasBadge ? `
                    <span style="
                        width: 24px;
                        height: 24px;
                        background: var(--color-danger);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 11px;
                        font-weight: 700;
                        color: white;
                    ">3</span>
                ` : isOnline ? `
                    <span class="badge" style="background: var(--color-success); color: #000; font-size: 10px; padding: 4px 8px;">
                        ONLINE
                    </span>
                ` : `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                `}
            </a>
        `;
    },

    toggleSetting(event, setting) {
        const toggle = event.currentTarget.querySelector('.toggle-switch');
        const isActive = toggle.classList.contains('active');

        if (isActive) {
            toggle.classList.remove('active');
            toggle.style.background = 'var(--color-border)';
            toggle.querySelector('div').style.left = '2px';
        } else {
            toggle.classList.add('active');
            toggle.style.background = 'var(--color-primary)';
            toggle.querySelector('div').style.left = '22px';
        }

        helpers.showToast(`${setting} ${isActive ? 'disabled' : 'enabled'}`, 'success');
    },

    logout() {
        if (confirm('Are you sure you want to log out?')) {
            helpers.showLoading();
            setTimeout(() => {
                helpers.hideLoading();
                // Clear auth token and navigate to login
                helpers.storage.remove('auth_token');
                helpers.storage.remove('user_data');
                helpers.showToast('Logged out successfully', 'success');
                window.App.navigate('login');
            }, 500);
        }
    }
};

// Export
if (typeof window !== 'undefined') {
    window.ProfilePage = ProfilePage;
}
