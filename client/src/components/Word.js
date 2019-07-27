import React from "react";
import Annotation from "./Annotation";
class Word extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      annotationOpen: false
    };
  }

  // showAnnotation() {
  //   if(){
  //     console.log("ANNOTATOIN OPENNNN")
  //     this.setState({annotationOpen: true})
  //   }
  // }

  componentDidMount() {}

  render() {
    return (
      /* <span onClick={this.showAnnotation}> */
      <span id={this.props.pos} className={this.props.highlight}>
        {" "}
        {this.props.word}{" "}
      </span>
      /*  {this.state.annotationOpen && <Annotation clickAnnotationHandler={this.props.clickAnnotationHandler} /> }
      </span>
    */
    );
  }
}

export default Word;
