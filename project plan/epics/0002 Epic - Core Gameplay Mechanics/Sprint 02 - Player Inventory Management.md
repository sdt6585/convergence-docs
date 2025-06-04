
## User Story

As a player, I need to be able to quickly view my available items and equip them as appropriate and needed. I also need to be able to update my inventory 
## Scope

### Equipment Interactions
The "Equipment" tab in the character pane should drop down a list of items in the player's inventory. The list should be sorted so that items marked as "equipped" = TRUE should be listed first. Items marked as "equippable" = TRUE and "equipped" = FALSE should be listed next. All items marked "equippable" = FALSE should be listed last.

All equippable items will have a short list of options when clicked:

- Equip (toggle TRUE/FALSE)
	- Sets the equipped status to TRUE/FALSE. If another item is already equipped in that slot, the old item is set to equipped: FALSE and the most recent item is set to equipped: TRUE
- Drop
	- Removes the item from the player's inventory. The item is then added to the local world inventory by default.
- Use (Dialogue may be specific to the item, e.g. weapon may say "Fire")
	- Rolls a skill check for weapons or initiates a specific function based on the item. 
- Transfer to Ship
	- Only available when on board a ship. Transfers from player inventory to Ship Cargo bay.

All non-equippable item will have the option to drop while outside the ship, and transfer to ship while onboard a ship

### Adding Items
Under the Equipment section of the party pane, there should be an option to "Add Item". This selection should populate the chat pane with the list of items from the local world scope (ship, station, planet). 

>>> Note for Stephen: The world scoping of available items is flexible based on what is easiest

The player may add an item to their inventory from the chat panel, either by clicking the panel or typing "Add item [item name]". This system should be flexible based on what is easy to implement from an engineering perspective.

Maximum Carry Weight
The maximum carry weight for a character is their strength times their constitution. Some equipment will increase this limit. If a character exceeds their carry limit, they move at half speed. If a character doubles their carry limit, they are unable to move without removing items from their inventory.

### Selling Items
Merchants will take equipment and raw materials and trade them for coinage. When a trade is initiated in storytelling, the Game Master can remove an item from a player's inventory and place it in an NPC's inventory. The Game Master can then add the appropriate currency to the player's inventory.

### Money
Currency should be displayed on a per-player inventory as a simple key value pair of "Glass": [integer]. 

Players can add currency in the same way as inventory, as the game is based on an honor system. The Game Master can overwrite any changes the players make. To help manage this system, and alert should be sent to the Game Master in the chat every time a player updates their inventory.




