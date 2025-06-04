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
}

export default function LowestScoresCard({ title, items }: LowestScoresCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <div className="flex flex-col items-center gap-7 p-1">
                {items.map((item, index) => {
                    const risk = getRisk(item.details.value, "normal");
                    return (
                        <Dialog key={index}>
                            <DialogTrigger asChild>
                                <Button
                                    className="min-w-[200px] w-fit cursor-pointer pt-6 pb-6"
                                    style={{
                                        background: risk?.color || "gray"
                                    }}
                                >
                                    <span
                                        className="text-lg font-bold pr-3"
                                        style={{
                                            color: risk.badgeColor
                                        }}
                                    >
                                        {item.name}:
                                    </span>
                                    <span
                                        className="text-lg font-bold"
                                        style={{
                                            color: risk.badgeColor
                                        }}
                                    >
                                        {item.details.value.toFixed(2)}
                                    </span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <div className="text-sm">
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