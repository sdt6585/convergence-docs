

```javascript
// Sample implementation for testing the ship combat system

import { Character, Ship, GameManager } from './core-classes.js';

// Initialize the game manager (would normally connect to Supabase)
const gameManager = new GameManager();

// Create a test game
const testGame = {
  id: 'test-game-123',
  name: 'Ship Combat Test',
  status: 'active',
  gmUserId: 'gm-user-123'
};
gameManager.currentGame = testGame;

// Create some test characters
const playerCharacter1 = new Character({
  name: 'Brad',
  race: 'Human',
  characterClass: 'Pilot',
  subclass: 'Ace',
  tier: 3,
  isNPC: false,
  stats: {
    intelligence: 6,
    dexterity: 7,
    strength: 5,
    charisma: 6,
    intuition: 6,
    luck: 1,
    constitution: 5
  },
  skills: {
    'Vessel Piloting': 8,
    'Evasion': 6,
    'Pistols': 4
  },
  abilities: [
    { 
      name: 'Pinpoint Targeting',
      tier: 2,
      description: "Ship's weapons deal an additional 0.25x damage",
      effects: ['damage.multiplier.0.25']
    },
    {
      name: 'Learning on the Fly',
      tier: 3,
      description: "+1 to Vessel Piloting",
      effects: ['skill.vessel_piloting.bonus.1']
    }
  ]
});

const playerCharacter2 = new Character({
  name: 'Maya',
  race: 'C\'Than',
  characterClass: 'Engineer',
  subclass: 'Bio-Hacker',
  tier: 2,
  isNPC: false,
  stats: {
    intelligence: 9,
    dexterity: 7,
    strength: 4,
    charisma: 5,
    intuition: 7,
    luck: 0,
    constitution: 4
  },
  skills: {
    'Hardware Maintenance': 7,
    'Computer Engineering': 6,
    'Hacking': 5
  }
});

const playerCharacter3 = new Character({
  name: 'Grax',
  race: 'Troydian',
  characterClass: 'Drop Trooper',
  subclass: 'Shock Trooper',
  tier: 2,
  isNPC: false,
  stats: {
    intelligence: 6,
    dexterity: 4,
    strength: 8,
    charisma: 4,
    intuition: 7,
    luck: 0,
    constitution: 6 
  },
  skills: {
    'Heavy Weapons': 8,
    'Brawling': 7,
    'Rifles': 6
  }
});

// Add characters to the game manager
gameManager.addCharacter(playerCharacter1);
gameManager.addCharacter(playerCharacter2);
gameManager.addCharacter(playerCharacter3);

// Create NPC characters for the enemy ship
const enemyCharacter1 = new Character({
  name: 'Captain Vex',
  race: 'Human',
  characterClass: 'Commander',
  isNPC: true,
  stats: {
    intelligence: 7,
    dexterity: 6,
    strength: 6,
    charisma: 8,
    intuition: 7,
    luck: 1,
    constitution: 6
  },
  skills: {
    'Vessel Piloting': 6,
    'Intimidation': 8,
    'Pistols': 5
  }
});

const enemyCharacter2 = new Character({
  name: 'Gunner Draz',
  race: 'Troydian',
  characterClass: 'Drop Trooper',
  isNPC: true,
  stats: {
    intelligence: 5,
    dexterity: 4,
    strength: 8,
    charisma: 3,
    intuition: 6,
    luck: 0,
    constitution: 7
  },
  skills: {
    'Heavy Weapons': 7,
    'Brawling': 6,
    'Rifles': 5
  }
});

// Add enemy characters to the game manager
gameManager.addCharacter(enemyCharacter1);
gameManager.addCharacter(enemyCharacter2);

// Create the player ship
const playerShip = new Ship({
  name: 'Artemis',
  shipClass: 'Patrol Craft',
  faction: 'player'
});

// Create the enemy ship
const enemyShip = new Ship({
  name: 'Corsair Vengeance',
  shipClass: 'Cruiser',
  faction: 'enemy'
});

// Add ships to the game manager
gameManager.addShip(playerShip);
gameManager.addShip(enemyShip);

// Add weapons to ships
playerShip.addWeapon({
  name: 'Pulse Laser',
  type: 'energy',
  damage: 8,
  range: 200,
  targetingSkill: 'Heavy Weapons'
});

playerShip.addWeapon({
  name: 'Torpedo Launcher',
  type: 'explosive',
  damage: 20,
  range: 500,
  targetingSkill: 'Heavy Weapons',
  cooldown: 3
});

enemyShip.addWeapon({
  name: 'Heavy Plasma Cannon',
  type: 'energy',
  damage: 15,
  range: 350,
  targetingSkill: 'Heavy Weapons'
});

// Assign characters to stations
playerCharacter1.assignToStation(playerShip, 'Navigation');
playerCharacter2.assignToStation(playerShip, 'Engineering');
playerCharacter3.assignToStation(playerShip, 'Weapons');

enemyCharacter1.assignToStation(enemyShip, 'Navigation');
enemyCharacter2.assignToStation(enemyShip, 'Weapons');

// Listen to events for logging
gameManager.events.on('game.combat.started', async (event) => {
  console.log(`Combat started between ${event.combat.ships.map(s => s.name).join(' and ')}`);
});

playerShip.events.on('ship.weapon.fire.before', async (event) => {
  console.log(`${event.ship.name} is firing ${event.weapon.name} at ${event.targetShip.name}`);
});

playerShip.events.on('ship.weapon.fire.after', async (event) => {
  if (event.successful) {
    console.log(`HIT! Dealt ${event.damage} damage`);
  } else {
    console.log(`MISS!`);
  }
});

enemyShip.events.on('ship.damage.after', async (event) => {
  console.log(`${event.ship.name} takes ${event.amount} damage! HP: ${event.currentHp}/${event.ship.maxHp}`);
});

// Start a combat encounter
const combat = gameManager.startCombat([playerShip.id, enemyShip.id]);

// Simulate combat turns
console.log("\n=== Starting Ship Combat Simulation ===\n");

// Player ship's turn
console.log(`Turn ${combat.turnCount} - ${playerShip.name}'s turn`);
console.log(`${playerCharacter3.name} at weapons station`);

// Fire the first weapon
combat.performAction('fire', {
  sourceCharacter: playerCharacter3,
  targetShip: enemyShip,
  weaponIndex: 0
});

// End turn
combat.endShipTurn();

// Enemy ship's turn
console.log(`\nTurn ${combat.turnCount} - ${enemyShip.name}'s turn`);
console.log(`${enemyCharacter2.name} at weapons station`);

// Fire at player ship
combat.performAction('fire', {
  sourceCharacter: enemyCharacter2,
  targetShip: playerShip,
  weaponIndex: 0
});

// End turn
combat.endShipTurn();

// Next player turn - try to evade
console.log(`\nTurn ${combat.turnCount} - ${playerShip.name}'s turn`);
console.log(`${playerCharacter1.name} at navigation station attempts evasive maneuvers`);

// Perform evasive maneuvers
const evasionResult = combat.performAction('evade', {
  sourceCharacter: playerCharacter1,
  difficulty: 12
});

console.log(`Evasion roll: ${evasionResult.rollResult.roll} + ${evasionResult.rollResult.totalSkill} = ${evasionResult.rollResult.roll + evasionResult.rollResult.totalSkill} vs difficulty ${evasionResult.rollResult.difficulty}`);
console.log(`Evasion ${evasionResult.rollResult.successful ? 'SUCCESSFUL' : 'FAILED'}`);

// Also fire weapon
console.log(`${playerCharacter3.name} fires the torpedo launcher`);
combat.performAction('fire', {
  sourceCharacter: playerCharacter3,
  targetShip: enemyShip,
  weaponIndex: 1
});

// End turn
combat.endShipTurn();

// Print combat summary
console.log("\n=== Combat Summary ===");
console.log(`${playerShip.name}: HP ${playerShip.hp}/${playerShip.maxHp}, Shields ${playerShip.shields}/${playerShip.maxShields}`);
console.log(`${enemyShip.name}: HP ${enemyShip.hp}/${enemyShip.maxHp}, Shields ${enemyShip.shields}/${enemyShip.maxShields}`);

console.log("\n=== Action History ===");
combat.getActionHistory().forEach((action, index) => {
  console.log(`${index + 1}. ${action.type.toUpperCase()} - ${action.getRollDescription()}`);
  console.log(`   Effect: ${action.getEffectsDescription()}`);
});
```

