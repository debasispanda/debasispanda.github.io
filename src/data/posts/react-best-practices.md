---
title: "React Best Practices"
publishedAt: 2025-06-26
isDraft: false
description: "Building Maintainable and Scalable Applications With React"
tags: ["react", "typescript"]
coverImage:
  src: "../images/react-best-practices-cover.png"
  alt: "React best practices"
---
# React Best Practices: Building Maintainable and Scalable Applications

React has become the go-to library for building user interfaces, powering everything from small widgets to complex enterprise-scale applications. As your codebase grows, following best practices becomes crucial for maintainability, performance, and developer happiness. In this article, we’ll explore tried-and-true React best practices that every developer should know.

---

## 1. **Organize Your Project Structure**

A consistent folder structure improves discoverability and collaboration. There’s no one-size-fits-all, but popular approaches include:

- **Feature-based**: Group files by feature or domain (`/features/Auth`, `/features/Dashboard`)
- **Component-based**: Organize by component type (`/components`, `/pages`, `/hooks`)
- **Separation of concerns**: Keep presentational (UI) and container (logic/data) components separate.

> **Tip:** Stick to a structure and document it for your team!

---

## 2. **Write Reusable and Small Components**

Break UI into small, focused, and reusable components. Favor composition over inheritance. Each component should do one thing and do it well.

```tsx
// Good
function Button({ onClick, text }) {
  return <button onClick={onClick}>{text}</button>;
}
```

Use default react composition with children

```tsx
// Better
function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}
```


### **Code Splitting and Lazy Loading**

As your app grows, loading all JavaScript at once can slow down initial page loads. Code splitting lets you break your bundle into smaller chunks, loading only what's needed for the current view.

### React.lazy and Suspense

Use `React.lazy` to dynamically import components, and wrap them with `Suspense` to show a fallback while loading:

```tsx
import React, { Suspense } from "react";

const UserProfile = React.lazy(() => import("./UserProfile"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserProfile />
    </Suspense>
  );
}
```

### Route-based Code Splitting

Combine lazy loading with React Router for efficient route-based code splitting:

```tsx
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./Home"));
const About = lazy(() => import("./About"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

---

## 3. **Use Functional Components and Hooks**

Prefer functional components over class components. Hooks offer a powerful and cleaner way to handle state, side effects, and logic reuse.

```tsx
import { useState } from "react";

// Functional component with useState
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```
### Custom Hooks for Logic Reuse

Custom hooks let you extract and reuse stateful logic across components. They follow the `use*` naming convention and can use other hooks internally.

```tsx
// useFetch.ts
import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(result => {
        setData(result);
        setLoading(false);
      });
  }, [url]);

  return { data, loading };
}

export default useFetch;
```

Use your custom hook in a component:

```tsx
import useFetch from "./useFetch";

function UserList() {
  const { data, loading } = useFetch("/api/users");

  if (loading) return <div>Loading...</div>;
  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

> **Tip:** Custom hooks help keep components clean and logic reusable. Call hooks at top level of react component and never call them in loops, conditions or in nested functions.

---

## 4. **Keep State Local Where Possible**

Avoid putting all your state in global stores (like Redux or Context) unless necessary. Analyze the data flow and decide where the state should be defined. Try to break the components into _presentational_ and _container_ components as discussed earlier. Local state with `useState` or `useReducer` is easier to manage and debug.

### Local vs Global State

Local state is best for UI-specific data, like form inputs or toggles:

```tsx
// Local state for a toggle button
function Toggle({ onToggle }) {
  const [on, setOn] = useState(false);

  const handleClick = () => {
    const newState = !on;
    setOn(newState);
    if (onToggle) onToggle(newState);
  };

  return (
    <button onClick={handleClick}>
      {on ? "ON" : "OFF"}
    </button>
  );
}
```

> _Prop drilling occurs when you pass data through many layers of components that don’t need it, just to reach a deeply nested child. This can make your code harder to maintain and refactor. Instead, use React Context or state management libraries to share data between components that need it, without unnecessary intermediate props._

**Global state** is useful for data shared across many components, like user authentication or theme:

```tsx
// Global state with React Context
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemeSwitcher() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Switch Theme
    </button>
  );
}
```

> **Tip:** Start with local state. Only lift state up or use global stores when multiple components need to share or sync data.

---

## 5. **Memoization and Performance Optimization**

Use `React.memo`, `useMemo`, and `useCallback` to prevent unnecessary renders in performance-critical parts. But only optimize when there's a proven bottleneck.

### Examples

#### 1. Memoizing Components with `React.memo`

`React.memo` prevents unnecessary re-renders of functional components when their props haven't changed.

```tsx
import React from "react";

const ExpensiveComponent = React.memo(function ExpensiveComponent({ value }) {
  // ...expensive calculations
  return <div>{value}</div>;
});
```

#### 2. Memoizing Values with `useMemo`

`useMemo` caches the result of a calculation until its dependencies change.

```tsx
import { useMemo } from "react";

function List({ items }) {
  const sortedItems = useMemo(() => {
    return items.slice().sort();
  }, [items]);

  return <ul>{sortedItems.map(item => <li key={item}>{item}</li>)}</ul>;
}
```

#### 3. Memoizing Functions with `useCallback`

`useCallback` returns a memoized version of a callback function.

```tsx
import { useCallback, useState } from "react";

function Product({ id }) {
  const [quantity, setQuantity] = useState(0);
  const buyProduct = useCallback(() => {
    post(`/api/product/${id}/buy`, {
      quantity,
    });
  }, [id, quantity]);

  return <button onClick={buyProduct}>Buy</button>;
}
```

### React 19: Auto Memoization with the React Compiler

React 19 introduces the React Compiler, which automatically memoizes components to optimize rendering performance. This means you no longer need to manually wrap components with `React.memo` or use hooks like `useMemo` and `useCallback` for most cases—the compiler analyzes your code and applies memoization where safe and beneficial.

**Note:** The react compiler is in RC state. You may consider using it for some smaller projects initially.

> Learn more: [React Compiler](https://react.dev/learn/react-compiler)

---

## 6 **Handle Memory Leaks**

Memory leaks can occur when components retain resources (like timers, subscriptions, or event listeners) after they unmount, leading to degraded performance over time. Prevent leaks by cleaning up side effects in your components.

### Cleanup with useEffect

Always return a cleanup function from `useEffect` for subscriptions, timers, or event listeners:

```tsx
import { useEffect } from "react";

function TimerComponent() {
  useEffect(() => {
    const timer = setInterval(() => {
      // ...do something
    }, 1000);

    // Cleanup on unmount
    return () => clearInterval(timer);
  }, []);
}
```

### Abort Fetch Requests

Cancel ongoing fetch requests when a component unmounts to avoid setting state on an unmounted component:

```tsx
import { useEffect, useState } from "react";

function DataFetcher({ url }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(url, { signal: controller.signal })
      .then(res => res.json())
      .then(setData)
      .catch(err => {
        if (err.name !== "AbortError") throw err;
      });

    return () => controller.abort();
  }, [url]);
}
```

## 7. **Prop Types and Type Checking**

Use PropTypes or TypeScript to document and validate your component’s props. This reduces bugs and improves the developer experience.

### PropTypes

```tsx
import PropTypes from 'prop-types';

function UserCard({ name, age }) {
  // ...
}

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
};
```

While PropTypes do the error checking but it works during run-time and doesn't provide features like autocomplete or static analysis in your editor.

### Typescript Interfaces

```tsx
interface UserCardProps {
  name: string;
  age?: number;
}

const UserCard: React.FC<UserCardProps> = ({ name, age }) => {}

// Or

function UserCard({ name, age }: UserCardProps) {}
```
You will get instant compile time type checking with better IDE support (autocomplete, refactoring, static analysis).

---

## 8. **Error Handling**

Robust error handling improves user experience and makes debugging easier. Handle errors gracefully in your components and API calls.

### Error Boundaries

Use error boundaries to catch JavaScript errors in the component tree and display fallback UI.

```tsx
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Log error to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

Wrap critical parts of your app with the error boundary:

```tsx
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

### Handling Async Errors

Catch errors in async operations and show user-friendly messages.

```tsx
import { useState, useEffect } from "react";

function DataFetcher({ url }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(err => setError(err.message));
  }, [url]);

  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading...</div>;
  return <div>{JSON.stringify(data)}</div>;
}
```

> **Tip:** Always provide clear feedback to users when something goes wrong, and log errors for monitoring and debugging.

## 9. **Consistent Styling**

Choose a styling approach and stick with it—CSS Modules, Styled Components, Emotion, or Tailwind CSS. Avoid inline styles for complex UIs.

### Styling Best Practices

- **Grid System**: Use a grid system (like CSS Grid or Flexbox) to create consistent layouts and responsive designs. This helps maintain alignment and spacing across your app.
- **Color Themes**: Define a color palette or theme and use variables (CSS custom properties or theme objects in JS) for colors. This ensures consistency and makes it easy to update branding.
- **Consistent Box Model**: Set `box-sizing: border-box` globally to make sizing predictable and avoid layout bugs.
- **Reusable Styles**: Create shared style utilities or components for common patterns (buttons, cards, spacing).
- **Naming Conventions**: Use clear, consistent naming for CSS classes or styled components to improve readability and maintainability.

---

## 10. **Accessibility Matters**

Build accessible components from the start:

- Use semantic HTML elements.
  - Use heading tags to introduce content and only one h1 tag per page.
  - Use list tags(ol/ul/dl) to show list items.
- Use `aria` attributes when needed.
- Ensure all interactive elements (buttons, links, form controls) are reachable and usable via keyboard.
- Provide sufficient color contrast for text and UI elements.
- Use alt text for images.
- Add descriptive labels to form fields and buttons.
- Use focus indicators to show which element is active.
- Announce dynamic content changes to screen readers using ARIA live regions. See [Live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions)

Learn more [accesibility guideline](https://www.a11yproject.com/checklist/)

#### Semantic HTML

```tsx
// Good: Use semantic elements
function Navigation() {
  return (
    <nav>
      <ul>
        <li><a href="/home">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  );
}
```

#### ARIA Attributes

```tsx
// Accessible button with ARIA label
<button aria-label="Close modal" onClick={handleClose}>
  <span aria-hidden="true">&times;</span>
</button>
```

#### Keyboard Navigation

```tsx
// Ensure custom components are keyboard accessible
function CustomButton({ onClick, children }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClick()}
      style={{ cursor: 'pointer' }}
    >
      {children}
    </div>
  );
}
```

---

## 11. **Testing**
When building components, prioritize testability from the start. Adopting a Test-Driven Development (TDD) approach helps ensure your components are reliable and maintainable. Use tools like React Testing Library and Jest to validate user interactions and component logic. Strive for a balanced mix of unit, integration, and end-to-end tests to cover critical user flows and edge cases.

### Testing Best Practices

- **Test Behavior, Not Implementation:** Focus on what the user sees and interacts with, rather than internal component details.
- **Use React Testing Library:** Prefer queries like `getByRole`, `getByLabelText`, or `getByText` for more robust tests.
- **Mock External Dependencies:** Use tools like Jest to mock APIs, modules, or browser APIs.
- **Write Meaningful Test Cases:** Cover edge cases, error states, and accessibility features.
- **Automate Testing:** Integrate tests into your CI/CD pipeline to catch regressions early.

#### Example: Testing a Button Component

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

test('calls onClick when clicked', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Show More</Button>);
  fireEvent.click(screen.getByText(/show more/i));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

> **Tip:** Aim for high confidence, not 100% coverage. Prioritize critical paths and user flows.

---

## 12. **Keep Up With the Ecosystem**

React evolves quickly. Stay up-to-date with new APIs, features, and best practices by following the [official React documentation](https://react.dev/), blogs, and community resources. Implement what you learn by using them in your projects or building some demo apps.

Also stay connected with the React community to learn, share, and grow:

- **LinkedIn:** Follow React experts and join groups for updates and discussions.
- **GitHub:** Explore open-source React projects, contribute to libraries, and review best practices in real-world codebases.
- **Twitter/X:** Track trending topics and announcements from React core team members.
- **Discord/Slack:** Join React-focused channels for real-time help and networking.
- **Meetups & Conferences:** Attend local or virtual events to learn from peers and industry leaders.

> **Tip:** Engaging with the community helps you stay current and solve problems faster.

---

## **Bonus**

Enhance your React projects with these popular libraries:

- **React Router**: Declarative routing for React applications.  
  [reactrouter.com](https://reactrouter.com/)

- **React Query**: Powerful data-fetching and caching for server state.  
  [tanstack.com/query/latest](https://tanstack.com/query/latest)

- **Formik**: Easy form state management and validation.  
  [formik.org](https://formik.org/)

- **Yup**: JavaScript schema validation, often used with Formik.  
  [github.com/jquense/yup](https://github.com/jquense/yup)

- **React Hook Form**: Performant, flexible forms using React hooks.  
  [react-hook-form.com](https://react-hook-form.com/)

- **React Testing Library**: Encourages good testing practices for React components.  
  [testing-library.com/docs/react-testing-library/intro](https://testing-library.com/docs/react-testing-library/intro)

- **Emotion**: High-performance CSS-in-JS library.  
  [emotion.sh](https://emotion.sh/)

- **Framer Motion**: Animation and gesture library for React.  
  [framer.com/motion](https://www.framer.com/motion/)

- **React Helmet**: Manage document head for SEO and meta tags.  
  [github.com/nfl/react-helmet](https://github.com/nfl/react-helmet)

- **React DnD**: Drag-and-drop for complex interfaces.  
  [react-dnd.github.io/react-dnd](https://react-dnd.github.io/react-dnd/)

> **Tip:** Choose libraries that fit your project’s needs and keep dependencies up-to-date for security and performance.

---

## Conclusion

By applying these best practices, you’ll build React applications that are robust, maintainable, and scalable. Remember, best practices are guides, not strict rules—adapt them to your team’s needs and the context of your project.

Happy coding! 🚀