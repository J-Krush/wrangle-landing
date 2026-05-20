# Wrangle Landing Page

## What this is

Astro source for [wrangleapp.dev](https://wrangleapp.dev), the marketing site for Wrangle. The Wrangle macOS app itself lives at [github.com/J-Krush/wrangle](https://github.com/J-Krush/wrangle).

## Develop

Local development uses [pnpm](https://pnpm.io/) against [Astro](https://astro.build/) with [Tailwind CSS v4](https://tailwindcss.com/).

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `pnpm dev`      | Start local dev server               |
| `pnpm build`    | Build production site to `./dist/`   |
| `pnpm preview`  | Preview the production build locally |

Requires Node.js 18+ and pnpm.

The dev server runs without a `.env` file. The `/feedback` form POST route will warn about a missing `RESEND_API_KEY` — this is expected for local development.

## Deploy

Deploys to [Vercel](https://vercel.com); configured via `@astrojs/vercel`.

## See also

- [J-Krush/wrangle](https://github.com/J-Krush/wrangle) — the Wrangle macOS app source.

## License

MIT — see [LICENSE](./LICENSE).
