#### UI:
* Svelte for UI rendering/build
* WebSocket's for event broadcast
* Small react app to utilize Supabase UI library for auth

#### Backend:
* Supabase:
	* Postgres as a service w/supabase crud api as data store
	* Edge functions for more complex functions & LLM integration
	* Event subscription using provided websockets
	* Event broadcast using provided websocket	* 