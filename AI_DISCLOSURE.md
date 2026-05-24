# 🤖 AI and Tool Disclosure

As per the hackathon requirements, this document outlines all AI models, external tools, APIs, and templates used in the creation of SkillForge AI.

## 1. AI Models Used
- **Google Gemini 2.5 Flash:** Used as the core intelligence engine for all platform features (Onboarding Chat, Quiz Generation, Skill Analysis, Learning Path Generation). Accessed via the official API.

## 2. APIs and Libraries
- **Vercel AI SDK (`ai`, `@ai-sdk/google`):** Used to interface with the Gemini API, stream text to the UI, and manage chat state.
- **Lucide React:** Used for SVG iconography across the dashboard.
- **Recharts:** Used for rendering the Area and Pie charts on the Dashboard page.
- **Tailwind CSS v4:** Used for all custom styling and layout.

## 3. Templates and Boilerplates
- **NO PRE-BUILT TEMPLATES WERE USED.** 
- The project was bootstrapped using the standard `create-next-app` command.
- The UI (Dashboard, Sidebar, Glassmorphism design) was built completely from scratch during the hackathon to ensure maximum control and adherence to the specific corporate training use-case.

## 4. AI Coding Assistance
- **Gemini Advanced:** Used extensively as a pair-programming partner during the hackathon to generate boilerplate code, format the mock JSON data, and refine the prompt engineering for the AI features.

## 5. Assets
- All fonts (Inter) are loaded via `next/font/google`.
- The logo is a simple SVG icon from Lucide React.
- No external images or proprietary assets were used.
