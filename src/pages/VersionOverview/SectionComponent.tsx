import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CheckCircle, CircleIcon } from "lucide-react";
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
            {/* View Additional Details button */}
            <div className="flex justify-end mb-3">
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

            {/* Tabs */}
            <Tabs defaultValue="characteristics" onValueChange={onTabChange}>
                <div className="overflow-x-auto">
                    <TabsList className="bg-transparent pb-1 pl-0 gap-4 flex-nowrap w-max">
                        <TabsTrigger
                            value="characteristics"
                            className="data-[state=active]:text-blue-800 data-[state=active]:border-b-2 data-[state=active]:border-blue-800 border-t-0 border-l-0 border-r-0 rounded-none cursor-pointer whitespace-nowrap"
                        >
                            Characteristics
                        </TabsTrigger>
                        <TabsTrigger
                            value="factors"
                            className="data-[state=active]:text-blue-800 data-[state=active]:border-b-2 data-[state=active]:border-blue-800 border-t-0 border-l-0 border-r-0 rounded-none cursor-pointer whitespace-nowrap"
                        >
                            Factors
                        </TabsTrigger>
                        <TabsTrigger
                            value="measures"
                            className="data-[state=active]:text-blue-800 data-[state=active]:border-b-2 data-[state=active]:border-blue-800 border-t-0 border-l-0 border-r-0 rounded-none cursor-pointer whitespace-nowrap"
                        >
                            Measures
                        </TabsTrigger>
                        <TabsTrigger
                            value="diagnostics"
                            className="data-[state=active]:text-blue-800 data-[state=active]:border-b-2 data-[state=active]:border-blue-800 border-t-0 border-l-0 border-r-0 rounded-none cursor-pointer whitespace-nowrap"
                        >
                            Diagnostics
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="characteristics">
                    <LevelAccordion
                        nestedobj={dataset.factors.quality_aspects}
                        isDiagnostics={false}
                        detailsVisible={detailsVisible}
                        selectedItem={selectedItem}
                    />
                </TabsContent>

                <TabsContent value="factors">
                    <LevelAccordion
                        nestedobj={dataset.factors.product_factors}
                        isDiagnostics={false}
                        detailsVisible={detailsVisible}
                        selectedItem={selectedItem}
                    />
                </TabsContent>

                <TabsContent value="measures">
                    <LevelAccordion
                        nestedobj={dataset.measures}
                        isDiagnostics={false}
                        detailsVisible={detailsVisible}
                        selectedItem={selectedItem}
                    />
                </TabsContent>

                <TabsContent value="diagnostics">
                    <LevelAccordion
                        nestedobj={dataset.diagnostics}
                        isDiagnostics={true}
                        detailsVisible={detailsVisible}
                        selectedItem={selectedItem}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
} 