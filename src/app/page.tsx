"use client";

import Link from "next/link";
import { ArrowRight, BrainCircuit, Target, Building2, PlaySquare, ShieldCheck } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] overflow-hidden">
      {/* Navigation */}
      <nav className="h-20 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--gradient-primary)] flex items-center justify-center shadow-lg">
              <Building2 size={20} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight leading-none text-[var(--foreground)]">NeoBank</span>
              <span className="text-[10px] font-bold text-[var(--primary-light)] uppercase tracking-wider">Ko'nikmaAI</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-semibold text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
              Platformaga Kirish
            </Link>
            <Link href="/dashboard" className="btn-gradient px-6 py-2.5">
              Tizimga Kirish <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
        {/* Subtle Bank-style background elements */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
          <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-[var(--primary)] opacity-20 blur-[120px]"></div>
          <div className="absolute top-[40%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[var(--success)] opacity-10 blur-[100px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--card)]/50 backdrop-blur-sm shadow-sm mb-8 animate-fadeIn">
            <ShieldCheck size={16} className="text-[var(--success)]" />
            <span className="text-sm font-medium text-[var(--foreground)]">Premium Enterprise FinTech Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 animate-fadeInUp text-[var(--foreground)]" style={{ animationDelay: "0.1s" }}>
            Korporativ Ta'lim,<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">AI Bilan Qayta Yaratildi</span>
          </h1>
          
          <p className="mt-4 text-xl text-[var(--muted-foreground)] max-w-3xl mx-auto mb-10 animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
            Bank xodimlarini ishga moslashtirish (onboarding) va malakasini oshirishni 3 barobarga tezlating. 
            Ko'nikmaAI — 100% bank va moliya sohasiga moslashtirilgan aqlli platforma.
          </p>

          <div className="flex justify-center gap-4 animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
            <Link href="/dashboard" className="btn-gradient px-8 py-4 text-lg shadow-lg border border-white/10">
              Platformani Sinab Ko'rish <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Features Showcase */}
      <div className="border-t border-[var(--border)] relative z-10 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[var(--foreground)]">Bank xodimlari uchun to'liq ekotizim</h2>
            <p className="mt-4 text-[var(--muted-foreground)]">Komplayensdan tortib kredit tahliligacha — barchasi bitta joyda.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="stat-card hover:-translate-y-1 transition-transform duration-300 group" style={{ background: "var(--card)" }}>
              <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Building2 size={24} className="text-[var(--primary-light)]" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-[var(--foreground)]">AI Bank Yordamchisi</h3>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                Bank qoidalari, AML/KYC va ichki tartiblar bo'yicha 24/7 javob beruvchi aqlli bot.
              </p>
            </div>

            <div className="stat-card hover:-translate-y-1 transition-transform duration-300 group" style={{ background: "var(--card)" }}>
              <div className="w-12 h-12 rounded-xl bg-[var(--success)]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target size={24} className="text-[var(--success)]" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-[var(--foreground)]">Ko'nikmalar Tahlili</h3>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                Kredit yoki Risk tahlilchisi bo'lish uchun qaysi bilimlar yetishmasligini aniqlang.
              </p>
            </div>

            <div className="stat-card hover:-translate-y-1 transition-transform duration-300 group" style={{ background: "var(--card)" }}>
              <div className="w-12 h-12 rounded-xl bg-[var(--warning)]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BrainCircuit size={24} className="text-[var(--warning)]" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-[var(--foreground)]">Test Yaratuvchi</h3>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                "Kredit skoringi" kabi mavzularda AI orqali avtomatik testlar yarating va baholang.
              </p>
            </div>

            <div className="stat-card hover:-translate-y-1 transition-transform duration-300 group" style={{ background: "var(--card)" }}>
              <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <PlaySquare size={24} className="text-[var(--accent-light)]" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-[var(--foreground)]">Video Kutubxona</h3>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                CFI, AnalystPrep kabi xalqaro kanallardan saralangan premium bank videodarslari.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="border-t border-[var(--border)] bg-[var(--card)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[var(--gradient-primary)] flex items-center justify-center">
              <Building2 size={16} className="text-white" />
            </div>
            <span className="text-xl font-bold text-[var(--foreground)]">NeoBank</span>
          </div>
          <p className="text-[var(--muted-foreground)] text-sm font-medium">
            Built for the Build with AI EdTech Hackathon. Corporate Education Track. 2026.
          </p>
        </div>
      </footer>
    </div>
  );
}
