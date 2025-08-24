import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle
} from "@/components/ui/card";
import HierarchicalView from "./HierarchicalView";
import { renderDetails, renderMeasuresDetails } from "./RenderDetails";
import {
  ProcessedVisualizerDataType,
} from "@/state/VisualizerStateHandling/use-processed-data";
import { Badge } from "@/components/ui/badge";

export default function ListView({
  dataset
}: {
  dataset: ProcessedVisualizerDataType;
}) {
  const processedData = dataset;
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );
  const toggleItem = (key: string) => {
    setExpandedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  if (!processedData) {
    return <div>Loading data...</div>;
  }

  return (
    <div
      className="max-h-[90vh] overflow-y-scroll"
      style={{
        display: "flex",
        flexDirection: "column"
      }}
    >
      <h3 className="text-2xl scroll-m-20 font-semibold tracking-tight mb-4">
        {processedData.name}
      </h3>
      
      {/* Use the hierarchical view to show proper tree structure */}
      <HierarchicalView 
        dataset={processedData}
      />
    </div>
  );
}
