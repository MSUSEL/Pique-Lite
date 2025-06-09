import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { renderObjectDetails } from "./LevelAccordion";
import { FilterableItem } from "./LevelAccordion";
import { getRisk } from "../../composites/RiskHelpers";

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

interface LowestScoresCardProps {
    title: string;
    items: TopProblematicItem[];
        isDiagnostics?: boolean;
}

export default function LowestScoresCard({ title, items, isDiagnostics = false }: LowestScoresCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <div className="flex flex-col items-center gap-7 p-1">
                {items.map((item, index) => {
                    const risk = getRisk(item.details.value, isDiagnostics ? "diagnostic" : "normal");
                    return (
                        <Dialog key={index}>
                            <DialogTrigger asChild>
                                <Button
                                    className="min-w-[200px] w-fit cursor-pointer py-8 px-1 whitespace-normal text-center"
                                    style={{
                                        background: risk?.color || "gray"
                                    }}
                                >
                                    <span
                                        className="text-lg font-bold pr-1 pl-2"
                                        style={{
                                            color: risk.badgeColor
                                        }}
                                    >
                                        {item.name}:
                                    </span>
                                    <span
                                        className="text-lg font-bold pr-2"
                                        style={{
                                            color: risk.badgeColor
                                        }}
                                    >
                                        {item.details.value.toFixed(2)}
                                    </span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-h-[80vh] overflow-y-auto">
                                <div className="text-sm space-y-4">
                                    {item.impacts && item.impacts.length > 0 ? (
                                        item.impacts.map((impact, impactIndex) => (
                                            <p key={impactIndex}>
                                                <strong>Impact to {impact.aspectName}:</strong>{" "}
                                                {impact.weight.toFixed(3)}
                                            </p>
                                        ))
                                    ) : item.weight !== undefined ? (
                                        <p>
                                            <strong>Impact to TQI:</strong> {item.weight.toFixed(3)}
                                        </p>
                                    ) : null}
                                    <Separator className="my-3" />
                                    <p>
                                        <strong>Description:</strong>{" "}
                                        {item.details.description || "Not Provided"}
                                    </p>
                                    {renderObjectDetails(item.details)}
                                </div>
                            </DialogContent>
                        </Dialog>
                    );
                })}
            </div>
        </Card>
    );
} 