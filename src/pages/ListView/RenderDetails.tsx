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
import { Progress } from "@/components/ui/progress";
import { getRisk } from "../../composites/RiskHelpers";
import { renderSingleObjectDetails } from "./RenderSingleObjectDetails";

export const renderDetails = (
  Data: { [key: string]: any },
  toggleItemFn: (key: string) => void,
  expandedState: Record<string, boolean>,
  isDiagnosticData: boolean = false
) => {
  return (
    <div className="space-y-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(Data).map(([key, value]) => {
            const riskData = getRisk(
              value.value,
              isDiagnosticData ? "diagnostic" : "normal"
            );
            const progressValue = value.value * 100;

            return (
              <TableRow key={key} className="hover:bg-muted/50">
                <TableCell className="font-medium">{value.name ?? "N/A"}</TableCell>
                <TableCell className="font-mono">{value.value?.toFixed(2) ?? "N/A"}</TableCell>
                <TableCell className="w-32">
                  <Progress
                    value={Math.min(Math.max(progressValue, 0), 100)}
                    bg={riskData.color}
                    className="h-2"
                  />
                </TableCell>
                <TableCell className="text-sm text-muted-foreground max-w-xs">
                  {value.description || "Not provided"}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Expandable details for complex items */}
      <Accordion type="multiple" className="mt-4">
        {Object.entries(Data).map(([key, value]) => {
          const isExpanded = expandedState[key] === true;
          
          // Only show accordion if there are additional details beyond basic properties
          const hasAdditionalDetails = Object.keys(value).some(
            k => !['name', 'value', 'description'].includes(k)
          );

          if (!hasAdditionalDetails) return null;

          return (
            <AccordionItem key={key} value={key}>
              <AccordionTrigger
                className="text-sm hover:no-underline py-2"
                onClick={() => toggleItemFn(key)}
              >
                Additional details for {value.name ?? key}
              </AccordionTrigger>
              <AccordionContent>
                {isExpanded && renderSingleObjectDetails(value)}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export const renderMeasuresDetails = (
  measuresData: { [key: string]: any },
  toggleItemFn: (key: string) => void,
  expandedState: Record<string, boolean>,
  isDiagnosticData: boolean = false
) => {
  return (
    <div className="space-y-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(measuresData).map(([key, measure]) => {
            const measureName = measure.name ?? key;
            const measureValue = measure.value ?? "N/A";
            const riskData = getRisk(
              measure.value,
              isDiagnosticData ? "diagnostic" : "normal"
            );
            const progressValue = typeof measureValue === 'number' ? measureValue * 100 : 0;

            return (
              <TableRow key={key} className="hover:bg-muted/50">
                <TableCell className="font-medium">{measureName}</TableCell>
                <TableCell className="font-mono">
                  {typeof measureValue === 'number' ? measureValue.toFixed(2) : measureValue}
                </TableCell>
                <TableCell className="w-32">
                  {typeof measureValue === 'number' && (
                    <Progress
                      value={Math.min(Math.max(progressValue, 0), 100)}
                      bg={riskData.color}
                      className="h-2"
                    />
                  )}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground max-w-xs">
                  {measure.description || "Not provided"}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Expandable details for complex measures */}
      <Accordion type="multiple" className="mt-4">
        {Object.entries(measuresData).map(([key, measure]) => {
          const isExpanded = expandedState[key] === true;
          
          // Only show accordion if there are additional details beyond basic properties
          const hasAdditionalDetails = Object.keys(measure).some(
            k => !['name', 'value', 'description'].includes(k)
          );

          if (!hasAdditionalDetails) return null;

          return (
            <AccordionItem key={key} value={key}>
              <AccordionTrigger
                className="text-sm hover:no-underline py-2"
                onClick={() => toggleItemFn(key)}
              >
                Additional details for {measure.name ?? key}
              </AccordionTrigger>
              <AccordionContent>
                {isExpanded && renderSingleObjectDetails(measure)}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

