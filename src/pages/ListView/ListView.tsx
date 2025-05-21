import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
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
        // justifyContent: "center"
      }}
    >
      <h3 className="text-2x1 scroll-m-20 font-semibold tracking-tight">
        {processedData.name}
      </h3>
      <Accordion type="multiple">
        <AccordionItem value="tqi">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <Badge>{processedData.factors.tqi ? 1 : 0}</Badge>
              TQI
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {processedData.factors.tqi &&
              renderDetails(
                processedData.factors.tqi,
                toggleItem,
                expandedItems,
                false
              )}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="quality_aspects">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <Badge>
                {
                  Object.keys(processedData.factors.quality_aspects || {})
                    .length
                }
              </Badge>
              Characteristics
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {processedData.factors.quality_aspects &&
              renderDetails(
                processedData.factors.quality_aspects,
                toggleItem,
                expandedItems,
                false
              )}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="product_factors">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <Badge>
                {
                  Object.keys(processedData.factors.product_factors || {})
                    .length
                }
              </Badge>
              Factors
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {processedData.factors.product_factors &&
              renderDetails(
                processedData.factors.product_factors,
                toggleItem,
                expandedItems,
                false
              )}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="measures">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <Badge>{Object.keys(processedData.measures || {}).length}</Badge>
              Measures
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {processedData.measures &&
              renderMeasuresDetails(
                processedData.measures,
                toggleItem,
                expandedItems,
                false
              )}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="diagnostics">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <Badge>
                {Object.keys(processedData.diagnostics || {}).length}
              </Badge>
              Diagnostics
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {processedData.diagnostics &&
              renderDetails(
                processedData.diagnostics,
                toggleItem,
                expandedItems,
                true
              )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
