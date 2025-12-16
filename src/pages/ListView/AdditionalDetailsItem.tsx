import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableHeader
} from "@/components/ui/table";
import React, { useState } from "react";

type AdditionalDetailsItemProps = {
  itemKey: string;
  value: any;
  depth: number;
};

const AdditionalDetailsItem: React.FC<AdditionalDetailsItemProps> = ({
  itemKey,
  value,
  depth
}) => {
  const [open, setOpen] = useState(false);
  const isNestedObject =
    typeof value === "object" && value !== null && !Array.isArray(value);

  const handleTriggerClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  if (isNestedObject) {
    // Separate simple and complex properties for nested objects
    const simpleProps: [string, any][] = [];
    const complexProps: [string, any][] = [];
    
    Object.entries(value).forEach(([key, val]) => {
      if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
        complexProps.push([key, val]);
      } else {
        simpleProps.push([key, val]);
      }
    });

    return (
      <AccordionItem key={itemKey} value={itemKey}>
        <AccordionTrigger
          onClick={handleTriggerClick}
          className="text-sm hover:no-underline py-2"
          style={{ marginLeft: `${depth * 10}px` }}
        >
          {itemKey}
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3 ml-4">
            {/* Table for simple properties */}
            {simpleProps.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Property</TableHead>
                    <TableHead className="text-xs">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {simpleProps.map(([key, val]) => (
                    <TableRow key={key}>
                      <TableCell className="text-sm font-medium">{key}</TableCell>
                      <TableCell className="text-sm font-mono">
                        {Array.isArray(val) ? 
                          `[${val.length} items]` :
                          JSON.stringify(val, null, 2)
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            {/* Nested accordions for complex properties */}
            {complexProps.length > 0 && (
              <Accordion type="multiple">
                {complexProps.map(([nestedKey, nestedValue]) => (
                  <AdditionalDetailsItem
                    key={nestedKey}
                    itemKey={nestedKey}
                    value={nestedValue}
                    depth={depth + 1}
                  />
                ))}
              </Accordion>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  } else {
    // For simple values, render as a table row-like element
    return (
      <div 
        className="flex justify-between items-center py-2 px-3 text-sm border-b border-gray-100"
        style={{ marginLeft: `${depth * 10}px` }}
      >
        <span className="font-medium">{itemKey}</span>
        <span className="font-mono text-muted-foreground">
          {Array.isArray(value) ? 
            `[${value.length} items]` :
            JSON.stringify(value, null, 2)
          }
        </span>
      </div>
    );
  }
};

export default AdditionalDetailsItem;

