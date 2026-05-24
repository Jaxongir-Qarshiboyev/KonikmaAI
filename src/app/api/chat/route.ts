import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { onboardingSystemPrompt, quizGeneratorPrompt, skillAnalyzerPrompt, learningPathPrompt } from "@/prompts";

export const maxDuration = 30;

function extractJSON(text: string) {
  try {
    // First try direct parse
    return JSON.parse(text);
  } catch {
    // Try to find JSON object or array within the text
    const jsonRegex = /{(?:[^{}]|{(?:[^{}]|{(?:[^{}]|{[^{}]*})*})*})*}/;
    const match = text.match(jsonRegex);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch (err) {
        console.error("Regex extracted string is not valid JSON", err);
      }
    }
    
    // Fallback: try to clean up markdown blocks
    let cleanText = text;
    if (cleanText.includes("```json")) {
      cleanText = cleanText.split("```json")[1].split("```")[0].trim();
    } else if (cleanText.includes("```")) {
      cleanText = cleanText.split("```")[1].split("```")[0].trim();
    }
    try {
      return JSON.parse(cleanText);
    } catch (err) {
      console.error("Markdown cleaned string is not valid JSON", err);
      throw new Error("Failed to parse AI response into JSON.");
    }
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, type, topic, level, role, skills } = body;

    if (type === "onboarding") {
      const result = await generateText({
        model: google("gemini-2.5-flash"),
        system: onboardingSystemPrompt,
        messages,
      });
      return Response.json({ text: result.text });
    } 
    
    if (type === "quiz") {
      const result = await generateText({
        model: google("gemini-2.5-flash"),
        system: quizGeneratorPrompt,
        prompt: `Generate a quiz about: ${topic}. Difficulty level: ${level}`,
      });
      return Response.json(extractJSON(result.text));
    }
    
    if (type === "skill-analysis") {
      const result = await generateText({
        model: google("gemini-2.5-flash"),
        system: skillAnalyzerPrompt,
        prompt: `Role: ${role}\nCurrent skills: ${skills.join(", ")}`,
      });
      return Response.json(extractJSON(result.text));
    }
    
    if (type === "learning-path") {
      const result = await generateText({
        model: google("gemini-2.5-flash"),
        system: learningPathPrompt,
        prompt: `Generate a learning path for the role of: ${role}`,
      });
      return Response.json(extractJSON(result.text));
    }

    return Response.json({ error: "Invalid request type" }, { status: 400 });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
