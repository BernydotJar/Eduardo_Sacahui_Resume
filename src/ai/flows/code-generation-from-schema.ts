'use server';

/**
 * @fileOverview A code generation AI agent that generates API and data layer code from a database schema.
 *
 * - generateCodeFromSchema - A function that handles the code generation process.
 * - CodeGenerationInput - The input type for the generateCodeFromSchema function.
 * - CodeGenerationOutput - The return type for the generateCodeFromSchema function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CodeGenerationInputSchema = z.object({
  databaseSchema: z
    .string()
    .describe('The database schema in a string format, e.g., SQL DDL or JSON.'),
  language: z
    .string()
    .describe(
      'The target programming language for the generated code, e.g., TypeScript, Python.'
    ),
  framework: z
    .string()
    .optional()
    .describe(
      'Optional framework or library to use for code generation, e.g., Next.js, FastAPI.'
    ),
  dialect: z
    .string()
    .optional()
    .describe(
      'Optional dialect or specific version of the language or framework, e.g., Node.js version.'
    ),
  apiSpec: z
    .string()
    .optional()
    .describe(
      'Optional Open API Spec to be added to the codebase.'
    )
});
export type CodeGenerationInput = z.infer<typeof CodeGenerationInputSchema>;

const CodeGenerationOutputSchema = z.object({
  generatedCode: z
    .string()
    .describe('The generated code based on the database schema.'),
});
export type CodeGenerationOutput = z.infer<typeof CodeGenerationOutputSchema>;

export async function generateCodeFromSchema(
  input: CodeGenerationInput
): Promise<CodeGenerationOutput> {
  return generateCodeFromSchemaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'codeGenerationPrompt',
  input: {schema: CodeGenerationInputSchema},
  output: {schema: CodeGenerationOutputSchema},
  prompt: `You are an expert software engineer specializing in generating code from database schemas.

  Given a database schema, you will generate API and data layer code in the specified language and framework.

  Database Schema:
  ```
  {{{databaseSchema}}}
  ```

  Language: {{{language}}}
  Framework: {{{framework}}}
  Dialect: {{{dialect}}}
  API Spec: {{{apiSpec}}}

  Generated Code:
  `,
});

const generateCodeFromSchemaFlow = ai.defineFlow(
  {
    name: 'generateCodeFromSchemaFlow',
    inputSchema: CodeGenerationInputSchema,
    outputSchema: CodeGenerationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
