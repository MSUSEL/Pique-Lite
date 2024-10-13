import "./App.css";
import { useAtomValue } from "jotai";
import { State } from "./state/core";
import Landing from "./pages/Landing";
import { Box } from "@radix-ui/themes";
import MainView from "./pages/MainView";

const views: Record<string, JSX.Element> = {
  landing: <Landing />,
  main: <MainView />,
};

function App() {
  const view = useAtomValue(State.currentView) || "landing";

  return (
    <Box height="100%" width="100%" style={{ overflow: "auto" }}>
      {views[view]}
    </Box>
  );
}

export default App;
