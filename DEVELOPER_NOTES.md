# Developer Notes

This document provides an overview of the design, coding practices, and tools used in PIQUE Lite.  
It serves as a reference for contributors who want to understand how the project is organized and how different parts of the system fit together.

---

## 1. Overview of the Design

### Global State
We manage a centralized global state architecture (`src/state`) to maintain a single, consistent place for managing uploaded projects, processed data, and system-wide interactions. It contains all the global state used, and ensures that features relying on shared data (i.e., the uploaded input files) behave consistently and remain easy to maintain. It includes:
- **Projects and uploaded files**: All information about the currently loaded projects, their corresponding version files, and their metadata is stored in global state to ensure any component can access this information without duplicating logic.
- **Processed versions of these files**: Processed versions of these files: Parsed and validated representations of the uploaded PIQUE files are stored here as well. Keeping processed data in a shared location prevents repeated parsing and maintains a single source of truth.
- **Miscellaneous UI flags and settings**:Other global flags (such as settings, active tab, applied filters) are also stored centrally for consistent synchronization across components. 


Local component state is used only for temporary UI interactions.  
System-level features should integrate with the global state to avoid inconsistent updates.

### Component Structure and UI/Logic Separation
We organize PIQUE Lite into different types of components based on what each part of the system is responsible for, this separation aims to keep features from interfering with each other, it makes the codebase easier to understand, and supports smoother maintenances and future extensions. At a high level, the structure of PIQUE Lite includes:

- **UI primitives (`src/components/ui`):**  
  These are small, reusable UI elements we used in PIQUE Lite, such as buttons, inputs, dialogs, and layout pieces. They handle only visual rendering and interaction, without any PIQUE-specific logic.

- **Feature composites (`src/composites`):**  
  These components combine UI primitives with the logic needed for specific features, such as file uploading, project management, version filtering, charts, and risk configuration. Each composite represents a self-contained feature module that can be reused across multiple pages.

- **Pages (`src/pages`):**  
  Each folder under src/pages represents a top-level screen in the application (e.g., Project Overview, Tree View, Version Overview). Pages assembles composites and UI primitives into a complete user workflow while keeping page-specific logic isolated.

When adding new features, we typically create or extend a composite in `src/composites` and compose it into a page in `src/pages`.

### Routing
We organize all routing logic under `src/routes`, which allows us to manage navigation and page transitions in a clear and consistent way. By keeping routing in its own folder, we avoid mixing navigation rules with page-specific behavior, making the application structure easier to understand and extend. In this setup, each route file defines how users move between different parts of the tool (e.g., the landing page, dashboard, project views, version views, and settings), while shared layout routes provide a consistent structure across screens. Pages under src/pages focus solely on rendering their content, and the routing layer determines when each page appears and how it connects to the rest of the application. When adding a new top-level screen, we simply create a new page under src/pages and register the corresponding route in src/routes to integrate this feature into the existing navigation structure.

### Data Handling and Schema Adaptation
We keep all data parsing, validation, and format transformation under `src/state` to maintain a consistent internal data shape.

PIQUE Lite accepts two input formats:
- `src/state/schema.ts`  
- `src/state/visualizerSchema.ts`

Schemas define the expected structure. When the PIQUE format evolves, we update schemas and adapters rather than modifying UI components.

### Static Assets and Development Data
We place all static files and development datasets under `src/assets` to keep them separate from the main application logic. This includes images, icons, and example PIQUE datasets used for testing and demonstration. Since PIQUE Lite often needs mock data during development, we maintain several example project folders and sample JSON files inside this directory. These datasets help developers test UI behavior without needing to upload real files each time, and they provide a clear reference for the expected input structure.


---

## 2. Coding Practice: Dos and Don'ts

### Recommended Practices

- **Use `useMemo` instead of `useEffect` for derived data**  
  We avoid using `useEffect` for data transformations because it is harder to follow and often triggers unnecessary re-renders. Instead, `useMemo` provides a clear, synchronous way to derive values based on dependencies, which keeps component behavior predictable. More details about the caveats could be checked here (https://react.dev/reference/react/useMemo and https://react.dev/reference/react/useEffect)

- **Use Storybook when working on UI components**  
  Storybook allows us to preview components in isolation and try different props or states without running the full application. This is useful when refining UI behavior or adding new components. Our team did not use it for everything, but it is a helpful pattern to follow for incremental UI work.

### Good to have

- **Use Bun as the package manager and runtime**  
  We use bun as the package manager and runtime since bun provides faster install times and quicker script execution compared to npm or yarn (note: We switched from npm to bun, but npm also works if preferred). In addition, since bun also includes a built-in JavaScript runtime, it might be useful for future tooling or server-side extensions. Check here for more information and usage.

### Don’ts

- **Avoid scattered CSS files**  
  Avoid creating scattered CSS files: We keep styles consistent by using shared styling utilities and libraries rather than adding standalone CSS files for each component. This helps prevent style conflicts and keeps the visual design uniform across the tool.

---

## 3. Libraries and Build Tools

### 1\. Core Framework & Language

* React ([link](https://react.dev/)): The primary JavaScript library for building the user interface.  
* TypeScript ([link](https://www.typescriptlang.org/)): The programming language used, which adds static type-checking to JavaScript for improved code quality and maintainability.

### 2\. UI Components & Theming

* Important parts:  
  * Radix UI ([link](https://www.radix-ui.com/primitives/docs/overview/introduction)): Provides a set of unstyled, accessible, low-level UI primitives that are used as the foundation for building components like dialogs (@radix-ui/react-dialog), dropdowns (@radix-ui/react-dropdown-menu), and tooltips (@radix-ui/react-tooltip).  
  * Shadcn ([link](https://ui.shadcn.com/docs)): For the styling and theming Radix UI.   
* Other options we tried and used before introducing Shancn:  
  * TanStack Table ([link](https://tanstack.com/table)): A "headless" (logic-only) library used for building powerful and complex data tables and grids.  
  * Sonner ([link](https://www.google.com/search?q=https://sonner.emilkowal.ski/)): Used for displaying simple and clean toast notifications to the user.  
  * Lucide React ([link](https://lucide.dev/)) & React Icons ([link](https://react-icons.github.io/react-icons/)): Icon libraries providing a wide range of SVG icons for the interface.  
  * Next-Themes ([link](https://github.com/pacocoursey/next-themes)): Manages theme switching, most commonly for implementing light and dark modes.  
  * CMDK ([link](https://cmdk.paco.me/)): A command menu component, useful for creating spotlight/search interfaces (e.g., Cmd+K pop-ups).

### 3\. Styling (Note: these libs are mainly used before we introduce Shancn)

* Tailwind CSS ([link](https://tailwindcss.com/)): A utility-first CSS framework that allows for rapid UI development by composing utility classes directly in the markup.  
* class-variance-authority ([link](https://cva.style/docs)): A utility for creating different visual variants of components (e.g., primary, secondary, and destructive buttons) in a structured way.  
* tailwind-merge ([link](https://github.com/dcastil/tailwind-merge)): A helper function to intelligently merge Tailwind CSS classes without style conflicts, essential for building customizable components.

### 4\. Data Visualization & Charting

* Recharts ([link](https://recharts.org/)): A charting library built with React and D3, used to create data visualizations like line, bar, and pie charts.  
* D3 ([link](https://d3js.org/)): A powerful low-level library for data manipulation and visualization. It's likely used either directly for custom visualizations or as an underlying dependency for Recharts.

### 5\. State Management

* Jotai ([link](https://jotai.org/)): A minimalist, "atomic" state management library that provides a simple and flexible way to manage application state.

### 6\. Routing

* React Router ([link](https://reactrouter.com/)): The standard library for handling client-side navigation and routing within the React application.

### 7\. Data Handling & Validation

* Zod ([link](https://zod.dev/)): A TypeScript-first schema declaration and validation library, used to ensure data structures (like API responses) are correct.  
* Day.js ([link](https://day.js.org/)) & date-fns ([link](https://date-fns.org/)): Utility libraries for parsing, manipulating, and formatting dates and times.

### 8\. Build Tools & Development Environment

* Vite ([link](https://vitejs.dev/)): The core build tool and development server. It is known for its extremely fast performance and modern feature set.  
* Bun ([link](https://bun.sh/)): Used as the all-in-one JavaScript toolkit, acting as the package manager, script runner, and runtime for this project. We switched from `npm` to `bun`, but `npm` also works.  
* Storybook ([link](https://storybook.js.org/)): A development environment for building and testing UI components in isolation, which helps ensure they are robust and reusable.  
* ESLint ([link](https://eslint.org/)) & Prettier ([link](https://prettier.io/)): Tools for static code analysis (linting) and automatic code formatting, respectively. They enforce consistent code style and prevent common errors.


---

## Tried but did not work (Notes for future developers)

### Tree refactoring: 
The current tree display is built by us without using UI libraries. Since we also wanted to use constraint based layouts which would enable more flexible layouts, and lower maintenance burden. After exploring and trying a couple of libraries, such as (d3-dag), we figured out that those libraries are not compatible with sorting a subset of nodes (for example, it cannot only sort quality aspect nodes while preserving the structure of other levels), most libraries assume global layout control rather than partial, level-specific sorting. As a result, the only feasible solution is to continue maintaining a custom tree implementation, despite this might introduce additional overhead for a couple features.  

## Potential future features

### 1\. Database and server for storing information for data and users: 

PIQUE Lite currently operates as a fully client-side tool. Users upload files and view results, but no data is persisted once the user refreshes or closes the webpage. In the future, introducing a backend service (for storing uploads, custom configurations, or user sessions) would significantly enhance usability, especially for workflows requiring multi-step analysis or repeated comparisons. 

### 2\. The feature “Dynamic importance adjustment” with the new input format needs to be rethought and reimplemented:

The issue is about the “Pre-defined profile” feature v.s. Unlimited aspects in the input file: The existing feature is built on the assumption that the input always contains six fixed quality aspects. This constraint allowed us to create pre-defined profiles that adjust importance weights meaningfully. With the new input format, the number of quality aspects becomes unbounded, making the current profiles incompatible. When the set of aspects is no longer fixed, predefined profiles cannot be reliably mapped to arbitrary user inputs.

**Possible solutions** (the order does not imply preferences): 
- Option 1: Remove predefined profiles entirely for the new format. This could avoid mismatches between profiles and the dynamic set of aspects, but removes a usability feature that some users appreciate.

- Option 2: Require users to upload both the input file and a matching set of predefined profiles. Users would need a process to define importance profiles that correspond precisely to their chosen set of aspects.

- Option 3: if still want to use the current, a quick fix could be just filtering out the aspects that are not contained in the current hardcoded profiles, and also grey out the lines in the table so that the users could not change the sliders for those. The concern for this option is although it is a minimal-effort workaround, it may undermine the usefulness of the profiles, since the resulting filtered version may no longer reflect their intended weighting strategy.


## Known Issues (Unresolved)

### 1\. Sidebar toggle does not work in Version Details (desktop view)

**Summary**: In the Version Details page (i.e., viewing a specific version JSON such as version_0.json), the sidebar toggle button fails to visually open or close the sidebar in desktop view. The same toggle works correctly in all other major pages, including:
- Dashboard / Overview
- Projects list
- Project overview
- Project version list (before entering a specific version)

Symptoms

- On desktop width:

  - Clicking the sidebar toggle produces no visible UI change
  - No hover / active animation is observed
  - The sidebar appears permanently fixed in its current visual state

- Internally, however:
  - The toggle click handler is triggered
  - Sidebar state correctly switches between expanded and collapsed
  - Sidebar DOM attributes (data-state, left, width) update as expected

- On mobile / narrow screens:

  - The same toggle works correctly
  - Sidebar opens and closes via the mobile (Sheet-based) implementation

- State persistence issue:

  - Once the issue is triggered in a Version Details page, the toggle may remain non-functional even after navigating back to Dashboard or Overview
  - A hard refresh from /overview (Cmd + Shift + R) is required to fully restore normal behavior

Ruled-out causes: The following have been explicitly verified and ruled out:

- Click events not firing → SidebarTrigger click events fire consistently
Sidebar state not updating → State transitions (expanded ↔ collapsed) are logged and correct
- Sidebar DOM not rendered → Sidebar elements exist in the DOM on the Version Details page
- Z-index or overlay interference → elementFromPoint confirms the trigger is the topmost element
- Pointer-events or disabled button issues → The button is clickable and receives events

Current understanding

This appears to be a layout / container interaction issue specific to the Version Details route, rather than a logic or state-management bug. Our currrent tests suggestes that the sidebar is rendered and state changes correctly; But in desktop view, its visual presence or movement is neutralized by the surrounding layout. The mobile view works because it uses a different rendering path (Sheet). This issue is likely related to:
- Page-level layout differences in the Version Details route
- Full-width / full-height containers interfering with sidebar positioning
- A layout contract that holds for other routes but breaks for Version Details

### 2\. Line chart brush mode is incompatible with some data formats
**Summary**: The brush mode in the overview line chart (used for selecting a time range across versions) does not work reliably with certain input data formats, particularly when multiple versions or alternative schemas are used.

Symptoms:

- Tooltip / hover mode works as expected
- Switching to brush mode may result in:
  - No visible brush interaction
  - Brush selection not updating the displayed range
- Behavior differs depending on the structure of the input JSON

Investigation notes: The line chart renders correctly and displays values; Tooltip interactions confirm that data points exist and are mapped correctly;
The issue appears only when using brush mode, not when hovering individual points

Current understanding: The brush implementation appears to implicitly assume a stable, sortable time dimension (e.g., a continuous date or version timestamp). This assumption holds for older mock data, but may break when:

- Input data lacks explicit timestamps
- Version ordering differs from previous formats
- New schemas omit or rename time-related fields

As a result, this issue is likely a data modeling vs. visualization contract mismatch, rather than a pure rendering or UI bug.