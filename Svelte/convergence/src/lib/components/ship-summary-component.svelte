<!-- components/ShipSummary.svelte -->
<script lang="ts">
  export let type: "player" | "npc" = "player";
  export let number: "1" | "2" = "1";
  
  let expanded = false;
  
  // Sample data
  const shipData = {
    player: {
      "1": {
        hp: "465/800",
        shields: "0/2000",
        velocity: "35",
        fuelStores: "35/100"
      }
    },
    npc: {
      "1": {
        hp: "1200/1200",
        shields: "562/3000",
        velocity: "[Input Field]",
        fuelStores: "20/100"
      },
      "2": {
        hp: "850/1000",
        shields: "340/2000",
        velocity: "[Input Field]",
        fuelStores: "45/100"
      }
    }
  };
  
  $: ship = shipData[type][number as keyof typeof shipData[typeof type]];
  $: title = type === "player" ? "Player Ship" : `NPC Ship #${number}`;
  
  function toggleExpand() {
    expanded = !expanded;
  }
</script>

<div class="ship-summary">
  <h3>{title}</h3>
  
  <div class="stats">
    <div class="stat">HP: {ship.hp}</div>
    <div class="stat">Shields: {ship.shields}</div>
    <div class="stat">Velocity: {ship.velocity}</div>
    <div class="stat">Fuel Stores: {ship.fuelStores}</div>
  </div>
  
  <div class="expand-note" on:click={toggleExpand}>
    [Tap to expand]
  </div>
</div>

<style>
  .ship-summary {
    width: 100%;
  }
  
  h3 {
    margin-top: 0;
    margin-bottom: 10px;
    text-align: center;
  }
  
  .stats {
    display: flex;
    flex-direction: column;
    gap: 5px;
    text-align: center;
  }
  
  .expand-note {
    text-align: center;
    color: #666;
    font-style: italic;
    margin-top: 10px;
    cursor: pointer;
  }
</style>
