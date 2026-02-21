# AI Editor Rules and Project Guidelines

This document outlines the core technical stack and specific rules for development and modification within the Monynha Softwares codebase. These guidelines ensure consistency, maintainability, and adherence to the project's aesthetic and performance standards.

## Core Tech Stack

1.  **Frontend:** React (v19) with TypeScript.
2.  **Build Tool:** Vite.
3.  **Styling:** Tailwind CSS, utilizing the custom brand color palette defined in `index.html` (`brand-black`, `brand-violet`, `brand-blue`, `brand-teal`).
4.  **Animation:** Framer Motion is used for all component transitions, gestures, and complex visual effects.
5.  **Routing:** Custom state-based routing managed in `App.tsx` (using the `Page` type and `setPage` handler). **Do not introduce React Router.**
6.  **Icons:** Lucide React is the preferred library for all vector icons.
7.  **UI Components:** Components should be built using Tailwind CSS, prioritizing the use of available shadcn/ui components as a foundation when applicable.
8.  **API/Serverless:** Simple Node.js handlers in the `api/` directory are used for server-side logic (e.g., contact form submission).
9.  **Code Structure:** Components reside in `src/components/` and views/pages in `src/views/`.

## Library Usage Rules

| Feature | Recommended Library / Tool | Specific Rule |
| :--- | :--- | :--- |
| **Animations** | `framer-motion` | Mandatory for all non-trivial animations and page transitions. |
| **Styling** | Tailwind CSS | Use utility classes exclusively. Maintain the "brutalist-futuristic" aesthetic (e.g., thick borders, high contrast, custom fonts). |
| **Icons** | `lucide-react` | Use this library for all vector icons. |
| **Standard UI** | shadcn/ui | Use pre-built components as a foundation, customizing them with Tailwind classes to match the brand aesthetic. |
| **API Calls** | Native `fetch` | Use native `fetch` for all asynchronous data operations. |
| **Contact Forms** | `api/contact.js` pattern | All contact/email submissions must route through the existing API handler structure, respecting the `RESEND_API_KEY` environment variable. |