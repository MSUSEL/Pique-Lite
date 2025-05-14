import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table"
import { AccordionItem, AccordionContent, AccordionTrigger } from "@/components/ui/accordion"
import { renderObjectDetails } from "./LevelAccordion";
import { FilterableItem } from "./LevelAccordion";

// Renders the information for a single item
export const renderItemDetails = (
  key: string,
  details: FilterableItem,
  detailsVisible: boolean
) => {
  return (
    <AccordionItem value={key} key={key} className="Level--AccordionLevel">
        <AccordionTrigger className="Level--AccordionTrigger">
          {details.name}: {details.value.toFixed(2)}
        </AccordionTrigger>
      <AccordionContent className="Level--AccordionContent">
        <Table>
          <TableBody>
            <TableRow>
              {
                <TableCell className="Level--AccordionContentText">
                  <strong>Description: </strong>
                  {details.description || "Not Provided"}
                </TableCell>
              }
            </TableRow>
            <TableRow className="AdditionalDetails">
              {/* Renders additional information if detailsVisible is true */}
              {detailsVisible && renderObjectDetails(details)}
            </TableRow>
          </TableBody>
        </Table>
      </AccordionContent>
    </AccordionItem>
  );
};

export default renderItemDetails;
