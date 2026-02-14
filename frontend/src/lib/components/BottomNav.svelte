<script>
    import { goto } from '$app/navigation';
    import { page } from '$app/state';

    let pathname = $derived(page.url.pathname);

    function handleNavClick(item) {
        if (item.id === 'center-fab') {
            // Quick actions - could be expanded
        } else {
            goto(item.path);
        }
    }
</script>

<nav class="bottom-nav">
    <!-- Home -->
    <button class="nav-item {pathname === '/' ? 'active' : ''}" onclick={() => goto('/')}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M9 22V12H15V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span>Home</span>
    </button>

    <!-- In-Play -->
    <button class="nav-item {pathname.startsWith('/in-play') ? 'active' : ''}" onclick={() => goto('/in-play')}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                fill="currentColor" />
        </svg>
        <span>In-Play</span>
    </button>

    <!-- Center FAB -->
    <button class="nav-item center-fab">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
        </svg>
    </button>

    <!-- My Bets -->
    <button class="nav-item {pathname === '/my-bets' ? 'active' : ''}" onclick={() => goto('/my-bets')}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 2C7.89543 2 7 2.89543 7 4V20C7 21.1046 7.89543 22 9 22H18C19.1046 22 20 21.1046 20 20V7L15 2H9Z"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M14 2V7H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span>My Bets</span>
    </button>

    <!-- Profile -->
    <button class="nav-item {pathname === '/profile' ? 'active' : ''}" onclick={() => goto('/profile')}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span>Profile</span>
    </button>
</nav>
