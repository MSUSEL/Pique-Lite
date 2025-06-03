import React, { useState } from "react";
import { CircleIcon, CheckCircle } from "lucide-react";
import LevelAccordion, { renderObjectDetails } from "./LevelAccordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface FilterableItem {
  name: string;
  value: number;
  description: string;
  weights?: Record<string, number>;
}

interface ChartDataItem {
  name: string;
  Count: number;
}

interface Impact {
  aspectName: string;
  weight: number;
}

interface TopProblematicItem {
  name: string;
  details: FilterableItem;
  weight?: number;
  impacts?: Impact[];
}

interface SectionComponentProps {
  title: string;
  nestedObj: Record<string, FilterableItem>;
  chartData: ChartDataItem[];
  colors: Record<string, string>;
  topProblematicItems: TopProblematicItem[];
  isDiagnostics?: boolean;
  propSelectedItem: any;
}

// Wrapper for each 'section' which contains accordion, pie
//  chart, and top 3 list based on data type (characteristic, factor, etc.)
const SectionComponent: React.FC<SectionComponentProps> = ({
  title,
  nestedObj,
  topProblematicItems,
  isDiagnostics = false,
  propSelectedItem,

}) => {
  const [detailsVisible, setDetailsVisible] = useState(false); // State to track visibility
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDetailsVisibility = () => {
    setDetailsVisible((prevState) => !prevState); // Toggle visibility
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="flex w-full justify-center">
      {/* Accordion section */}
      <div className="flex flex-col items-center justify-center gap-5" style={{ flexBasis: "60%" }}>
        <div>
          <Badge>{title}</Badge>
        </div>
        <div className="toggle-button-container">
          <Button
            className="toggle-button"
            variant="ghost"
            onClick={toggleDetailsVisibility}
            style={{
              right: "0",
              fontSize: "85%",
              color: "gray",
            }}
          >
            View Additional Details
            {detailsVisible ? (
              <CheckCircle className="chevron-icon" />
            ) : (
              <CircleIcon className="chevron-icon" />
            )}
          </Button>
        </div>
        <div style={{ width: "90%" }}>
          <ScrollArea style={{ height: "38vh" }}>
            <LevelAccordion
              nestedobj={nestedObj}
              isDiagnostics={isDiagnostics}
              detailsVisible={detailsVisible}
              selectedItem={selectedItem}
            />
          </ScrollArea>
        </div>
      </div>

      {/* Top problematic items section */}
      <div className="flex flex-col items-center gap-5 justify-center" style={{ flexBasis: "30%" }}>
        <div>
          <Badge>Lowest 3 Scores</Badge>
        </div>
        <div className="mt-[70px]">
          <div className="flex flex-col gap-7 items-center">
            {topProblematicItems.map((item, index) => (
              <Dialog key={index}>
                <DialogTrigger>
                  <Button
                    style={{
                      background: "none",
                      border: "1px solid var(--violet-11)",
                      padding: "15px",
                    }}
                    onClick={() => handleItemClick(item)}
                  >
                    <div className="flex flex-row items-center">
                      <p className="text-violet-600 font-normal text-[1.15em]">
                        <strong>{item.name}:</strong>{" "}
                        <span>{item.details.value.toFixed(2)}</span>
                      </p>
                    </div>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <div
                    className="text-[var(--violet-11)] text-sm"
                    style={{ maxHeight: "90vh", overflowY: "auto" }}
                  >
                    {item.impacts && item.impacts.length > 0 ? (
                      item.impacts.map((impact, impactIndex) => (
                        <p key={impactIndex} className="text-[var(--violet-11)]">
                          <strong>Item name: </strong> {item.name}
                          <Separator className="my-3 h-[1px] bg-border" />
                          <strong>Impact to {impact.aspectName}:</strong>{" "}
                          {impact.weight.toFixed(3)}
                        </p>
                      ))
                    ) : item.weight !== undefined ? (
                      <p className="text-[var(--violet-11)]">
                        <strong>Item name: </strong> {item.name}
                        <Separator className="my-3 h-[1px] bg-border" />
                        <strong>Impact to TQI:</strong> {item.weight.toFixed(3)}
                      </p>
                    ) : null}
                    <p>
                      <strong>Description:</strong>{" "}
                      {item.details.description || "Not Provided"}
                    </p>
                    {renderObjectDetails(item.details)}
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionComponent;
