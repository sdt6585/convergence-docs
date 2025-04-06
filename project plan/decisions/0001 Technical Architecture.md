(Work In Progress)

See [[0002 AI Driven Planning & Programming]] for details on generating project plan and ensuring compatible documentation for AI assisted development
## Tech Stack Overview

### Backend

- **Supabase**
  - PostgreSQL as primary data store
  - Edge Functions used to route LLM requests (Chat GPT, Groq)
  - Built-in authentication (via React/Next.js UI components if necessary)

### Frontend

- **Svelte**
  - Primary UI framework, pending testing/spike solution
  - Backup plan of using react or pure JS if learning impairs our ability to move quickly
- **React**
  - Primarily for Supabase UI library - sign up/sign in
  - Maybe use for a public facing landing page in the future
  - P.S. I can't stand react (Stephen)
---

#### Architecture Paradigm (Work in Progress - Mostly questions - fill in with plan/diagrams/proof of concept code)
* Login/Signup
* Application Structure
	* Backend:
		* Data Modeling workflow & application
		* How to intercept API calls before/after create, read, update delete (Postgres or Edge Functions?)
		* Edge Functions for Custom code
		* Webhooks for broadcast & data changes
	* Client:
		* Login/Signup/Authentication/User Data
		* Application Initialization
			* State sharing
			* Logging
		* Data model & base API store
			* Webhooks for multi-client reactive updates
		* Outline of Svelte rendering pipeline/architecture (education & diagram)		* 

---

## AI-Assisted Development

- **Cursor** as development environment
  - Used for AI-paired coding and architecture scaffolding
  - Assumes developer understands tools*better than the AI*
  - LLM use is for acceleration, not delegation

---

## 📌 Notes

- Initial prototyping will focus on UI for GM interactions to help guide future feature design
- Cost-effective infrastructure prioritized (Firebase evaluated but not chosen due to long-term pricing and SQL limitations)