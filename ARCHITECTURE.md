# 🏗 Ko'nikmaAI — Arxitektura va Texnik Dizayn

Ushbu hujjat **Ko'nikmaAI** (Bank/FinTech versiyasi) ilovasining texnik arxitekturasi va uchinchi tomon vositalari integratsiyasini tavsiflaydi.

## 🌟 Umumiy Arxitektura Diagrammasi

\`\`\`mermaid
graph TD
    A[Client Browser (Next.js SSR/CSR)] -->|HTTPS| B[Vercel Edge Network]
    
    subgraph Frontend [React 19 + Next.js 15 App Router]
        UI[Premium Bank UI - Tailwind v3]
        State[React Hooks State]
        Dash[Recharts Data Viz]
    end
    
    subgraph Data_Layer [Mock Bank DB]
        KB[(Company Knowledge RAG)]
        Emp[(Employees Data)]
        Mod[(Training Modules)]
        Vid[(Library Videos)]
    end
    
    B <--> UI
    UI <--> State
    State <--> Dash
    UI <--> Data_Layer
    
    UI -->|API Route /api/chat| C[Next.js API Handler]
    
    subgraph Backend_Logic [AI Middleware]
        C --> D[Prompt Engineering Engine]
        D -->|System Prompts: Bank Rules, KYC, AML| E[Vercel AI SDK]
    end
    
    E -->|REST API Request| F[Google Gemini 2.5 Flash]
    F -->|Streaming / JSON Blocks| E
\`\`\`

## 🛠 Asosiy Texnologiyalar Steki

1.  **Framework:** Next.js 15 (App Router). Server komponentlari (SEO va tezlik) hamda Client komponentlari (Interaktivlik) gibrid qilingan.
2.  **UI/Styling:** Tailwind CSS v3.
    *   **Dizayn tizimi:** Bank sektoriga moslashtirilgan "Glassmorphism v2" va Deep Navy / Emerald ranglar.
    *   **Tipografiya:** Inter shrifit (professional va toza).
3.  **Grafiklar:** Recharts — KPI va Dashboard'dagi murakkab bank ma'lumotlarini (NPL, Progress) ko'rsatish uchun.
4.  **Ikonkalar:** Lucide React (minimalist va vektorli).
5.  **AI SDK:** Vercel AI SDK (`@ai-sdk/google`).
6.  **AI Model:** Google Gemini 2.5 Flash.

## 🧠 AI va RAG (Retrieval-Augmented Generation) Arxitekturasi

AI integratsiyasi `/api/chat/route.ts` faylida amalga oshirilgan. Tizim **4 ta mustaqil AI funksiyasiga** ega:

### 1. Onboarding Assistant (Chat)
- **Mexanizm:** `streamText` orqali ishlaydi (Real-time yozish effekti).
- **RAG yondashuvi:** `src/data/company-knowledge.ts` dagi NeoBank qoidalari (AML, Dress code, Bank siri) System Prompt'ga statik yuboriladi. Model faqat shu qoidalar asosida ishlaydi.

### 2. Quiz Generator
- **Mexanizm:** `generateText` orqali ishlaydi. AI'dan aniq JSON format so'raladi (Zero-shot prompting).
- **Parsovka:** Model qaytargan Markdown Markdown \`\`\`json bloklari kesib olinadi va UI'da interaktiv testga aylanadi.

### 3. Skill Gap Analyzer
- **Mexanizm:** Foydalanuvchining kiritgan ko'nikmalari bank pozitsiyasi bilan solishtiriladi va qat'iy tuzilgan JSON tahlili qaytariladi.

### 4. Learning Paths
- **Mexanizm:** Modullar, videolar va "Milestones" (KPI yutuqlari) lardan iborat yo'l xaritasi JSON shaklida generatsiya qilinadi.

## 🔒 Xavfsizlik va Komplayens
- API kalitlar Server-Side (API Routes) da izolyatsiya qilingan. Frontend'ga hech qanday kalit chiqmaydi.
- Bank kontekstidagi so'rovlar ("Hallucination" ni oldini olish uchun) qat'iy System Prompt'lar bilan chegaralangan.
