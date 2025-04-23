<!-- components/PlayerShips.svelte -->
<script>
  import CollapsibleItem from './CollapsibleItem.svelte';
  
  let playerShipsOpen = true;
  let shipDetailsOpen = true;
  let attributesOpen = true;
  let weaponDocksOpen = true;
  let stationsOpen = true;
  
  // Player data
  const playerShip = {
    id: "123",
    name: "Rosinante",
    attributes: {
      hp: { current: 465, max: 800 },
      shields: { current: 0, max: 2000 },
    },
    weaponDocks: [
      { type: "Laser" },
      { type: "Torpedo Bay" },
      { type: "Laser" }
    ],
    stations: [
      { 
        name: "Helm", 
        operator: "Player #1" 
      },
      { 
        name: "Shields", 
        operator: "Player #2" 
      },
      { 
        name: "Comms", 
        operator: null 
      },
      { 
        name: "Targeting", 
        operator: "Player #3" 
      },
      { 
        name: "Network", 
        operator: null 
      }
    ],
    velocity: null, // Input field
    fuelStores: { current: 35, max: 100 }
  };
</script>

<div class="player-ships">
  <CollapsibleItem bind:open={playerShipsOpen} title="Player Ships:">
    <CollapsibleItem bind:open={shipDetailsOpen} title="Ship #{playerShip.id} {playerShip.name}:" indent={1}>
      <CollapsibleItem bind:open={attributesOpen} title="Attributes/Stats" indent={2}>
        <div class="stat-line" style="padding-left: 32px;">
          - HP: {playerShip.attributes.hp.current}/{playerShip.attributes.hp.max}
        </div>
        <div class="stat-line" style="padding-left: 32px;">
          - Shields: {playerShip.attributes.shields.current}/{playerShip.attributes.shields.max}
        </div>
      </CollapsibleItem>
      
      <CollapsibleItem bind:open={weaponDocksOpen} title="Weapon Docks" indent={2}>
        {#each playerShip.weaponDocks as weapon, i}
          <div class="stat-line" style="padding-left: 32px;">
            - {weapon.type}
          </div>
        {/each}
      </CollapsibleItem>
      
      <CollapsibleItem bind:open={stationsOpen} title="Stations:" indent={2}>
        {#each playerShip.stations as station}
          <div class="stat-line" style="padding-left: 32px;">
            - {station.name}
            {#if station.operator}
              <div style="padding-left: 16px;">- {station.operator}</div>
            {/if}
          </div>
        {/each}
        <div class="stat-line" style="padding-left: 32px;">
          -Velocity: <input type="text" placeholder="[Input Field]" />
        </div>
        <div class="stat-line" style="padding-left: 32px;">
          -Fuel Stores: {playerShip.fuelStores.current}/{playerShip.fuelStores.max}
        </div>
      </CollapsibleItem>
    </CollapsibleItem>
  </CollapsibleItem>
</div>

<style>
  .player-ships {
    font-size: 0.9rem;
  }
  
  .stat-line {
    margin: 5px 0;
  }
  
  input {
    width: 100px;
    border: 1px solid #ccc;
    padding: 2px 5px;
    margin-left: 5px;
    font-family: 'Courier New', monospace;
  }
</style>
