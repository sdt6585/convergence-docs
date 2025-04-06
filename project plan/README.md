Project will be organized into epics, sprints, use cases, and tasks.  Templates for each are provided.  Architecture, process, service, and tool documentation will be in the decisions folder.

An example of the layout is below

Templates - TBD - drafts from claude

```
docs/
├── project plan/                      # Project documentation
│   ├── epics/                # Epic descriptions
│   │   ├── epic-01-auth.md
│   │   ├── epic-01-auth/     # Folder named the same, contains sprints
|	│   │   ├── sprint-01.md  # Sprints contain detailed use cases/features/tasks
|	│   │   ├── sprint-02.md   
|	│   │   └── sprint-03.md   
│   │   ├── epic-02-data.md   # Future epics won't have a sprint plan yet
│   │   └── epic-03-ui.md
│   └── decisions/            # Architecture decision records, code guidelines, etc
│   ├   ├── 0001 AI Driven Development.md
│   └── templates/            # Templates for epics and sprints
└── README.md                 # This document - instructions on where to put docs
```
