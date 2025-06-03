import * as schema from "../../state/visualizerSchema";
import { ClassifyNestedObjRiskLevel } from "./ClassifyNestedObjRiskLevel";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getRisk, getAllRiskLevels } from "../../composites/RiskHelpers";
import { COLORS } from "./PieChartColor";
import SectionComponent from "./SectionComponent";
import PieChartComponent from "./PieChartComponent";
import { TQIBadge } from "./TQIBadge";
import { State } from "../../state";
import { useState } from "react";
import { useAtomValue } from "jotai";

interface Impact {
    aspectName: string;
    weight: number;
}

const getRiskInfo = (
    section: any,
    dataset: schema.base.Schema,
    isDiagnostic = false
) => {
    if (!section) return { chart: [], top: [] };

    const [riskCounts, riskSubObjNames] = ClassifyNestedObjRiskLevel(section, isDiagnostic);
    const chart = getAllRiskLevels()
        .map((level, i) => ({
            name: level.name,
            Count: riskCounts[i] || 0,
        }))
        .filter((d) => d.Count !== 0);

    const sorted = riskSubObjNames
        .flat()
        .map((name) => ({
            name,
            details: section[name],
            value: section[name].value,
        }))
        .sort((a, b) => isDiagnostic ? b.value - a.value : a.value - b.value)
        .slice(0, 3);

    const top = sorted.map(({ name, details }) => {
        const impacts: Impact[] = [];

        const parent = isDiagnostic
            ? dataset.measures
            : section === dataset.factors.product_factors
                ? dataset.factors.quality_aspects
                : section === dataset.factors.quality_aspects
                    ? dataset.factors.tqi
                    : section === dataset.measures
                        ? dataset.factors.product_factors
                        : {};

        Object.entries(parent).forEach(([parentName, parentObj]: any) => {
            if (parentObj?.weights?.[name] !== undefined) {
                impacts.push({
                    aspectName: parentName,
                    weight: parentObj.weights[name],
                });
            }
        });

        return { name, details, impacts };
    });

    return { chart, top };
};

interface VersionOverviewProps {
    dataset: schema.base.Schema;
    params: {
        projectId: string;
        versionId: string;
    };
}

export default function VersionOverview({ dataset, params }: VersionOverviewProps) {
    const [selectedItem,] = useState<any>(null);

    const tqiRiskData = ClassifyNestedObjRiskLevel(dataset.factors.tqi, false);
    const [tqiCounts, tqiNames] = tqiRiskData ?? [[], []];
    const riskLevels = getAllRiskLevels();
    const tqiLevelIndex = tqiCounts.findIndex((count) => count > 0);
    const tqiRiskLevel = {
        level: riskLevels[tqiLevelIndex]?.name || "",
        name: tqiNames?.[tqiLevelIndex]?.[0] || "",
        value: Object.values(dataset.factors.tqi)[0]?.value ?? 0,
    };

    // Consolidated all chart + top data
    const quality = getRiskInfo(dataset.factors.quality_aspects, dataset);
    const product = getRiskInfo(dataset.factors.product_factors, dataset);
    const measures = getRiskInfo(dataset.measures, dataset);
    const diagnostics = getRiskInfo(dataset.diagnostics, dataset, true);

    const { projectId, versionId } = params;
    const projects = useAtomValue(State.projects);
    const project = projects?.[projectId];
    const version = project?.versions.find((v) => v.versionId === versionId);
    
    // Find the current version's index and get the previous version
    const currentVersionIndex = project?.versions.findIndex((v) => v.versionId === versionId) ?? -1;
    const previousVersion = currentVersionIndex > 0 ? project?.versions[currentVersionIndex - 1] : null;
    
    // Calculate the change from previous version
    const previousTQI = previousVersion?.data.value ?? 0;
    const currentTQI = tqiRiskLevel.value;
    const tqiChange = currentTQI - previousTQI;
    const tqiChangeText = tqiChange > 0 && currentVersionIndex > 0
        ? `+${tqiChange.toFixed(2)} from previous version`
        : `-${tqiChange.toFixed(2)} from previous version`;

    return (
        <div className="max-h-[89vh] w-full overflow-y-scroll">
            <div className="grid gap-5 p-4">
                {/* Header Row */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Version Overview</h1>
                    <Button variant="default" size="lg" className="bg-blue-700">
                        Download
                    </Button>
                </div>

                {/* TQI and Pie Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-9">
                    <Card className="lg:col-span-1">
                        <CardHeader className="p-4">
                            <div className="flex flex-col items-center gap-3">
                                <div className="text-center">
                                    <CardTitle className="text-lg">{project?.name || projectId}</CardTitle>
                                    <CardDescription className="text-sm">{version?.name || versionId}</CardDescription>
                                </div>
                                <TQIBadge
                                    value={tqiRiskLevel.value}
                                    risk={getRisk(tqiRiskLevel.value, "normal")}
                                />
                                <CardDescription className="text-sm">
                                    {previousVersion ? tqiChangeText : ""}
                                </CardDescription>
                            </div>
                        </CardHeader>
                    </Card>

                    <Card className="lg:col-span-4">
                        <CardHeader className="pb-0">
                            <CardTitle>Risk Levels</CardTitle>
                        </CardHeader>
                        <div className="grid grid-cols-4 gap-2">
                            <PieChartComponent title="Characteristics" data={quality.chart} />
                            <PieChartComponent title="Factors" data={product.chart} />
                            <PieChartComponent title="Measures" data={measures.chart} />
                            <PieChartComponent title="Diagnostics" data={diagnostics.chart} />
                        </div>
                    </Card>
                </div>

                {/* Rest of the sections */}
                <Separator className="my-3 h-[1px] bg-border" />
                <SectionComponent
                    title="Characteristics"
                    nestedObj={dataset.factors.quality_aspects}
                    chartData={quality.chart}
                    colors={COLORS}
                    topProblematicItems={quality.top}
                    isDiagnostics={false}
                    propSelectedItem={selectedItem}
                />

                <Separator className="my-3 h-[1px] bg-border" />
                <SectionComponent
                    title="Factors"
                    nestedObj={dataset.factors.product_factors}
                    chartData={product.chart}
                    colors={COLORS}
                    topProblematicItems={product.top}
                    isDiagnostics={false}
                    propSelectedItem={selectedItem}
                />

                <Separator className="my-3 h-[1px] bg-border" />
                <SectionComponent
                    title="Measures"
                    nestedObj={dataset.measures}
                    chartData={measures.chart}
                    colors={COLORS}
                    topProblematicItems={measures.top}
                    isDiagnostics={false}
                    propSelectedItem={selectedItem}
                />

                <Separator className="my-3 h-[1px] bg-border" />
                <SectionComponent
                    title="Diagnostics"
                    nestedObj={dataset.diagnostics}
                    chartData={diagnostics.chart}
                    colors={COLORS}
                    topProblematicItems={diagnostics.top}
                    isDiagnostics={true}
                    propSelectedItem={selectedItem}
                />
            </div>
        </div>
    );
}
