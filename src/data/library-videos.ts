export interface LibraryVideo {
  id: string;
  title: string;
  category: string;
  channel: string;
  duration: string;
  youtubeId: string;
  description: string;
  image: string;
}

const getPlaceholder = (title: string, category: string) => {
  // Use a different color based on category for variety
  let color = "3B82F6"; // Primary Blue
  if (category.includes("AML")) color = "10B981"; // Emerald
  if (category.includes("Kredit")) color = "F59E0B"; // Amber
  if (category.includes("Risk")) color = "EF4444"; // Red
  if (category.includes("Raqamli")) color = "8B5CF6"; // Purple

  const encodedTitle = encodeURIComponent(title.split(' ').slice(0, 4).join(' ') + (title.split(' ').length > 4 ? '...' : ''));
  return `https://placehold.co/800x450/0B1120/${color}?text=${encodedTitle}&font=montserrat`;
};

export const libraryVideos: LibraryVideo[] = [
  { 
    id: "V-001", 
    title: "AML va KYC nima? Asosiy tushunchalar", 
    category: "AML va Compliance", 
    channel: "KYC Lookup", 
    duration: "14:22", 
    youtubeId: "WEDIj9JBTC8", 
    description: "Anti-Money Laundering va Know Your Customer jarayonlarining asosiy tushunchalari va amaliy qo'llanilishi.",
    image: getPlaceholder("AML va KYC nima?", "AML va Compliance")
  },
  { 
    id: "V-002", 
    title: "Credit Analysis Fundamentals", 
    category: "Kredit tahlili", 
    channel: "Corporate Finance Institute", 
    duration: "18:45", 
    youtubeId: "WEDIj9JBTC8", 
    description: "Kredit tahlilining 5C modeli va moliyaviy hisobotlarni baholash usullari.",
    image: getPlaceholder("Credit Analysis Fundamentals", "Kredit tahlili")
  },
  { 
    id: "V-003", 
    title: "Transaction Monitoring Explained", 
    category: "AML va Compliance", 
    channel: "Global Business Channel", 
    duration: "12:30", 
    youtubeId: "WEDIj9JBTC8", 
    description: "Tranzaksiyalar monitoringi va shubhali operatsiyalarni aniqlash texnikalari.",
    image: getPlaceholder("Transaction Monitoring Explained", "AML va Compliance")
  },
  { 
    id: "V-004", 
    title: "Basel III va IV asoslari", 
    category: "Risk Management", 
    channel: "AnalystPrep", 
    duration: "22:15", 
    youtubeId: "WEDIj9JBTC8", 
    description: "Basel regulyativ talablari va ularning bank kapitaliga ta'siri.",
    image: getPlaceholder("Basel III va IV asoslari", "Risk Management")
  },
  { 
    id: "V-005", 
    title: "Customer Due Diligence (CDD) Process", 
    category: "AML va Compliance", 
    channel: "KYC Lookup", 
    duration: "16:40", 
    youtubeId: "WEDIj9JBTC8", 
    description: "Mijozni tekshirish (Due Diligence) jarayonining bosqichlari va eng yaxshi amaliyotlari.",
    image: getPlaceholder("Customer Due Diligence (CDD)", "AML va Compliance")
  },
  { 
    id: "V-006", 
    title: "Financial Statement Analysis", 
    category: "Moliyaviy tahlil", 
    channel: "Corporate Finance Institute", 
    duration: "25:10", 
    youtubeId: "WEDIj9JBTC8", 
    description: "Moliyaviy hisobotlarni o'qish va tahlil qilish usullari — balans, foyda va zarar hisoboti.",
    image: getPlaceholder("Financial Statement Analysis", "Moliyaviy tahlil")
  },
  { 
    id: "V-007", 
    title: "What is Risk Management in Banking?", 
    category: "Risk Management", 
    channel: "Alpha Learning Centre", 
    duration: "11:55", 
    youtubeId: "WEDIj9JBTC8", 
    description: "Bank sektorida xatarlarni boshqarish turlari va zamonaviy yondashuvlar.",
    image: getPlaceholder("What is Risk Management?", "Risk Management")
  },
  { 
    id: "V-008", 
    title: "How SWIFT Payments Work", 
    category: "Bank operatsiyalari", 
    channel: "The Plain Bagel", 
    duration: "9:20", 
    youtubeId: "WEDIj9JBTC8", 
    description: "SWIFT tizimi orqali xalqaro pul o'tkazmalari qanday ishlaydi.",
    image: getPlaceholder("How SWIFT Payments Work", "Bank operatsiyalari")
  },
  { 
    id: "V-009", 
    title: "Digital Banking Transformation", 
    category: "Raqamli bank", 
    channel: "McKinsey & Company", 
    duration: "15:30", 
    youtubeId: "WEDIj9JBTC8", 
    description: "An'anaviy banklarning raqamli transformatsiya strategiyalari va FinTech trendi.",
    image: getPlaceholder("Digital Banking Transformation", "Raqamli bank")
  },
  { 
    id: "V-010", 
    title: "Stress Testing for Banks", 
    category: "Risk Management", 
    channel: "AnalystPrep", 
    duration: "19:45", 
    youtubeId: "WEDIj9JBTC8", 
    description: "Bank uchun stress-testing: ssenariylar tuzish va kapital yetarliligini baholash.",
    image: getPlaceholder("Stress Testing for Banks", "Risk Management")
  },
  { 
    id: "V-011", 
    title: "Sanctions Screening Process", 
    category: "AML va Compliance", 
    channel: "Global Business Channel", 
    duration: "13:15", 
    youtubeId: "WEDIj9JBTC8", 
    description: "Sanksiyalar skriningi jarayoni va Refinitiv World-Check kabi vositalar.",
    image: getPlaceholder("Sanctions Screening Process", "AML va Compliance")
  },
  { 
    id: "V-012", 
    title: "Credit Scoring Models Explained", 
    category: "Kredit tahlili", 
    channel: "Corporate Finance Institute", 
    duration: "17:00", 
    youtubeId: "WEDIj9JBTC8", 
    description: "Kredit skoring modellari: FICO, logistik regressiya va mashinali o'qitish yondashuvlari.",
    image: getPlaceholder("Credit Scoring Models Explained", "Kredit tahlili")
  },
];
