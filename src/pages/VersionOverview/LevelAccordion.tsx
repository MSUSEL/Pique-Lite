import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import renderItemDetails from "./RenderItemDetails";
import { TableCell } from "@/components/ui/table";

export interface FilterableItem {
  name: string;
  value: number;
  description: string;
  [key: string]: any;
}

interface ProcessedItems {
  [riskLevel: string]: Record<string, FilterableItem>;
}

const classifyRiskLevels = (
  items: Record<string, FilterableItem>,
  isDiagnostics: boolean
): ProcessedItems => {
  const riskLevels: ProcessedItems = {
    Insignificant: {},
    Low: {},
    Medium: {},
    High: {},
    Severe: {},
  };

  Object.entries(items).forEach(([key, item]) => {
    const { value } = item;
    let riskLevel = "";

    if (isDiagnostics) {
      // classification for diagnostics
      if (value >= 1.5) riskLevel = "Severe";
      else if (value > 0.8) riskLevel = "High";
      else if (value > 0.5) riskLevel = "Medium";
      else if (value > 0.2) riskLevel = "Low";
      else riskLevel = "Insignificant";
    } else {
      // classification for others
      if (value <= 0.2) riskLevel = "Severe";
      else if (value <= 0.4) riskLevel = "High";
      else if (value <= 0.6) riskLevel = "Medium";
      else if (value <= 0.8) riskLevel = "Low";
      else riskLevel = "Insignificant";
    }

    riskLevels[riskLevel][key] = item;
  });

  return riskLevels;
};

// render object properties recursively
export const renderObjectDetails = (
  obj: { [key: string]: any },
  keyPrefix = ""
) => {
  return Object.entries(obj).map(([key, value]) => {
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      return (
        <div key={`${keyPrefix}${key}`}>
          <TableCell className="Level--AccordionContentText">
            <strong>{key}:</strong>
          </TableCell>
          <div style={{ paddingLeft: "20px" }}>
            {renderObjectDetails(value, `${keyPrefix}${key}-`)}
          </div>
        </div>
      );
    } else {
      if (
        keyPrefix === "" &&
        (key === "name" || key === "value" || key === "description")
      )
        return;
      else {
        console.log(key, value);
        return (
          <div key={`${keyPrefix}${key}`}>
            <TableCell className="Level--AccordionContentText">
              <strong>{key}:</strong>
            </TableCell>
            <TableCell className="Level--AccordionContentText">
              {value.toString()}
            </TableCell>
          </div>
        );
      }
    }
  });
};

// Wrapper for the accordion list used for each level
const LevelAccordion = ({
  nestedobj,
  isDiagnostics,
  detailsVisible,
  selectedItem,
}: {
  nestedobj: Record<string, FilterableItem>;
  isDiagnostics: boolean;
  detailsVisible: boolean;
  selectedItem?: FilterableItem | null; 
}) => {
  const processedItems = classifyRiskLevels(nestedobj, isDiagnostics);
  return (
    <Accordion type="multiple" className="Level--AccordionRoot">
      {/* Iterates through items held in processedItems */}
      {Object.entries(processedItems).map(([riskLevel, items]) => (
         <AccordionItem
         value={riskLevel}
         key={riskLevel}
         className={`Level--AccordionLevel ${
           selectedItem && Object.keys(items).includes(selectedItem.name)
             ? "selected"
             : ""
         }`}
       >
          <AccordionTrigger
            className={`Level--AccordionTrigger ${
              Object.keys(items).length === 0 ? "disabled" : ""
            }`}
            disabled={Object.keys(items).length === 0}
          >
            {riskLevel} ({Object.keys(items).length})
          </AccordionTrigger>
          <AccordionContent className="Level--AccordionContent">
            <Accordion type="multiple" className="Level--AccordionRoot">
              {Object.entries(items).map(([key, details]) =>
                // renders item's information based on key and visibility level
                renderItemDetails(key, details, detailsVisible)
              )}
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default LevelAccordion;
