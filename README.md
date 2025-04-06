# Gargantua Docs

This repository contains all non-code project documentation, design plans, workflows, sprint boards, and architecture decisions related to the **Gargantua** project—a GM-facing TTRPG tool being collaboratively developed.

Use dropbox to sync it to your phone if needed so you can make updates from both locations and eventually check in those changes to version control.  Keeping the documentation separate simplifies that and prevents overwriting the code when comitting/reverting.

Be mindful when merging commits and don't overwrite other people's changes without thinkging about it/dicussing things.

---

## Repo Structure

There are three main repositories.  Clone each of them into a single parent folder as shown below to allow you to open them all in a single IDE workspace and ensure any relative references for build/local dev server logic works correctly.

```plaintext
/gargantua
  ├─ gargantua-docs/         # Obsidian vault + documentation + planning (this repo)
  ├─ gargantua-client/       # Svelte-based frontend (UI layer)
  └─ gargantua-server/       # Supabase Edge Functions + backend logic
```


## Primary Documentation

The Project Vision & Meta Plan file is the kicking off point for all documentation.  It includes a table of contents linking to key documents, meta goals, a brief project description, and major project milestones.



In the project plan folder, you will find architecture decisions, mockups/diagrams, epic/sprint plans, and detailed task lists.
