import { anthropic } from "@ai-sdk/anthropic";
import { convertToCoreMessages, streamText } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    // The Anthropic client will use ANTHROPIC_API_KEY from environment
    // This should only run at runtime, not during build
    const result = await streamText({
      model: anthropic("claude-3-5-sonnet-20240620"),
      messages: convertToCoreMessages(messages),
      system: "You are a helpful AI assistant",
    });

    return result.toDataStreamResponse();
  } catch (error) {
    // This will run during build time since ANTHROPIC_API_KEY is missing
    console.error("Error in Anthropic chat API:", error);
    return new Response(
      JSON.stringify({ error: "Anthropic API key is not configured" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
