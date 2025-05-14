import { useState } from "react";
import * as schema from "../../state/visualizerSchema";
import { ClassifyNestedObjRiskLevel } from "./ClassifyNestedObjRiskLevel";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { getRisk } from "../../composites/RiskHelpers";
import { COLORS } from "./PieChartColor";
import SectionComponent from "./SectionComponent";

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
  const chart = ["Severe", "High", "Medium", "Low", "Insignificant"]
    .map((level, i) => ({ name: level, Count: riskCounts[i] || 0 }))
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

export default function VersionOverview({ dataset }: { dataset: schema.base.Schema }) {
  const [selectedItem,] = useState<any>(null);

  const tqiRiskData = ClassifyNestedObjRiskLevel(dataset.factors.tqi, false);
  const [tqiCounts, tqiNames] = tqiRiskData ?? [[], []];
  const tqiLevelIndex = tqiCounts.findIndex((count) => count > 0);
  const tqiRiskLevel = {
    level: ["Severe", "High", "Medium", "Low", "Insignificant"][tqiLevelIndex] || "",
    name: tqiNames?.[tqiLevelIndex]?.[0] || "",
    value: Object.values(dataset.factors.tqi)[0]?.value ?? 0,
  };

  // Consolidated all chart + top data
  const quality = getRiskInfo(dataset.factors.quality_aspects, dataset);
  const product = getRiskInfo(dataset.factors.product_factors, dataset);
  const measures = getRiskInfo(dataset.measures, dataset);
  const diagnostics = getRiskInfo(dataset.diagnostics, dataset, true);

  return (
    <div className="max-h-[89vh] w-[100%] overflow-y-scroll flex flex-row">
      <div className="max-h-[90vh] w-[100%] flex flex-col mt-6">
        {/* TQI header Card */}
        <Card>
            <div className="flex flex-row gap-15" style={{ justifyContent: "center" }}>
            {/* Left side */}
            <div className="flex flex-col">
              <strong className="self-center">Total Quality Index</strong>
              <div className="flex flex-row gap-6">
                <div>
                    <Avatar
                    className="TQIAvatar"
                    style={{
                      width: "75px",
                      height: "75px",
                      fontSize: "1.5rem",
                      borderRadius: "15%",
                    }}
                    >
                    <AvatarFallback
                      style={{
                      backgroundColor: getRisk(tqiRiskLevel.value, "normal").color,
                      borderRadius: "0", // Remove rounded corners
                      }}
                    >
                      {tqiRiskLevel.value?.toFixed(3)}
                    </AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex flex-col">
                  Project Name:
                  <strong>{tqiRiskLevel.name}</strong>
                </div>
              </div>
            </div>

            <Separator orientation="vertical" style={{ height: "8vw" }} decorative />

            {/* Right side */}
            <div className="flex flex-col items-center gap-3 text-sm">
              <strong>Lowest section scores</strong>
              <div className="flex flex-row gap-3">
                {[
                  { label: "Characteristics", data: quality },
                  { label: "Factors", data: product },
                  { label: "Measures", data: measures },
                  { label: "Diagnostics", data: diagnostics, type: "diagnostic" },
                ].map(({ label, data, type }) => (
                  <div key={label} className="flex flex-col items-center">
                    {label}
                    <Avatar
                      style={{
                        width: "60px",
                        borderRadius: "15%",
                      }}
                    >
                      <AvatarFallback style={{ backgroundColor: getRisk(data.top[0]?.details.value as number, type === "diagnostic" ? "diagnostic" : "normal").color }}>
                        {data.top[0]?.details.value.toFixed(2)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Section Components */}
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
