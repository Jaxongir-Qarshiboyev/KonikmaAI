"use client";

import { useState } from "react";
import { BookOpen, Sparkles, Loader2, PlayCircle, BookMarked, Brain, FileText, CheckCircle2, Milestone, ShieldCheck, Target } from "lucide-react";
import { availableRoles } from "@/data/learning-paths";

interface GeneratedPath {
  path: {
    role: string;
    totalDuration: string;
    totalHours: number;
    phases: {
      phase: number;
      title: string;
      duration: string;
      modules: {
        title: string;
        type: string;
        duration: string;
        description: string;
        skills: string[];
      }[];
    }[];
    milestones: string[];
  };
}

export default function LearningPathsPage() {
  const [role, setRole] = useState(availableRoles[2]); // Default to Credit Analyst
  const [isGenerating, setIsGenerating] = useState(false);
  const [pathData, setPathData] = useState<GeneratedPath | null>(null);
  const [error, setError] = useState("");

  const generatePath = async () => {
    setIsGenerating(true);
    setError("");
    
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "learning-path", role }),
      });

      if (!response.ok) throw new Error("Failed to generate path");

      const data = await response.json();
      setPathData(data);
    } catch (err) {
      setError("O'quv rejasini yaratib bo'lmadi. API ulanishini tekshiring.");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const getIconForType = (type: string) => {
    switch (type.toLowerCase()) {
      case "video": return <PlayCircle size={18} />;
      case "reading": return <BookMarked size={18} />;
      case "quiz": return <Brain size={18} />;
      case "project": return <FileText size={18} />;
      default: return <BookOpen size={18} />;
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <Sparkles size={20} color="var(--primary)" />
          <span style={{ fontSize: 14, color: "var(--primary)", fontWeight: 600 }}>NeoBank Karyera Markazi</span>
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: "var(--foreground)", marginBottom: 4, letterSpacing: "-0.02em" }}>
          Karyera O'sish Yo'li
        </h1>
        <p style={{ fontSize: 15, color: "var(--muted-foreground)" }}>
          Bank ichida ko'tarilish yoki yangi sohani egallash uchun AI tomonidan tuzilgan aniq reja.
        </p>
      </div>

      {!pathData && (
        <div className="glass-card" style={{ padding: 48, maxWidth: 650, margin: "0 auto", textAlign: "center" }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 24,
              background: "var(--gradient-navy)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <Milestone size={40} color="var(--accent-light)" />
          </div>
          
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "var(--foreground)", marginBottom: 12 }}>Qaysi bank lavozimiga tayyorlanmoqchisiz?</h2>
          <p style={{ fontSize: 14, color: "var(--muted-foreground)", marginBottom: 32 }}>
            Siz tanlagan lavozim bo'yicha AML, xavfsizlik va professional ko'nikmalarni o'z ichiga olgan reja tuzib beriladi.
          </p>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 450, margin: "0 auto" }}>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={isGenerating}
              style={{
                width: "100%",
                padding: "16px 20px",
                borderRadius: 12,
                border: "1px solid var(--border)",
                fontSize: 15,
                fontWeight: 500,
                color: "var(--foreground)",
                outline: "none",
                background: "var(--background)",
                transition: "border-color 0.2s"
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--primary)"}
              onBlur={(e) => e.target.style.borderColor = "var(--border)"}
            >
              {availableRoles.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            
            {error && <div style={{ color: "var(--danger)", fontSize: 14, padding: 12, background: "rgba(220,38,38,0.05)", borderRadius: 8 }}>{error}</div>}
            
            <button
              onClick={generatePath}
              disabled={isGenerating}
              className="btn-gradient"
              style={{ justifyContent: "center", padding: "16px", fontSize: 16 }}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Karyera Rejasi Tuzilmoqda...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Rejani Yaratish
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {pathData && (
        <div className="animate-fadeInUp">
          {/* Path Header */}
          <div className="glass-card" style={{ padding: 32, marginBottom: 32, display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--gradient-navy)", color: "white", border: "none" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <ShieldCheck size={20} color="var(--success)" />
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--success)", textTransform: "uppercase", letterSpacing: "1px" }}>Komplayens tasdiqlagan dastur</span>
              </div>
              <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>{pathData.path.role} yo'nalishi</h2>
              <div style={{ display: "flex", gap: 24 }}>
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", display: "flex", alignItems: "center", gap: 6, fontWeight: 500 }}>
                  <Milestone size={18} />
                  {pathData.path.totalDuration} davomiylik
                </span>
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", display: "flex", alignItems: "center", gap: 6, fontWeight: 500 }}>
                  <PlayCircle size={18} />
                  ~{pathData.path.totalHours} akademik soat
                </span>
              </div>
            </div>
            
            <button onClick={() => setPathData(null)} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "white", padding: "10px 24px", borderRadius: 8, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.15)"} onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}>
              Boshqa Yaratish
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr", gap: 32 }}>
            {/* Timeline */}
            <div style={{ position: "relative" }}>
              {/* Vertical line connecting phases */}
              <div style={{ position: "absolute", left: 28, top: 24, bottom: 24, width: 2, background: "var(--border)", zIndex: 0 }} />
              
              <div style={{ display: "flex", flexDirection: "column", gap: 40, position: "relative", zIndex: 1 }}>
                {pathData.path.phases.map((phase) => (
                  <div key={phase.phase} style={{ display: "flex", gap: 24 }}>
                    {/* Phase Number Bubble */}
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        background: "var(--background)",
                        border: "2px solid var(--border)",
                        color: "var(--foreground)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 20,
                        fontWeight: 800,
                        flexShrink: 0,
                        boxShadow: "0 0 0 8px var(--background)",
                      }}
                    >
                      {phase.phase}
                    </div>
                    
                    {/* Phase Content */}
                    <div className="stat-card" style={{ flex: 1, padding: 32 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                        <div>
                          <h3 style={{ fontSize: 20, fontWeight: 800, color: "var(--foreground)", marginBottom: 4 }}>{phase.title}</h3>
                        </div>
                        <span className="chip chip-primary" style={{ fontWeight: 600, background: "var(--muted)", color: "var(--foreground)", border: "1px solid var(--border)" }}>
                          {phase.duration}
                        </span>
                      </div>
                      
                      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {phase.modules.map((module, i) => (
                          <div
                            key={i}
                            style={{
                              padding: 20,
                              borderRadius: 12,
                              border: "1px solid var(--border)",
                              background: "var(--background)",
                              display: "flex",
                              gap: 16,
                            }}
                          >
                            <div
                              style={{
                                width: 44,
                                height: 44,
                                borderRadius: 10,
                                background: "var(--background)",
                                border: "1px solid var(--border)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "var(--primary-dark)",
                                flexShrink: 0,
                              }}
                            >
                              {getIconForType(module.type)}
                            </div>
                            
                            <div style={{ flex: 1 }}>
                              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                                <h4 style={{ fontSize: 16, fontWeight: 700, color: "var(--foreground)" }}>{module.title}</h4>
                                <span style={{ fontSize: 12, fontWeight: 700, color: "var(--muted-foreground)" }}>{module.duration}</span>
                              </div>
                              <p style={{ fontSize: 14, color: "var(--muted-foreground)", marginBottom: 16, lineHeight: 1.5 }}>
                                {module.description}
                              </p>
                              
                              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                {module.skills.map(skill => (
                                  <span key={skill} style={{ fontSize: 11, background: "var(--background)", border: "1px solid var(--border)", padding: "4px 10px", borderRadius: 6, fontWeight: 600, color: "var(--foreground)" }}>
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Milestones Sidebar */}
            <div className="glass-card" style={{ padding: 32, height: "fit-content", position: "sticky", top: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--foreground)", marginBottom: 24, display: "flex", alignItems: "center", gap: 8 }}>
                <Target size={20} color="var(--primary)" />
                Muhim Yutuqlar (KPI)
              </h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {pathData.path.milestones.map((milestone, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ marginTop: 2, background: "var(--success-light)", borderRadius: "50%", padding: 2 }}>
                      <CheckCircle2 size={16} color="var(--success)" />
                    </div>
                    <p style={{ fontSize: 14, color: "var(--foreground)", lineHeight: 1.5, fontWeight: 500 }}>
                      {milestone}
                    </p>
                  </div>
                ))}
              </div>
              
              <button className="btn-gradient" style={{ width: "100%", marginTop: 40, justifyContent: "center", padding: "16px" }}>
                Dasturga Yozilish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
