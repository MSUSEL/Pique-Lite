import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table"
import { AccordionItem, AccordionContent, AccordionTrigger } from "@/components/ui/accordion"
import { renderObjectDetails } from "./LevelAccordion";
import { FilterableItem } from "./LevelAccordion";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
                  <SheetDescription>
                    Make changes to your profile here. Click save when you&apos;re done.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                  <div className="grid gap-3">
                    <Label htmlFor="sheet-demo-name">Name</Label>
                    <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="sheet-demo-username">Username</Label>
                    <Input id="sheet-demo-username" defaultValue="@peduarte" />
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
