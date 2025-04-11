## Overview

Gargantua is a space-based RPG focusing on character development and ship combat. This document outlines the technical architecture for the initial prototype focusing on ship combat mechanics.

## Tech Stack

### Backend

- **Supabase**
    - PostgreSQL as primary data store
    - Edge Functions for complex logic and LLM integration
    - Real-time subscriptions via WebSockets
    - Built-in authentication

### Frontend

- **Svelte**
    - Main application UI framework
    - Reactive state management
    - Component-based architecture
- **React** (minimal usage)
    - Authentication components from Supabase UI library

## Application Architecture

### Core Principles

1. **Event-Driven Design**: Using an event emitter pattern to decouple game actions from their effects
2. **Real-time Synchronization**: WebSockets for multi-client updates
3. **Flexible Game Rules**: Ability system designed to hook into events

### System Components

#### 1. Authentication System

- Small React application at root level (index.html)
- Utilizes Supabase Auth UI components
- Stores JWT in session for API access
- Redirects to main application upon successful login

#### 2. Game Manager

- Central orchestrator for game state
- Handles initialization and loading
- Manages active game sessions
- Coordinates events between game objects

#### 3. Event System

- Based on provided EventEmitter implementation
- Allows registration of pre/post hooks for game actions
- Facilitates complex ability interactions
- Example events:
    - `character.damage`
    - `ship.shields.depleted`
    - `weapon.fired`
    - `turn.start`
    - `combat.start`

#### 4. State Management

- Game state persisted in Supabase
- Local reactive state in Svelte components
- WebSocket subscriptions for real-time updates

#### 5. Game Mechanics

- Dice rolling system for skill checks
- Ship movement and combat resolution
- Character abilities affecting ship performance
- Turn-based combat flow

## Data Flow

1. **User Action** (UI interaction)
2. **Event Emission** (pre-action hooks)
3. **Game Logic** (core mechanics)
4. **State Update** (local Svelte state)
5. **Persistence** (Supabase API)
6. **Broadcast** (WebSocket/Supabase realtime)
7. **UI Update** (all connected clients)

## Data Model

The data model is structured to support both the immediate need for ship combat and future expansion:

### Core Entities:

- **User** - Authentication and basic user info
- **Game** - Game session container
- **Character** - Player or NPC characters with race, class, stats, etc.
- **Ship** - Spacecraft with stats, weapons, stations, etc.
- **Combat** - Combat encounters and actions

### Key Relationships:

- A Game has one GM (User) and many Characters and Ships
- A Ship has many Stations, Weapons, and Bays
- Characters can be assigned to Stations on Ships
- Combat links Ships and Characters through Actions

## Interface Design

### Game Master Interface

- Left panel: Player characters and their ships
- Center panel: Command interface with chat/input
- Right panel: Game elements (NPCs, enemy ships, planets)

### Player Interface

- Character stats and skills
- Ship information when assigned to a station
- Limited view of game information (based on character knowledge)



## Future Considerations

- Character advancement and skill progression
- Extended game mechanics beyond ship combat
- LLM integration for NPC behavior and world generation
- Enhanced UI with animations and visual effects