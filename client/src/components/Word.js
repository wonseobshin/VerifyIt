import React from "react";
import Annotation from "./Annotation";
import CreateNewAnnotation from "./CreateNewAnnotation";

class Word extends React.Component {
  constructor(props) {
    // console.log("WHAT THE F", props);
    super(props);

    this.state = {
      annotationOpen: false,
      annotationFormOpen: false,
      selectionStarted: false
    };
  }

  onClickHandler() {
    if (this.props.overlappedAnnotation) {
      this.setState({ annotationOpen: true });
    }
  }

  onMouseDownHandler() {
    this.setState({ selectionStarted: true });
  }

  onMouseUpHandler() {
    //check for if overlappedannotation has ID and if it is truthy then do nothibng
    if (this.props.overlappedAnnotation) {
      console.log(
        "No Annotation was selected. Click on an existing annotation."
      );
      return;
    }
    if (!this.state.selectionStarted) {
      this.createAnnotationHandler();
    }
    this.setState({ selectionStarted: false });
  }

  createAnnotationHandler() {
    //from on mouse up and needs to build annotation
    //use setstate to disply
    this.setState({ annotationFormOpen: true });
  }

  showAnnotationHandler() {
    this.setState({ annotationOpen: true });
  }

  // showAnnotation() {
  //   if(){
  //     console.log("ANNOTATOIN OPENNNN")
  //     this.setState({annotationOpen: true})
  //   }
  // }

  // onDoubleClickHandler () {
  //   if (this.props.overlappedAnnotation) {
  //     this.setState({annotationOpen: true});
  //   }
  // }

  // onMouseUpHandler () {
  //   //check for if overlappedannotation has ID and if it is truthy then do nothibng
  //   if (this.props.overlappedAnnotation) {
  //     return
  //   }
  //   this.createAnnotationHandler()
  //   console.log("No Annotation was selected. Click on an existing annotation.")
  // }

  componentDidMount() {
    console.log("WHAT THE F", this.props);
  }

  render() {
    return (
      <span /*onClick={this.onClickHandler.bind(this)} onMouseUp={this.onMouseUpHandler.bind(this)}*/
      >
        <span
          onSelect={function(event) {
            // console.log('select event:', event);
          }}
          id={this.props.pos}
          className={this.props.overlappedAnnotation ? "pink" : ""}
          annotation_id={this.props.overlappedAnnotation}
        >
          {" "}
          {this.props.word}{" "}
        </span>
        {this.state.annotationOpen && <Annotation {...this.props.match} />}
        {this.state.annotationFormOpen && (
          <CreateNewAnnotation {...this.props.match} />
        )}
      </span>
    );
  }
}

export default Word;
