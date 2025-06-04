import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import renderItemDetails from "./RenderItemDetails";
import { TableCell } from "@/components/ui/table";
import { getAllRiskLevels, getRisk } from "../../composites/RiskHelpers";

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
  const riskLevels: Record<string, Record<string, any>> = Object.fromEntries(
    getAllRiskLevels().map((level) => [level.name, {}])
  );

  Object.entries(items).forEach(([key, item]) => {
    const risk = getRisk(item.value, isDiagnostics ? "diagnostic" : "normal");
    riskLevels[risk.name][key] = item;
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
              Object.keys(items).length === 0 ? "disabled" : "cursor-pointer"
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
