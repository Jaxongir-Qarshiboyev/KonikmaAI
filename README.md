# 🏦 Ko'nikmaAI — Premium FinTech va Bank Ta'lim Platformasi

**"Build with AI EdTech Hackathon" (Corporate Education Track)** uchun yaratilgan mutlaqo Senior-Level dizayn va Moliya sohasiga moslashtirilgan ochiq manbali arxitektura.

Ko'nikmaAI — bu an'anaviy LMS emas. Bu banklarda yangi xodimlarni moslashtirish (onboarding), komplayens (AML/KYC) treninglarini avtomatlashtirish va xodimlarning professional ko'nikmalarini AI orqali aniq tahlil qilish imkonini beruvchi **Enterprise darajasidagi tizimdir.**

---

## 🏆 Hackathon Baholash Mezonlariga Mosligi (Judges Guide)

Loyihamiz hackathonning rasmiy PDF qo'llanmasidagi barcha qoidalarni ortig'i bilan bajarishga qaratilgan:

### 1. Innovation & Creativity (30 ball)
- **Faqatgina Chatbot emas:** Biz AI'dan yuzaki chatbot emas, balki chuqur tahliliy vosita sifatida foydalandik. Tizim xodimning lavozimi (Masalan: Kredit Tahlilchisi) ga qarab individual **O'quv Yo'li (Learning Path)** va **Ko'nikmalar Tahlili (Skill Gap)** ni generatsiya qiladi. Qotib qolgan bazadagi testlar emas, cheksiz AI Testlar (Quiz) avtomatik yaratiladi.

### 2. Problem-Solution Fit (20 ball)
- **Muammo:** FinTech va Bank sektorida yangi xodimni ishga qabul qilish (Onboarding) qimmat va 45+ kunlik jarayon. U komplayens va regulyativ talablarni o'rganishi kerak. 
- **Yechim:** "Ko'nikmaAI" qat'iy moliya standartlari va RAG (Retrieval-Augmented Generation) asosida ishlaydigan ichki tizim yaratadi. Bu orqali bankning HR ta'lim xarajatlari 40% ga qisqaradi.

### 3. Technical Execution (30 ball)
- Kod bazasi yuqori sifatli (Next.js 15, TypeScript).
- **Responsible AI:** `AI_DISCLOSURE.md` da yozilganidek, AI bank qoidalaridan tashqariga chiqmaydi (Hallucination'ning oldi olingan) va Sensitive Data yig'maydi. API xato berganida ham ishdan chiqmaydigan Fallback (Regex Parser) mexanizmlari mavjud.
- UI/UX butunlay banklarga mos **Premium Dark Mode (Glassmorphism v2)** uslubida.

### 4. Presentation & Completeness (20 ball)
- Tizim to'liq demo qilishga tayyor va hech qanday yopiq havolalarga ega emas.
- Loyiha bilan tanishish uchun `DEMO_SCRIPT.md` pitch fayli va slayd materiallari (`docs/slides-content.md`) tayyorlangan.

---

## ✨ Asosiy FinTech-AI Xususiyatlari
1. **AI Bank Yordamchisi (Onboarding Chatbot):** Bank siyosati, dress-code, AML qoidalari bo'yicha RAG yondashuvi.
2. **AI Test Yaratuvchi (Compliance Quiz):** Qiyinlik darajasiga ko'ra "Kredit skoringi" va xavfsizlik mavzularida testlar yaratish.
3. **Ko'nikmalar Tahlili (HR Analytics):** Bankning 15 xil pozitsiyasi asosida kuchli va kuchsiz tomonlar tahlili.
4. **O'quv Yo'llari (Career Paths):** Karyerada o'sish uchun AI tuzib beradigan 3 oylik reja.
5. **Video Kutubxona:** CFI va AnalystPrep kabi kanallardan saralangan tayyor ochiq ta'lim bazasi. Barcha videolar iframe xatolarisiz to'g'ridan to'g'ri tizim ichida (Modal ko'rinishida) o'ynaydi.

## 🛠 Texnologiyalar (Tech Stack)
- **Frontend:** Next.js 15 (App Router), React 19, TypeScript
- **Premium UI:** Tailwind CSS v3, Glassmorphism, Lucide Icons
- **Grafiklar (Data Vis):** Recharts
- **AI Integratsiya:** Vercel AI SDK (`ai`, `@ai-sdk/google`)
- **Model:** Google Gemini 2.5 Flash API

## ⚙️ Ishga Tushirish va Demo Access
Batafsil ma'lumot uchun **[SETUP.md](SETUP.md)** fayliga qarang. Tizim ishlashi uchun hech qanday foydalanuvchi logini yoki paroli talab qilinmaydi (Demo Access ochiq). Barcha statistikalar va jamoa ma'lumotlari xavfsiz "Mock Data" holatida saqlangan.

## 📁 Hackathon Rasmiy Hujjatlari
- [AI Asboblar va Cheklovlar Deklaratsiyasi (AI_DISCLOSURE.md)](AI_DISCLOSURE.md)
- [Ishga Tushirish va Demo (SETUP.md)](SETUP.md)
- [Texnik Arxitektura (ARCHITECTURE.md)](ARCHITECTURE.md)
- [Demo Pitch Ssenariysi (DEMO_SCRIPT.md)](DEMO_SCRIPT.md)
- [Taqdimot Slaydlari (docs/slides-content.md)](docs/slides-content.md)
