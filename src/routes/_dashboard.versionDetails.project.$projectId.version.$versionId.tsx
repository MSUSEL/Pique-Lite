import { useAtomValue } from "jotai";
import type { Route } from "./+types/_dashboard.versionDetails.project.$projectId.version.$versionId";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { State } from "../state/core";
import mockData from "../assets/pique-visualizer-data/compact-output.json";

export default function Component(props: Route.ComponentProps) {
  const { projectId, versionId } = props.params;
  const projects = useAtomValue(State.projects);
  const project = projects?.[projectId];
  const version = project?.versions.find((v) => v.versionId === versionId);
  // For now use this
  const piqueVisulizerData = mockData;
  return (
    <div className="version-details-view">
      <h1 className="px-4 text-2xl font-bold">{version?.name}</h1>
      <Tabs defaultValue="tab1">
        <TabsList className="tabs-list flex-start flex w-full justify-start rounded-none bg-gray-50 p-0">
          <TabsTrigger
            className="flex-0 rounded-none text-gray-500 data-[state=active]:bg-gray-50 data-[state=active]:text-gray-800"
            value="tab1"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            className="flex-0 rounded-none text-gray-500 data-[state=active]:bg-gray-50 data-[state=active]:text-gray-800"
            value="tab2"
          >
            Tree View
          </TabsTrigger>
          <TabsTrigger
            className="flex-0 rounded-none text-gray-500 data-[state=active]:bg-gray-50 data-[state=active]:text-gray-800"
            value="tab3"
          >
            List View
          </TabsTrigger>
        </TabsList>
        <div className="px-4 py-2">
          <TabsContent value="tab1">
            <div>Content for Tab 1 goes here.</div>
          </TabsContent>
          <TabsContent value="tab2">
            <div>Content for Tab 2 goes here.</div>
          </TabsContent>
          <TabsContent value="tab3">
            <div>Content for Tab 3 goes here.</div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
