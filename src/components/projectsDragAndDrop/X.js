import React, { Component } from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction
} from "@material-ui/core";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DeleteIcon from "@material-ui/icons/Delete";
import { createStructuredSelector } from "reselect";
import { selectProjects } from "../../redux/piqueTree/PiqueTree.selector";
import { connect } from "react-redux";

// fake data generator
const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `event-${k}`,
    primary: `eventd ${k}`
  }));



// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // styles we need to apply on draggables
  ...draggableStyle,
  background: "#ccedff",
  marginBottom: "2px",
  ...(isDragging && {
    background: "rgb(235,235,235)"
  })
});

const getListStyle = isDraggingOver => ({
  //background: isDraggingOver ? 'lightblue' : 'lightgrey',
});

class X extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: getItems(5),
      event: ""
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    });
  }

  deleteId = index => {
    console.log(index);
    let items = this.state.items;
    items.splice(index, 1);
    this.setState({
      items
    });
  };

  change = v => {
    this.setState({
      event: v.target.value
    });
  };

  handleKeyPress = k => {
    if (k.charCode === 13 && this.state.event.trim() !== "") {
      let items = this.state.items;
      const id = items.length;
      items.push({
        id: `event-${id}`,
        primary: this.state.event
      });
      this.setState({
        event: ""
      });
    }
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <div>
        <input
          value={this.state.event}
          onChange={this.change.bind(this)}
          onKeyPress={this.handleKeyPress.bind(this)}
        />
        <DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
                <List style={getListStyle(snapshot.isDraggingOver)}>
                  {this.state.items.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                          <ListItem
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <ListItemText primary={item.primary} />
                            <ListItemSecondaryAction
                              onClick={this.deleteId.bind(this, index)}
                            >
                              <IconButton>
                                <DeleteIcon />
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
    );
  }
}

const mapStateToProps = createStructuredSelector({
    projects: selectProjects
})

export default connect(mapStateToProps)(X)
