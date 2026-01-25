// Main Application
const App = {
    currentPage: 'home',
    pageParams: null,

    init() {
        console.log('🎯 BetSphere App Initializing...');

        // Load saved state from localStorage
        this.loadState();

        // Setup routing
        this.setupRouting();

        // Setup navigation handlers
        this.setupNavigation();

        // Initial render
        this.render();

        console.log('✅ BetSphere App Ready!');
    },

    loadState() {
        // Load user balance from localStorage
        const savedBalance = helpers.storage.get('user_balance');
        if (savedBalance !== null) {
            MOCK_DATA.user.balance = savedBalance;
        }

        // Load transactions
        const savedTransactions = helpers.storage.get('transactions');
        if (savedTransactions) {
            MOCK_DATA.transactions = savedTransactions;
        }
    },

    setupRouting() {
        // Handle hash changes
        window.addEventListener('hashchange', () => {
            this.handleRoute();
        });

        // Handle initial route
        this.handleRoute();
    },

    handleRoute() {
        const hash = window.location.hash.slice(1); // Remove #
        const [page, ...params] = hash.split('/');

        if (page && ['home', 'my-bets', 'in-play', 'profile'].includes(page)) {
            this.currentPage = page;
            this.pageParams = params;
        } else {
            this.currentPage = 'home';
            this.pageParams = null;
            window.location.hash = '#home';
        }

        this.render();
    },

    setupNavigation() {
        // Bottom navigation
        const navItems = document.querySelectorAll('.bottom-nav .nav-item');
        navItems.forEach(item => {
            if (!item.classList.contains('center-fab')) {
                item.addEventListener('click', () => {
                    const page = item.getAttribute('data-page');
                    if (page) {
                        this.navigate(page);
                    }
                });
            }
        });

        // Center FAB - opens bet slip or shows quick action menu
        const centerFab = document.querySelector('.center-fab');
        if (centerFab) {
            centerFab.addEventListener('click', () => {
                this.showQuickActions();
            });
        }

        // Back button
        const backBtn = document.getElementById('back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                if (this.currentPage === 'in-play') {
                    this.navigate('home');
                } else {
                    window.history.back();
                }
            });
        }
    },

    navigate(page, params = null) {
        this.currentPage = page;
        this.pageParams = params;
        window.location.hash = `#${page}`;
        this.render();
    },

    render() {
        const mainContent = document.getElementById('main-content');
        const pageTitle = document.getElementById('page-title');
        const backBtn = document.getElementById('back-btn');

        // Update page title and back button visibility
        const titles = {
            'home': 'BetSphere',
            'my-bets': 'My Bets',
            'in-play': 'India vs Australia',
            'profile': 'Profile'
        };

        pageTitle.textContent = titles[this.currentPage] || 'BetSphere';

        // Show back button only on in-play page
        if (this.currentPage === 'in-play') {
            backBtn.classList.remove('hidden');
        } else {
            backBtn.classList.add('hidden');
        }

        // Render page content
        let content = '';
        switch (this.currentPage) {
            case 'home':
                content = HomePage.render();
                break;
            case 'my-bets':
                content = MyBetsPage.render();
                break;
            case 'in-play':
                const matchId = this.pageParams && this.pageParams[0] ? parseInt(this.pageParams[0]) : 1;
                content = InPlayPage.render(matchId);
                break;
            case 'profile':
                content = ProfilePage.render();
                break;
            default:
                content = HomePage.render();
        }

        mainContent.innerHTML = content;

        // Update active nav item
        this.updateActiveNav();

        // Scroll to top
        mainContent.scrollTop = 0;
    },

    updateActiveNav() {
        const navItems = document.querySelectorAll('.bottom-nav .nav-item');
        navItems.forEach(item => {
            const page = item.getAttribute('data-page');
            if (page === this.currentPage) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    },

    showQuickActions() {
        const modal = document.createElement('div');
        modal.className = 'modal show';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Quick Actions</h3>
                    <button class="close-modal" onclick="this.closest('.modal').remove()">&times;</button>
                </div>
                <div style="padding: 16px; display: grid; gap: 12px;">
                    <button class="btn btn-primary btn-lg" onclick="RazorpayPayment.showDepositModal(); document.querySelector('.modal').remove();" style="justify-content: flex-start; padding: 16px;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                        </svg>
                        <span>Add Funds</span>
                    </button>
                    <button class="btn btn-secondary btn-lg" onclick="App.navigate('my-bets'); document.querySelector('.modal').remove();" style="justify-content: flex-start; padding: 16px;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M9 2C7.89543 2 7 2.89543 7 4V20C7 21.1046 7.89543 22 9 22H18C19.1046 22 20 21.1046 20 20V7L15 2H9Z" stroke="currentColor" stroke-width="2"/>
                        </svg>
                        <span>My Bets</span>
                    </button>
                    <button class="btn btn-secondary btn-lg" onclick="App.navigate('in-play'); document.querySelector('.modal').remove();" style="justify-content: flex-start; padding: 16px;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                            <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                        <span>View Live Matches</span>
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// Export
if (typeof window !== 'undefined') {
    window.App = App;
}
