# Debasis Panda's Blog

Personal blog built with [Astro](https://astro.build), React, and Tailwind CSS. Articles are stored as Markdown files in `src/data/posts` and rendered as static pages.

## Requirements

- Node.js 24.x (recommended for local development and CI)
- npm

## Getting started

```sh
npm install
npx playwright install chromium
npm run dev
```

The development server is available at `http://localhost:4321`.

## Available commands

| Command                | Description                          |
| ---------------------- | ------------------------------------ |
| `npm run dev`          | Start the local development server   |
| `npm run build`        | Build the production site            |
| `npm run preview`      | Preview the production build locally |
| `npm run lint`         | Run ESLint                           |
| `npm run format:check` | Check formatting with Prettier       |
| `npm run test`         | Run the test suite                   |

## Writing posts

Create a Markdown file in `src/data/posts` with the required frontmatter:

```md
---
title: "Article title"
publishedAt: 2026-08-19
isDraft: false
description: "Short description used for metadata and feeds."
tags: ["engineering"]
---

Article content goes here.
```

Posts marked with `isDraft: true` are not published in production.

## Mermaid diagrams

Mermaid code blocks are rendered to images during the Astro build through `rehype-mermaid` and Playwright. Install the Chromium browser locally before building:

```sh
npx playwright install chromium
npm run build
```

The GitHub Pages deployment workflow performs the same browser installation automatically before building.

## Deployment

Pushes to the `master` branch trigger the GitHub Pages workflow in `.github/workflows/deploy.yml`. Pull requests run linting, formatting checks, tests, and a production build through `.github/workflows/pr.yml`.
