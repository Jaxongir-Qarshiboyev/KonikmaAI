# 🚀 Setup Instructions

Follow these steps to run SkillForge AI locally.

## Prerequisites
- Node.js 18 or higher (Node 20+ recommended)
- A Google Gemini API Key. You can get a free one from [Google AI Studio](https://aistudio.google.com/).

## 1. Installation

Clone the repository and install dependencies:

```bash
cd skillforge-ai
npm install
```

## 2. Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Open `.env.local` and add your Gemini API key:
```env
GOOGLE_GENERATIVE_AI_API_KEY=your_actual_key_here
```

## 3. Run the Development Server

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 4. Production Build (Optional)

To test the optimized production build:

```bash
npm run build
npm run start
```

## 🌐 Deployment (Vercel)

The easiest way to deploy this project is via Vercel:

1. Push your code to a public GitHub repository.
2. Log in to [Vercel](https://vercel.com).
3. Click **Add New** -> **Project**.
4. Import your GitHub repository.
5. In the **Environment Variables** section, add `GOOGLE_GENERATIVE_AI_API_KEY` and paste your key.
6. Click **Deploy**.

Within 2 minutes, your AI corporate training platform will be live!
