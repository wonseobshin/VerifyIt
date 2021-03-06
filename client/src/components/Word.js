import React from "react";
import Annotation from "./Annotation";
import CreateNewAnnotation from "./CreateNewAnnotation";
import Axios from "axios";
import { lighten, hslToRgb } from "@material-ui/core/styles";

class Word extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      annotationOpen: false,
      annotationFormOpen: false,
      selectionStarted: false,

      backgroundColor: ""
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
    this.setState({ annotationFormOpen: true });
  }

  showAnnotationHandler() {
    this.setState({ annotationOpen: true });
  }

  componentDidMount() {}

  componentWillMount() {
    if (this.props.overlappedAnnotation) {
      Axios.get(
        `/api/articles/${this.props.match.params.id}/annotations/${
          this.props.overlappedAnnotation
        }`
      ).then(res => {
        // console.log("GET", res.data);
        const points = res.data.point;
        let number = 100 - points * 0.077 * 100;
        const colors = `hsla(0, 100%, ${number}%, .9)`;
        console.log("GET", colors);
        this.setState({ backgroundColor: colors });
      });
    }
  }

  // componentWillReceiveProps() {
  //   console.log("PROPS", this.props.upVotes);
  //   let number = 100 - this.props.upVotes * 0.066 * 100;
  //   const colors = `hsl(0, 100%, ${number}%)`;
  //   console.log("PROPS", colors);
  //   this.setState({ backgroundColor: colors });
  // }
  render() {
    return (
      <span>
        <span
          onSelect={function(event) {}}
          id={this.props.pos}
          className={this.props.overlappedAnnotation ? "pink" : ""}
          annotation_id={this.props.overlappedAnnotation}
          style={{ backgroundColor: this.state.backgroundColor }}
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
