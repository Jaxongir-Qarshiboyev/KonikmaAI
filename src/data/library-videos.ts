export interface LibraryVideo {
  id: string;
  title: string;
  category: string;
  channel: string;
  duration: string;
  youtubeId: string;
  description: string;
}

export const libraryVideos: LibraryVideo[] = [
  { id: "V-001", title: "AML va KYC nima? Asosiy tushunchalar", category: "AML va Compliance", channel: "KYC Lookup", duration: "14:22", youtubeId: "c_1E1Hk08r4", description: "Anti-Money Laundering va Know Your Customer jarayonlarining asosiy tushunchalari va amaliy qo'llanilishi." },
  { id: "V-002", title: "Credit Analysis Fundamentals", category: "Kredit tahlili", channel: "Corporate Finance Institute", duration: "18:45", youtubeId: "Yw6uE28A3dI", description: "Kredit tahlilining 5C modeli va moliyaviy hisobotlarni baholash usullari." },
  { id: "V-003", title: "Transaction Monitoring Explained", category: "AML va Compliance", channel: "Global Business Channel", duration: "12:30", youtubeId: "T7Mh4GtzQnQ", description: "Tranzaksiyalar monitoringi va shubhali operatsiyalarni aniqlash texnikalari." },
  { id: "V-004", title: "Basel III va IV asoslari", category: "Risk Management", channel: "AnalystPrep", duration: "22:15", youtubeId: "7qJ7eW93V0U", description: "Basel regulyativ talablari va ularning bank kapitaliga ta'siri." },
  { id: "V-005", title: "Customer Due Diligence (CDD) Process", category: "AML va Compliance", channel: "KYC Lookup", duration: "16:40", youtubeId: "wG904L9PqQE", description: "Mijozni tekshirish (Due Diligence) jarayonining bosqichlari va eng yaxshi amaliyotlari." },
  { id: "V-006", title: "Financial Statement Analysis", category: "Moliyaviy tahlil", channel: "Corporate Finance Institute", duration: "25:10", youtubeId: "WEDIj9JBTC8", description: "Moliyaviy hisobotlarni o'qish va tahlil qilish usullari — balans, foyda va zarar hisoboti." },
  { id: "V-007", title: "What is Risk Management in Banking?", category: "Risk Management", channel: "Alpha Learning Centre", duration: "11:55", youtubeId: "VUjCi_bF3Tk", description: "Bank sektorida xatarlarni boshqarish turlari va zamonaviy yondashuvlar." },
  { id: "V-008", title: "How SWIFT Payments Work", category: "Bank operatsiyalari", channel: "The Plain Bagel", duration: "9:20", youtubeId: "OkddqfGghuA", description: "SWIFT tizimi orqali xalqaro pul o'tkazmalari qanday ishlaydi." },
  { id: "V-009", title: "Digital Banking Transformation", category: "Raqamli bank", channel: "McKinsey & Company", duration: "15:30", youtubeId: "b5jdH37hLuA", description: "An'anaviy banklarning raqamli transformatsiya strategiyalari va FinTech trendi." },
  { id: "V-010", title: "Stress Testing for Banks", category: "Risk Management", channel: "AnalystPrep", duration: "19:45", youtubeId: "P_x1jNMDh4o", description: "Bank uchun stress-testing: ssenariylar tuzish va kapital yetarliligini baholash." },
  { id: "V-011", title: "Sanctions Screening Process", category: "AML va Compliance", channel: "Global Business Channel", duration: "13:15", youtubeId: "6fGKfUZQ8_Q", description: "Sanksiyalar skriningi jarayoni va Refinitiv World-Check kabi vositalar." },
  { id: "V-012", title: "Credit Scoring Models Explained", category: "Kredit tahlili", channel: "Corporate Finance Institute", duration: "17:00", youtubeId: "EwLfbCRFLts", description: "Kredit skoring modellari: FICO, logistik regressiya va mashinali o'qitish yondashuvlari." },
];
