import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectProjects } from "../../redux/piqueTree/PiqueTree.selector";

const ProjectsSorting = ({projects}) => {
    // data generator 
    const getItems = () => {
        projects.map((file, index) => ({
            id: `item-${index}`,
            versionNumber: `${file.versionNumber}`,
            fileName: `${file.fileName}`
        }))
    }
    const [placeHolderProps, setPlaceHolderProps] = React.useState({})
    const [items, setItems] = React.useState(getItems())
    const onDragEnd = result => {
        // dropped outside of the destination 
        
    }

    
}

const mapStateToProps = createStructuredSelector({
    projects: selectProjects
})

export default connect(mapStateToProps)(ProjectsSorting)

