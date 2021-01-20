import React from "react";
import { render, screen } from "@testing-library/react";
/* eslint-disable import/no-extraneous-dependencies */
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import App from "./App";

test("renders desktop", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>
  );
  expect(history.location.pathname).toBe("/");
  const linkElement = screen.getByText(/Profile/i);
  expect(linkElement).toBeInTheDocument();
});
