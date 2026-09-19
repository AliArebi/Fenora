<div align="center">
  <img src="public/favicon.svg" width="72" height="72" alt="FINORA logo" />
  <h1>FINORA</h1>
  <p><strong>See where your money goes.</strong></p>
  <p>A premium, local-first personal finance dashboard built for clarity and privacy.</p>

  [![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-7cf4c8.svg)](LICENSE)
</div>

## Live demo

> Add your deployed URL here after enabling GitHub Pages.

## Screenshots

| Dashboard | Transactions |
| --- | --- |
| Add your dashboard screenshot | Add your transaction history screenshot |

## Features

- Income, expense, bill, and investment tracking with create, edit, and delete flows
- Dynamic balance and category calculations with six-month trend analytics
- Fast combined filtering by text, type, category, and date range
- English, German, and Arabic localization with complete document-level RTL support
- USD and EUR display preferences through `Intl.NumberFormat` (no implied conversion)
- IndexedDB persistence through Dexie; no backend, account, or data transmission
- Realistic first-run demo data with reset and permanent-clear controls
- Responsive desktop table and purpose-built mobile transaction cards
- Accessible dialogs, labels, keyboard focus, semantic controls, and reduced-motion support
- Automated domain tests and GitHub Pages deployment

## Tech stack

React, TypeScript, Vite, Tailwind CSS, shadcn/ui patterns with Radix primitives, Lucide React, Recharts, Zustand, React Hook Form, Zod, i18next, date-fns, Dexie/IndexedDB, Vitest, and ESLint.

## Engineering decisions

### React + TypeScript

React provides composable UI boundaries while strict TypeScript keeps transaction, filter, chart, and preference contracts explicit. Components remain focused on presentation; domain logic lives in testable functions.

### IndexedDB with Dexie

Financial records can exceed the appropriate scope of `localStorage`. Dexie provides a typed, asynchronous IndexedDB layer and reactive queries. Only language and display-currency preferences use `localStorage`.

### Zustand

Small stores separate durable preferences, transient filters, and interface state. Transaction records are not duplicated in Zustand—the IndexedDB query is the source of truth.

### i18next

All product copy is stored in independent locale resources. Switching Arabic updates both `lang` and `dir` on the root document, so the shell, navigation, controls, and spacing respond as a real RTL layout.

### Component architecture

Feature-focused directories keep charts, transaction workflows, layout, and UI primitives independent. Derived data is memoized where aggregation or filtering can grow with the dataset; simple local state stays local.

## Architecture

```text
src/
├── components/
│   ├── brand/          # FINORA identity
│   ├── charts/         # Recharts visualizations
│   ├── dashboard/      # Summary metrics
│   ├── layout/         # Responsive application shell
│   ├── transactions/   # Form, filters, history, badges
│   └── ui/             # shadcn-style primitives
├── hooks/              # Reactive data hooks
├── lib/                # Database, calculations, categories, demo data
├── locales/            # en.json, de.json, ar.json
├── pages/              # Dashboard, transactions, analytics, settings
├── stores/             # Preferences, filters, UI state
├── test/               # Test environment
├── types/              # Finance domain types
├── App.tsx
└── main.tsx
```

## Getting started

Requirements: Node.js 20+ and npm 10+.

```bash
git clone https://github.com/YOUR_USERNAME/finora.git
cd finora
npm install
npm run dev
```

Open the local URL printed by Vite.

## Commands

```bash
npm run dev        # development server
npm run typecheck  # strict TypeScript validation
npm run lint       # ESLint
npm run test       # domain tests
npm run build      # production build in dist/
```

## GitHub Pages deployment

The included `.github/workflows/deploy.yml` builds and deploys on every push to `main`.

1. Push this repository to GitHub.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, select **GitHub Actions**.
4. Push to `main` or run the workflow manually.
5. Add the resulting URL to the **Live demo** section above.

Vite uses `base: './'`, so static assets work on project pages without hardcoding a repository name. If you later add client-side URL routing, add a suitable GitHub Pages SPA fallback.

## Internationalization and RTL

Translation resources live in `src/locales`. Add a locale JSON file, register it in `src/i18n.ts`, and expose it in the language selectors. Arabic sets `<html lang="ar" dir="rtl">`; English and German use `ltr`. Logical CSS directions (`start`, `end`, `ps`, `pe`) keep the interface structurally correct in both directions.

## Local storage and privacy

Transactions are stored only in the browser's IndexedDB database named `finora`. Language and currency preferences are saved in `localStorage`. FINORA has no backend, analytics tracker, authentication service, or remote database and does not transmit financial information. Clearing site data in the browser will remove local records.

## Customization

- Edit visual tokens in `src/index.css` and `tailwind.config.ts`.
- Extend uncoupled category lists in `src/lib/categories.ts`, then add localized category labels.
- Adjust sample records in `src/lib/demo-data.ts`.
- Replace the favicon and brand mark while retaining accessible names.

## Roadmap

- Optional local JSON/CSV import and export
- User-defined categories and budgets
- Offline installability with a progressive web app manifest
- Optional encrypted local backup controlled by the user

## Contributing

Issues and focused pull requests are welcome. Before opening a PR, run `npm run typecheck`, `npm run lint`, `npm run test`, and `npm run build`. Keep new user-facing copy translated across all three locale files.

## License

FINORA is available under the [MIT License](LICENSE).
