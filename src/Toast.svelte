<script>
  import { fly } from 'svelte/transition';
  import { afterUpdate } from "svelte";

  export let show = false;
  export let message = "Flies in flies out";
  export let delay = 6;

  let hide = ()=> {
    show = false
  }
  
  let debouncedHide = hide.debounce((delay).sToMilliseconds())

  afterUpdate( () => {
    if (show) { debouncedHide() }
  }
  );
</script>


{#if show}
	<div in:fly="{{ y: 200, duration: 1000 }}" out:fly="{{ y: 200, duration: 1000 }}" {message}>
		<slot>{@html message}</slot>
	</div>
{/if}

<style>
  div {
    background: var(--darkest-gray);
    color: var(--white);
    padding: 8px 16px;
    position: fixed;
    bottom: 16px;
    margin: 0 auto;
    border-radius: 6px;
    max-width: 300px; }
</style>
