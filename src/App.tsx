import "./App.css";
import { useAtomValue } from "jotai";
import { State } from "./state/core";
import Landing from "./pages/Landing";
import Overview from "./pages/Overview";
import { Box } from "@radix-ui/themes";

function App() {
  const showLanding = useAtomValue(State.selectedProject) === undefined;
  return (
    <Box height="100%" width="100%" style={{overflow: 'auto'}}>
      {showLanding ? <Landing /> : <Overview />}
    </Box>
  );
}

export default App;
