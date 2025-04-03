# Learning App

A Next.js application that helps users learn through AI-generated multiple-choice questions.

## Environment Setup

1. Create a `.env.local` file in the root directory of the project
2. Add your Google API key to the file:
   ```
   NEXT_PUBLIC_GOOGLE_API_KEY=your_google_api_key_here
   ```
3. Replace `your_google_api_key_here` with your actual Google API key

## Getting Started

1. Install dependencies:

   ```
   npm install
   ```

2. Run the development server:

   ```
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Important Notes

- The `.env.local` file is automatically ignored by Git to keep your API keys secure
- Never commit your actual API keys to version control
- For production deployment, set the environment variables in your hosting platform's configuration

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
