# ACE Platform Application

This is the Laravel + React + Inertia application for the AI Computing Education Platform.

## Current Foundation

- Laravel 13.
- React + Inertia.
- Tailwind CSS through Vite.
- Institution and institution membership baseline.
- Modular monolith folder placeholder in `app/Modules`.
- Safe local fake-service environment flags in `.env.example`.

## Governance

All application work must follow:

- `../documentation/00-executive/engineering-constitution.md`
- `../documentation/13-roadmap/last-mile-execution-roadmap.md`
- `../documentation/00-executive/project-status-ledger.md`
- `../architecture/decisions/`

## Local Commands

Install dependencies:

```bash
composer install
npm install
```

Run tests:

```bash
php artisan test
```

Build frontend assets:

```bash
npm run build
```

Run development stack:

```bash
composer run dev
```

## Security

Never commit `.env`, secrets, provider keys, generated build output, `vendor`, or `node_modules`.
