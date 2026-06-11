import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  // Extract the chat history from the user's request
  const { messages } = await req.json();

  // The System Prompt: This is the "brain" of your specific business.
  // In the future, we will inject the user's database pet profile right here.
  const systemPrompt = `
    You are the official customer service assistant for 'The Butcher's Pup', 
    a premium dog bone company based in Iowa. We sell direct-from-facility smoked beef bones.
    
    Rules:
    1. Always respond in the exact language the user is speaking. 
    2. Be warm, helpful, and prioritize dog safety.
    3. If they mention a small dog (under 20lbs), recommend our 'Smoked Riblets'.
    4. If they mention a large dog, recommend our 'Jumbo Beef Femurs'.
  `;

  // Stream the response back to the client
  const result = await streamText({
    model: openai('gpt-4o'),
    system: systemPrompt,
    messages,
  });

  return result.toDataStreamResponse();
}
