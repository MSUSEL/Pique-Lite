import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getRisk } from "../../composites/RiskHelpers";
import { renderSingleObjectDetails } from "./RenderSingleObjectDetails";

export const renderDetails = (
    Data: { [key: string]: any },
    toggleItemFn: (key: string) => void,
    expandedState: Record<string, boolean>,
    isDiagnosticData: boolean = false
) => {
    return (
        <Accordion type="multiple">
            {Object.entries(Data).map(([key, value]) => {
                const isExpanded = expandedState[key] || false;
                const backgroundColor = getRisk(value.value, isDiagnosticData ? "diagnostic" : "normal").color;

                return (
                    <AccordionItem key={key} value={key}>
                        <AccordionTrigger onClick={() => toggleItemFn(key)} style={{ backgroundColor }}>
                            {value.name ?? "N/A"}: {value.value.toFixed(2) ?? "N/A"}
                        </AccordionTrigger>
                        <AccordionContent>
                            {isExpanded && renderSingleObjectDetails(value)}
                        </AccordionContent>
                    </AccordionItem>
                );
            })}
        </Accordion>
    );
};

export const renderMeasuresDetails = (
    measuresData: { [key: string]: any },
    toggleItemFn: (key: string) => void,
    expandedState: Record<string, boolean>,
    isDiagnosticData: boolean = false
) => {
    return (
        <Accordion type="multiple">
            {Object.entries(measuresData).map(([key, measure]) => {
                const isExpanded = expandedState[key] || false;
                
                const measureName = measure.name ?? key;
                const measureValue = measure.value ?? "N/A"                
                const backgroundColor = getRisk(measure.value, isDiagnosticData ? "diagnostic" : "normal").color;

                return (
                    <AccordionItem key={key} value={key}>
                        <AccordionTrigger onClick={() => toggleItemFn(key)} style={{ backgroundColor }}>
                            {measureName}: {measureValue.toFixed(2) ?? "N/A"}
                        </AccordionTrigger>
                        <AccordionContent>
                            {isExpanded && renderSingleObjectDetails(measure)}
                        </AccordionContent>
                    </AccordionItem>
                );
            })}
        </Accordion>
    );
};