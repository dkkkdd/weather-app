# Weather App

(Command Workflow Simulation)

A training project created to simulate a real team development environment: architecture, Git processes, code reviews, branching strategy, and collaboration.

The project follows a modern tech stack and an architecture approach close to production standards.

---

## Project Goal

To model a typical frontend team workflow:

- working in isolated feature branches
- creating Pull Requests
- performing code reviews
- coordinating and approving changes
- resolving merge conflicts
- maintaining a stable `main` branch

The project also serves as a practice space for building scalable architecture and distributing tasks across multiple developers.

---

## Team Roles

- **PM / Lead**  
  Task planning, process management, code review, and architecture control.

- **Developer A**  
  Building UI components, structuring the project, creating the base layout.

- **Developer B**  
  Working with APIs, handling data, implementing business logic.

---

## Tech Stack

- JavaScript (ES6+)
- Vite
- Fetch API
- Weather API
- Component-based CSS
- ESLint + Prettier + Stylelint
- Husky (pre-commit hooks)

---

## Project Architecture

```txt
src/
 ├── api/        — low-level network requests (fetch)
 ├── services/   — business logic, data processing and normalization
 ├── stores/     — application state management
 ├── ui/         — UI components (JS + CSS)
 ├── utils/      — helper functions
 ├── main.js     — entry point
 ├── index.html  — base markup
 └── style.css   — global styles
```

## Main Branches

main — stable project version
feature/\* — developer branches for separate tasks

## Rules

Each task is developed in its own branch:
git checkout -b feature/<task-name>

Always sync with main before starting:
git pull origin main

After finishing the task — open a Pull Request

All changes must go through code review

Merging into main happens only after approval

# Commit Rules (Conventional Commits):

feat: — new feature
fix: — bug fix
refactor: — code restructuring
style: — formatting and styling
docs: — documentation updates
chore: — configs, dependencies, maintenance

## Future Improvements:

- Add search history
- Dark/light theme
- Detailed forecast view
- Unit testing (Vitest)

Team

This project was built to practice teamwork, architectural thinking, and real development workflows.
PM / Lead — project management
Developer A
Developer B
