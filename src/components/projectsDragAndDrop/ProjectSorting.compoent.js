import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { removeFile, setProjects } from "../../redux/piqueTree/PiqueTree.actions";
import { selectProjects } from "../../redux/piqueTree/PiqueTree.selector";
import { Buttercup, DeepKoamaru, Blue } from "../../utils/color";

// fake data generator
const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `event-${k}`,
    content: `event ${k}`
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);
	return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
	// some basic styles to make the items look a bit nicer
	userSelect: "none",
	padding: grid * 2,
	margin: `0 0 ${grid}px 0`,
    color: "white",

	// change background colour if dragging
	background: isDragging ? Buttercup : Blue,

	// styles we need to apply on draggables
	...draggableStyle
});

const getListStyle = isDraggingOver => ({
	background: isDraggingOver ? DeepKoamaru : "lightgrey",
	padding: grid,
    width: 250,
    position: "relative"
});

const queryAttr = "data-rbd-drag-handle-draggable-id";


const ProjectsSorting = ({projects, setProjects}) => {
    // fake data generator
        console.log(projects)
      // perpare projects to show on the dnd list
      const getData = () => {
        const result = projects.map(file => {
           return ({
               id: `${file.versionNumber}`,
               content: `v${file.versionNumber} ${file.fileName}`,
               fileContent: file.fileContent,
               versionNumber: file.versionNumber
           })         
        })
        return result
    }
    const result = getData()
    console.log("altered data", getData())
  
	const [placeholderProps, setPlaceholderProps] = React.useState({});
    const [items, setItems] = React.useState(result)
    console.log("new sorting state", items)
    const onDragEnd = result => {
        // dropped outside of the destination 
        if (!result.destination) {
            return;
        }
        setPlaceholderProps({});
        setItems(items => reorder(items, result.source.index, result.destination.index))
        setProjects(items)
    }
    const onDragUpdate = update => {
        if(!update.destination){
          return;
        }
            const draggableId = update.draggableId;
            const destinationIndex = update.destination.index;
    
            const domQuery = `[${queryAttr}='${draggableId}']`;
            const draggedDOM = document.querySelector(domQuery);
    
            if (!draggedDOM) {
                return;
            }
            const { clientHeight, clientWidth } = draggedDOM;
    
            const clientY = parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) + [...draggedDOM.parentNode.children]
                .slice(0, destinationIndex)
                .reduce((total, curr) => {
                    const style = curr.currentStyle || window.getComputedStyle(curr);
                    const marginBottom = parseFloat(style.marginBottom);
                    return total + curr.clientHeight + marginBottom;
                }, 0);
    
            setPlaceholderProps({
                clientHeight,
                clientWidth,
          clientY,
          clientX: parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingLeft)
            });
        };
    
        const deleteId = (index)=> {
            let elements = items
            elements.splice(index, 1);
            setItems(elements)
          };
        // Normally you would want to split things out into separate components.
        // But in this example everything is just done in one place for simplicity
        return (
            <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                                                    {items.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >
                                            {item.content}  
                                            <button onClick={()=> deleteId(index)}>remove</button>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
    
                            {provided.placeholder}
                {/* <CustomPlaceholder snapshot={snapshot} /> */}
                <div style={{
                  position: "absolute",
                  top: placeholderProps.clientY,
                  left: placeholderProps.clientX,
                  height: placeholderProps.clientHeight,
                  background: "tomato",
                  width: placeholderProps.clientWidth
                }}/>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    };

const mapStateToProps = createStructuredSelector({
    projects: selectProjects
})
const mapDispatchToProps = dispatch => ({
    removeFile: data => dispatch(removeFile(data)),
    setProjects: data => dispatch(setProjects(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsSorting)

