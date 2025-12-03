import * as schema from "../../state/visualizerSchema";
import { ClassifyNestedObjRiskLevel } from "./ClassifyNestedObjRiskLevel";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getRisk, getAllRiskLevels } from "../../composites/RiskHelpers";
import PieChartComponent from "./PieChartComponent";
import { TQIBadge } from "./TQIBadge";
import { State } from "../../state";
import { useState } from "react";
import { useAtomValue } from "jotai";
import SectionComponent from "./SectionComponent";
import LowestScoresCard from "./LowestScoresCard";

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
    const [selectedTab, setSelectedTab] = useState("characteristics");

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
    const currentVersion = project?.versions[currentVersionIndex];
    const previousVersion = currentVersionIndex > 0 ? project?.versions[currentVersionIndex - 1] : null;
    
    // Calculate the change from previous version
    const previousTQI = previousVersion?.data.value ?? 0;
    const currentTQI = currentVersion?.data.value ?? 0;
    const tqiChange = currentTQI - previousTQI;
    const tqiChangeText = tqiChange > 0 && currentVersionIndex > 0
        ? `+${tqiChange.toFixed(2)} from previous version`
        : `${tqiChange.toFixed(2)} from previous version`;

    return (
        <div className="w-full overflow-x-hidden">
            <div className="grid gap-5 pl-5 pr-5 max-w-full">
                {/* Header Row */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Version Overview</h1>
                    <Button variant="default" size="lg" className="bg-blue-700 cursor-pointer">
                        Download
                    </Button>
                </div>

                {/* TQI and Pie Charts Row */}
                <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 max-w-full">
                    <Card className="xl:col-span-1">
                        <CardHeader className="p-4">
                            <div className="flex flex-col items-center gap-3">
                                <div className="text-center">
                                    <CardTitle className="text-lg">{project?.name || projectId}</CardTitle>
                                    <CardDescription className="text-sm">{version?.name || versionId}</CardDescription>
                                </div>
                                <TQIBadge
                                    value={currentTQI}
                                    risk={getRisk(currentTQI, "normal")}
                                />
                                <CardDescription className="text-sm">
                                    {previousVersion ? tqiChangeText : ""}
                                </CardDescription>
                            </div>
                        </CardHeader>
                    </Card>

                    <Card className="xl:col-span-4">
                        <CardHeader className="pb-2">
                            <CardTitle>Risk Levels</CardTitle>
                        </CardHeader>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 p-1">
                            <PieChartComponent title="Characteristics" data={quality.chart} />
                            <PieChartComponent title="Factors" data={product.chart} />
                            <PieChartComponent title="Measures" data={measures.chart} />
                            <PieChartComponent title="Diagnostics" data={diagnostics.chart} />
                        </div>
                    </Card>
                </div>

                {/* Rest of the sections */}
                <Separator className="my-3 h-[1px] bg-border" />
                
                {/* Main content grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-full min-w-0">
                    {/* Tabbed Accordion Section */}
                    <div className="lg:col-span-2 xl:col-span-3 min-w-0">
                        <SectionComponent
                            dataset={{
                                factors: {
                                    quality_aspects: dataset.factors.quality_aspects,
                                    product_factors: dataset.factors.product_factors
                                },
                                measures: dataset.measures,
                                diagnostics: dataset.diagnostics
                            }}
                            onTabChange={(tab) => setSelectedTab(tab)}
                        />
                    </div>

                    {/* Lowest Scores Card */}
                    <div className="lg:col-span-1 xl:col-span-2 min-w-0">
                        <LowestScoresCard
                            title="Lowest 3 Scores"
                            items={
                                selectedTab === "characteristics" ? quality.top :
                                selectedTab === "factors" ? product.top :
                                selectedTab === "measures" ? measures.top :
                                diagnostics.top
                            }
                            isDiagnostics={selectedTab === "diagnostics"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
