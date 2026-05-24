export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  level: "Junior" | "Middle" | "Senior" | "Lead";
  avatar: string;
  skills: { name: string; level: number }[];
  badges: string[];
  recentActivity: string;
}

export const employees: Employee[] = [
  {
    id: "NB-001", name: "Sardor Aliyev", role: "Kredit tahlilchisi", department: "Kreditlash", level: "Junior", avatar: "SA",
    skills: [{ name: "Moliyaviy tahlil", level: 5 }, { name: "Kredit skoring", level: 3 }, { name: "Excel / Power BI", level: 7 }],
    badges: ["Fast Learner"], recentActivity: "Tugalladi: 'Kredit tahlili asoslari' kursi (Bugun)",
  },
  {
    id: "NB-002", name: "Dilnoza Rahimova", role: "Komplayens-ofitser", department: "Komplayens va AML", level: "Senior", avatar: "DR",
    skills: [{ name: "AML/KYC", level: 9 }, { name: "FATF standartlari", level: 8 }, { name: "Transaction Monitoring", level: 9 }],
    badges: ["AML Expert", "Mentor"], recentActivity: "Boshladi: 'CAMS sertifikatsiyasi' (Kecha)",
  },
  {
    id: "NB-003", name: "Bobur Karimov", role: "Filial boshqaruvchisi", department: "Chakana bank", level: "Middle", avatar: "BK",
    skills: [{ name: "Mijozlarga xizmat", level: 8 }, { name: "Savdo boshqaruvi", level: 6 }, { name: "Kredit mahsulotlari", level: 7 }],
    badges: ["Sales Champion"], recentActivity: "Test topshirdi: 'Bank Xavfsizligi' (92%)",
  },
  {
    id: "NB-004", name: "Nilufar Toshmatova", role: "Raqamli mahsulot menejeri", department: "Raqamli bank", level: "Middle", avatar: "NT",
    skills: [{ name: "Product Management", level: 7 }, { name: "API Banking", level: 6 }, { name: "UX Research", level: 5 }],
    badges: ["Innovator"], recentActivity: "Yangiladi: 'Mobile Banking UX' loyiha rejasini",
  },
  {
    id: "NB-005", name: "Akmal Nosirjonov", role: "Risk tahlilchisi", department: "Xatarlarni boshqarish", level: "Senior", avatar: "AN",
    skills: [{ name: "Basel III/IV", level: 9 }, { name: "Stress Testing", level: 8 }, { name: "VaR Modeling", level: 7 }],
    badges: ["Risk Master", "Basel Expert"], recentActivity: "Yakunladi: 'Operatsion risk monitoringi' moduli",
  },
];
