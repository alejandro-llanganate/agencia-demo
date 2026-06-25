# agencia-demo

Sitio demo de **MALI Agency** — agencia creativa y de estrategia. Next.js 15, GSAP, Tailwind CSS.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Build producción (servidor Node)

```bash
npm run build
npm start
```

## Build para GitHub Pages

```bash
npm run build:pages
```

Genera la carpeta `out/` con `basePath: /agencia-demo`.

## Despliegue en GitHub Pages

1. Crea el repo en GitHub: `alejandro-llanganate/agencia-demo`
2. En **Settings → Pages → Build and deployment**, elige **GitHub Actions**
3. Sube el código a `main`:

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:alejandro-llanganate/agencia-demo.git
git push -u origin main
```

4. El workflow `.github/workflows/deploy.yml` publica automáticamente en:

**https://alejandro-llanganate.github.io/agencia-demo/**

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS 4
- GSAP + ScrollTrigger
