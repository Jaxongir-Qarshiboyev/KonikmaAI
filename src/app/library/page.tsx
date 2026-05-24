"use client";

import { useState } from "react";
import { libraryVideos, LibraryVideo } from "@/data/library-videos";
import { PlaySquare, Search, Filter, ShieldCheck, ChevronRight, PlayCircle, X, ArrowLeft } from "lucide-react";

export default function LibraryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<LibraryVideo | null>(null);

  const categories = Array.from(new Set(libraryVideos.map((v) => v.category)));

  const filteredVideos = libraryVideos.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          video.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? video.category === selectedCategory : true;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="animate-fadeIn">
      {/* Video Modal */}
      {activeVideo && (
        <div 
          className="fixed inset-0 z-[100] flex flex-col bg-[#0B1120] animate-fadeIn"
          style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, background: "rgba(11, 17, 32, 0.98)", backdropFilter: "blur(20px)" }}
        >
          {/* Header/Controls */}
          <div className="p-6 flex items-center justify-between border-b border-[var(--border)]">
            <button 
              onClick={() => setActiveVideo(null)}
              className="flex items-center gap-2 text-white hover:text-[var(--primary-light)] transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
            >
              <ArrowLeft size={24} />
              <span className="font-bold text-lg">Ortga qaytish</span>
            </button>
            <div className="text-center hidden md:block">
              <h2 className="text-xl font-bold text-white">{activeVideo.title}</h2>
              <p className="text-[var(--muted-foreground)]">{activeVideo.channel}</p>
            </div>
            <button 
              onClick={() => setActiveVideo(null)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Video Player */}
          <div className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8 flex items-center justify-center">
            <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-[var(--border)] bg-black">
              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`} 
                title={activeVideo.title} 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <ShieldCheck size={20} color="var(--primary-light)" />
          <span style={{ fontSize: 14, color: "var(--primary-light)", fontWeight: 600 }}>Xavfsiz Ta'lim Tarmog'i</span>
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: "var(--foreground)", marginBottom: 4, letterSpacing: "-0.02em" }}>
          Bank Video Kutubxonasi
        </h1>
        <p style={{ fontSize: 15, color: "var(--muted-foreground)" }}>
          CFI, AnalystPrep va mutaxassislardan saralangan xalqaro darajadagi moliya va bank ta'lim videolari.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="glass-card" style={{ padding: "16px 24px", marginBottom: 32, display: "flex", gap: 20, alignItems: "center" }}>
        <div style={{ flex: 1, position: "relative" }}>
          <Search size={18} color="var(--muted-foreground)" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }} />
          <input 
            type="text" 
            placeholder="Kredit skoringi, AML, yoki Basel bo'yicha qidiring..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px 12px 44px",
              borderRadius: "8px",
              border: "1px solid var(--border)",
              background: "var(--muted)",
              fontSize: 14,
              outline: "none",
              color: "var(--foreground)",
              transition: "border-color 0.2s"
            }}
            onFocus={(e) => e.target.style.borderColor = "var(--primary)"}
            onBlur={(e) => e.target.style.borderColor = "var(--border)"}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Filter size={18} color="var(--muted-foreground)" />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button 
              onClick={() => setSelectedCategory(null)}
              className={`chip ${selectedCategory === null ? "chip-primary" : ""}`}
              style={{ background: selectedCategory === null ? "" : "var(--muted)", cursor: "pointer", border: "none", color: selectedCategory === null ? "" : "var(--muted-foreground)" }}
            >
              Barchasi
            </button>
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`chip ${selectedCategory === cat ? "chip-primary" : ""}`}
                style={{ background: selectedCategory === cat ? "" : "var(--muted)", cursor: "pointer", border: "none", color: selectedCategory === cat ? "" : "var(--muted-foreground)" }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Video Grid */}
      {filteredVideos.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
          {filteredVideos.map((video) => (
            <button 
              key={video.id} 
              onClick={() => setActiveVideo(video)}
              className="stat-card group text-left" 
              style={{ padding: 0, display: "flex", flexDirection: "column", border: "none", background: "var(--card)", cursor: "pointer" }}
            >
              {/* Thumbnail Container */}
              <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", overflow: "hidden", borderTopLeftRadius: "14px", borderTopRightRadius: "14px", background: "var(--muted)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={video.image} 
                  alt={video.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s" }}
                  className="group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80";
                  }}
                />
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.3s" }} className="group-hover:opacity-100">
                  <PlayCircle size={60} color="white" />
                </div>
              </div>
              
              {/* Content */}
              <div style={{ padding: 20, display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ display: "flex", justifyItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <span className="chip chip-gold" style={{ fontSize: 10, padding: "2px 8px" }}>
                    {video.category}
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)", background: "var(--muted)", padding: "2px 6px", borderRadius: 4 }}>
                    {video.duration}
                  </span>
                </div>
                
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--foreground)", marginBottom: 8, lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {video.title}
                </h3>
                
                <p style={{ fontSize: 13, color: "var(--muted-foreground)", marginBottom: 16, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", flex: 1 }}>
                  {video.description}
                </p>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: "var(--primary-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <PlaySquare size={10} color="white" />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "var(--foreground)" }}>{video.channel}</span>
                  </div>
                  <span className="text-[var(--primary-light)] font-semibold text-sm flex items-center group-hover:text-[var(--primary)] transition-colors">
                    Ko'rish <ChevronRight size={16} />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="glass-card" style={{ padding: 60, textAlign: "center" }}>
          <PlaySquare size={48} color="var(--muted-foreground)" style={{ margin: "0 auto 16px", opacity: 0.5 }} />
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--foreground)", marginBottom: 8 }}>Hech narsa topilmadi</h3>
          <p style={{ color: "var(--muted-foreground)" }}>Qidiruv shartlarini o'zgartirib ko'ring.</p>
        </div>
      )}
    </div>
  );
}
