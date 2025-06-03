import React from "react";
import { getRisk } from "../../composites/RiskHelpers";

interface TQIBadgeProps {
    value: number;
    risk: ReturnType<typeof getRisk>;
}

export const TQIBadge: React.FC<TQIBadgeProps> = ({ value, risk }) => (
    <div
        className="flex min-w-[160px] flex-col items-center justify-center rounded-md p-6"
        style={{
            background: risk?.color || "gray"
        }}
    >
        <span
            className="mb-2 text-2xl font-medium"
            style={{
                color: risk.badgeColor
            }}
        >
            TQI
        </span>
        <span
            className="text-4xl font-bold leading-none"
            style={{
                color: risk.badgeColor
            }}
        >
            {value.toFixed(2)}
        </span>
    </div>
); 