import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CheckCircle, CircleIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import LevelAccordion from "./LevelAccordion";
import { FilterableItem } from "./LevelAccordion";

interface SectionComponentProps {
    dataset: {
        factors: {
            quality_aspects: Record<string, FilterableItem>;
            product_factors: Record<string, FilterableItem>;
        };
        measures: Record<string, FilterableItem>;
        diagnostics: Record<string, FilterableItem>;
    };
    onTabChange: (tab: string) => void;
}

export default function SectionComponent({ dataset, onTabChange }: SectionComponentProps) {
    const [detailsVisible, setDetailsVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<FilterableItem | null>(null);

    return (
        <div className="flex flex-col">
            {/* Tabs and View Additional Details button */}
            <Tabs defaultValue="characteristics" onValueChange={onTabChange}>
                <div className="flex justify-between">
                    <TabsList className="bg-transparent pb-1 pl-0 gap-4">
                        <TabsTrigger
                            value="characteristics"
                            className="data-[state=active]:text-blue-800 data-[state=active]:border-b-2 data-[state=active]:border-blue-800 border-t-0 border-l-0 border-r-0 rounded-none cursor-pointer"
                        >
                            Characteristics
                        </TabsTrigger>
                        <TabsTrigger
                            value="factors"
                            className="data-[state=active]:text-blue-800 data-[state=active]:border-b-2 data-[state=active]:border-blue-800 border-t-0 border-l-0 border-r-0 rounded-none cursor-pointer"
                        >
                            Factors
                        </TabsTrigger>
                        <TabsTrigger
                            value="measures"
                            className="data-[state=active]:text-blue-800 data-[state=active]:border-b-2 data-[state=active]:border-blue-800 border-t-0 border-l-0 border-r-0 rounded-none cursor-pointer"
                        >
                            Measures
                        </TabsTrigger>
                        <TabsTrigger
                            value="diagnostics"
                            className="data-[state=active]:text-blue-800 data-[state=active]:border-b-2 data-[state=active]:border-blue-800 border-t-0 border-l-0 border-r-0 rounded-none cursor-pointer"
                        >
                            Diagnostics
                        </TabsTrigger>
                    </TabsList>
                    <Button
                        variant="ghost"
                        onClick={() => setDetailsVisible(prev => !prev)}
                        className="text-gray-500 cursor-pointer"
                    >
                        View Additional Details
                        {detailsVisible ? (
                            <CheckCircle className="ml-2 h-4 w-4" />
                        ) : (
                            <CircleIcon className="ml-2 h-4 w-4" />
                        )}
                    </Button>
                </div>

                <TabsContent value="characteristics">
                    <ScrollArea className="h-[600px]">
                        <LevelAccordion
                            nestedobj={dataset.factors.quality_aspects}
                            isDiagnostics={false}
                            detailsVisible={detailsVisible}
                            selectedItem={selectedItem}
                        />
                    </ScrollArea>
                </TabsContent>

                <TabsContent value="factors">
                    <ScrollArea className="h-[600px]">
                        <LevelAccordion
                            nestedobj={dataset.factors.product_factors}
                            isDiagnostics={false}
                            detailsVisible={detailsVisible}
                            selectedItem={selectedItem}
                        />
                    </ScrollArea>
                </TabsContent>

                <TabsContent value="measures">
                    <ScrollArea className="h-[600px]">
                        <LevelAccordion
                            nestedobj={dataset.measures}
                            isDiagnostics={false}
                            detailsVisible={detailsVisible}
                            selectedItem={selectedItem}
                        />
                    </ScrollArea>
                </TabsContent>

                <TabsContent value="diagnostics">
                    <ScrollArea className="h-[600px]">
                        <LevelAccordion
                            nestedobj={dataset.diagnostics}
                            isDiagnostics={true}
                            detailsVisible={detailsVisible}
                            selectedItem={selectedItem}
                        />
                    </ScrollArea>
                </TabsContent>
            </Tabs>
        </div>
    );
} 