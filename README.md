# TaskFlow

A polished React and TypeScript productivity dashboard. It demonstrates responsive UI design, client-side state management, persistence with `localStorage`, search/filter interactions, modal form handling, automated tests, and a dark theme.

## Features

- Create, search, filter, and complete tasks
- Persist tasks locally between browser sessions
- Filter tasks by workflow status
- Responsive dashboard with light/dark theme
- Accessible labels and semantic controls
- Automated unit tests for task filtering and completion
- GitHub Actions workflow that verifies tests and production builds on every push

## Architecture

```text
React UI (App + components)
        │
        ├── task-utils.ts: tested filter/completion business logic
        ├── localStorage: browser persistence
        └── Vite: development server and production build
```

## Run locally

```bash
pnpm install
pnpm dev
```

Run automated checks with `pnpm test` and create a deployable build with `pnpm build`.

## Portfolio checklist before publishing

- Deploy to Vercel or Netlify
- Add 2–3 screenshots/GIFs to this README
- Add a screenshot or short demo GIF after deployment
- Upgrade `localStorage` to a real API/database in a future full-stack version
