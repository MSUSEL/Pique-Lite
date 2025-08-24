import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableHeader
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { getRisk } from "../../composites/RiskHelpers";
import { renderSingleObjectDetails } from "./RenderSingleObjectDetails";
import {
  ProcessedVisualizerDataType,
} from "@/state/VisualizerStateHandling/use-processed-data";

interface HierarchicalViewProps {
  dataset: ProcessedVisualizerDataType;
}

interface NodeProps {
  nodeData: any;
  nodeKey: string;
  nodeName: string;
  nodeType: 'tqi' | 'characteristic' | 'factor' | 'measure' | 'diagnostic';
  level: number;
  dataset: ProcessedVisualizerDataType;
}

const getChildrenFromWeights = (
  weights: Record<string, number>, 
  dataset: ProcessedVisualizerDataType, 
  currentNodeType: string
): { data: any, type: 'characteristic' | 'factor' | 'measure' | 'diagnostic' } => {
  const childKeys = Object.keys(weights);
  const children: any = {};
  let childType: 'characteristic' | 'factor' | 'measure' | 'diagnostic';

  // Determine where to look for children based on current node type
  if (currentNodeType === 'tqi') {
    // TQI children are characteristics (quality_aspects)
    childType = 'characteristic';
    childKeys.forEach(key => {
      if (dataset?.factors?.quality_aspects?.[key]) {
        children[key] = dataset.factors.quality_aspects[key];
      }
    });
  } else if (currentNodeType === 'characteristic') {
    // Characteristic children are factors (product_factors)
    childType = 'factor';
    childKeys.forEach(key => {
      if (dataset?.factors?.product_factors?.[key]) {
        children[key] = dataset.factors.product_factors[key];
      }
    });
  } else if (currentNodeType === 'factor') {
    // Factor children are measures
    childType = 'measure';
    childKeys.forEach(key => {
      if (dataset?.measures?.[key]) {
        children[key] = dataset.measures[key];
      }
    });
  } else {
    // Measures might have diagnostic children
    childType = 'diagnostic';
    childKeys.forEach(key => {
      if (dataset?.diagnostics?.[key]) {
        children[key] = dataset.diagnostics[key];
      }
    });
  }

  return { data: children, type: childType };
};

const HierarchicalNode: React.FC<NodeProps> = ({
  nodeData,
  nodeKey,
  nodeName,
  nodeType,
  level,
  dataset
}) => {
  const indentStyle = { paddingLeft: `${level * 32}px` };
  
  // Get risk data for progress bar
  const riskData = getRisk(
    nodeData.value,
    nodeType === 'diagnostic' ? "diagnostic" : "normal"
  );
  const progressValue = (nodeData.value || 0) * 100;

  // Get children from weights
  const children = nodeData.weights ? getChildrenFromWeights(nodeData.weights, dataset, nodeType) : { data: {}, type: 'measure' as const };
  const hasChildren = Object.keys(children.data).length > 0;

  return (
    <AccordionItem value={nodeKey} style={indentStyle}>
      <AccordionTrigger className="hover:no-underline py-3">
        <div className="flex items-center justify-between w-full mr-4">
          <div className="flex items-center gap-2">
            <span className="font-medium">{nodeName}</span>
            {hasChildren && (
              <span className="text-xs text-muted-foreground">
                ({Object.keys(children.data).length} {children.type}s)
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {nodeData.value !== undefined && (
              <>
                <span className="font-mono text-sm">{nodeData.value.toFixed(2)}</span>
                <div className="w-20">
                  <Progress
                    value={Math.min(Math.max(progressValue, 0), 100)}
                    bg={riskData.color}
                    className="h-2"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pb-2">
        {/* Basic info as simple key-value pairs */}
        <div className="space-y-1 mb-4">
          {nodeData.description && (
            <div className="flex">
              <span className="text-sm font-medium text-muted-foreground w-20 flex-shrink-0">Description</span>
              <span className="text-sm">{nodeData.description}</span>
            </div>
          )}
          {nodeData.eval_strategy && (
            <div className="flex">
              <span className="text-sm font-medium text-muted-foreground w-20 flex-shrink-0">Strategy</span>
              <span className="text-sm font-mono">
                {typeof nodeData.eval_strategy === 'string' 
                  ? nodeData.eval_strategy 
                  : nodeData.eval_strategy.name}
              </span>
            </div>
          )}
          {nodeData.normalizer && (
            <div className="flex">
              <span className="text-sm font-medium text-muted-foreground w-20 flex-shrink-0">Normalizer</span>
              <span className="text-sm font-mono">
                {typeof nodeData.normalizer === 'string' 
                  ? nodeData.normalizer 
                  : nodeData.normalizer.name}
              </span>
            </div>
          )}
          {nodeData.utility_function && (
            <div className="flex">
              <span className="text-sm font-medium text-muted-foreground w-20 flex-shrink-0">Utility</span>
              <span className="text-sm font-mono">
                {typeof nodeData.utility_function === 'string' 
                  ? nodeData.utility_function 
                  : nodeData.utility_function.name}
              </span>
            </div>
          )}
        </div>

        {/* Additional details */}
        {Object.keys(nodeData).some(k => !['name', 'value', 'description', 'weights', 'eval_strategy', 'normalizer', 'utility_function'].includes(k)) && (
          <Accordion type="multiple" className="mb-3">
            <AccordionItem value={`${nodeKey}-details`}>
              <AccordionTrigger className="text-xs py-1">
                Additional details
              </AccordionTrigger>
              <AccordionContent>
                {renderSingleObjectDetails(nodeData)}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}

        {/* Nested children */}
        {hasChildren && (
          <Accordion type="multiple">
            {Object.entries(children.data).map(([childKey, childData]: [string, any]) => (
              <HierarchicalNode
                key={childKey}
                nodeData={childData}
                nodeKey={childKey}
                nodeName={childData.name || childKey}
                nodeType={children.type}
                level={level + 1}
                dataset={dataset}
              />
            ))}
          </Accordion>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};

export const HierarchicalView: React.FC<HierarchicalViewProps> = ({
  dataset
}) => {
  if (!dataset) {
    return <div>Loading data...</div>;
  }

  return (
    <Accordion type="multiple" className="w-full">
      {/* Start with TQI as root */}
      {dataset.factors?.tqi && Object.entries(dataset.factors.tqi).map(([tqiKey, tqiData]: [string, any]) => (
        <HierarchicalNode
          key={tqiKey}
          nodeData={tqiData}
          nodeKey={tqiKey}
          nodeName={tqiData.name || tqiKey}
          nodeType="tqi"
          level={0}
          dataset={dataset}
        />
      ))}
    </Accordion>
  );
};

export default HierarchicalView;