# StudyOS - Open Source Student Exam Command Center

StudyOS is a reusable exam management template for students who want a fast, local-first command center for semester planning, notes, resources, questions, and progress tracking. It keeps a dark retro terminal UI while letting every user create their own branch, semester, scheme, subjects, modules, exam dates, and study data.

## Features

- First-time setup for branch, semester, scheme, and subjects
- Dynamic subject management with code, name, credits, and optional exam date
- Dynamic module management with add, rename, and delete controls
- Dashboard with exam countdowns, progress summaries, reminders, files, and quick resources
- Notes Vault with module-linked notes, file storage, resource shortcuts, and important topics
- Question Bank for any subject, with filters, mark types, previous-year metadata, and starring
- Resource Hub for YouTube, notes, papers, and custom links
- Topic completion system with per-module checkboxes and progress percentages
- Flashcards, reminders, and study progress tracking
- LocalStorage persistence with generic StudyOS keys
- PWA-ready build with offline precaching
- Dark terminal-style interface

## Screenshots

Add screenshots after customizing or deploying your instance:

- `screenshots/dashboard.png`
- `screenshots/notes-vault.png`
- `screenshots/question-bank.png`
- `screenshots/resources.png`

## Installation

```bash
npm install
```

## Local Development

```bash
npm run dev
```

Open the local URL printed by Vite. On first launch, StudyOS will show **Create your semester setup**. Add your branch, semester, scheme, and at least one subject to begin.

## Build

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Deployment

StudyOS is a static Vite app and can be deployed to Netlify, Vercel, GitHub Pages, Cloudflare Pages, or any static host.

For Netlify, the included `netlify.toml` is ready for the default build flow:

```bash
npm run build
```

Publish the `dist` directory.

## PWA Usage

StudyOS includes Vite PWA support. After deploying or previewing a production build, compatible browsers can install it as an app. Student data is stored locally in the browser through LocalStorage.

Generic storage keys include:

- `studyos_config`
- `studyos_subjects`
- `studyos_topics`
- `studyos_progress`
- `studyos_questions`
- `studyos_resources`

## Project Structure

```text
src/
  components/  UI and feature components
  contexts/    Theme provider
  data/        Empty reusable defaults
  hooks/       LocalStorage, countdown, and notification hooks
  pages/       Page-level exports for reusable app surfaces
  storage/     Storage key constants
  types.ts     Shared TypeScript models
  utils/       Topic and resource helpers
```

## Contributing

Contributions are welcome. Good first areas include import/export, cloud sync adapters, richer resource metadata, accessibility polish, and additional study analytics.

Please keep contributions aligned with the project goal: a reusable open-source academic management template for any student, without hardcoded course, college, semester, or personal data.
