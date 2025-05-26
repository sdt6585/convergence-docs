## Functions - UI & LLM:

### Non Combat

| Object, function, and parameters                                                                  | Initiator | Phase     | Notes                                                                                                                       |
| ------------------------------------------------------------------------------------------------- | --------- | --------- | --------------------------------------------------------------------------------------------------------------------------- |
| `Character.check(diceType, statName, difficulty)`                                                 | GM        | Immediate | GM determines when checks happen                                                                                            |
| `Character.move(locationId)`                                                                      | GM        | Immediate | GM confirms movement between locations                                                                                      |
| `Character.useAbility(character_ability_id, targetType:{'self', 'character', 'ship'}, targetId?)` | GM        | Immediate | After player declares intent                                                                                                |
| `Character.check(dieSides, stat_id, threshold{int}, is_saving_throw{boolean})`                    | GM        | Immediate | Auto-calculates modifiers from equipment, status, base stat, and relevant skills                                            |
| `Character.modifyHealth(currentHealth, maxHealth)`                                                | GM        | Future    | Allows arbitrary modification                                                                                               |
| `Character.equipItem(storageId, itemId, slotType)`                                                | Player/GM | Immediate | Only during player turn for player??                                                                                        |
| `Charcater.unequipItem(storageId, itemId)`                                                        | Player/GM | Immediate | Only during player turn for player??                                                                                        |
| `Character.equipCybernetic(???)`                                                                  | GM        | Future    | Need implementation Details                                                                                                 |
| `Character.unequipCybernetic(???)`                                                                | GM        | Future    | Need implementation Details                                                                                                 |
| `Ship.move(star_system_id, coordinate{x: #, y: #})`                                               | GM        | Immediate | Used for travel                                                                                                             |
| `Ship.modifyBay(bayIndex, bayType or null)`                                                       | GM        | Immediate | Ship customization, null to remove item?                                                                                    |
| `Ship.modifyHealth(currentHealth, maxHealth)`                                                     | GM        | Immediate | Arbitrary repair, damage, etc                                                                                               |
| `Ship.modifyShields(currentShields, maxShields)`                                                  | GM        | Immediate | Arbitrary repair, damage, special environmental damage, etc                                                                 |
| `Game.rollDice(dieSides, baseValue, threshold, modifiers[])`                                      | Player/GM | Immediate | Anyone can roll when asked                                                                                                  |
| `Game.log(message, category)`                                                                     | GM/System | Immediate | Auto-logs all actions                                                                                                       |
| `Game.createQuest(questData)`                                                                     | GM        | Future    | Story management                                                                                                            |
| `Game.awardCredits(amount, recipientIds[])`                                                       | GM        | Immediate | Rewards                                                                                                                     |
| `Game.spawnNPC(npcData, location)`                                                                | GM        | Future    | Need some details/need to finish building in UI                                                                             |
| `Game.transition(fromLocationId, toLocationId)`                                                   | GM        | Future    | Scene changes - need some details on if we need scenes of some sort or we just work inn the star system map or combat modes |

### Player-Initiated (Request) Functions

These generate requests that the GM must approve - all future phases of development, just place holders/ideas for now

| Function                                          | Notes                           |
| ------------------------------------------------- | ------------------------------- |
| `Request.movement(characterId, intent)`           | "I want to go to the bridge"    |
| `Request.action(characterId, actionDescription)`  | "I search the room"             |
| `Request.attack(characterId, targetDescription)`  | "I shoot at the pirate captain" |
| `Request.interaction(characterId, npcId, intent)` | "I try to negotiate"            |
| `Request.purchase(characterId, itemDescription)`  | "I want to buy shields"         |

### Combat (Planet, Space Station, Boarding, etc)

| Function                                                 | Initiator | Notes                        |
| -------------------------------------------------------- | --------- | ---------------------------- |
| `Combat.initiate(participants[], mapId)`                 | GM only   | Starts combat encounter      |
| `Combat.rollInitiative(characterId)`                     | GM only   | Determines turn order        |
| `Combat.move(characterId, gridCoordinate)`               | GM only   | After player declares intent |
| `Combat.attack(attackerId, targetId, weaponId)`          | GM only   | Executes attack roll         |
| `Combat.takeCover(characterId, coverType)`               | GM only   | Applies cover bonus          |
| `Combat.useAbility(characterId, abilityId, targetIds[])` | GM only   | Special abilities            |
| `Combat.endTurn(characterId)`                            | GM only   | Advances to next turn        |

### Ship Combat (Ship/Ships to Ship/Ships Combat)

| Function                                                     | Initiator | Notes                            |
| ------------------------------------------------------------ | --------- | -------------------------------- |
| `ShipCombat.initiate(ships[], startPositions[])`             | GM only   | Starts space encounter           |
| `ShipCombat.assignStation(characterId, stationName, shipId)` | GM only   | Assigns crew to stations         |
| `ShipCombat.setVector(shipId, direction, velocity)`          | GM only   | Ship movement                    |
| `ShipCombat.allocatePower(shipId, distribution{})`           | GM only   | Power to shields/weapons/engines |
| `ShipCombat.fireWeapon(shipId, weaponId, targetShipId)`      | GM only   | Ship attacks                     |
| `ShipCombat.evasiveManeuver(shipId, maneuverType)`           | GM only   | Special movements                |
| `ShipCombat.calculateDamage(targetShipId, damage, location)` | System    | Auto-calculates                  |
| `ShipCombat.boardingAction(attackShipId, targetShipId)`      | GM only   | Initiates boarding combat        |
