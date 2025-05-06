import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import React, { useState } from "react";

type AdditionalDetailsItemProps = {
    itemKey: string;
    value: any;
    depth: number
}

const AdditionalDetailsItem: React.FC<AdditionalDetailsItemProps> = ({
    itemKey, value, depth,
}) => {
    const [open, setOpen] = useState(false);
    const isNestedObject = typeof value === "object" && value !== null && !Array.isArray(value);

    const handleTriggerClick = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    if (isNestedObject) {
        return (
            <AccordionItem key={itemKey} value={itemKey}>
                <AccordionTrigger onClick={handleTriggerClick} style={{ marginLeft: `${depth * 10}px` }}>
                    {itemKey}
                </AccordionTrigger>
                <AccordionContent>
                    {Object.entries(value).map(([nestedKey, nestedValue]) => (
                        <AdditionalDetailsItem
                            key={nestedKey}
                            itemKey={nestedKey}
                            value={nestedValue}
                            depth={depth + 1}
                        />
                    ))}
                </AccordionContent>
            </AccordionItem>
        );
    } else {
        return (
            <AccordionItem
                key={itemKey}
                value={itemKey}
                style={{ marginLeft: `${depth * 10}px`, padding: "10px" }}>
                {itemKey}: {JSON.stringify(value, null, 2)}
            </AccordionItem>
        );
    }
};

export default AdditionalDetailsItem