import React from "react";
import { getRisk, useRiskColor } from "../../composites/RiskHelpers";

interface TQIBadgeProps {
    value: number;
    risk: ReturnType<typeof getRisk>;
}

// Based on TQIBadge.tsx in ProjectOverview but with a different style
// TODO: Refactor to use the same component for both ProjectOverview and VersionOverview
export const TQIBadge: React.FC<TQIBadgeProps> = ({ value, risk }) => {
    const { getRiskColor } = useRiskColor();

    return (
        <div
            className="flex min-w-[160px] flex-col items-center justify-center rounded-md p-6"
            style={{
                background: getRiskColor(value, "background", "normal")
            }}
        >
            <span
                className="mb-2 text-2xl font-medium"
                style={{
                    color: "white"
                }}
            >
                TQI
            </span>
            <span
                className="text-4xl font-bold leading-none"
                style={{
                    color: "white"
                }}
            >
                {value?.toFixed(3)}
            </span>
        </div>
    );
}; 