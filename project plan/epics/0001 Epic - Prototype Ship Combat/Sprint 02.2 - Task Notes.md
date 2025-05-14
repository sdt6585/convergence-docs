

### Stephen Notes:
- [x] Spike Solution - Radar view - kind of working
- [x] Test creating an object - done/working with new games
- [ ] Notes thinking about how to structure data for AI, Procedural UI, and Asynchronous  Broadcast/Subscription model simultaneously
	- [ ] First - just load all the data we need sequentially/normally into a large "game object and make some notes"
		- [ ] Need an easier way to query the player characters vs the non player characters - I think a trigger would work to keep up an is_npc field
- [ ] SQL/Game Logic Rules Needed:
	- [ ] Game must have at least one player that is game master at all times, must make a new one to remove the original GM - may need some special logic like if it had a user before, it needs to keep one so it will allow game creation -> player addition as a multi-step process or maybe that needs to be a stored procedure or something?1
	- [ ] Player_Character - unique index across player_id, character_id
		- [ ] Player_Character can only have one active character at a time 
	- [ ] Position of type ship, planet, or character must have a referencing foreign key in the other table.
	- [ ] Must fix JSONB default, it's hideous
- [ ] Move access control into the main layout - redirect if you go to a place you down have privileges to after auth
- [ ] Attempt to understand the store concept in svelte
	- [ ] Move login
	- [ ] Move signup
	- [ ] Move get games
	- [ ] Move create/update games - and start thinking through a crud definition to auto-generate functions
- [ ] Mock up:
	- [ ] Game
		- [ ] Players + NPC
		- [ ] Ships + NPC
		- [ ] System, planets, sun, asteroid
- [ ] Think about how to AI in this setting
	- [ ] Use a central GameStore.js to:
		- [ ] Keep an array of all the functions that you can call on the game objects
		- [ ] Keep sub arrays of the primary game elements:
			- [ ] Game
			- [ ] Players
			- [ ] Characters
				- [ ] Skills
				- [ ] Equipment
				- [ ] Etc
			- [ ] Ships
				- [ ] Weapons
				- [ ] Shields
				- [ ] Upgrades
			- [ ] 
- [ ] Test creating a real access control scheme for the tables
- [ ] Test communication of current game back up to the menu to enable extra menu options (game settings, manage players, etc) under a sub menu for the current game
	- [ ] Add a settings option to the list too so you can jump right to people, settings, etc
- [ ] Test JSON-B based document store in Postgres through supabase so we can have a quick/flexible schema to start with - make sure and include a version with it
- [ ] Setup core User (with preferences object), Game, Roles Table + Security Rules, Ships, Characters, Planets, Equipment, etc objects.



# Sprint 02: Core UI Framework - Detailed Tasks - AI Generated, use as scratchpad for todo lists

## Component Architecture Decisions

### Panel System Architecture

```javascript
// Proposed panel configuration structure
const panelConfig = {
  layout: 'desktop', // 'desktop' | 'tablet' | 'mobile'
  panels: {
    left: {
      width: 300,
      minWidth: 200,
      maxWidth: 500,
      collapsed: false,
      content: 'ship-party', // content key
      pinned: true
    },
    center: {
      flex: true,
      content: 'game-log',
      tabs: ['game-log', 'map-combat', 'map-scanner', 'map-galaxy']
    },
    right: {
      width: 350,
      minWidth: 250,
      maxWidth: 600,
      collapsed: false,
      content: 'world-entities',
      pinned: false
    }
  }
};
```


## Task Breakdown

### Week 1: Panel System Foundation

**Task 1: Base Panel Component**

- [ ] Create `Panel.svelte` component with props:
    - width, minWidth, maxWidth
    - collapsed state
    - onResize callback
    - position ('left' | 'right' | 'center')
- [ ] Implement resize handle with drag functionality
- [ ] Add collapse/expand button with animations
- [ ] Store panel state in localStorage

**Task 2: Panel Layout Manager**

- [ ] Create `PanelLayout.svelte` component
- [ ] Handle responsive breakpoints (desktop/tablet/mobile)
- [ ] Implement panel state management (Svelte store)
- [ ] Add panel arrangement logic for different screen sizes

**Task 3: Content Registry System**

- [ ] Create panel content registry
- [ ] Define content component interface
- [ ] Implement dynamic content loading
- [ ] Add content switching UI (tabs or dropdown)

### Week 2: Core Panel Implementations

**Task 4: Ship/Party Panel**

- [ ] Create `ShipPartyPanel.svelte`
- [ ] Ship status card component
- [ ] Character list with station assignments
- [ ] Quick action buttons (assign, heal, repair)
- [ ] Connect to game state (stub data for now)

**Task 5: World/Entity Panel**

- [ ] Create `WorldEntityPanel.svelte`
- [ ] Entity list with filtering and search
- [ ] Entity group/subgroup selection
- [ ] Entity detail card view
- [ ] Add/edit/delete actions (modals)

**Task 6: Game Log Panel**

- [ ] Create `GameLogPanel.svelte`
- [ ] Message display with different types (chat, system, combat)
- [ ] Command input with autocomplete
- [ ] Log filtering by type/source
- [ ] Timestamp and formatting

### Week 3: UI Systems

**Task 7: Context Menu System**

- [ ] Create `ContextMenu.svelte` component
- [ ] Right-click event handling
- [ ] Long-press support for touch devices
- [ ] Menu positioning logic
- [ ] Menu item actions and shortcuts

**Task 8: Modal System**

- [ ] Create `Modal.svelte` base component
- [ ] Implement modal manager (queue, z-index)
- [ ] Create form modal variant
- [ ] Create confirmation modal variant
- [ ] Add transition animations

**Task 9: Notification System**

- [ ] Create `Toast.svelte` component
- [ ] Toast manager with queue
- [ ] Different toast types (success, error, info)
- [ ] Auto-dismiss with progress indicator
- [ ] Click-to-dismiss functionality

### Week 4: Game Management Interfaces

**Task 10: Game Management**

- [ ] Create game form with validation
- [ ] Edit game settings interface
- [ ] Player/character management grid
- [ ] Game state controls (start, pause, end)

**Task 11: Entity Creation Forms**

- [ ] Create/edit planet form
- [ ] Create/edit NPC form
- [ ] Create/edit equipment form
- [ ] Shared form components (stats, attributes)
- [ ] Form validation and error handling

**Task 12: Common Operations**

- [ ] Generic delete confirmation modal
- [ ] Batch operations interface
- [ ] Search/filter components
- [ ] Pagination component

## Technical Considerations

### State Management Strategy

```javascript
// Panel state store
import { writable } from 'svelte/store';

function createPanelStore() {
  const { subscribe, set, update } = writable({
    layout: 'desktop',
    panels: {
      left: { width: 300, collapsed: false, content: 'ship-party' },
      center: { content: 'game-log' },
      right: { width: 350, collapsed: false, content: 'world-entities' }
    }
  });

  return {
    subscribe,
    setPanelWidth: (position, width) => update(state => {
      state.panels[position].width = width;
      return state;
    }),
    togglePanel: (position) => update(state => {
      state.panels[position].collapsed = !state.panels[position].collapsed;
      return state;
    }),
    setContent: (position, content) => update(state => {
      state.panels[position].content = content;
      return state;
    })
  };
}

export const panelStore = createPanelStore();
```

### CSS Architecture

```css
/* Panel system variables */
:root {
  --panel-min-width: 200px;
  --panel-max-width: 600px;
  --panel-resize-handle: 8px;
  --panel-header-height: 48px;
  --panel-animation-duration: 300ms;
}

/* Responsive breakpoints */
@media (max-width: 1024px) {
  /* Tablet layout */
}

@media (max-width: 768px) {
  /* Mobile layout - stacked panels */
}
```

### Component Interfaces

```typescript
// Panel content interface
interface PanelContent {
  id: string;
  title: string;
  icon?: string;
  component: SvelteComponent;
  minWidth?: number;
  defaultWidth?: number;
}

// Panel configuration
interface PanelConfig {
  position: 'left' | 'center' | 'right';
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  collapsed?: boolean;
  content?: string;
  pinned?: boolean;
}
```

## Implementation Notes

1. **Progressive Enhancement**: Start with basic panel functionality, add animations and advanced features incrementally
2. **Mobile Considerations**: Design for collapse/stack behavior on small screens
3. **Performance**: Use CSS transforms for animations, minimize re-renders
4. **Accessibility**: Ensure keyboard navigation, ARIA labels, focus management
5. **Testing**: Create test cases for resize behavior, responsive breakpoints, state persistence

This sprint focuses exclusively on the UI framework needed for the game. Once these components are solid, we can move on to the map system (Sprint 02.1) and then connect everything to the game logic (Sprint 03).