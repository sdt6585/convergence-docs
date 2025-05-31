
## User Story

As a player of of Convergence, I need to be able to quickly access my options as a character so I can respond as the game changes in real-time. It's important that my options are easy to find and understand, so that I can assess what my options are and make a decision as my character would.

## Scope

### Rolling from the player pane
Skill and stat checks are assumed to be specific across the various contexts that players may be asked to roll a die. Exceptions will primarily be in combat, which will have it's own specific requirements for checks separate from this task. These rules apply to all NPCs, but will be referred to as "players"  within this task.

Skill checks should be rollable from the skill in the player panel. By clicking on the skill or stat, an option should pop-up to roll that skill. On rolling the skill or stat, the result should be displayed to all players in the game in the game chat log.

The standard roll is a d15, where the maximum value is 15 and the minimum value is 1. A roll of 15 is a critical success, which means the player gets to roll an additional time and that roll to your total. The player may keep rolling until they do not roll a crit. When a crit is rolled, the chat log of the roll should indicate "CRIT! Roll again". The subsequent roll total will be the original roll plus the subsequent roll.

A standard skill or stat check also incurs a hidden luck die roll. A luck die is a d30. When a roll result is less than 30, nothing happens. The player (or NPC) luck stat is added to the result of every luck die roll. When a luck die result is >= 30, all players will receive a notification for a "cosmic moment". This is a bankable free re-roll that may be used immediately. Players may have up to 4 cosmic moments stored. When the prompt for a cosmic moment appears, there should be 2 buttons: "Reroll now" "Store for later". These options may appear in the chat log.

The player pane can indicate available cosmic moments visually. Cosmic moments can be an item under the players top level pane components. By clicking cosmic moment, an option can appear to spend a reroll "Reroll a cosmic moment" or if none are available, "No luck yet"



### Rolling from the Chat

If AI rolling is available, at the simplest level this should ideally be simple chat commands to roll skills, i.e. "roll piloting". If a term is ambiguous, the chat should prompt the player to provide more detail. "Did you mean 'Vessel Piloting'?".

The roll should then be returned publicly to all players in the game as per usual.