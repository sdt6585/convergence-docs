### Overview

Develop a functional prototype of the Confluence ship combat system with a game master interface, character skills affecting ship capabilities, and turn-based combat resolution. The prototype will demonstrate core game mechanics while providing a foundation for future development of the complete game system.

### Goals

- Create a component-based architecture with event hooks for ship combat mechanics
- Implement character-to-ship ability influence system with skill checks
- Build a GM interface for managing NPCs, ships, and combat encounters
- Develop a player interface for station-based ship actions
- Set up Supabase for authentication and game state persistence
- Implement real-time updates via WebSockets for multi-player interaction

### Sprints

```dataview
TABLE WITHOUT ID
  file.link AS "Sprint Link",
  length(filter(file.tasks, (t) => contains(t.text, "TASK::") AND !t.completed)) as "Remaining",
  length(filter(file.tasks, (t) => contains(t.text, "TASK::") AND t.completed)) as "Completed",
  round(length(filter(file.tasks, (t) => contains(t.text, "TASK::") AND t.completed)) / length(filter(file.tasks, (t) => contains(t.text, "TASK::"))) * 100, 0) + "%" as "Progress"
FROM "project plan/epics/0001 Epic - Prototype Ship Combat"
WHERE file.folder = "project plan/epics/0001 Epic - Prototype Ship Combat"
  AND file.name != "0001 Epic - Prototype Ship Combat"
SORT file.link ASC
```

### Notes

- Focus on ship combat as the core gameplay element for the prototype
- Use event-driven architecture to decouple game actions from their effects
- Implement skill check system for character abilities affecting ship performance
- Support both GM and player perspectives with appropriate interfaces
- Design for multi-user play with real-time updates