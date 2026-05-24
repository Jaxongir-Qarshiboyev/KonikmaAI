import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkillForge AI — Corporate Training Platform",
  description: "AI-powered corporate onboarding and employee training platform. Smart onboarding, personalized learning paths, AI quiz generation, and skill gap analysis.",
  keywords: ["corporate training", "AI", "onboarding", "LMS", "employee development", "skill gap"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
