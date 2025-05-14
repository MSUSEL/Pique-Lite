import { useAtomValue } from "jotai";
import { useState } from "react";
import type { Route } from "./+types/_dashboard.versionDetails.project.$projectId.version.$versionId";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { State } from "@/state/core";
import mockData from "../assets/pique-visualizer-data/compact-output.json";
import ListView from "../pages/ListView/ListView";
import { VisualizerState } from "@/state/VisualizerStateHandling/VisualizerState";
import { useProcessedData } from "@/state/VisualizerStateHandling/use-processed-data";
import { TreeDisplay_Rework } from "../pages/TreeView/TreeDisplay/TreeDisplay_rework";
import { Link } from "react-router-dom";
import VersionOverview from "../pages/VersionOverview/Overview";

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

const getInitialState = () => {
  // FIXME:
  // need to find a better way to do this state initialization
  const state = initialState;
  const data = mockData;
  const tqiObjects = data.factors.tqi;
  const firstTqiKey = Object.keys(tqiObjects)[0];
  const firstTqiObj = tqiObjects[firstTqiKey];
  state.adjustedImportance = firstTqiObj.weights;
  state.tqiValue = firstTqiObj.value;

  return state;
};
export default function Component(props: Route.ComponentProps) {
  const { projectId, versionId } = props.params;
  const projects = useAtomValue(State.projects);
  const project = projects?.[projectId];
  const version = project?.versions.find((v) => v.versionId === versionId);

  // Former global state for pique visualizer
  const [visualizerState] = useState<VisualizerState>(getInitialState);
  const processedData = useProcessedData({
    dataset: mockData,
    ...visualizerState
  });

  return (
    <div className="version-details-view">
      <div className="px-4 py-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={`/project/${projectId}`}>{project?.name}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{version?.name || versionId}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <Tabs defaultValue="tab0">
        <TabsList className="tabs-list flex-start flex w-full justify-start rounded-none bg-gray-50 p-0">
          <TabsTrigger
            className="flex-0 rounded-none text-gray-500 data-[state=active]:bg-gray-50 data-[state=active]:text-gray-800"
            value="tab0"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            className="flex-0 rounded-none text-gray-500 data-[state=active]:bg-gray-50 data-[state=active]:text-gray-800"
            value="tab1"
          >
            Tree View
          </TabsTrigger>
          <TabsTrigger
            className="flex-0 rounded-none text-gray-500 data-[state=active]:bg-gray-50 data-[state=active]:text-gray-800"
            value="tab2"
          >
            List View
          </TabsTrigger>
        </TabsList>
        <div className="px-4 py-2">
          <TabsContent value="tab0">
            <VersionOverview dataset={mockData} />
          </TabsContent>
          <TabsContent value="tab1">
            <div className="max-h-[80svh] max-w-[80svw] overflow-hidden">
              {processedData && <TreeDisplay_Rework data={processedData} />}
            </div>
          </TabsContent>
          <TabsContent value="tab2" className="px-4">
            <ListView dataset={processedData} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
