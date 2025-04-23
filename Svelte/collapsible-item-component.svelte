<!-- components/CollapsibleItem.svelte -->
<script>
  export let open = true;
  export let title = "";
  export let indent = 0;
  
  function toggle() {
    open = !open;
  }
  
  $: indentPadding = indent * 16;
</script>

<div class="collapsible-item" style="padding-left: {indentPadding}px;">
  <div class="header" on:click={toggle}>
    <span class="toggle-icon">{open ? '- ' : '+ '}</span>
    <span class="title">{title}</span>
  </div>
  
  {#if open}
    <div class="content">
      <slot></slot>
    </div>
  {/if}
</div>

<style>
  .collapsible-item {
    margin: 2px 0;
  }
  
  .header {
    cursor: pointer;
    user-select: none;
  }
  
  .toggle-icon {
    display: inline-block;
    width: 16px;
  }
  
  .content {
    margin-top: 2px;
  }
</style>
