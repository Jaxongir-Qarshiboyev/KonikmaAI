"use client";

import { useState } from "react";
import { Brain, Sparkles, Loader2, CheckCircle2, XCircle, ChevronRight, Play, ShieldAlert } from "lucide-react";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizData {
  title: string;
  description: string;
  questions: QuizQuestion[];
}

export default function QuizPage() {
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("Intermediate");
  const [isGenerating, setIsGenerating] = useState(false);
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [error, setError] = useState("");

  const suggestedTopics = ["AML va KYC Asoslari", "Kredit Skoringi", "Bank Siri", "Korporativ Moliyalashtirish"];

  const generateQuiz = async () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    setError("");
    setQuizData(null);
    setCurrentQuestion(0);
    setScore(0);
    setIsFinished(false);
    setSelectedAnswer(null);
    setShowExplanation(false);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "quiz", topic, level }),
      });

      if (!response.ok) throw new Error("Failed to generate quiz");

      const data = await response.json();
      setQuizData(data);
    } catch (err) {
      setError("Testni yaratib bo'lmadi. Gemini API kaliti to'g'riligini tekshiring.");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAnswer = (index: number) => {
    if (showExplanation) return;
    
    setSelectedAnswer(index);
    setShowExplanation(true);
    
    if (index === quizData!.questions[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizData!.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <Sparkles size={20} color="var(--primary)" />
          <span style={{ fontSize: 14, color: "var(--primary)", fontWeight: 600 }}>NeoBank xodimlari uchun yopiq tizim</span>
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: "var(--foreground)", marginBottom: 4, letterSpacing: "-0.02em" }}>
          Bank Bilimlari Sinovi
        </h1>
        <p style={{ fontSize: 15, color: "var(--muted-foreground)" }}>
          Komplayens, moliya va bank xizmatlari bo'yicha maxsus AI testlar orqali malakangizni tekshiring
        </p>
      </div>

      {!quizData && !isFinished && (
        <div className="glass-card" style={{ padding: 40, maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "var(--gradient-navy)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <ShieldAlert size={36} color="var(--accent-light)" />
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: "var(--foreground)" }}>Qaysi mavzuda bilimingizni tekshirasiz?</h2>
          <p style={{ fontSize: 15, color: "var(--muted-foreground)", marginBottom: 24 }}>
            Bank xavfsizligi qoidalariga muvofiq barcha test natijalari tizimda saqlanadi.
          </p>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 500, margin: "0 auto" }}>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Masalan: KYC tekshiruvi jarayoni..."
              disabled={isGenerating}
              style={{
                width: "100%",
                padding: "16px 20px",
                borderRadius: 12,
                border: "2px solid var(--border)",
                fontSize: 16,
                outline: "none",
                background: "var(--background)",
                color: "var(--foreground)",
                transition: "border-color 0.2s"
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--primary)"}
              onBlur={(e) => e.target.style.borderColor = "var(--border)"}
            />
            
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 8 }}>
              {suggestedTopics.map(t => (
                <button 
                  key={t}
                  onClick={() => setTopic(t)}
                  className="chip chip-primary" 
                  style={{ cursor: "pointer", border: "1px solid transparent", background: "white" }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--primary-light)"}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = "transparent"}
                >
                  {t}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 8 }}>
              {["Beginner", "Intermediate", "Advanced"].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLevel(lvl)}
                  disabled={isGenerating}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 20,
                    fontSize: 14,
                    fontWeight: 600,
                    border: level === lvl ? "2px solid var(--primary-dark)" : "2px solid var(--border)",
                    background: level === lvl ? "var(--primary-dark)" : "white",
                    color: level === lvl ? "white" : "var(--muted-foreground)",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  {lvl}
                </button>
              ))}
            </div>

            {error && (
              <div style={{ color: "var(--danger)", fontSize: 14, padding: 12, background: "rgba(220,38,38,0.05)", borderRadius: 8, border: "1px solid rgba(220,38,38,0.2)" }}>
                {error}
              </div>
            )}
            
            <button
              onClick={generateQuiz}
              disabled={!topic.trim() || isGenerating}
              className="btn-gradient"
              style={{ justifyContent: "center", padding: "16px", fontSize: 16, marginTop: 16 }}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Test Yaratilmoqda...
                </>
              ) : (
                <>
                  <Brain size={20} />
                  Test Yaratish
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {quizData && !isFinished && (
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div className="glass-card" style={{ padding: 40 }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, paddingBottom: 24, borderBottom: "1px solid var(--border)" }}>
              <div>
                <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, color: "var(--foreground)" }}>
                  {quizData.title}
                </h2>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span className="chip chip-warning"><ShieldAlert size={12} /> {level} daraja</span>
                  <p style={{ fontSize: 14, color: "var(--muted-foreground)" }}>{quizData.description}</p>
                </div>
              </div>
              <div
                style={{
                  background: "var(--gradient-navy)",
                  color: "var(--accent-light)",
                  padding: "8px 16px",
                  borderRadius: 20,
                  fontWeight: 700,
                  fontSize: 14,
                  boxShadow: "var(--shadow-md)"
                }}
              >
                {currentQuestion + 1} / {quizData.questions.length}
              </div>
            </div>

            {/* Question */}
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 28, lineHeight: 1.5, color: "var(--foreground)" }}>
              {quizData.questions[currentQuestion].question}
            </h3>

            {/* Options */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
              {quizData.questions[currentQuestion].options.map((option, index) => {
                const isCorrect = index === quizData.questions[currentQuestion].correctAnswer;
                const isSelected = selectedAnswer === index;
                
                let optionClass = "quiz-option";
                if (showExplanation) {
                  if (isCorrect) optionClass += " correct";
                  else if (isSelected) optionClass += " incorrect";
                } else if (isSelected) {
                  optionClass += " selected";
                }

                return (
                  <button
                    key={index}
                    className={optionClass}
                    onClick={() => handleAnswer(index)}
                    disabled={showExplanation}
                    style={{ textAlign: "left", width: "100%" }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "8px",
                        background: "var(--muted)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        color: "var(--foreground)",
                      }}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span style={{ fontSize: 15, fontWeight: 500, color: "var(--foreground)" }}>{option}</span>
                    
                    {showExplanation && isCorrect && (
                      <CheckCircle2 color="var(--success)" size={22} style={{ marginLeft: "auto" }} />
                    )}
                    {showExplanation && isSelected && !isCorrect && (
                      <XCircle color="var(--danger)" size={22} style={{ marginLeft: "auto" }} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div
                className="animate-fadeInUp"
                style={{
                  padding: 24,
                  borderRadius: 12,
                  background: selectedAnswer === quizData.questions[currentQuestion].correctAnswer ? "var(--success-light)" : "rgba(220,38,38,0.05)",
                  border: `1px solid ${selectedAnswer === quizData.questions[currentQuestion].correctAnswer ? "rgba(5,150,105,0.3)" : "rgba(220,38,38,0.3)"}`,
                  marginBottom: 24,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, fontWeight: 700, fontSize: 16, color: selectedAnswer === quizData.questions[currentQuestion].correctAnswer ? "var(--success)" : "var(--danger)" }}>
                  {selectedAnswer === quizData.questions[currentQuestion].correctAnswer ? "Tahlil To'g'ri!" : "Xato! Komplayens qoidasiga e'tibor bering"}
                </div>
                <p style={{ fontSize: 15, color: "var(--foreground)", lineHeight: 1.6 }}>
                  {quizData.questions[currentQuestion].explanation}
                </p>
              </div>
            )}

            {/* Next Button */}
            {showExplanation && (
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button className="btn-gradient" onClick={nextQuestion}>
                  {currentQuestion < quizData.questions.length - 1 ? "Keyingi Savol" : "Bank Natijasini Ko'rish"}
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {isFinished && quizData && (
        <div className="glass-card animate-fadeInUp" style={{ padding: 48, maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: score / quizData.questions.length >= 0.8 ? "var(--success-light)" : "rgba(217,119,6,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              border: `4px solid ${score / quizData.questions.length >= 0.8 ? "var(--success)" : "var(--warning)"}`,
            }}
          >
            <span style={{ fontSize: 36, fontWeight: 900, color: score / quizData.questions.length >= 0.8 ? "var(--success)" : "var(--warning)" }}>
              {Math.round((score / quizData.questions.length) * 100)}%
            </span>
          </div>
          
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12, color: "var(--foreground)" }}>
            {score / quizData.questions.length >= 0.8 ? "Sertifikat Olishga Loyiq!" : "Malaka Oshirish Talab Qilinadi"}
          </h2>
          <p style={{ fontSize: 16, color: "var(--muted-foreground)", marginBottom: 40 }}>
            NeoBank HR tizimi bo'yicha siz <strong>{quizData.title}</strong> testidan {quizData.questions.length} ta savoldan {score} tasiga to'g'ri javob berdingiz.
          </p>

          <button
            onClick={() => {
              setQuizData(null);
              setIsFinished(false);
              setTopic("");
            }}
            className="btn-gradient"
            style={{ padding: "16px 32px", fontSize: 16 }}
          >
            <Play size={18} />
            Yangi Test Topshirish
          </button>
        </div>
      )}
    </div>
  );
}
