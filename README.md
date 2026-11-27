# TaskFlow — Productivity Dashboard

> A focused, responsive task-management dashboard built to demonstrate production-minded React engineering.

[Live demo](https://mohan2-hash.github.io/taskflow-dashboard/) · [Source code](https://github.com/mohan2-hash/taskflow-dashboard)

## Why this project

TaskFlow solves a simple but real workflow: capture work, find the next priority, and complete it without losing context. It is intentionally designed as a clean single-page experience for an individual workspace.

## What you can do

- Create tasks with a title, description, priority, and workflow status
- Search across task names, descriptions, and tags
- Filter the workspace by Backlog, In progress, or Done
- Mark work complete and see dashboard metrics update immediately
- Keep tasks between sessions using browser `localStorage`
- Switch between light and dark themes
- Use the app comfortably on desktop and mobile layouts

## Tech stack

| Area | Tools |
| --- | --- |
| Front end | React, TypeScript, Vite |
| UI | CSS, Lucide icons, responsive layout |
| State | React hooks + browser localStorage |
| Quality | Vitest unit tests, GitHub Actions, GitHub Pages |

## Engineering notes

The UI stays separate from the task-domain logic. `task-utils.ts` contains the tested functions for filtering and completing tasks, while the React components focus on presentation and interaction.

```text
React interface
├── App.tsx         dashboard state and interactions
├── task-utils.ts   tested task operations
├── localStorage    browser persistence
└── GitHub Pages    automated production deployment
```

## Run locally

```bash
pnpm install
pnpm dev
```

Run checks before publishing changes:

```bash
pnpm test
pnpm build
```

## Future improvements

- Connect authenticated users to a PostgreSQL-backed API
- Add due dates, recurring tasks, and drag-and-drop planning
- Add team workspaces and activity history

---

Built by [Mohan Vegi](https://github.com/mohan2-hash) as part of a job-ready full-stack portfolio.
