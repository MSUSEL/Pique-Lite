import { Accordion } from "@/components/ui/accordion";
import AdditionalDetailsItem from "./AdditionalDetailsItem";

export const renderSingleObjectDetails = (
    details: { [key: string]: any },
    depth: number = 0
) => {
    return (
        <Accordion type="multiple">
            {Object.entries(details).map(([key, value]) => {
                return (
                    <AdditionalDetailsItem
                        key={key}
                        itemKey={key}
                        value={value}
                        depth={depth}
                    />
                );
            })}
        </Accordion>
    );
};