<!-- App.svelte -->
<script>
    import { onMount } from 'svelte';
    import PlayerShipsComponent from '$lib/components/player-ships-component.svelte';
    import NpcShipsComponent from '$lib/components/npc-ships-component.svelte';
    import ActionPanelComponent from '$lib/components/action-panel-component.svelte';
    import ChatPanelComponent from '$lib/components/chat-panel-component.svelte';
    import ChatHistoryComponent from '$lib/components/chat-history-component.svelte';
    import ShipSummaryComponent from '$lib/components/ship-summary-component.svelte';
    import CollapsibleItemComponent from '$lib/components/collapsible-item-component.svelte';
    import RadarInterface from '$lib/components/radar-interface.svelte';

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
          <ActionPanelComponent />
        </div>
        
        <div class="panel">
          <ChatPanelComponent />
        </div>
        
        <div class="panel">
          <h3>Recent chat history <span class="expand">[Tap to expand]</span></h3>
        </div>
        
        <div class="panel">
          <ShipSummaryComponent type="player" number="1" />
        </div>
        
        <div class="panel">
          <ShipSummaryComponent type="npc" number="1" />
        </div>
        
        <div class="panel">
          <ShipSummaryComponent type="npc" number="2" />
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
          <PlayerShipsComponent />
        </section>
        
        <section class="center-panel">
          <div class="top-center-panel">
            <ActionPanelComponent />
          </div>
          
          <div class="middle-center-panel">
            <RadarInterface />
          </div>
          
          <div class="bottom-center-panel">
            <ChatPanelComponent />
          </div>
        </section>
        
        <section class="ship-panel right-panel">
          <NpcShipsComponent />
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
  
