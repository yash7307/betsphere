<script>
    import { page } from '$app/state';

    let pathname = $derived(page.url.pathname);

    function getTitleForPath() {
        const titles = {
            '/': 'BetSphere',
            '/in-play': 'Live Betting',
            '/my-bets': 'My Bets',
            '/profile': 'Profile'
        };
        return titles[pathname] || 'BetSphere';
    }

    let showBackButton = $derived(pathname.includes('/in-play/'));

    function goBack() {
        window.history.back();
    }
</script>

<header class="top-header">
    <button
        class="back-btn {showBackButton ? '' : 'hidden'}"
        onclick={goBack}
    >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
        </svg>
    </button>
    <h1 id="page-title">{getTitleForPath()}</h1>
    <button class="menu-btn">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
    </button>
</header>
