import { openai } from "@ai-sdk/openai";
import { convertToCoreMessages, streamText } from "ai";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    // The OpenAI client from ai-sdk will use OPENAI_API_KEY from environment
    // This should only run at runtime, not during build
    const result = await streamText({
      model: openai("gpt-4o"),
      messages: convertToCoreMessages(messages),
      system: "You are a helpful AI assistant",
    });

    return result.toDataStreamResponse();
  } catch (error) {
    // This will run during build time since OPENAI_API_KEY is missing
    console.error("Error in chat API:", error);
    return new Response(
      JSON.stringify({ error: "OpenAI API key is not configured" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
