"use client";

import { useState } from "react";
import { BarChart3, Sparkles, Loader2, BookOpen, TrendingUp, Target, Plus, X, ShieldAlert } from "lucide-react";
import { availableRoles } from "@/data/learning-paths";

interface SkillAnalysis {
  analysis: {
    overallScore: number;
    strengths: string[];
    gaps: {
      skill: string;
      currentLevel: number;
      requiredLevel: number;
      priority: string;
      recommendation: string;
    }[];
    recommendedCourses: {
      title: string;
      duration: string;
      priority: string;
    }[];
    careerAdvice: string;
  };
}

export default function SkillsPage() {
  const [role, setRole] = useState(availableRoles[0]);
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>(["Excel", "Mijozlar bilan muloqot", "Boshlang'ich moliya"]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState<SkillAnalysis | null>(null);
  const [error, setError] = useState("");

  const addSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const analyzeSkills = async () => {
    if (skills.length === 0) return;
    
    setIsAnalyzing(true);
    setError("");
    setAnalysisData(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "skill-analysis", role, skills }),
      });

      if (!response.ok) throw new Error("Failed to analyze skills");

      const data = await response.json();
      setAnalysisData(data);
    } catch (err) {
      setError("Ko'nikmalarni tahlil qilib bo'lmadi. API ulanishini tekshiring.");
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <Sparkles size={20} color="var(--primary)" />
          <span style={{ fontSize: 14, color: "var(--primary)", fontWeight: 600 }}>NeoBank HR Analitikasi</span>
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: "var(--foreground)", marginBottom: 4, letterSpacing: "-0.02em" }}>
          Bankir Ko'nikmalar Tahlili
        </h1>
        <p style={{ fontSize: 15, color: "var(--muted-foreground)" }}>
          O'zingiz tanlagan bank lavozimi bo'yicha kuchli tomonlaringiz va kamchiliklaringizni aniqlang.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: analysisData ? "1fr 2fr" : "1fr", gap: 32, transition: "all 0.3s" }}>
        
        {/* Input Section */}
        <div className="glass-card" style={{ padding: 32, height: "fit-content" }}>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 14, fontWeight: 700, color: "var(--foreground)", marginBottom: 8 }}>
              Maqsadli Lavozim
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: "10px",
                border: "1px solid var(--border)",
                background: "var(--background)",
                color: "var(--foreground)",
                fontSize: 14,
                outline: "none",
                transition: "border-color 0.2s"
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--primary)"}
              onBlur={(e) => e.target.style.borderColor = "var(--border)"}
            >
              {availableRoles.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: 32 }}>
            <label style={{ display: "block", fontSize: 14, fontWeight: 700, color: "var(--foreground)", marginBottom: 8 }}>
              Hozirgi Ko'nikmalar (Skills)
            </label>
            <form onSubmit={addSkill} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="masalan: KYC, Moliyaviy modellashtirish..."
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  borderRadius: "10px",
                  border: "1px solid var(--border)",
                  background: "var(--background)",
                  fontSize: 14,
                  outline: "none",
                }}
                onFocus={(e) => e.target.style.borderColor = "var(--primary)"}
                onBlur={(e) => e.target.style.borderColor = "var(--border)"}
              />
              <button
                type="submit"
                style={{
                  padding: "0 16px",
                  background: "var(--primary)",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Plus size={20} />
              </button>
            </form>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {skills.map(skill => (
                <span
                  key={skill}
                  className="chip chip-primary"
                  style={{ display: "flex", alignItems: "center", gap: 6, paddingRight: 8, border: "1px solid rgba(59,130,246,0.2)" }}
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    style={{ background: "transparent", border: "none", color: "currentColor", cursor: "pointer", display: "flex" }}
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {error && <div style={{ color: "var(--danger)", fontSize: 13, marginBottom: 16 }}>{error}</div>}

          <button
            onClick={analyzeSkills}
            disabled={skills.length === 0 || isAnalyzing}
            className="btn-gradient"
            style={{ width: "100%", justifyContent: "center", padding: "16px" }}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Profil Tahlil Qilinmoqda...
              </>
            ) : (
              <>
                <BarChart3 size={18} />
                Profilni Tahlil Qilish
              </>
            )}
          </button>
        </div>

        {/* Results Section */}
        {analysisData && (
          <div className="animate-fadeInRight">
            {/* Score & Advice */}
            <div className="glass-card" style={{ padding: 32, marginBottom: 24, background: "var(--gradient-navy)", color: "white", border: "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
                <div
                  style={{
                    width: 110,
                    height: 110,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.05)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    border: `4px solid ${analysisData.analysis.overallScore >= 70 ? "var(--success)" : "var(--warning)"}`,
                    boxShadow: "0 0 20px rgba(0,0,0,0.2)"
                  }}
                >
                  <span style={{ fontSize: 36, fontWeight: 900, color: analysisData.analysis.overallScore >= 70 ? "var(--success-light)" : "var(--accent-light)" }}>
                    {analysisData.analysis.overallScore}
                  </span>
                  <span style={{ fontSize: 11, opacity: 0.7, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>Moslik</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <ShieldAlert size={20} color="var(--accent-light)" />
                    <h3 style={{ fontSize: 24, fontWeight: 800, color: "white" }}>Bank HR Xulosasi</h3>
                  </div>
                  <p style={{ fontSize: 15, lineHeight: 1.6, opacity: 0.85 }}>
                    {analysisData.analysis.careerAdvice}
                  </p>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
              {/* Strengths */}
              <div className="stat-card" style={{ padding: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <div style={{ padding: 6, background: "var(--success-light)", borderRadius: 8 }}>
                    <Target size={18} color="var(--success)" />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--foreground)" }}>Asosiy Ustunliklar</h3>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {analysisData.analysis.strengths.map(strength => (
                    <span key={strength} className="chip chip-success" style={{ padding: "6px 14px", fontSize: 13, border: "1px solid rgba(5,150,105,0.2)" }}>
                      {strength}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommended Courses */}
              <div className="stat-card" style={{ padding: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <div style={{ padding: 6, background: "var(--primary-light)", borderRadius: 8, opacity: 0.2 }}>
                    <BookOpen size={18} color="var(--primary-dark)" />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--foreground)" }}>Tavsiya Etilgan Kurslar</h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {analysisData.analysis.recommendedCourses.map((course, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: "var(--background)", borderRadius: 8, border: "1px solid var(--border)" }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)" }}>{course.title}</span>
                      <span style={{ fontSize: 11, color: "var(--muted-foreground)", fontWeight: 500 }}>{course.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Skill Gaps List */}
            <div className="stat-card" style={{ padding: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
                <div style={{ padding: 6, background: "var(--warning)", opacity: 0.2, borderRadius: 8 }}>
                  <TrendingUp size={18} color="var(--warning)" />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--foreground)" }}>To'ldirilishi Kerak Bo'lgan Bo'shliqlar</h3>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {analysisData.analysis.gaps.map((gap, i) => (
                  <div key={i} style={{ padding: 20, border: "1px solid var(--border)", borderRadius: 12, background: "var(--background)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                      <div>
                        <h4 style={{ fontSize: 16, fontWeight: 700, color: "var(--foreground)", marginBottom: 6 }}>{gap.skill}</h4>
                        <span className={`chip ${gap.priority === 'high' ? 'chip-danger' : gap.priority === 'medium' ? 'chip-warning' : 'chip-primary'}`} style={{ fontSize: 11 }}>
                          {gap.priority === 'high' ? 'Kritik ahamiyatga ega' : gap.priority === 'medium' ? 'Muhim' : 'Qo\'shimcha ustunlik'}
                        </span>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 11, color: "var(--muted-foreground)", marginBottom: 4, textTransform: "uppercase", fontWeight: 600 }}>Daraja</div>
                        <div style={{ fontSize: 16, fontWeight: 800, color: "var(--foreground)" }}>{gap.currentLevel} <span style={{ color: "var(--muted-foreground)", fontWeight: 400 }}>/ {gap.requiredLevel}</span></div>
                      </div>
                    </div>
                    
                    {/* Gap Progress Bar */}
                    <div style={{ display: "flex", height: 8, background: "var(--muted)", borderRadius: 4, overflow: "hidden", marginBottom: 16 }}>
                      <div style={{ width: `${(gap.currentLevel / 10) * 100}%`, background: "var(--success)" }} />
                      <div style={{ width: `${((gap.requiredLevel - gap.currentLevel) / 10) * 100}%`, background: "var(--warning)" }} />
                    </div>
                    
                    <div style={{ padding: 12, background: "var(--background)", borderRadius: 8, border: "1px solid var(--border)" }}>
                      <p style={{ fontSize: 13, color: "var(--muted-foreground)" }}>
                        <span style={{ color: "var(--primary-dark)", fontWeight: 700, marginRight: 6 }}>HR Tavsiyasi:</span> 
                        {gap.recommendation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
