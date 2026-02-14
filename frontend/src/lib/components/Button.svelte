<script>
    let { variant = 'primary', size = 'md', disabled = false, className = '', onclick, children, ...rest } = $props();
</script>

<button
    class="btn btn-{variant} btn-{size} {className}"
    {disabled}
    onclick={onclick}
    {...rest}
>
    {@render children()}
</button>
