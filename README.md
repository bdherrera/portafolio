# Data Engineer Portfolio

Professional portfolio built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. It is designed to present a backend/data engineering profile with clear sections for experience, projects, skills, education, and certifications.

## Features

- Next.js 14 App Router
- Tailwind CSS with custom design system
- Framer Motion animations
- Fully responsive layout
- SEO-friendly metadata
- Modular section-based architecture

## Tech Stack

- Framework: Next.js 14
- Language: TypeScript
- Styling: Tailwind CSS
- Animations: Framer Motion
- Icons: Lucide React, React Icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Install and run

```bash
git clone https://github.com/tu-usuario/data-engineer-portfolio.git
cd data-engineer-portfolio
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Customization

### 1) Personal data

Edit `src/data/portfolio.ts` to update:
- Personal info (name, title, bio, contact)
- Experience
- Projects
- Skills
- Education, certifications, and languages

### 2) Design system

Update colors and typography in `Tailwind.config.ts`.

### 3) SEO and metadata

Update metadata in `src/app/layout.tsx`.

## Project Structure

```
data-engineer-portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Education.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Skills.tsx
│   │   │   └── Contact.tsx
│   │   └── ui/
│   │       └── Navbar.tsx
│   └── data/
│       └── portfolio.ts
├── public/
├── Tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Deployment

### Vercel (recommended)

1. Push the repository to GitHub
2. Import it in Vercel
3. Deploy

### Netlify

- Build command: `npm run build`
- Publish directory: `.next`

### GitHub Pages

Requires additional configuration with GitHub Actions.

## Troubleshooting

### Module not found or stale cache

```bash
rm -rf .next
npm run dev
```

### Tailwind configuration

```bash
npx tailwindcss init -p
```

### TypeScript errors

```bash
npx tsc --noEmit
```

## License

MIT. See `LICENSE`.

## Contact

Open an issue or contact the owner via the portfolio contact section.
