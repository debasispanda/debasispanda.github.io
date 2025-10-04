---
title: "Should we wrap onClick with useCallback?"
publishedAt: 2025-10-04
isDraft: false
description: "When and why to wrap React onClick handlers with useCallback and best practices for performance optimization."
tags: ["react"]
---

In React, you should wrap an `onClick` with `useCallback` only when a child component is memoized with `React.memo` and receives the `onClick` handler as a prop. For most other situations, wrapping event handlers with `useCallback` is an unnecessary micro-optimization that can add complexity with no noticeable performance gain.

### Why useCallback is needed with memoized children?

By default, when a parent component re-renders, React also re-renders all of its children. To optimize performance, you can wrap a child component in `React.memo` to prevent it from re-rendering unless its props have changed.

However, functions are objects in JavaScript. So every time a parent component re-renders, any function declared inside it is recreated with a new memory reference. If you pass this new function as a prop to a memoized child component, the child will see that the prop has changed and will re-render, defeating the purpose of `React.memo`.

`useCallback` addresses this by caching the function instance. It returns the same function reference across re-renders as long as its dependencies haven't changed, ensuring the memoized child component does not re-render unnecessarily.

**Example:**

```tsx
// A memoized child component that only re-renders if its props change
const MyButton = React.memo(({ onClick }) => {
  console.log("Button rendered");
  return <button onClick={onClick}>Click me</button>;
});

const Parent = () => {
  const [count, setCount] = useState(0);

  // The `increment` function is wrapped in useCallback to keep its reference stable
  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, []); // Empty dependency array means the function reference never changes

  return (
    <div>
      <MyButton onClick={increment} />
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Re-render Parent</button>
    </div>
  );
};
```

In this example, the `MyButton` component will only re-render when its props change. Since the `increment` function is wrapped in `useCallback` with an empty dependency array, its reference never changes, and `MyButton` will not re-render unnecessarily.

### Other key use cases for useCallback

Besides `React.memo`, `useCallback` is also valuable in these situations:

- **As a dependency in useEffect or other hooks:** If a function is a dependency of another hook, using `useCallback` ensures that the hook only re-runs when necessary. A function not wrapped in `useCallback` would trigger the effect on every re-render.

  ```tsx
  import React, { useState, useEffect, useCallback } from "react";

  export default function DataFetcher({ userId }) {
    const [data, setData] = useState(null);

    // 'fetchData' is a dependency for 'useEffect'. We must memoize it
    // to prevent an infinite loop.
    const fetchData = useCallback(async () => {
      const response = await fetch(`https://api.example.com/data/${userId}`);
      const json = await response.json();
      setData(json);
    }, [userId]);
    // The dependency array ensures 'fetchData' is only
    // recreated when `userId` changes.

    useEffect(() => {
      fetchData();
    }, [fetchData]); // This effect will only re-run when `fetchData` changes.

    return (
      <div>
        {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : "Loading..."}
      </div>
    );
  }
  ```

  If `fetchData` were not wrapped in `useCallback`, it would be a new function on every render. This would trigger the `useEffect` to run on every render, causing an infinite fetch loop.

- **For custom hooks:** When a custom hook returns a function that is intended to have a stable identity, useCallback should be used. This prevents components consuming the custom hook from re-running effects and memoized children unnecessarily.

  ```tsx
  import { useState, useCallback, memo } from "react";

  /**
   * A custom hook to manage a counter.
   * The returned `increment` function is memoized to have a stable identity.
   */
  const useCounter = () => {
    const [count, setCount] = useState(0);

    // The `increment` function is wrapped in useCallback.
    // The empty dependency array ensures its reference never changes.
    const increment = useCallback(() => {
      // The updater function for `setCount` is used to avoid
      // needing `count` in the dependency array.
      setCount(c => c + 1);
    }, []);

    return {
      count,
      increment,
    };
  };

  const DisplayCount = memo(({ count, increment }) => {
    console.log("DisplayCount component rendered");
    return (
      <div>
        <p>Count: {count}</p>
        <button onClick={increment}>Increment Count</button>
      </div>
    );
  });

  export default function App() {
    const { count, increment } = useCounter();

    // The `DisplayCount` component receives the stable `increment` function.
    // Because `increment` has the same reference on every re-render of `App`,
    // `DisplayCount` will not re-render unless its `count` prop changes.
    return <DisplayCount count={count} increment={increment} />;
  }
  ```

  This example demonstrates a custom hook called `useCounter`. The hook returns the current count and an increment function. The `increment` function is wrapped in `useCallback` to ensure it always has the same reference as long as its dependencies don't change.

### When you should not use useCallback

- **Simple inline handlers:** For simple event handlers that are not passed to memoized children, an inline function is perfectly fine. The performance overhead of creating a new function on every render is negligible and is not worth the added complexity of `useCallback`.

  ```tsx
  import React, { useState } from "react";

  export default function App() {
    const [count, setCount] = useState(0);

    // An inline function is perfectly fine and most readable for this use case.
    return (
      <button onClick={() => setCount(prevCount => prevCount + 1)}>
        Count: {count}
      </button>
    );
  }
  ```

- **Performance is not a concern:** Do not use `useCallback` everywhere as a default. React is extremely fast, and the cost of creating new function references is rarely a bottleneck. Only introduce this optimization when you have identified a performance problem with the React DevTools profiler.

- **The component is not memoized:** If the child component receiving the `onClick` prop is not wrapped in `React.memo`, it will re-render regardless, so using useCallback provides no benefit.
