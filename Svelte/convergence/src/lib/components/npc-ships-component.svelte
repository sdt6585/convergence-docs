<!-- components/NPCShips.svelte -->
<script>
  import CollapsibleItem from "./collapsible-item-component.svelte";
  
  let npcShipsOpen = true;
  let frigateDetailsOpen = true;
  let attributesOpen = true;
  let weaponDocksOpen = true;
  let stationsOpen = true;
  
  // NPC data
  const npcShip = {
    name: "Mars War Frigate",
    attributes: {
      hp: { current: 1200, max: 1200 },
      shields: { current: 562, max: 3000 },
    },
    weaponDocks: [
      { type: "Laser" },
      { type: "Torpedo Bay" },
      { type: "Laser" }
    ],
    stations: [
      { 
        name: "Helm", 
        operator: "NPC #1" 
      },
      { 
        name: "Shields", 
        operator: "NPC #2" 
      },
      { 
        name: "Comms", 
        operator: null 
      },
      { 
        name: "Targeting", 
        operator: "NPC #3" 
      },
      { 
        name: "Network", 
        operator: null 
      }
    ],
    distance: null, // Input field
    velocity: null, // Input field
    fuelStores: { current: 20, max: 100 }
  };
</script>

<div class="npc-ships">
  <CollapsibleItem bind:open={npcShipsOpen} title="NPC Ships:">
    <CollapsibleItem bind:open={frigateDetailsOpen} title="{npcShip.name}:" indent={1}>
      <CollapsibleItem bind:open={attributesOpen} title="Attributes/Stats" indent={2}>
        <div class="stat-line" style="padding-left: 32px;">
          - HP: {npcShip.attributes.hp.current}/{npcShip.attributes.hp.max}
        </div>
        <div class="stat-line" style="padding-left: 32px;">
          - Shields: {npcShip.attributes.shields.current}/{npcShip.attributes.shields.max}
        </div>
      </CollapsibleItem>
      
      <CollapsibleItem bind:open={weaponDocksOpen} title="Weapon Docks" indent={2}>
        {#each npcShip.weaponDocks as weapon, i}
          <div class="stat-line" style="padding-left: 32px;">
            - {weapon.type}
          </div>
        {/each}
      </CollapsibleItem>
      
      <CollapsibleItem bind:open={stationsOpen} title="Stations:" indent={2}>
        {#each npcShip.stations as station}
          <div class="stat-line" style="padding-left: 32px;">
            - {station.name}
            {#if station.operator}
              <div style="padding-left: 16px;">- {station.operator}</div>
            {/if}
          </div>
        {/each}
        <div class="stat-line" style="padding-left: 32px;">
          -Distance: <input type="text" placeholder="[Input Field]" />
        </div>
        <div class="stat-line" style="padding-left: 32px;">
          -Velocity: <input type="text" placeholder="[Input Field]" />
        </div>
        <div class="stat-line" style="padding-left: 32px;">
          -Fuel Stores: {npcShip.fuelStores.current}/{npcShip.fuelStores.max}
        </div>
      </CollapsibleItem>
    </CollapsibleItem>
  </CollapsibleItem>
</div>

<style>
  .npc-ships {
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
