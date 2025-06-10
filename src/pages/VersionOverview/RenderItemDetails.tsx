import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table"
import { AccordionItem, AccordionContent, AccordionTrigger } from "@/components/ui/accordion"
import { renderObjectDetails } from "./LevelAccordion";
import { FilterableItem } from "./LevelAccordion";
import { Button } from "@/components/ui/button"
import { getRisk } from "../../composites/RiskHelpers"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

// Renders the information for a single item
export const renderItemDetails = (
  key: string,
  details: FilterableItem,
  detailsVisible: boolean
) => {
  const risk = getRisk(details.value);

  return (
    <AccordionItem value={key} key={key} className="Level--AccordionLevel">
      <AccordionTrigger className="Level--AccordionTrigger cursor-pointer">
        <div className="flex items-center justify-between w-full pr-4">
          <span>{details.name}: {details.value.toFixed(2)}</span>
          <div onClick={(e) => e.stopPropagation()}>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="ml-4 hover:no-underline cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                >
                  Trace Full Breakdown
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>{details.name}</SheetTitle>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Score:</span>
                      <span className="text-lg font-semibold" style={{ color: risk.badgeColor }}>
                        {details.value.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Risk Level:</span>
                      <div className="flex items-center gap-2">
                        <span style={{ color: risk.badgeColor }}>{risk.icon}</span>
                        <span style={{ color: risk.badgeColor }}>{risk.name}</span>
                      </div>
                    </div>
                    {details.type && (
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Type:</span>
                        <span>{details.type}</span>
                      </div>
                    )}
                  <div className="grid gap-3">
                    <span className="font-medium">Description:</span>
                    <p className="text-sm text-muted-foreground">
                      {details.description || "No description provided"}
                    </p>
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button variant="outline">Close</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
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
