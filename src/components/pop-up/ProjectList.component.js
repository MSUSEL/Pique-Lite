import { IconButton, List, ListItem, ListItemText, ListItemSecondaryAction } from "@mui/material";
import { Delete } from "@mui/icons-material";

import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setProjects } from '../../redux/piqueTree/PiqueTree.actions';
import { selectProjects } from '../../redux/piqueTree/PiqueTree.selector';

import { Buttercup, Blue, DeepKoamaru } from '../../utils/color';

// each item's styles 
const getItemStyles = (isDragging, draggableStyle) => ({
    // styles we need to apply on draggables
    ...draggableStyle,
    // some basic styles to make the items look nicer
    userSelect: "none",
    padding: "16px",
    margin: `0 0 8px 0`,
    color: "white",

    // change the background color if dragging
    background: isDragging ? Buttercup : Blue,
})

// get list styles
const getListStyles = (isDraggingOver) => ({
    background: isDraggingOver ? DeepKoamaru : "lightgrey",
    padding: 8,
    width: 400,
    position: "relative"
})

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

class ProjectList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.getItems(),
            version: ""
        }
    }

    // get the data we need
    getItems = () => {
        const result = this.props.projects.map(file => ({
            id: `${file.versionNumber}`,
            content: `v${file.versionNumber} ${file.fileName}`,
            fileContent: file.fileContent,
            versionNumber: file.versionNumber,
            fileName: file.fileName
        }));
        return result;
    }

    onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            this.state.items,
            result.source.index,
            result.destination.index
        );

        this.setState({ items });
        this.props.setProjects(items);
    }

    deleteId = (index) => {
        const result = [...this.state.items];
        result.splice(index, 1);
        this.setState({ items: result });
        this.props.setProjects(result);
    }

    render() {
        return (
            <div>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <List
                                ref={provided.innerRef}
                                style={getListStyles(snapshot.isDraggingOver)}
                                {...provided.droppableProps}
                            >
                                {this.state.items.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <ListItem
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyles(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}
                                            >
                                                <ListItemText primary={item.content} />
                                                <ListItemSecondaryAction
                                                    onClick={() => this.deleteId(index)}
                                                >
                                                    <IconButton>
                                                        <Delete/>
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </List>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    projects: selectProjects
})

const mapDispatchToProps = dispatch => ({
    setProjects: data => dispatch(setProjects(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
