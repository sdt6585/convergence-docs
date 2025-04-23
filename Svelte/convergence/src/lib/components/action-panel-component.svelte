<!-- components/ActionPanel.svelte -->
<script>
  function attack() {
    // Handle attack action
    console.log("Attack action triggered");
  }
  
  function evade() {
    // Handle evade action
    console.log("Evade action triggered");
  }
</script>

<div class="action-panel">
  <h3>Quick Actions:</h3>
  <div class="action-buttons">
    <button class="action-button" on:click={attack}>Attack</button>
    <button class="action-button" on:click={evade}>Evade</button>
  </div>
</div>

<style>
  .action-panel {
    width: 100%;
  }
  
  h3 {
    margin-top: 0;
    margin-bottom: 10px;
  }
  
  .action-buttons {
    display: flex;
    gap: 10px;
  }
  
  .action-button {
    padding: 5px 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f8f8f8;
    cursor: pointer;
    font-family: 'Courier New', monospace;
  }
  
  .action-button:hover {
    background-color: #e8e8e8;
  }
</style>
