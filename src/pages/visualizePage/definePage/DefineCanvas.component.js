import React, {useEffect, useRef, useState} from 'react';
import * as d3 from "d3";
import {select} from "d3-selection"

const DefineCanvas = () => {

    const [x,setX] = useState(0);
    const [y,setY] = useState(0);
    const [width,setWidth] = useState(document.getElementsByClassName("sc-hKMtZM cdQzQQ").item(0).getBoundingClientRect().width)
    const [height,setHeight] = useState(0.88 * document.getElementsByClassName("sc-hKMtZM cdQzQQ").item(0).getBoundingClientRect().height)

    const [dragStartCoordinates,setStartDragCoordinates] = useState({
        x : null,
        y : null
    })
    const [dragging,setDragging] = useState(false);
    const [wantToDrag,setWantToDrag] = useState(true);

    const define_canvas = useRef(null);

    useEffect(() => {
        showCanvas();
    })

    const showCanvas = () => {

        /**
         * Important piece
         * This removes the svg canvas before creating the new one, because without this
         * the svg's will continue to stack onto each other.
         */
        d3.select(define_canvas.current).selectAll("svg").remove();

        /**
         * Creating the zoom features for the tree display.
         */
        const zoom = (e) => {
            if (e.deltaY < 0) zoomIn()
            else zoomOut()
        }
        const zoomIn = () => {
            setWidth(width => 9*width/10);
            setHeight(height => 9*height/10);
        }
        const zoomOut = () => {
            setWidth(width => 10*width/9);
            setHeight(height => 10*height/9);
        }

        const svg = select(define_canvas.current)
            .append("svg")
            .attr("viewBox",`${x} ${y} ${width} ${height}`)
            .style("vertical-align","top")
            .style("background-color","beige")
            .on("mousewheel",zoom)

        /**
         * Methods that handle the dragging feature of the display.
         */
        const dragMove = (e) => {
            console.log(e)
            const diff_x = e.screenX-dragStartCoordinates.x;
            const diff_y = e.screenY-dragStartCoordinates.y;

            let dragStartCorsCopy = dragStartCoordinates;
            dragStartCorsCopy.x = e.screenX;
            dragStartCorsCopy.y = e.screenY;

            setStartDragCoordinates({...dragStartCorsCopy})

            setX(x => x - diff_x)
            setY(y => y - diff_y)
        }
        if (dragging) {
            d3.select("svg")
                .on("mousemove",dragMove)
        }
        const handleSVGMouseDown = (e) => {

            e.preventDefault()

            let dragStartCorsCopy = dragStartCoordinates;

            dragStartCorsCopy.x = e.screenX;
            dragStartCorsCopy.y = e.screenY;

            setStartDragCoordinates({...dragStartCorsCopy})
            setDragging(true);
        }
        const handleSVGMouseUp = () => {
            setDragging(false);
        }
        if (wantToDrag) {
            d3.select("svg")
                .on("mousedown", handleSVGMouseDown)
        }
        d3.select("svg")
            .on("mouseup", handleSVGMouseUp)

        svg.append("rect")
            .attr("width", 120)
            .attr("height", 80)
            .attr("rx", 2)
            .attr("x", width/2 - 60)
            .attr("y", 15)
            .style("fill", "lightgreen")
            .style("stroke-width", "1px")
            .style("stroke", "black")

        /**
         * Helper functions for the drag feature of the display.
         */
        const handleNodeMouseEnter = () => {
            setWantToDrag(false)
        }
        const handleNodeMouseLeave = () => {
            setWantToDrag(true)
        }
        d3.selectAll("rect")
            .on("mouseenter",handleNodeMouseEnter)
            .on("mouseleave",handleNodeMouseLeave)

        console.log("want to drag", wantToDrag)
        console.log("dragging", dragging)
    }

    return (
        <>
            <div id="define_canvas" ref={define_canvas}></div>
            <div id={"export_button"}><button>Export PIQUE Structure to JSON</button></div>
        </>
    )
}

export default DefineCanvas;