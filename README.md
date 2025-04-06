# Gargantua Docs

This repository contains all non-code project documentation, design plans, workflows, sprint boards, and architecture decisions related to the **Gargantua** project—a GM-facing TTRPG tool being collaboratively developed.

The main entry point to the documentation is here, it provides links to primary documents.
[[Project Vision & Meta Plan]]
## Repository Structure

There are three main repositories.  Clone each of them into a single parent folder as shown below to allow you to open them all in a single IDE workspace and ensure any relative references for build/local dev server logic works correctly.

```plaintext
/gargantua
  ├─ gargantua-docs/         # Obsidian vault + documentation + planning (this repo)
  ├─ gargantua-client/       # Svelte-based frontend (UI layer)
  └─ gargantua-server/       # Supabase Edge Functions + backend logic
```

## How to Edit Documentation

It is intended that you use Obsidian as an editor to view and edit documentation.  Download and install it, aim it at the gargantua-docs folder.  Install and enable the excalidraw and kanban community extensions.

The Project Vision & Meta Plan file is the kicking off point for all documentation.  It includes a table of contents linking to key documents, meta goals, a brief project description, and major project milestones.

In the project plan folder, you will find architecture decisions, mockups/diagrams, epic/sprint plans, and detailed task lists.  This is all explained in further detail as you drill into those relevant folders.

### Git Commits

After making significant changes, commit your changes.  If there are any merge conflicts, consider them carefully.  If unsure, contact the person who wrote the conflicting entries.  GitHub Desktop recommended but any git client will work.