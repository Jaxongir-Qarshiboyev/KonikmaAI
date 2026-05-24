"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, MessageSquare, BrainCircuit, Target, Route, PlaySquare, Building2 } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "AI Yordamchi", href: "/assistant", icon: MessageSquare },
  { name: "Ko'nikmalar Tahlili", href: "/skills", icon: Target },
  { name: "O'quv Yo'llari", href: "/learning-paths", icon: Route },
  { name: "AI Test Yaratuvchi", href: "/quiz", icon: BrainCircuit },
  { name: "Kutubxona", href: "/library", icon: PlaySquare },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="sidebar">
      {/* Brand */}
      <div className="h-20 flex items-center px-6 border-b border-[var(--border)]">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[var(--gradient-primary)] flex items-center justify-center shadow-md">
            <Building2 size={20} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-[var(--foreground)] tracking-tight group-hover:text-[var(--primary-light)] transition-colors">
              NeoBank
            </span>
            <span className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider">
              Ko'nikmaAI
            </span>
          </div>
        </Link>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <div className="px-3 mb-4 text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wider">
          Asosiy Menyu
        </div>
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`sidebar-link ${isActive ? "active" : ""}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                borderRadius: "10px",
                color: isActive ? "var(--foreground)" : "var(--muted-foreground)",
                textDecoration: "none",
                fontWeight: isActive ? 600 : 500,
                fontSize: "14px",
                transition: "all 0.2s",
                background: isActive ? "rgba(59,130,246,0.15)" : "transparent",
                border: isActive ? "1px solid rgba(59,130,246,0.3)" : "1px solid transparent",
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.background = "var(--muted)";
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = "transparent";
              }}
            >
              <Icon
                size={20}
                color={isActive ? "var(--primary-light)" : "var(--muted-foreground)"}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Profile */}
      <div className="p-4 border-t border-[var(--border)]">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-10 h-10 rounded-full bg-[var(--gradient-primary)] text-white flex items-center justify-center font-bold shadow-md">
            AK
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-[var(--foreground)]">Aziz Karimov</span>
            <span className="text-xs text-[var(--muted-foreground)]">Kredit Tahlilchisi</span>
          </div>
        </div>
      </div>
    </div>
  );
}
