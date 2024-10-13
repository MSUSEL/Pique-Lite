import * as OverviewPanel from "./OverviewPanel";
import { LinePlot_Compare } from "./PiqueChart";


function CompareView() {
  return (
    <OverviewPanel.Container>
      <OverviewPanel.Title>Compare Projects</OverviewPanel.Title>
      <LinePlot_Compare />
    </OverviewPanel.Container>
  )
}

export default CompareView;