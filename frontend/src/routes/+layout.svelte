<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import Header from '$lib/components/Header.svelte';
    import BottomNav from '$lib/components/BottomNav.svelte';
    import Toast from '$lib/components/Toast.svelte';
    import Loading from '$lib/components/Loading.svelte';
    import { initAuth, authLoading, isAuthenticated } from '$lib/stores/auth.js';
    import '../app.css';

    let { children } = $props();

    $effect(() => {
        if (!$authLoading && !$isAuthenticated && $page.url.pathname !== '/login') {
            goto('/login');
        }
    });

    onMount(() => {
        initAuth();
    });

    let isLoginPage = $derived($page.url.pathname === '/login');
</script>

{#if $authLoading}
    <Loading />
{:else if !$isAuthenticated && !isLoginPage}
    <Loading />
{:else if isLoginPage}
    <main id="main-content" class="main-content">
        {@render children()}
    </main>
{:else}
    <Header />
    <main id="main-content" class="main-content">
        {@render children()}
    </main>
    <BottomNav />
{/if}

<Toast />
