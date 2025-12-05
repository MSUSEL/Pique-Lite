# Developer Notes

This document provides an overview of the design, coding practices, and tools used in PIQUE Lite.  
It serves as a reference for contributors who want to understand how the project is organized and how different parts of the system fit together.

---

## 1. Overview of the Design

### Global State
We manage a centralized global state architecture (`src/state`) to maintain a single, consistent place for managing uploaded projects, processed data, and system-wide interactions. It includes:
- **Projects and uploaded files**
- **Processed versions of these files**
- **Miscellaneous UI flags and settings**

Local component state is used only for temporary UI interactions.  
System-level features should integrate with the global state to avoid inconsistent updates.

### Component Structure and UI/Logic Separation
We organize PIQUE Lite into different types of components based on their responsibility. This separation prevents features from interfering with each other and makes the codebase easier to maintain.

- **UI primitives (`src/components/ui`):**  
  Small reusable components without PIQUE-specific logic.

- **Feature composites (`src/composites`):**  
  Combine UI primitives with feature logic (file uploading, project management, filtering, charts, etc.).

- **Pages (`src/pages`):**  
  Top-level screens composed from composites and primitives.

When adding new features, we typically create or extend a composite in `src/composites` and compose it into a page in `src/pages`.

### Routing
We organize all routing logic under `src/routes` to keep navigation and page transitions consistent.  
Pages under `src/pages` focus only on rendering their content, while the routing layer determines when each page appears and how pages connect to each other.

### Data Handling and Schema Adaptation
We keep all data parsing, validation, and format transformation under `src/state` to maintain a consistent internal data shape.

PIQUE Lite accepts two input formats:
- `src/state/schema.ts`  
- `src/state/visualizerSchema.ts`

Schemas define the expected structure. When the PIQUE format evolves, we update schemas and adapters rather than modifying UI components.

### Static Assets and Development Data
All mock data and static files live under `src/assets`.  
This provides clear example datasets for testing and helps developers preview UI behavior without uploading files repeatedly.

---

## 2. Coding Practice: Dos and Don'ts

### Recommended Practices

- **Use `useMemo` instead of `useEffect` for derived data**  
  `useEffect` makes data flow harder to follow and often causes unnecessary re-renders.  
  `useMemo` keeps derived values predictable.  
  More details: https://react.dev/reference/react/useMemo

- **Use Storybook when working on UI components**  
  Storybook makes it easy to preview components in isolation with different states or props.  
  It is useful for incremental UI work and refactoring.

### Optional Practices

- **Use Bun as the package manager and runtime**  
  Bun offers faster installs and script execution compared to npm.  
  (npm still works if preferred.)

### Don’ts

- **Avoid scattered CSS files**  
  Use shared styling utilities to keep the visual design consistent and avoid conflicts.

---

## 3. Libraries and Build Tools

### Core Framework & Language
- React  
- TypeScript  

### UI Components & Theming
- Radix UI  
- Shadcn UI  

Other utilities previously used:
- TanStack Table  
- Sonner  
- Lucide React  
- Next-Themes  
- CMDK  

### Styling
(Used mainly before adopting Shadcn UI)
- Tailwind CSS  
- class-variance-authority  
- tailwind-merge  

### Data Visualization
- Recharts  
- D3  

### State Management
- Jotai

### Routing
- React Router

### Data Handling & Validation
- Zod  
- Day.js, date-fns  

### Build Tools & Development Environment
- Vite  
- Bun  
- Storybook  
- ESLint & Prettier  

---

