import "./App.css";
import { useAtomValue } from "jotai";
import { State } from "./state/core";
import Landing from "./pages/Landing";
import Overview from "./pages/Overview";
import { Box } from "@radix-ui/themes";

const views: Record<string, JSX.Element> = {
  landing: <Landing />,
  overview: <Overview />,
};

function App() {
  const view = useAtomValue(State.currentView) || "landing";

  return (
    <Box height="100%" width="100%">
      {views[view]}
    </Box>
  );
}

export default App;
