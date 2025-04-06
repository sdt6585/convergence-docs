# Recommended Workflow:

This 6-step workflow leverages AI tools and structured planning for higher-quality software development. The goal is to blend human creativity with AI capabilities, iterating methodically while avoiding common pitfalls of "vibe coding."

**Note, this was initially summarized from this [video](https://www.youtube.com/watch?v=XY4sFxLmMvw)**

---
# Step 1: Ideate the Product (Manual Brain Dump)

**Goal:** Tap into your unique creativity to define what you're building.

- **Tools/Methods:**
  - Use whatever tools are lowest friction first (Google docs, notes apps, paper, draw.io, ExcaliDraw, xmind, whiteboard, etc)
  - Convert to a format that AI can read/edit/generate and be versioned before the next step:
    - Google Docs/Word -> Markdown through Obsidian in a notes folder
    - Diagrams
	    - Mermaid if possible (ERD, functional flow charts, etc), embed in the related markdown files)
	    - ExcaliDraw if mermaid is impractical or frustrating,
			Stored in the documentation/diagrams folder and referenced in the related obsidian/markdown documents if relevant
    - Mockups
	    - Converted to HTML (using AI if possible) 
	    - Traced into ExcaliDraw PNG files if HTML is impractical
	    - Stored in the documentation/mockups folder and reference in design documents if relevant

- **Sub-steps:**
  - Clearly describe the product idea
  - Express design style, functionality, user flows, etc.
  - Brainstorm wildly—be creative but also specific

- **Important Notes:**
  - LLMs can’t generate original vision—your creativity is the key differentiator.
  - Quality here determines quality downstream

---

## Step 2: Generate a Product Plan (via Deep Research)

**Goal:** Fill in the gaps of your idea with existing knowledge and competitive analysis.

- **Tools:**
  - OpenAI (best but requires $200/mo)
  - Gemini (free and solid)
  - Perplexity.ai
  - Grok (XAI)

- **Sub-steps:**
  - Paste your product document(s) into the tool
  - Ask the AI to generate or update major documents or help with key decisions:
	  - Feasibility/Complexity Analysis, requests to help limit scope creep
	  - Technical Architecture - potential issues, limitations, or refinement
	  - Tool/Service selection
	  - Overall Project Plan
	  - Gap analysis for project plan
	  - Logical inconsistencies/missing requirements
	  - Requests for new ideas to improve plan/design
	  - Integrate changes in project plan/documentation into project plan	  - 

- **Important Notes:**
  - This mimics what a product manager or researcher would do
  - Results in a more grounded and feasible project direction

---

## Step 3: **Break It Down Into Tickets (Work Planning)**

**Goal:** Turn the product plan into an executable roadmap.

- **Tools:**
  - LLMs with "thinking models"
    - Chat GPT o1, o3-mini-high (default mode)
    - Gemini 2.0 flash thinking or 2.5 flash pro
    - Claude 3.7, select extended thinking
    - Deepseek R1 (default mode)

- **Sub-steps:**
  - Ask the LLM to convert the plan into epics and tickets
  - Each ticket should be detailed, structured as a User Story
  - Ask it to create flowcharts for important user interactions

- **Important Notes:**
  - This helps you work incrementally and avoid overwhelming the AI or yourself
  - Makes scope and work division clear

---

## Step 4: **Deep Research Each Ticket**

**Goal:** Build technical context and get implementation details for each task.

- **Tools:**
  - Deep Research again (see above list)

- **Sub-steps:**
  - For each ticket:
    - Start a new AI conversation
    - Provide: ticket content, epics, original plan, and research docs
    - Ask for technical refinement and deep dive
  - AI should:
    - Identify architectural issues/limitations/new tools needed
    - Provide implementation details
    - Provide a starting prompt to provide the IDE LLM & Developer to guide development

- **Important Notes:**
  - Emulates what a software/system architect would do
  - Reduces ambiguity before implementation begins

---

## Step 5: **Code With Context & AI Assistance**

**Goal:** Implement one ticket at a time with the full backing of research.

- **Tools:**
  - Cursor IDE in Agent Mode (or your favorite AI-augmented coding environment)

- **Sub-steps:**
  - Prompt: “Implement Ticket X.Y”
  - Provide the full context (epics, research, design docs)
  - Write tests and review your code

- **Important Notes:**
  - Don’t go too far! Implement and test only**one** ticket per cycle.
  - Avoid scope creep or multi-ticket implementation—can cause errors or lost work

---

## Step 6: **Checkpoint and Repeat**

**Goal:** Safeguard progress and iterate on the next ticket.

- **Tools:**
  - GitHub (or any version control)

- **Sub-steps:**
  - Commit your work as soon as the ticket implementation is complete
  - Go back to Step 4 for the next ticket
  - Repeat Steps 4–6 until the product is done

- **Important Notes:**
  - Avoid losing work—committing after each ticket helps
  - You’ll move slower than diving into the coding but output will be significantly higher quality

---

## Summary: Benefits of This Workflow

- Maintains creativity while leveraging AI for structure and execution
- Avoids code quality degradation, infinite loops, or overwritten work
- Mimics a full-stack product/dev team using available tools
- Higher-quality output and clearer thinking throughout the process
