import React from "react";

class Word extends React.Component {
    componentDidMount() {
        console.log("HIGHLIGHT", this.props)
    }
    render() {
      return <span id={"e"+this.props.pos} className={this.props.highlight}>{this.props.word} </span>;
    }
}

export default Word;