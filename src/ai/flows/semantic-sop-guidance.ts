'use server';
/**
 * @fileOverview Semantic SOP guidance with context actions (Jira/ServiceNow).
 *
 * - semanticSOPGuidance - A function that handles the SOP guidance process.
 * - SemanticSOPGuidanceInput - The input type for the semanticSOPGuidance function.
 * - SemanticSOPGuidanceOutput - The return type for the semanticSOPGuidance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SemanticSOPGuidanceInputSchema = z.object({
  query: z
    .string()
    .describe("The user's query related to standard operating procedures."),
});
export type SemanticSOPGuidanceInput = z.infer<typeof SemanticSOPGuidanceInputSchema>;

const SemanticSOPGuidanceOutputSchema = z.object({
  guidance: z.string().describe('The SOP guidance based on the query.'),
  actions: z.array(z.string()).describe('Context-aware actions in Jira/ServiceNow.'),
});
export type SemanticSOPGuidanceOutput = z.infer<typeof SemanticSOPGuidanceOutputSchema>;

const getAction = ai.defineTool({
  name: 'getAction',
  description: 'Based on the user query, determine if a Jira or ServiceNow action is needed.',
  inputSchema: z.object({
    query: z.string().describe("The user's query or problem description."),
  }),
  outputSchema: z.array(z.string()).describe('An array of actions that are applicable based on the query.'),
},
async (input) => {
    // Placeholder implementation for tool
    // Replace with actual logic to determine relevant actions from Jira/ServiceNow
    console.log(`Tool getAction called with input: ${input.query}`);
    return ["Create a Jira ticket", "Search ServiceNow knowledge base"];
  }
);

export async function semanticSOPGuidance(input: SemanticSOPGuidanceInput): Promise<SemanticSOPGuidanceOutput> {
  return semanticSOPGuidanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'semanticSOPGuidancePrompt',
  input: {schema: SemanticSOPGuidanceInputSchema},
  output: {schema: SemanticSOPGuidanceOutputSchema},
  tools: [getAction],
  prompt: `You are an AI assistant providing guidance on Standard Operating Procedures (SOPs).

  Based on the user's query, provide relevant SOP guidance and suggest context-aware actions that can be taken in Jira or ServiceNow.
  Use the available tools to determine potential actions.

  Query: {{{query}}}

  Guidance:
  `, // The LLM will complete this prompt.
});

const semanticSOPGuidanceFlow = ai.defineFlow(
  {
    name: 'semanticSOPGuidanceFlow',
    inputSchema: SemanticSOPGuidanceInputSchema,
    outputSchema: SemanticSOPGuidanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
