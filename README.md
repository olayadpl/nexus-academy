# section-video

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_GjnUXCALqzR3hv0spq56A2zicfLx)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.

<a href="https://v0.app/chat/api/kiro/clone/olayadpl/section-video" alt="Open in Kiro"><img src="https://pdgvvgmkdvyeydso.public.blob.vercel-storage.com/open%20in%20kiro.svg?sanitize=true" /></a>

## Payload seed

Para elegir entre mock y Payload real, configura la variable de entorno:

```bash
# payload (real) | mock
DATA_SOURCE_MODE=payload
```

Para insertar datos de ejemplo en la colección `courses` usa:

```bash
node scripts/seed-courses.mjs
# o con pnpm
pnpm node scripts/seed-courses.mjs
```

También hay un script en `package.json`:

```bash
pnpm run payload:seed:courses
```

El seed de cursos también descarga automáticamente imágenes faltantes en `public/images` para:

- `course4.png`
- `course5.png`
- `course6.png`
- `course-programming.jpg`
- `course-design.jpg`
- `course-databases.jpg`
