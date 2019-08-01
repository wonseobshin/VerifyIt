import React from "react";
import Annotation from "./Annotation";
import CreateNewAnnotation from "./CreateNewAnnotation"

class Word extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      annotationOpen: false,
      annotationFormOpen: false,
      selectionStarted: false
    }
  }

  onClickHandler () {
    if (this.props.overlappedAnnotation) {
      this.setState({annotationOpen: true});
    }
  }

  onMouseDownHandler () {
    this.setState({selectionStarted: true});
  }

  onMouseUpHandler () {
    //check for if overlappedannotation has ID and if it is truthy then do nothibng
    if (this.props.overlappedAnnotation) {
      console.log("No Annotation was selected. Click on an existing annotation.")
      return
    }
    if (!this.state.selectionStarted) {

      this.createAnnotationHandler();
    }
    this.setState({selectionStarted: false});
  }
  
  createAnnotationHandler () {
    this.setState({annotationFormOpen: true})
  }
  
  showAnnotationHandler () {
      this.setState({annotationOpen: true});
  }

  componentDidMount() {

  }

  render() {
    return (
      <span> 
        <span onSelect={function (event) {
          }} id={this.props.pos} className={this.props.overlappedAnnotation ? 'pink' : ''} annotation_id={this.props.overlappedAnnotation}> {this.props.word} </span>
        {this.state.annotationOpen && <Annotation {...this.props.match}/> }
        {this.state.annotationFormOpen && <CreateNewAnnotation {...this.props.match}/> }
      </span>
    
    )
  }
}

export default Word;
