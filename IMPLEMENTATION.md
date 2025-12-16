# Implementation Documentation

> **Note:** This file is where you should document your implementation of the technical test.

## 🚀 Installation & Setup

### Prerequisites

- Node.js v16 or higher
- npm for dependency management

### How to Run

```bash
git clone https://github.com/DjibrilNaji/wimi-frontend-test.git
cd wimi-frontend-test
npm install
npm run dev
```

The application will be accessible at `http://localhost:5173` and you have to run the mock API server at `http://localhost:3001`.

_Note: No additional environment variables are required. The frontend communicates directly with the mock API at http://localhost:3001._

## 🏗️ Technical Choices

### Architecture

```bash
src/
├─ api/         # API calls handling
├─ components/  # Reusable components
├─ context/     # React context for global state
├─ hooks/       # Custom hooks
├─ lib/         # Utility functions
├─ pages/       # Main pages (Login, Todo Lists, etc.)
├─ provider/    # Context / state providers
├─ router/      # Application routing logic
├─ types/       # TypeScript types
├─ App.tsx      # Application entry point
├─ index.css    # Global styles
├─ routes.ts    # Routes definition
```

### Décisions architecturales :

- Use of React Context for global state management (authenticated user)
- Local state for forms and temporary UI states
- Persistent global state using localStorage for user sessions
- Functional React components with TypeScript for strong typing

### State Management

- Global state : React Context for storing the authenticated user
- Local state : useState hooks for forms, filters, and modals
- Session persistence : localStorage to maintain the connection after refresh

### Styling

- Framework : Tailwind CSS
- Animations : Framer Motion for transitions
- Design : No dark mode implemented yet, but the structure is ready to accommodate it

### Testing

Automated tests (unit and end-to-end) were not implemented due to time constraints.

I am aware that the lack of tests may be seen as a drawback for this technical assessment. However, due to limited time, I had to focus on core features, architecture, and overall code quality.

However, the project architecture is designed to easily accommodate testing tools such as Vitest, Jest, or Cypress. Components are well decoupled, strongly typed with TypeScript, and API calls are centralized, making future test implementation straightforward.

## ✨ Implemented Features

### Core Features

- [x] Login page with authentication
- [x] Todo lists display
- [x] Todos display within lists
- [x] Mark todos as completed
- [x] Create new todos
- [x] User sidebar with information

### Bonus Features

- [x] Filtering by status, sorting by priority and due date
- [x] Progress bar for task completion
- [x] Task search
- [x] Session persistence via localStorage
- [x] Animations with Framer Motion (transitions, etc..)
- [x] Form validation with Zod

## 📚 Libraries & Dependencies

| Library        | Purpose                             | Why?                         |
| -------------- | ----------------------------------- | ---------------------------- |
| React          | UI Framework                        | Required                     |
| TypeScript     | Type safety                         | Required                     |
| Tailwind CSS   | Fast and responsive styling         | Speed and visual consistency |
| Framer Motion  | Animations and transitions          | Visual feedback and UX       |
| Zod            | Form validation                     | Robust and simple validation |
| Shadcn/UI      | UI components                       | Speed and uniformity         |
| TanStack Query | API requests management and caching | Optimize API calls           |
| Sonner         | Notifications                       | User feedback                |

## ⏱️ Time Spent

**Total time:** ~6 hours

**Breakdown:**

- Setup & configuration: 1 hours
- Core features: 3 hours
- Styling: 1 hours
- Testing: 0 hours (not implemented due to time constraints)
- Refactoring & polish: 1 hours

## 🚧 Future Improvements

1. Color selection for each new list
2. Dark/light mode
3. Advanced notifications and additional animations
4. Edit and delete tasks
5. User profile management

## 🤔 Challenges & Learnings

- No major challenges encountered
- Learned full integration of Tailwind, Framer Motion, and Zod in a modular React/TypeScript project

## 📝 Notes

- Structure ready for extension (dark mode, multi-user)
- Code is structured for easy maintenance and future improvements
