# 🚀 SETUP: Loyihani Ishga Tushirish Qo'llanmasi

Ushbu hujjat Hackathon Hakamlari (Judges) loyihani o'z kompyuterlarida xatosiz ishga tushirishlari uchun mo'ljallangan.

## 1. Talab Qilinadigan Dasturlar
- **Node.js**: v18.17.0 yoki undan yuqori (Tavsiya etiladi: v20 LTS)
- **npm** (Node bilan birga keladi)
- Internet aloqasi (Google Gemini API bilan ishlash uchun)

## 2. O'rnatish Qadamlari

1. **Repozitoriyni yuklab olish:**
   ```bash
   git clone https://github.com/Jaxongir-Qarshiboyev/KonikmaAI.git
   cd KonikmaAI
   ```

2. **Kutubxonalarni o'rnatish:**
   ```bash
   npm install
   ```

3. **Muhit o'zgaruvchilari (Environment Variables):**
   Loyiha ildizida `.env.local` nomli fayl yarating va uning ichiga OpenRouter API kalitingizni kiriting. Tizim shusiz ishlamaydi!
   ```env
   OPENROUTER_API_KEY="sk-or-v1..."
   ```

4. **Dasturni ishga tushirish:**
   ```bash
   npm run dev
   ```
   Brauzerda [http://localhost:3000](http://localhost:3000) manziliga kiring.

---

## 🔐 3. Demo va Test Ma'lumotlari (Credentials)

Hackathon PDF qoidalariga asosan: **"Demo access, login credential yoki sample data kerak bo'lsa, albatta qo'shing."**

Ushbu platforma hozirda ochiq Enterprise MVP ko'rinishida yaratilgan bo'lib, hakamlar tizimni darhol ishlatib ko'rishlari uchun **hech qanday Login/Parol talab qilinmaydi.** 

Siz to'g'ridan-to'g'ri `/dashboard` ga kirib, platformaning barcha imkoniyatlaridan (AI Test, Kutubxona, Ko'nikmalar tahlili) to'liq foydalanishingiz mumkin. Barcha foydalanuvchi datalari (Ismlar, Bo'limlar, KPI lar) tizimda "Mock Data" (`src/data/`) sifatida oldindan kiritilgan.

## 🛠 4. Build va Production
Agar loyihani Vercel kabi platformalarga yuklamoqchi bo'lsangiz:
```bash
npm run build
npm run start
```
*Eslatma: Deployment paytida ham `GOOGLE_GENERATIVE_AI_API_KEY` ni Environment Variables qismiga qo'shishni unutmang.*
