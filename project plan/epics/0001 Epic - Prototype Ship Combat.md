
To Be Planned Sprints:
 - Architecture, tool selection, mockups, services needed
 - Build base interface in svelte - see preliminary mockup in architecture/mockups
 - Data model for ships, stats, abilities, characters, equipment, skills, etc
 - Build interface for the following for GM & Player
	 - Left Pane:
		 - Ship:
			 - Attributes/Stats
				 - HP
				 - Shields
				 - Weapon Docks
					 - Laser
					 - Empty
					 - Empty
			 - Stations:
				 - Helm
					 - Player #1
						 - Attributes
						 - Skills
						 - Abilities
						 - Equipment
				 - Weapons
					 - - Player #1
						 - Attributes
						 - Skills
						 - Abilities
						 - Equipment
	 - Right:
		 - Same as left, but list of ships
		 - Eventually 
	 - 
```mermaid
erDiagram
    SHIP {
        int id PK "Ship ID"
        string name "Ship Name"
        int hp "Hull Points"
        int shields "Shield Strength"
    }
    WEAPON_DOCK {
        int id PK "Dock ID"
        string slot "Slot Position or Identifier"
        string type "Weapon Type (e.g., 'Laser' or 'Empty')"
    }
    STATION {
        int id PK "Station ID"
        string name "Station Name (e.g., Helm, Weapons)"
        int player_id FK "Player manning this station"
    }
    PLAYER {
        int id PK "Player ID"
        string name "Player Name (e.g., Player #1)"
    }
    PLAYER_ATTRIBUTE {
        int id PK "Attribute ID"
        int player_id FK "Player reference"
        int strength "Strength score"
        int agility "Agility score"
        int intelligence "Intelligence score"
        int endurance "Endurance score"
    }
    PLAYER_SKILL {
        int id PK "Skill ID"
        int player_id FK "Player reference"
        string name "Skill Name (e.g., Piloting, Gunnery)"
        int level "Skill Level"
    }
    PLAYER_ABILITY {
        int id PK "Ability ID"
        int player_id FK "Player reference"
        string name "Ability Name"
        string description "Ability Description"
    }
    PLAYER_EQUIPMENT {
        int id PK "Equipment ID"
        int player_id FK "Player reference"
        string name "Equipment Name"
        string type "Equipment Type (e.g., Gadget, Weapon, Armor)"
    }

    %% Relationships
    SHIP ||--|{ WEAPON_DOCK : "has"
    SHIP ||--|{ STATION : "contains"
    PLAYER ||--o{ STATION : "mans" 
    PLAYER ||--|{ PLAYER_ATTRIBUTE : "has"
    PLAYER ||--|{ PLAYER_SKILL : "acquires"
    PLAYER ||--|{ PLAYER_ABILITY : "possesses"
    PLAYER ||--|{ PLAYER_EQUIPMENT : "carries"

```
