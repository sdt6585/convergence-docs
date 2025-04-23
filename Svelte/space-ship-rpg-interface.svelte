<!-- App.svelte -->
<script>
  import { onMount } from 'svelte';
  import PlayerShips from './components/PlayerShips.svelte';
  import NPCShips from './components/NPCShips.svelte';
  import ActionPanel from './components/ActionPanel.svelte';
  import ChatPanel from './components/ChatPanel.svelte';
  import ChatHistory from './components/ChatHistory.svelte';
  import ShipSummary from './components/ShipSummary.svelte';
  
  let isMobile = false;
  let showMobileMenu = false;
  
  function checkScreenSize() {
    isMobile = window.innerWidth < 768;
  }
  
  onMount(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  });
  
  function toggleMobileMenu() {
    showMobileMenu = !showMobileMenu;
  }
</script>

{#if isMobile}
  <!-- Mobile View -->
  <div class="mobile-container">
    <header class="mobile-header">
      <button class="menu-button" on:click={toggleMobileMenu}>≡ GM Ship Mobile View</button>
    </header>
    
    <section class="mobile-content">
      <div class="panel">
        <ActionPanel />
      </div>
      
      <div class="panel">
        <ChatPanel />
      </div>
      
      <div class="panel">
        <h3>Recent chat history <span class="expand">[Tap to expand]</span></h3>
      </div>
      
      <div class="panel">
        <ShipSummary type="player" number="1" />
      </div>
      
      <div class="panel">
        <ShipSummary type="npc" number="1" />
      </div>
      
      <div class="panel">
        <ShipSummary type="npc" number="2" />
      </div>
    </section>
  </div>
{:else}
  <!-- Desktop View -->
  <div class="desktop-container">
    <header class="desktop-header">
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li>|</li>
          <li><a href="#encounters">Encounters</a></li>
          <li>|</li>
          <li><a href="#players">Players</a></li>
        </ul>
      </nav>
      <h1>GM Ship Desktop View</h1>
    </header>
    
    <div class="desktop-content">
      <section class="ship-panel left-panel">
        <PlayerShips />
      </section>
      
      <section class="center-panel">
        <div class="top-center-panel">
          <ActionPanel />
        </div>
        
        <div class="middle-center-panel">
          <ChatHistory />
        </div>
        
        <div class="bottom-center-panel">
          <ChatPanel />
        </div>
      </section>
      
      <section class="ship-panel right-panel">
        <NPCShips />
      </section>
    </div>
  </div>
{/if}

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: 'Courier New', monospace;
    line-height: 1.4;
  }
  
  :global(*) {
    box-sizing: border-box;
  }
  
  /* Desktop Styles */
  .desktop-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 10px;
    background-color: #f5f5f5;
  }
  
  .desktop-header {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    text-align: center;
  }
  
  .desktop-header nav ul {
    display: flex;
    list-style: none;
    justify-content: flex-start;
    padding: 0;
    margin: 0 0 10px 0;
  }
  
  .desktop-header nav li {
    margin: 0 10px 0 0;
  }
  
  .desktop-header h1 {
    margin: 0;
    font-size: 1.2rem;
  }
  
  .desktop-content {
    display: flex;
    flex: 1;
    gap: 10px;
    overflow: hidden;
  }
  
  .ship-panel {
    flex: 1;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 15px;
    overflow-y: auto;
    background-color: #fff;
  }
  
  .center-panel {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .top-center-panel {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 15px;
    background-color: #fff;
  }
  
  .middle-center-panel {
    flex: 1;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 15px;
    overflow-y: auto;
    background-color: #fff;
  }
  
  .bottom-center-panel {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 15px;
    height: 80px;
    background-color: #fff;
  }
  
  /* Mobile Styles */
  .mobile-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 10px;
    background-color: #f5f5f5;
  }
  
  .mobile-header {
    padding: 10px 0;
    margin-bottom: 10px;
    text-align: center;
  }
  
  .menu-button {
    width: 100%;
    padding: 8px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
    font-size: 1rem;
  }
  
  .mobile-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;
  }
  
  .panel {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 15px;
    background-color: #fff;
  }
  
  .expand {
    font-style: italic;
    color: #666;
  }
</style>
