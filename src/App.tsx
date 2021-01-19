import React, { Component } from "react";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Taskbar from "./components/taskbar/Taskbar";
import AppRouting from "./AppRouting";

type Props = WithStyles<typeof styles>;

const styles = () =>
  createStyles({
    app: {
      display: "flex",
      height: "100%",
    },
    main: {
      flexGrow: 1,
      height: "calc(100% - 64px)",
    },
  });

class App extends Component<Props> {
  componentDidMount() {
    setTimeout(() => {
      document.querySelector("#loader")?.remove();
    }, 2000);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.app}>
        <Taskbar />
        <CssBaseline />
        <main className={classes.main}>
          <AppRouting />
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
