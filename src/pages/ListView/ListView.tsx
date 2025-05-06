import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { renderDetails, renderMeasuresDetails } from "./RenderDetails"
import { useProcessedData } from "../../state/VisualizerStateHandling/use-processed-data";
import { VisualizerState } from "../../state/VisualizerStateHandling/VisualizerState";
import * as schema from "../../state/visualizerSchema"
 
export default function ListView({ dataset, state }: { dataset: schema.base.Schema; state: VisualizerState }) {
  const processedData = useProcessedData({dataset, ...state});

  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setExpandedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  if (!processedData) {
    return <div>Loading data...</div>;
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}>
      <h3 className="scroll-m-20 text-2x1 font-semibold tracking-tight">
        {processedData.name}
      </h3>
      <Accordion type="multiple">
        <AccordionItem value="tqi">
          <AccordionTrigger>
            TQI
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
            {Object.keys(processedData.factors.quality_aspects || {}).length}
            Characteristics
          </AccordionTrigger>
          <AccordionContent>
            {
              processedData.factors.quality_aspects &&
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
            {
              Object.keys(processedData.factors.product_factors || {}).length 
            }
            Factors
          </AccordionTrigger>
          <AccordionContent>
            {processedData.factors.product_factors &&
              renderDetails(
                processedData.factors.product_factors,
                toggleItem,
                expandedItems,
                false
              )
            }
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="measures">
          <AccordionTrigger>
            {Object.keys(processedData.measures || {}).length}
            Measures
          </AccordionTrigger>
          <AccordionContent>
            {processedData.measures &&
              renderMeasuresDetails(
                processedData.measures,
                toggleItem,
                expandedItems,
                false
              )
            }
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="diagnostics">
          <AccordionTrigger>
            {Object.keys(processedData.diagnostics || {}).length}
            Diagnostics
          </AccordionTrigger>
          <AccordionContent>
            {processedData.diagnostics &&
              renderDetails(
                processedData.diagnostics,
                toggleItem,
                expandedItems,
                true
              )
            }
          </AccordionContent>
        </AccordionItem>
      </Accordion>
        
    </div>
  );
};
