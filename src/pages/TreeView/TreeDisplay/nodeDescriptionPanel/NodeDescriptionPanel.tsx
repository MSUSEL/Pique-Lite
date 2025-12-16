import "./NodeDescriptionPanel.css";
import { useEffect, useState, useMemo, useRef } from "react";
import { determineNodeInfo } from "./NodeDescriptionPanelHelpers";
import { EyeOpenIcon, EyeNoneIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import * as Tooltip from '@radix-ui/react-tooltip';

export default function NodeDescriptionPanel(props: { nodes: any[]; impacts: any; setSelectedNode: Function }) {
  const [orderBy, setOrderBy] = useState<string>("default");
  const [orderDirection, setOrderDirection] = useState<string>("asc");
  const [newestNodeIndex, setNewestNodeIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [resizing, setResizing] = useState(false);
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number | null>(null);

  const handleMouseDown = () => {
    setResizing(true);
  };

  const handleMouseUp = () => {
    setResizing(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (resizing) {
      const newWidth = document.body.clientWidth - e.clientX;
      document.getElementById("node_description_panel").style.width = `${newWidth}px`;
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [resizing]);

  useEffect(() => {
    if (newestNodeIndex !== null && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    }
  }, [newestNodeIndex]);

  const makeNodePanelRectangles = useMemo(() => {
    if (orderBy === "nodeType") {
      const nodeTypeOrder = ["TQI", "Product Factor", "Measure", "Diagnostic"];
  
      const groupedNodes = {};
      nodeTypeOrder.forEach(type => {
        groupedNodes[type] = [];
      });
  
      props.nodes.forEach((node) => {
        const type = determineNodeType(node); 
        if (groupedNodes[type]) {
          groupedNodes[type].push(node);
        } else {
        }
      });
  
      const nodePanels: JSX.Element[] = [];
      nodeTypeOrder.forEach((type) => {
        const nodesOfType = groupedNodes[type];
        if (nodesOfType && nodesOfType.length > 0) {
          const nodePanelsOfType = nodesOfType.map((node, i) => (
            <div key={i} className={`node-panel`}>
              {determineNodeInfo(node, props.impacts)}
            </div>
          ));
          let nodeGroup = (
            <div key={type} className="node-group">
              <h2 className="node-type-header">
                {type}
              </h2>
              {nodePanelsOfType}
            </div>
          );
          if (nodesOfType.length > 2) {
            nodeGroup = (
              <div key={type} className="node-group-scrollable">
                <h2 className="node-type-header">
                  {type}
                </h2>
                <div className="scrollable-nodes">
                  {nodePanelsOfType}
                </div>
              </div>
            );
          }
          nodePanels.push(nodeGroup);
        }
      });
  
      return nodePanels;
    } else {
      let orderedNodes = [...props.nodes];

      switch (orderBy) {
        case "default":
          break;
        case "alphabetical":
          orderedNodes.sort((a, b) =>
            orderDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
          );
          break;
        case "value":
          orderedNodes.sort((a, b) => (orderDirection === "asc" ? a.value - b.value : b.value - a.value));
          break;
        default:
          break;
      }

      const index = orderedNodes.findIndex((node) => node === props.nodes[props.nodes.length - 1]);
      setNewestNodeIndex(index);

      return orderedNodes.map((node, i) => (
        <div
          key={i}
          className={`node-panel${i === index ? " highlight" : ""}`}
          ref={i === index ? scrollRef : undefined}
        >
          <div className="eye-icon" onClick={() => {
            setSelectedNodeIndex(i);
            props.setSelectedNode(node.name);
          }}>
            {selectedNodeIndex === i ? <EyeOpenIcon /> : <EyeNoneIcon />}
          </div>
          {determineNodeInfo(node, props.impacts)}
        </div>
      ));
    }
  }, [props.nodes, orderBy, orderDirection, props.impacts, props.setSelectedNode, selectedNodeIndex]);

  function determineNodeType(node) {
    if (node.name.includes("Measure")) return "Measure";
    else if (node.name.includes("Diagnostic")) return "Diagnostic";
    else if (node.name.includes("Category")) return "Product Factor";
    else if (node.name) return "TQI";
    else return "Quality Aspect";
  }

  const handleOrderByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderBy(e.target.value);
  };

  const handleOrderDirectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderDirection(e.target.value);
  };

  return (
    <div id="node_description_panel" className={`scrollable-panel ${resizing ? "resizable" : ""}`}>
      <div id="resize-handle" onMouseDown={handleMouseDown}></div>
      
      <div className="order-by-header">
        <label htmlFor="orderBy" style={{ marginLeft: "1%" }}> Order By: </label>
        <select id="orderBy" value={orderBy} onChange={handleOrderByChange}>
          <option value="default">Insertion Order</option>
          <option value="alphabetical">Alphabetical Order</option>
          <option value="value">Value Order</option>
          <option value="nodeType">Node Type Sort</option>
        </select>

        {orderBy === "nodeType" && (
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <InfoCircledIcon className="info-icon" />
            </Tooltip.Trigger>
            <Tooltip.Content className="TooltipContent" sideOffset={5}>
              Nodes are grouped by Node Type (TQI, Product Factor, Measure, Diagnostic)
              <Tooltip.Arrow className="TooltipArrow" />
            </Tooltip.Content>
          </Tooltip.Root>
        )}

        {orderBy === "default" && (
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <InfoCircledIcon className="info-icon" />
            </Tooltip.Trigger>
            <Tooltip.Content className="TooltipContent" sideOffset={5}>
              Nodes are sorted by the order they were selected in. 
              <Tooltip.Arrow className="TooltipArrow" />
            </Tooltip.Content>
          </Tooltip.Root>
        )}

        {(orderBy === "alphabetical") && (
          <>
            <label htmlFor="orderDirection"> Order Direction: </label>
            <select id="orderDirection" value={orderDirection} onChange={handleOrderDirectionChange}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <InfoCircledIcon className="info-icon" />
              </Tooltip.Trigger>
              <Tooltip.Content className="TooltipContent" sideOffset={5}>
                Nodes are sorted alphabetically in {orderDirection === "asc" ? "ascending order (A-Z)" : "descending order (Z-A)"}
                <Tooltip.Arrow className="TooltipArrow" />
              </Tooltip.Content>
            </Tooltip.Root>
          </>
        )}

        {(orderBy === "value") && (
          <>
            <label htmlFor="orderDirection"> Order Direction: </label>
            <select id="orderDirection" value={orderDirection} onChange={handleOrderDirectionChange}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <InfoCircledIcon className="info-icon" />
              </Tooltip.Trigger>
              <Tooltip.Content className="TooltipContent" sideOffset={5}>
                Nodes are sorted by value in {orderDirection === "asc" ? "ascending order (0-1)" : "descending order (1-0)"}
                <Tooltip.Arrow className="TooltipArrow" />
              </Tooltip.Content>
            </Tooltip.Root>
          </>
        )}
      </div>

      {makeNodePanelRectangles}
    </div>
  );
}