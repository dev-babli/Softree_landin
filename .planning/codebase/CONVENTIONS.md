# Coding Conventions & Patterns

## Code Style & Format
- **Strict Typing:** Heavy emphasis on TypeScript interfaces and types.
- **Component Definitions:** Arrow functions predominantly used. 
- **Exports:** Prefer named exports or default exports conditionally on page configurations.
- **Styling Methodologies:** Pure TailwindCSS v4 classes unified via standard `cn()` utilities merging `clsx` and `tailwind-merge` (`src/lib/utils.ts`).

## Error Handling
- Leverages standardized Next.js error boundaries explicitly (`global-error.tsx`).
- General try/catch around external service calls. Custom `ErrorReporter.tsx` exists to intercept issues seamlessly.

## State Management
- Complex states rely heavily on localized React components tree. Context APIs occasionally used for theme routing (`next-themes`).
- Form validations handled implicitly with `zod` schema resolvers working with `react-hook-form`.

## Client boundary implementation
- Interactive components requiring access to web APIs (`window`, hooks like `useEffect`) are strictly demarcated with `"use client"`. Server components are the fundamental rendering baseline.
