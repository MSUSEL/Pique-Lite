import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableHeader
} from "@/components/ui/table";
import { Accordion } from "@/components/ui/accordion";
import AdditionalDetailsItem from "./AdditionalDetailsItem";

export const renderSingleObjectDetails = (
    details: { [key: string]: any },
    depth: number = 0
) => {
    // Separate simple properties from complex objects
    const simpleProps: [string, any][] = [];
    const complexProps: [string, any][] = [];
    
    Object.entries(details).forEach(([key, value]) => {
        // Skip the basic properties that are already shown in the main table
        if (['name', 'value', 'description'].includes(key)) {
            return;
        }
        
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            complexProps.push([key, value]);
        } else {
            simpleProps.push([key, value]);
        }
    });

    return (
        <div className="space-y-4">
            {/* Table for simple properties */}
            {simpleProps.length > 0 && (
                <div>
                    <h4 className="text-sm font-medium mb-2">Properties</h4>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Property</TableHead>
                                <TableHead>Value</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {simpleProps.map(([key, value]) => (
                                <TableRow key={key}>
                                    <TableCell className="font-medium">{key}</TableCell>
                                    <TableCell className="font-mono text-sm">
                                        {Array.isArray(value) ? 
                                            `[${value.length} items]` :
                                            JSON.stringify(value, null, 2)
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}

            {/* Accordion for complex nested objects */}
            {complexProps.length > 0 && (
                <div>
                    <h4 className="text-sm font-medium mb-2">Complex Properties</h4>
                    <Accordion type="multiple">
                        {complexProps.map(([key, value]) => (
                            <AdditionalDetailsItem
                                key={key}
                                itemKey={key}
                                value={value}
                                depth={depth}
                            />
                        ))}
                    </Accordion>
                </div>
            )}
        </div>
    );
};