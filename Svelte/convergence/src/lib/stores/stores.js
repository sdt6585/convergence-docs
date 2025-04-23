/* stores.js */
import { writable } from 'svelte/store';

// Player ships store
export const playerShips = writable([
  {
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
    velocity: null,
    fuelStores: { current: 35, max: 100 }
  }
]);

// NPC ships store
export const npcShips = writable([
  {
    id: "1",
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
    distance: null,
    velocity: null,
    fuelStores: { current: 20, max: 100 }
  },
  {
    id: "2",
    name: "Pirate Vessel",
    attributes: {
      hp: { current: 850, max: 1000 },
      shields: { current: 340, max: 2000 },
    },
    weaponDocks: [
      { type: "Laser" },
      { type: "Missile Bay" }
    ],
    stations: [
      { 
        name: "Helm", 
        operator: "Pirate Captain" 
      },
      { 
        name: "Weapons", 
        operator: "Gunner" 
      }
    ],
    distance: null,
    velocity: null,
    fuelStores: { current: 45, max: 100 }
  }
]);

// Chat messages store
export const chatMessages = writable([]);

// Game state store
export const gameState = writable({
  currentTurn: 1,
  phase: "planning", // planning, action, resolution
  activeShipId: "123"
});

/* Add a new chat message
export function addChatMessage(author, content) {
  const timestamp = new Date().toLocaleTimeString();
  chatMessages.update(messages => [
    ...messages,
    { timestamp, author, content }
  ]);
} */

/* Update ship attribute
export function updateShipAttribute(shipId, isNPC, attributePath, value) {
  const store = isNPC ? npcShips : playerShips;
  
  store.update(ships => {
    return ships.map(ship => {
      if (ship.id !== shipId) return ship;
      
      // Create a deep copy of the ship
      const updatedShip = JSON.parse(JSON.stringify(ship));
      
      // Split the path into parts (e.g., "attributes.hp.current")
      const pathParts = attributePath.split('.');
      
      // Navigate to the nested property
      let current = updatedShip;
      for (let i = 0; i < pathParts.length - 1; i++) {
        current = current[pathParts[i]];
      }
      
      // Update the value
      current[pathParts[pathParts.length - 1]] = value;
      
      return updatedShip;
    });
  }); 
} */
