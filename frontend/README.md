## Getting Started

First install all dependencies and run the development server:

- To install all dependencies
```bash
npm install
```

## Do not forget to change .Env variable before running 
```bash
APP_URL=http://localhost:3000
BACKEND_APP_URL=http://localhost:5000

NEXTAUTH_URL=http://localhost:3000
- Update NEXTAUTH_SECRET
NEXTAUTH_SECRET=use your NEXTAUTH_SECRET 
```

- To run repo
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
