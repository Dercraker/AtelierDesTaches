## L'atelier des tâches
Le but du projet est de faire un site qui permet de gérer nos tâches au quotidien. Au
cœur du projet, est un système de to-do listes, à la fois privées et publiques. Il sera possible organiser nos tâches personnelles de manière confidentielle, tout en ayant la possibilité
de partager certaines listes avec des collègues ou des proches. Il y aura une
authentification de type Oauth  ainsi qu'un système d'abonnement qui
permettra de recevoir des notifications en fonction de l'évolution des to-do listes.

## Technologies utilisées : 
- Farmework : NextJS v15 avec React 19 et TS
- Desing : Material UI
- OAuth : Auth.Js
- ORM : Prisma
- Base de données : Postgres
- Validation des types : ZOD
- Variables d'environnement : t3-oss env next
- Notification en temps réelle : sonner
- Gestion des store React Context : Zustand
- Formattage du code : ESlint et prettier

## Clouds services : 
- Vercel : Déploiement
- NeonDB : Base de données 
- Resend : Envois de mails
- Inngest : Task de fond en mode asynchrone

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
