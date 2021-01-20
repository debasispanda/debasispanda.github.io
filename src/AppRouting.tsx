import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Desktop from "./pages/desktop/Desktop";
import Profile from "./pages/profile/Profile";
import Contact from "./pages/contact/Contact";

export default function AppRouting() {
  return (
    <Switch>
      <Route path="/profile" component={Profile} />
      <Route path="/contact" component={Contact} />
      <Route exact path="/" component={Desktop} />
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}
