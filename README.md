# CT9 Portfolio — Huynh Cong Tien

Personal portfolio built with Next.js 16 (App Router), Tailwind CSS v4, Motion and Lenis. Bilingual (EN / VI).

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Set `NEXT_PUBLIC_SITE_URL` to the deployed domain so social-share previews resolve correctly.

## Editing content

All text, projects, skills, activities and links live in [`lib/content.ts`](lib/content.ts) — every string has an `en` and `vi` version.

| What | Where |
| --- | --- |
| CV / resume file | `public/files/` — then update `profile.cvUrl` and `profile.cvFileName` |
| Avatar (transparent cut-out) | `public/images/avatar.webp` |
| Project screenshots | `public/images/projects/<project>/` — referenced from `projects[].cover` and `projects[].gallery` |
| Activity photos | `public/images/activities/` |
| Tech icons | `public/icons/tech/` (Devicon SVGs) |

## Structure

- `app/` — layout, page, global styles (design tokens in `globals.css`)
- `components/sections/` — Navbar, Hero, TechMarquee, About, Skills, Projects (+ modal / mock-ups), Journey, Contact, Footer
- `components/effects/` — preloader, custom cursor, interactive hero canvas, scroll progress, grain
- `components/ui/` — reusable primitives (reveal animations, magnetic button, spotlight card, lightbox, counter)
- `lib/` — content, i18n, hooks, scroll lock
