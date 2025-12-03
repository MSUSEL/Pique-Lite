import { useAtomValue } from "jotai";
import { useState } from "react";
import type { Route } from "./+types/_dashboard.versionDetails.project.$projectId.version.$versionId";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { State } from "@/state/core";
import ListView from "../pages/ListView/ListView";
import { VisualizerState } from "@/state/VisualizerStateHandling/VisualizerState";
import { useProcessedData } from "@/state/VisualizerStateHandling/use-processed-data";
import { TreeDisplay_Rework } from "../pages/TreeView/TreeDisplay/TreeDisplay_rework";
import VersionOverview from "../pages/VersionOverview/Overview";
import { EnhancedImportanceAdjustment } from "@/components/EnhancedImportanceAdjustment";
import { BarChart3, Network, List, Settings } from "lucide-react";

// Former global state for pique visualizer, now stored here
const initialState: VisualizerState = {
  sortingState: "no-sort",
  filteringState: "no-filter",
  hideZeroWeightEdgeState: "not-hiding",
  hideOneValueNodeState: "not-hiding",
  filteringByRiskLevelCheckboxStates: {
    Insignificant: true,
    Low: true,
    Medium: true,
    High: true,
    Severe: true
  },
  minValueState: -100,
  maxValueState: 1,
  minWeightState: 0,
  maxWeightState: 1,
  adjustedImportance: {},
  tqiValue: undefined
};

export default function Component(props: Route.ComponentProps) {
  const { projectId, versionId } = props.params;
  const projects = useAtomValue(State.projects);
  const project = projects?.[projectId];
  const version = project?.versions.find((v) => v.versionId === versionId);
  const dataset = version?.processed;

  // Former global state for pique visualizer
  const [visualizerState, setVisualizerState] = useState<VisualizerState>(() => {
    const data = dataset || { factors: { tqi: {} } };
    const tqiObjects = data?.factors?.tqi || {};
    const firstTqiKey = Object.keys(tqiObjects)[0];
    const firstTqiObj = firstTqiKey ? tqiObjects[firstTqiKey] : undefined;
    return {
      ...initialState,
      adjustedImportance: firstTqiObj?.weights || {},
      tqiValue: firstTqiObj?.value
    };
  });
  const processedData = useProcessedData({
    dataset: dataset || undefined,
    ...visualizerState
  });
  const dataForView = processedData || dataset;

  const handleImportanceAdjustmentChange = (newState: {
    adjustedImportance: { [key: string]: number };
    tqiValue: number;
  }) => {
    setVisualizerState((prev) => ({
      ...prev,
      adjustedImportance: newState.adjustedImportance,
      tqiValue: newState.tqiValue
    }));
  };

  if (!dataForView) {
    return (
      <div className="version-details-view px-4 py-2">
        <div className="text-sm text-muted-foreground">
          No dataset found for this version. Please upload a file to view details.
        </div>
      </div>
    );
  }

  return (
    <div className="version-details-view">
      <Tabs defaultValue="tab0">
        <TabsList className="tabs-list flex-start flex w-full justify-start rounded-none bg-gray-50 p-0">
          <TabsTrigger
            className="flex-0 rounded-none text-gray-500 data-[state=active]:bg-gray-50 data-[state=active]:text-gray-800"
            value="tab0"
          >
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </div>
          </TabsTrigger>
          <TabsTrigger
            className="flex-0 rounded-none text-gray-500 data-[state=active]:bg-gray-50 data-[state=active]:text-gray-800"
            value="tab1"
          >
            <div className="flex items-center gap-2">
              <Network className="h-4 w-4" />
              Tree View
            </div>
          </TabsTrigger>
          <TabsTrigger
            className="flex-0 rounded-none text-gray-500 data-[state=active]:bg-gray-50 data-[state=active]:text-gray-800"
            value="tab2"
          >
            <div className="flex items-center gap-2">
              <List className="h-4 w-4" />
              List View
            </div>
          </TabsTrigger>
          <TabsTrigger
            className="flex-0 rounded-none text-gray-500 data-[state=active]:bg-gray-50 data-[state=active]:text-gray-800"
            value="tab3"
          >
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Dynamic Importance Adjustment
            </div>
          </TabsTrigger>
        </TabsList>
        <div className="h-full max-h-full px-4 py-2">
          <TabsContent value="tab0">
            <VersionOverview dataset={dataForView} params={props.params} />
          </TabsContent>
          <TabsContent value="tab1">
            {processedData && <TreeDisplay_Rework data={processedData} />}
          </TabsContent>
          <TabsContent value="tab2" className="px-4">
            {processedData && <ListView dataset={processedData} />}
          </TabsContent>
          <TabsContent value="tab3" className="px-4">
            <EnhancedImportanceAdjustment
              dataset={dataForView}
              initialState={{
                adjustedImportance: visualizerState.adjustedImportance,
                tqiValue: visualizerState.tqiValue
              }}
              onStateChange={handleImportanceAdjustmentChange}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
