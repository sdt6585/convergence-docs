
### Core Class Implementation

```javascript
// Core class implementations for Gargantua Ship Combat Prototype

/**
 * Character class - represents player characters and NPCs
 */
class Character {
  constructor({
    id = crypto.randomUUID(),
    name,
    race,
    characterClass,
    subclass = null,
    tier = 1,
    hp = 100,
    maxHp = 100,
    isNPC = false,
    stats = {},
    skills = {},
    abilities = [],
    equipment = []
  }) {
    this.id = id;
    this.name = name;
    this.race = race;
    this.characterClass = characterClass;
    this.subclass = subclass;
    this.tier = tier;
    this.hp = hp;
    this.maxHp = maxHp;
    this.isNPC = isNPC;
    
    // Initialize stats based on race if not provided
    this.stats = stats;
    if (Object.keys(stats).length === 0) {
      this.initializeBaseStats();
    }
    
    this.skills = skills;
    this.abilities = abilities;
    this.equipment = equipment;
    
    this.currentShip = null;
    this.currentStation = null;
    
    // Attach event emitter
    this.events = makeEventEmitter();
  }
  
  initializeBaseStats() {
    // Default stats based on race
    switch(this.race) {
      case 'Human':
        this.stats = {
          intelligence: 6,
          dexterity: 6,
          strength: 5,
          charisma: 6,
          intuition: 6,
          luck: 1,
          constitution: 5
        };
        break;
      case 'Troydian':
        this.stats = {
          intelligence: 6,
          dexterity: 4,
          strength: 8,
          charisma: 4,
          intuition: 7,
          luck: 0,
          constitution: 6
        };
        break;
      case 'C\'Than':
        this.stats = {
          intelligence: 8,
          dexterity: 7,
          strength: 4,
          charisma: 5,
          intuition: 7,
          luck: 0,
          constitution: 4
        };
        break;
      default:
        // Generic fallback
        this.stats = {
          intelligence: 5,
          dexterity: 5,
          strength: 5,
          charisma: 5,
          intuition: 5,
          luck: 0,
          constitution: 5
        };
    }
  }
  
  getSkillValue(skillName) {
    return this.skills[skillName] || 0;
  }
  
  getStatValue(statName) {
    return this.stats[statName] || 0;
  }
  
  addSkillPoints(skillName, points) {
    if (!this.skills[skillName]) {
      this.skills[skillName] = 0;
    }
    this.skills[skillName] += points;
    
    // Emit skill change event
    this.events.emit('character.skill.changed', {
      character: this,
      skillName,
      newValue: this.skills[skillName],
      oldValue: this.skills[skillName] - points
    });
  }
  
  damage(amount) {
    const event = {
      character: this,
      amount,
      originalAmount: amount
    };
    
    // Pre-damage hooks (shields, abilities, etc.)
    this.events.emit('character.damage.before', event);
    
    const actualDamage = Math.max(0, event.amount);
    this.hp = Math.max(0, this.hp - actualDamage);
    
    // Post-damage hooks
    this.events.emit('character.damage.after', {
      character: this,
      amount: actualDamage,
      currentHp: this.hp,
      isDowned: this.hp <= 0
    });
    
    return actualDamage;
  }
  
  heal(amount) {
    const event = {
      character: this,
      amount,
      originalAmount: amount
    };
    
    // Pre-heal hooks (abilities, etc.)
    this.events.emit('character.heal.before', event);
    
    const actualHeal = Math.max(0, event.amount);
    this.hp = Math.min(this.maxHp, this.hp + actualHeal);
    
    // Post-heal hooks
    this.events.emit('character.heal.after', {
      character: this,
      amount: actualHeal,
      currentHp: this.hp
    });
    
    return actualHeal;
  }
  
  getAbilityByName(name) {
    return this.abilities.find(ability => ability.name === name);
  }
  
  useAbility(abilityName, target) {
    const ability = this.getAbilityByName(abilityName);
    if (!ability) {
      throw new Error(`Ability '${abilityName}' not found on character ${this.name}`);
    }
    
    return ability.use(this, target);
  }
  
  addEquipment(equipment) {
    this.equipment.push(equipment);
    
    // Apply equipment effects
    equipment.applyEffects(this);
    
    this.events.emit('character.equipment.added', {
      character: this,
      equipment
    });
  }
  
  assignToStation(ship, stationType) {
    // Leave current station if on one
    if (this.currentStation) {
      this.currentStation.unassign();
    }
    
    // Find the requested station
    const station = ship.getStationByType(stationType);
    if (!station) {
      throw new Error(`Station type '${stationType}' not found on ship ${ship.name}`);
    }
    
    // Assign to the new station
    station.assign(this);
    this.currentShip = ship;
    this.currentStation = station;
    
    this.events.emit('character.station.assigned', {
      character: this,
      ship,
      station
    });
    
    return station;
  }
}

/**
 * Ship class - represents spacecraft in the game
 */
class Ship {
  constructor({
    id = crypto.randomUUID(),
    name,
    shipClass,
    hp = 0,
    maxHp = 0,
    shields = 0,
    maxShields = 0,
    tonnage = 0,
    minCrew = 1,
    maxPassengers = 0,
    speed = 0,
    stations = [],
    weapons = [],
    bays = []
  }) {
    this.id = id;
    this.name = name;
    this.shipClass = shipClass;
    
    // Set default values based on ship class
    if (shipClass) {
      this.initializeShipClassDefaults();
    }
    
    // Override with provided values
    this.hp = hp || this.maxHp;
    this.maxHp = maxHp || this.maxHp;
    this.shields = shields || this.maxShields;
    this.maxShields = maxShields || this.maxShields;
    this.tonnage = tonnage || this.tonnage;
    this.minCrew = minCrew || this.minCrew;
    this.maxPassengers = maxPassengers || this.maxPassengers;
    this.speed = speed || this.speed;
    
    this.stations = stations;
    this.weapons = weapons;
    this.bays = bays;
    
    // Initialize default stations if none provided
    if (this.stations.length === 0) {
      this.initializeDefaultStations();
    }
    
    // Attach event emitter
    this.events = makeEventEmitter();
  }
  
  initializeShipClassDefaults() {
    // Set default values based on ship class
    switch(this.shipClass) {
      case 'Patrol Craft':
        this.maxHp = Math.floor(36000 * 20); // Average 20 tonnage
        this.maxShields = 1000;
        this.tonnage = 20;
        this.minCrew = 1;
        this.maxPassengers = 8;
        this.speed = 100;
        break;
      case 'Cruiser':
      case 'Freighter':
        this.maxHp = Math.floor(36000 * 250); // Average 250 tonnage
        this.maxShields = 5000;
        this.tonnage = 250;
        this.minCrew = 5;
        this.maxPassengers = 50;
        this.speed = 75;
        break;
      case 'Battleship':
        this.maxHp = Math.floor(36000 * 500); // Average 500 tonnage
        this.maxShields = 10000;
        this.tonnage = 500;
        this.minCrew = 20;
        this.maxPassengers = 200;
        this.speed = 50;
        break;
      default:
        // Generic fallback
        this.maxHp = 36000 * 20;
        this.maxShields = 1000;
        this.tonnage = 20;
        this.minCrew = 1;
        this.maxPassengers = 10;
        this.speed = 50;
    }
  }
  
  initializeDefaultStations() {
    // Create default stations based on ship class
    const defaultStations = [
      new ShipStation({ type: 'Navigation' }),
      new ShipStation({ type: 'Weapons' }),
      new ShipStation({ type: 'Shields' }),
      new ShipStation({ type: 'Engineering' })
    ];
    
    // Add more stations for larger ships
    if (this.shipClass === 'Cruiser' || this.shipClass === 'Freighter' || this.shipClass === 'Battleship') {
      defaultStations.push(new ShipStation({ type: 'Communications' }));
      defaultStations.push(new ShipStation({ type: 'Medical' }));
    }
    
    if (this.shipClass === 'Battleship') {
      defaultStations.push(new ShipStation({ type: 'Command' }));
      defaultStations.push(new ShipStation({ type: 'Secondary Weapons' }));
    }
    
    this.stations = defaultStations;
  }
  
  damage(amount) {
    const event = {
      ship: this,
      amount,
      originalAmount: amount
    };
    
    // Pre-damage hooks
    this.events.emit('ship.damage.before', event);
    
    const actualDamage = Math.max(0, event.amount);
    this.hp = Math.max(0, this.hp - actualDamage);
    
    // Post-damage hooks
    this.events.emit('ship.damage.after', {
      ship: this,
      amount: actualDamage,
      currentHp: this.hp,
      isDestroyed: this.hp <= 0
    });
    
    return actualDamage;
  }
  
  damageShields(amount) {
    const event = {
      ship: this,
      amount,
      originalAmount: amount
    };
    
    // Pre-shield damage hooks
    this.events.emit('ship.shields.damage.before', event);
    
    const actualDamage = Math.max(0, event.amount);
    const oldShields = this.shields;
    this.shields = Math.max(0, this.shields - actualDamage);
    
    // Check if shields are depleted
    if (oldShields > 0 && this.shields === 0) {
      this.events.emit('ship.shields.depleted', { ship: this });
    }
    
    // Post-shield damage hooks
    this.events.emit('ship.shields.damage.after', {
      ship: this,
      amount: actualDamage,
      currentShields: this.shields
    });
    
    return actualDamage;
  }
  
  repair(amount) {
    const event = {
      ship: this,
      amount,
      originalAmount: amount
    };
    
    // Pre-repair hooks
    this.events.emit('ship.repair.before', event);
    
    const actualRepair = Math.max(0, event.amount);
    this.hp = Math.min(this.maxHp, this.hp + actualRepair);
    
    // Post-repair hooks
    this.events.emit('ship.repair.after', {
      ship: this,
      amount: actualRepair,
      currentHp: this.hp
    });
    
    return actualRepair;
  }
  
  rechargeShields(amount) {
    const event = {
      ship: this,
      amount,
      originalAmount: amount
    };
    
    // Pre-recharge hooks
    this.events.emit('ship.shields.recharge.before', event);
    
    const actualRecharge = Math.max(0, event.amount);
    this.shields = Math.min(this.maxShields, this.shields + actualRecharge);
    
    // Post-recharge hooks
    this.events.emit('ship.shields.recharge.after', {
      ship: this,
      amount: actualRecharge,
      currentShields: this.shields
    });
    
    return actualRecharge;
  }
  
  addStation(type) {
    const station = new ShipStation({ type, shipId: this.id });
    this.stations.push(station);
    return station;
  }
  
  addWeapon(weaponData) {
    const weapon = new ShipWeapon({
      ...weaponData,
      shipId: this.id
    });
    this.weapons.push(weapon);
    return weapon;
  }
  
  addBay(type) {
    const bay = new ShipBay({ type, shipId: this.id });
    this.bays.push(bay);
    return bay;
  }
  
  getStationByType(type) {
    return this.stations.find(station => station.type === type);
  }
  
  performEvasiveManeuver(difficulty) {
    // Get navigation station
    const navigationStation = this.getStationByType('Navigation');
    if (!navigationStation || !navigationStation.assignedCharacter) {
      throw new Error(`No character assigned to navigation station on ship ${this.name}`);
    }
    
    const pilot = navigationStation.assignedCharacter;
    const pilotingSkill = pilot.getSkillValue('Vessel Piloting');
    const evasionSkill = pilot.getSkillValue('Evasion');
    
    // Create evasion event
    const event = {
      ship: this,
      pilot,
      difficulty,
      pilotingSkill,
      evasionSkill,
      bonuses: navigationStation.bonuses,
      successful: false
    };
    
    // Pre-evasion hooks
    this.events.emit('ship.evasion.before', event);
    
    // Roll for evasion
    const diceRoller = new DiceRoller();
    const roll = diceRoller.rollDice(20, 1)[0];
    const totalSkill = pilotingSkill + evasionSkill;
    const success = roll + totalSkill >= difficulty;
    
    event.roll = roll;
    event.totalSkill = totalSkill;
    event.totalRoll = roll + totalSkill;
    event.successful = success;
    
    // Post-evasion hooks
    this.events.emit('ship.evasion.after', event);
    
    return event;
  }
  
  fireWeapon(weaponIndex, targetShip) {
    if (weaponIndex < 0 || weaponIndex >= this.weapons.length) {
      throw new Error(`Invalid weapon index ${weaponIndex}`);
    }
    
    const weapon = this.weapons[weaponIndex];
    
    // Get weapons station
    const weaponsStation = this.getStationByType('Weapons');
    let gunner = null;
    let gunnerSkill = 0;
    
    if (weaponsStation && weaponsStation.assignedCharacter) {
      gunner = weaponsStation.assignedCharacter;
      gunnerSkill = gunner.getSkillValue(weapon.targetingSkill);
    }
    
    // Create firing event
    const event = {
      ship: this,
      weapon,
      targetShip,
      gunner,
      gunnerSkill,
      bonuses: weaponsStation ? weaponsStation.bonuses : {},
      successful: false,
      damage: weapon.damage
    };
    
    // Pre-firing hooks
    this.events.emit('ship.weapon.fire.before', event);
    
    // Roll for hit
    const diceRoller = new DiceRoller();
    const roll = diceRoller.rollDice(20, 1)[0];
    
    // Target evasion check
    const targetNavigationStation = targetShip.getStationByType('Navigation');
    let targetPilot = null;
    let targetEvasion = 0;
    
    if (targetNavigationStation && targetNavigationStation.assignedCharacter) {
      targetPilot = targetNavigationStation.assignedCharacter;
      targetEvasion = targetPilot.getSkillValue('Evasion');
    }
    
    const difficulty = 10 + targetEvasion;
    const totalAttack = roll + gunnerSkill;
    const success = totalAttack >= difficulty;
    
    event.roll = roll;
    event.totalAttack = totalAttack;
    event.targetEvasion = targetEvasion;
    event.difficulty = difficulty;
    event.successful = success;
    
    // Apply damage if hit
    if (success) {
      // Check if target has shields
      if (targetShip.shields > 0) {
        targetShip.damageShields(event.damage);
      } else {
        targetShip.damage(event.damage);
      }
    }
    
    // Post-firing hooks
    this.events.emit('ship.weapon.fire.after', event);
    
    return event;
  }
}

/**
 * ShipStation class - represents a station on a ship
 */
class ShipStation {
  constructor({
    id = crypto.randomUUID(),
    shipId = null,
    type,
    assignedCharacter = null,
    bonuses = {}
  }) {
    this.id = id;
    this.shipId = shipId;
    this.type = type;
    this.assignedCharacter = assignedCharacter;
    this.bonuses = bonuses;
    
    // Attach event emitter
    this.events = makeEventEmitter();
  }
  
  assign(character) {
    // Unassign current character if any
    if (this.assignedCharacter) {
      this.unassign();
    }
    
    // Assign new character
    this.assignedCharacter = character;
    
    // Calculate bonuses based on character skills/stats
    this.calculateBonuses();
    
    this.events.emit('station.assigned', {
      station: this,
      character
    });
  }
  
  unassign() {
    if (!this.assignedCharacter) return;
    
    const character = this.assignedCharacter;
    this.assignedCharacter = null;
    this.bonuses = {};
    
    this.events.emit('station.unassigned', {
      station: this,
      character
    });
  }
  
  calculateBonuses() {
    if (!this.assignedCharacter) {
      this.bonuses = {};
      return;
    }
    
    const character = this.assignedCharacter;
    const bonuses = {};
    
    // Different bonuses based on station type
    switch(this.type) {
      case 'Navigation':
        bonuses.evasion = character.getSkillValue('Vessel Piloting') * 0.1;
        bonuses.speed = character.getSkillValue('Vessel Piloting') * 0.05;
        bonuses.initiative = character.getStatValue('dexterity') * 0.1;
        break;
      case 'Weapons':
        bonuses.accuracy = character.getSkillValue('Heavy Weapons') * 0.1;
        bonuses.damage = character.getStatValue('intelligence') * 0.05;
        break;
      case 'Shields':
        bonuses.efficiency = character.getSkillValue('Hardware Maintenance') * 0.1;
        bonuses.recharge = character.getStatValue('intelligence') * 0.05;
        break;
      case 'Engineering':
        bonuses.repair = character.getSkillValue('Hardware Maintenance') * 0.1;
        bonuses.powerOutput = character.getStatValue('intelligence') * 0.05;
        break;
      // Add more station types as needed
    }
    
    this.bonuses = bonuses;
    
    this.events.emit('station.bonuses.calculated', {
      station: this,
      character,
      bonuses
    });
  }
  
  getBonusValue(bonusType) {
    return this.bonuses[bonusType] || 0;
  }
  
  calculateEffectiveness() {
    if (!this.assignedCharacter) return 0;
    
    // Sum of all bonuses as a simple measure of effectiveness
    return Object.values(this.bonuses).reduce((sum, value) => sum + value, 0);
  }
}

/**
 * ShipWeapon class - represents a weapon on a ship
 */
class ShipWeapon {
  constructor({
    id = crypto.randomUUID(),
    shipId = null,
    name,
    type,
    damage = 10,
    range = 100,
    targetingSkill = 'Heavy Weapons',
    cooldown = 1,
    isActive = true
  }) {
    this.id = id;
    this.shipId = shipId;
    this.name = name;
    this.type = type;
    this.damage = damage;
    this.range = range;
    this.targetingSkill = targetingSkill;
    this.cooldown = cooldown;
    this.isActive = isActive;
    this.cooldownRemaining = 0;
    
    // Attach event emitter
    this.events = makeEventEmitter();
  }
  
  fire(targetShip) {
    if (this.cooldownRemaining > 0) {
      throw new Error(`Weapon ${this.name} is on cooldown`);
    }
    
    // Reset cooldown
    this.cooldownRemaining = this.cooldown;
    
    this.events.emit('weapon.fired', {
      weapon: this,
      targetShip
    });
  }
  
  toggleActive() {
    this.isActive = !this.isActive;
    
    this.events.emit('weapon.toggled', {
      weapon: this,
      isActive: this.isActive
    });
  }
  
  reduceCooldown(amount) {
    this.cooldownRemaining = Math.max(0, this.cooldownRemaining - amount);
    
    if (this.cooldownRemaining === 0) {
      this.events.emit('weapon.ready', { weapon: this });
    }
  }
}

/**
 * ShipBay class - represents a bay on a ship
 */
class ShipBay {
  constructor({
    id = crypto.randomUUID(),
    shipId = null,
    type,
    capacity = 100,
    contents = []
  }) {
    this.id = id;
    this.shipId = shipId;
    this.type = type;
    this.capacity = capacity;
    this.contents = contents;
    
    // Attach event emitter
    this.events = makeEventEmitter();
  }
  
  addItem(item) {
    if (this.isFull()) {
      return false;
    }
    
    this.contents.push(item);
    
    this.events.emit('bay.item.added', {
      bay: this,
      item
    });
    
    return true;
  }
  
  removeItem(item) {
    const index = this.contents.indexOf(item);
    if (index === -1) {
      return false;
    }
    
    this.contents.splice(index, 1);
    
    this.events.emit('bay.item.removed', {
      bay: this,
      item
    });
    
    return true;
  }
  
  isFull() {
    return this.contents.length >= this.capacity;
  }
  
  getUtilization() {
    return this.contents.length / this.capacity;
  }
}

/**
 * CombatEncounter class - represents a combat encounter between ships
 */
class CombatEncounter {
  constructor({
    id = crypto.randomUUID(),
    gameId = null,
    ships = [],
    status = 'preparing'
  }) {
    this.id = id;
    this.gameId = gameId;
    this.ships = ships;
    this.status = status;
    this.turnCount = 0;
    this.startedAt = null;
    this.activeShipIndex = 0;
    this.activeCharacter = null;
    this.actions = [];
    
    // Attach event emitter
    this.events = makeEventEmitter();
  }
  
  start() {
    if (this.status !== 'preparing') {
      throw new Error('Combat encounter already started');
    }
    
    if (this.ships.length < 2) {
      throw new Error('Need at least 2 ships for combat');
    }
    
    this.status = 'active';
    this.turnCount = 1;
    this.startedAt = new Date();
    this.activeShipIndex = 0;
    this.activeShip = this.ships[0];
    
    this.events.emit('combat.started', {
      encounter: this,
      ships: this.ships,
      turnCount: this.turnCount
    });
    
    this.startShipTurn();
    
    return true;
  }
  
  startShipTurn() {
    const activeShip = this.ships[this.activeShipIndex];
    
    this.events.emit('combat.ship.turn.started', {
      encounter: this,
      ship: activeShip,
      turnCount: this.turnCount
    });
    
    return activeShip;
  }
  
  endShipTurn() {
    const currentShip = this.ships[this.activeShipIndex];
    
    this.events.emit('combat.ship.turn.ended', {
      encounter: this,
      ship: currentShip,
      turnCount: this.turnCount
    });
    
    // Move to next ship
    this.activeShipIndex = (this.activeShipIndex + 1) % this.ships.length;
    
    // If we've gone through all ships, increment turn count
    if (this.activeShipIndex === 0) {
      this.turnCount++;
      
      this.events.emit('combat.turn.ended', {
        encounter: this,
        turnCount: this.turnCount - 1
      });
      
      this.events.emit('combat.turn.started', {
        encounter: this,
        turnCount: this.turnCount
      });
    }
    
    // Start next ship's turn
    return this.startShipTurn();
  }
  
  performAction(actionType, params) {
    if (this.status !== 'active') {
      throw new Error('Combat encounter not active');
    }
    
    const activeShip = this.ships[this.activeShipIndex];
    
    // Create action record
    const action = new CombatAction({
      type: actionType,
      sourceShip: activeShip,
      ...params
    });
    
    // Execute the action
    action.execute();
    
    // Add to action history
    this.actions.push(action);
    
    // Check if combat is over
    this.checkCombatEnd();
    
    return action;
  }
  
  checkCombatEnd() {
    // Count operational ships per side
    const shipsByFaction = this.ships.reduce((acc, ship) => {
      const faction = ship.faction || 'neutral';
      if (!acc[faction]) acc[faction] = { total: 0, operational: 0 };
      
      acc[faction].total++;
      if (ship.hp > 0) acc[faction].operational++;
      
      return acc;
    }, {});
    
    // Check if only one faction has operational ships
    const operationalFactions = Object.entries(shipsByFaction)
      .filter(([_, stats]) => stats.operational > 0)
      .map(([faction, _]) => faction);
    
    if (operationalFactions.length <= 1) {
      // Combat is over
      this.status = 'completed';
      
      this.events.emit('combat.ended', {
        encounter: this,
        winner: operationalFactions[0] || null,
        turnCount: this.turnCount
      });
      
      return true;
    }
    
    return false;
  }
  
  isOver() {
    return this.status === 'completed';
  }
  
  getWinner() {
    if (!this.isOver()) return null;
    
    // Find faction with operational ships
    const operationalShips = this.ships.filter(ship => ship.hp > 0);
    if (operationalShips.length === 0) return null;
    
    return operationalShips[0].faction;
  }
  
  getActionHistory() {
    return [...this.actions];
  }
}

/**
 * CombatAction class - represents an action in combat
 */
class CombatAction {
  constructor({
    id = crypto.randomUUID(),
    type,
    sourceShip,
    sourceCharacter = null,
    targetShip = null,
    params = {}
  }) {
    this.id = id;
    this.type = type;
    this.sourceShip = sourceShip;
    this.sourceCharacter = sourceCharacter;
    this.targetShip = targetShip;
    this.params = params;
    this.rollResult = null;
    this.effects = null;
    this.createdAt = new Date();
    
    // Attach event emitter
    this.events = makeEventEmitter();
  }
  
  execute() {
    // Different action types
    switch(this.type) {
      case 'fire':
        return this.executeFireAction();
      case 'evade':
        return this.executeEvadeAction();
      case 'repair':
        return this.executeRepairAction();
      case 'recharge':
        return this.executeRechargeAction();
      default:
        throw new Error(`Unknown action type: ${this.type}`);
    }
  }
  
  executeFireAction() {
    if (!this.targetShip) {
      throw new Error('No target ship specified for fire action');
    }
    
    const weaponIndex = this.params.weaponIndex || 0;
    const result = this.sourceShip.fireWeapon(weaponIndex, this.targetShip);
    
    this.rollResult = {
      roll: result.roll,
      totalAttack: result.totalAttack,
      difficulty: result.difficulty,
      successful: result.successful
    };
    
    this.effects = {
      damage: result.successful ? result.damage : 0,
      targetShields: this.targetShip.shields,
      targetHp: this.targetShip.hp
    };
    
    return result;
  }
  
  executeEvadeAction() {
    const difficulty = this.params.difficulty || 10;
    const result = this.sourceShip.performEvasiveManeuver(difficulty);
    
    this.rollResult = {
      roll: result.roll,
      totalSkill: result.totalSkill,
      difficulty,
      successful: result.successful
    };
    
    this.effects = {
      evasionBonus: result.successful ? 2 : 0
    };
    
    return result;
  }
  
  executeRepairAction() {
    const amount = this.params.amount || 10;
    const result = this.sourceShip.repair(amount);
    
    this.rollResult = null;
    
    this.effects = {
      repairAmount: result,
      currentHp: this.sourceShip.hp
    };
    
    return result;
  }
  
  executeRechargeAction() {
    const amount = this.params.amount || 10;
    const result = this.sourceShip.rechargeShields(amount);
    
    this.rollResult = null;
    
    this.effects = {
      rechargeAmount: result,
      currentShields: this.sourceShip.shields
    };
    
    return result;
  }
  
  getRollDescription() {
    if (!this.rollResult) return 'No roll performed';
    
    switch(this.type) {
      case 'fire':
        return `Attack roll: ${this.rollResult.roll} + ${this.rollResult.totalAttack - this.rollResult.roll} = ${this.rollResult.totalAttack} vs difficulty ${this.rollResult.difficulty} (${this.rollResult.successful ? 'HIT' : 'MISS'})`;
      case 'evade':
        return `Evasion roll: ${this.rollResult.roll} + ${this.rollResult.totalSkill} = ${this.rollResult.roll + this.rollResult.totalSkill} vs difficulty ${this.rollResult.difficulty} (${this.rollResult.successful ? 'SUCCESS' : 'FAILURE'})`;
      default:
        return `Roll result: ${JSON.stringify(this.rollResult)}`;
    }
  }
  
  getEffectsDescription() {
    if (!this.effects) return 'No effects';
    
    switch(this.type) {
      case 'fire':
        if (!this.rollResult.successful) {
          return 'Attack missed';
        }
        return `Dealt ${this.effects.damage} damage to ${this.targetShip.name} (Shields: ${this.effects.targetShields}, HP: ${this.effects.targetHp})`;
      case 'evade':
        return `Evasion ${this.rollResult.successful ? 'successful' : 'failed'} (Evasion bonus: ${this.effects.evasionBonus})`;
      case 'repair':
        return `Repaired ${this.effects.repairAmount} HP (Current HP: ${this.effects.currentHp})`;
      case 'recharge':
        return `Recharged ${this.effects.rechargeAmount} shield points (Current shields: ${this.effects.currentShields})`;
      default:
        return `Effects: ${JSON.stringify(this.effects)}`;
    }
  }
}

/**
 * DiceRoller class - utility for dice rolling
 */
class DiceRoller {
  rollDice(sides, count = 1) {
    const results = [];
    for (let i = 0; i < count; i++) {
      results.push(Math.floor(Math.random() * sides) + 1);
    }
    return results;
  }
  
  rollSkillCheck(character, skillName, difficulty) {
    const skillValue = character.getSkillValue(skillName);
    const roll = this.rollDice(20, 1)[0];
    
    return {
      roll,
      skillValue,
      total: roll + skillValue,
      difficulty,
      success: roll + skillValue >= difficulty
    };
  }
  
  rollStatCheck(character, statName, difficulty) {
    const statValue = character.getStatValue(statName);
    const roll = this.rollDice(20, 1)[0];
    
    return {
      roll,
      statValue,
      total: roll + statValue,
      difficulty,
      success: roll + statValue >= difficulty
    };
  }
  
  rollWithAdvantage(sides) {
    const rolls = this.rollDice(sides, 2);
    return Math.max(...rolls);
  }
  
  rollWithDisadvantage(sides) {
    const rolls = this.rollDice(sides, 2);
    return Math.min(...rolls);
  }
}

/**
 * GameManager - Main orchestrator class
 */
class GameManager {
  constructor() {
    this.events = makeEventEmitter();
    this.db = null; // Will be initialized with Supabase client
    this.currentGame = null;
    this.characters = new Map();
    this.ships = new Map();
    this.combatEncounters = new Map();
  }
  
  async initialize(supabaseClient) {
    this.db = supabaseClient;
    
    // Subscribe to database changes
    this.setupDatabaseSubscriptions();
    
    // Return self for chaining
    return this;
  }
  
  setupDatabaseSubscriptions() {
    // Subscribe to relevant tables
    if (!this.db) return;
    
    // Game changes
    this.db
      .channel('game-changes')
      .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'games' }, 
          payload => {
            this.events.emit('db.game.changed', payload);
          })
      .subscribe();
    
    // Character changes
    this.db
      .channel('character-changes')
      .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'characters' }, 
          payload => {
            this.events.emit('db.character.changed', payload);
          })
      .subscribe();
    
    // Ship changes
    this.db
      .channel('ship-changes')
      .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'ships' }, 
          payload => {
            this.events.emit('db.ship.changed', payload);
          })
      .subscribe();
    
    // Combat changes
    this.db
      .channel('combat-changes')
      .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'combat_encounters' }, 
          payload => {
            this.events.emit('db.combat.changed', payload);
          })
      .subscribe();
  }
  
  async createGame(name, gmUserId) {
    // Create game object
    const game = {
      name,
      gm_user_id: gmUserId,
      status: 'setup',
      created_at: new Date(),
      updated_at: new Date()
    };
    
    // Save to database
    const { data, error } = await this.db
      .from('games')
      .insert(game)
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    // Create Game instance
    this.currentGame = new Game({
      id: data.id,
      name: data.name,
      status: data.status,
      gmUserId: data.gm_user_id
    });
    
    this.events.emit('game.created', { game: this.currentGame });
    
    return this.currentGame;
  }
  
  async loadGame(id) {
    // Load game from database
    const { data: gameData, error: gameError } = await this.db
      .from('games')
      .select('*')
      .eq('id', id)
      .single();
    
    if (gameError) {
      throw gameError;
    }
    
    // Create Game instance
    this.currentGame = new Game({
      id: gameData.id,
      name: gameData.name,
      status: gameData.status,
      gmUserId: gameData.gm_user_id
    });
    
    // Load characters
    const { data: charactersData, error: charactersError } = await this.db
      .from('characters')
      .select('*')
      .eq('game_id', id);
    
    if (charactersError) {
      throw charactersError;
    }
    
    // Create Character instances
    for (const charData of charactersData) {
      const character = new Character({
        id: charData.id,
        name: charData.name,
        race: charData.race,
        characterClass: charData.class,
        subclass: charData.subclass,
        hp: charData.hp,
        maxHp: charData.max_hp,
        isNPC: charData.is_npc,
        stats: charData.stats,
        skills: charData.skills,
        abilities: charData.abilities,
        equipment: charData.equipment
      });
      
      this.characters.set(character.id, character);
      this.currentGame.addCharacter(character);
    }
    
    // Load ships
    const { data: shipsData, error: shipsError } = await this.db
      .from('ships')
      .select('*')
      .eq('game_id', id);
    
    if (shipsError) {
      throw shipsError;
    }
    
    // Create Ship instances
    for (const shipData of shipsData) {
      const ship = new Ship({
        id: shipData.id,
        name: shipData.name,
        shipClass: shipData.class,
        hp: shipData.hp,
        maxHp: shipData.max_hp,
        shields: shipData.shields,
        maxShields: shipData.max_shields,
        tonnage: shipData.tonnage,
        minCrew: shipData.min_crew,
        maxPassengers: shipData.max_passengers,
        speed: shipData.speed
      });
      
      this.ships.set(ship.id, ship);
      this.currentGame.addShip(ship);
      
      // Load ship stations, weapons, bays
      // This would require additional queries to those tables
    }
    
    this.events.emit('game.loaded', { game: this.currentGame });
    
    return this.currentGame;
  }
  
  async saveGame() {
    if (!this.currentGame) {
      throw new Error('No game currently loaded');
    }
    
    // Save game to database
    const { error: gameError } = await this.db
      .from('games')
      .update({
        name: this.currentGame.name,
        status: this.currentGame.status,
        updated_at: new Date()
      })
      .eq('id', this.currentGame.id);
    
    if (gameError) {
      throw gameError;
    }
    
    // Save characters
    for (const character of this.characters.values()) {
      await this.saveCharacter(character);
    }
    
    // Save ships
    for (const ship of this.ships.values()) {
      await this.saveShip(ship);
    }
    
    this.events.emit('game.saved', { game: this.currentGame });
    
    return true;
  }
  
  async saveCharacter(character) {
    // Update or insert character
    const { error } = await this.db
      .from('characters')
      .upsert({
        id: character.id,
        game_id: this.currentGame.id,
        name: character.name,
        race: character.race,
        class: character.characterClass,
        subclass: character.subclass,
        hp: character.hp,
        max_hp: character.maxHp,
        is_npc: character.isNPC,
        stats: character.stats,
        skills: character.skills,
        abilities: character.abilities,
        equipment: character.equipment
      });
    
    if (error) {
      throw error;
    }
    
    return true;
  }
  
  async saveShip(ship) {
    // Update or insert ship
    const { error } = await this.db
      .from('ships')
      .upsert({
        id: ship.id,
        game_id: this.currentGame.id,
        name: ship.name,
        class: ship.shipClass,
        hp: ship.hp,
        max_hp: ship.maxHp,
        shields: ship.shields,
        max_shields: ship.maxShields,
        tonnage: ship.tonnage,
        min_crew: ship.minCrew,
        max_passengers: ship.maxPassengers,
        speed: ship.speed
      });
    
    if (error) {
      throw error;
    }
    
    // Save ship stations, weapons, bays
    // This would require additional operations for those tables
    
    return true;
  }
  
  addCharacter(characterData) {
    if (!this.currentGame) {
      throw new Error('No game currently loaded');
    }
    
    // Create Character instance
    const character = new Character(characterData);
    
    this.characters.set(character.id, character);
    this.currentGame.addCharacter(character);
    
    this.events.emit('game.character.added', { 
      game: this.currentGame,
      character 
    });
    
    return character;
  }
  
  addShip(shipData) {
    if (!this.currentGame) {
      throw new Error('No game currently loaded');
    }
    
    // Create Ship instance
    const ship = new Ship(shipData);
    
    this.ships.set(ship.id, ship);
    this.currentGame.addShip(ship);
    
    this.events.emit('game.ship.added', { 
      game: this.currentGame,
      ship 
    });
    
    return ship;
  }
  
  startCombat(shipIds) {
    if (!this.currentGame) {
      throw new Error('No game currently loaded');
    }
    
    // Get ships for combat
    const ships = shipIds.map(id => {
      const ship = this.ships.get(id);
      if (!ship) {
        throw new Error(`Ship with id ${id} not found`);
      }
      return ship;
    });
    
    // Create combat encounter
    const combat = new CombatEncounter({
      gameId: this.currentGame.id,
      ships
    });
    
    this.combatEncounters.set(combat.id, combat);
    
    // Start the combat
    combat.start();
    
    this.events.emit('game.combat.started', { 
      game: this.currentGame,
      combat 
    });
    
    return combat;
  }
}

// Export all classes
export {
  Character,
  Ship,
  ShipStation,
  ShipWeapon,
  ShipBay,
  CombatEncounter,
  CombatAction,
  DiceRoller,
  GameManager
};
```
### Testing Implementation

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

