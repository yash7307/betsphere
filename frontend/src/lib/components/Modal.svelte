<script>
    let { isOpen = false, title = '', onclose, children } = $props();

    function handleBackdrop() {
        if (onclose) onclose();
    }

    function stopProp(e) {
        e.stopPropagation();
    }
</script>

{#if isOpen}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="modal show" onclick={handleBackdrop}>
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="modal-content" onclick={stopProp}>
            <div class="modal-header">
                <h3>{title}</h3>
                <button class="close-modal" onclick={onclose}>×</button>
            </div>
            <div class="modal-body">
                {@render children()}
            </div>
        </div>
    </div>
{/if}
