# 🤖 AI va Asboblar Deklaratsiyasi (AI Disclosure)

Ushbu hujjat "Build with AI EdTech Hackathon" qoidalari (10-bo'lim: Responsible AI va 6-bo'lim: Disclosure) asosida ishlab chiqildi. Bu yerda loyihada ishlatilgan barcha sun'iy intellekt modellari, kutubxonalar va ularning ishlash mantig'i ochiqlanadi.

## 1. Asosiy AI Model va Kutubxonalar
- **OpenRouter (Free Models Router):** Platformaning barcha sun'iy intellekt xususiyatlari (Onboarding Chat, Quiz Generation, Skill Analysis, Learning Path) bepul OpenRouter modellari (masalan: `google/gemma`, `nvidia/nemotron`) orqali ishlaydi. Eng tejamkor va sifatli modelni router avtomatik tanlaydi.
- **Vercel AI SDK (`ai`, `@ai-sdk/openai`):** OpenRouter API bilan xavfsiz va barqaror ulanish, ma'lumotlarni oqim (stream) ko'rinishida chiqarish uchun ishlatildi. BaseURL maxsus `https://openrouter.ai/api/v1` qilib sozlangan.
- **RAG (Retrieval-Augmented Generation):** AI'ga Bank qonunchiligi (AML, KYC) o'rgatilishi uchun `src/data/company-knowledge.ts` dagi qat'iy ma'lumotlar *System Prompt* orqali yuboriladi.

## 2. Tashqi API, Dataset va Kutubxonalar
- **UI/UX Framework:** React 19, Next.js 15 (App Router).
- **Styling:** Tailwind CSS v3 (Maxsus "Premium Dark Mode" uslubida Custom CSS yozilgan).
- **Grafiklar:** `Recharts` kutubxonasi (Dashboard'da o'qish dinamikasi va bo'limlar progressini ko'rsatish uchun).
- **Ikonkalar:** `lucide-react`.
- **Dataset:** Hech qanday haqiqiy bank ma'lumotlari yoki maxfiy shaxsiy ma'lumotlar (Private Data) ishlatilmagan. Barcha departament, xodim va modullar statistikasi mock-data (`src/data/`) hisoblanadi.
- **YouTube API (Iframe):** Kutubxona bo'limidagi videolar xalqaro moliya kanallarining ochiq (public) videolariga yo'naltirilgan.

## 3. Responsible AI va Cheklovlar (Limitations)
Hackathon'ning "Responsible AI" qoidasiga to'liq amal qilingan holda, quyidagi mexanizmlar joriy etildi:
- **Tashqi ma'lumotlarni cheklash (Hallucination Control):** Model soxta ma'lumotlar o'ylab topmasligi uchun qat'iy System Prompt yozilgan: *"Siz faqatgina NeoBank ichki qoidalariga asoslanib javob berasiz. Agar savol bank qoidalariga to'g'ri kelmasa, javob berishni rad eting."*
- **Maxfiylik (Privacy):** Tizim hech qanday real foydalanuvchi ma'lumotlarini (Sensitive Data) yig'maydi va AI modelga yubormaydi. RAG uchun faqat ochiq bank madaniyati va dress-code qoidalari ishlatilgan.
- **Cheklovlar (Limitations):** Tizim uzluksiz ishlashi uchun Google Gemini API'ning internet aloqasi va Vercel serverlarining ishlash tezligiga bog'liq. AI tibbiy yoki psixologik baholash ishlarini bajarmaydi.

## 4. Fallback Behavior (Xatolik yuz bergandagi holat)
- **API xatoligi:** Agar Gemini API xato bersa (Timeout yoki Limit), tizim sahifani qotirib qo'ymaydi. `/api/chat/route.ts` ichida `try-catch` mexanizmi bor va u foydalanuvchiga *"Tizimda vaqtinchalik uzilish. Iltimos qayta urining"* degan UI xabarni chiqaradi.
- **JSON Parsing Fallback:** AI javob qaytarishda noto'g'ri JSON format ishlatsa, tizimdagi maxsus **Regex Parser** avtomatik ravishda noto'g'ri matnlarni tozalab, sof JSON ni ajratib oladi va dastur ishlashda davom etadi.

## 5. Shablonlar (Templates) va AI Yordami
- Loyiha hech qanday tayyor LMS yoki EdTech shablonlaridan ko'chirilmagan (No pre-built solutions). Barchasi "zero-to-one" noldan Next.js da qurilgan.
- Kod yozishda va murakkab JSON formatlarni to'g'irlashda Google Gemini modelidan 'Pair-Programming' sifatida foydalanildi.
