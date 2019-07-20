import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import HomePage from "./pages/HomePage";
import BreadCrumbsNav from "./BreadCrumbsNav";
import SearchResults from "./pages/SearchResultsPage";
import ArticlePage from "./pages/ArticlePage";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Click the button to load data!"
    };
  }

  fetchData = () => {
    axios
      .get("/api/data") // You can simply make your requests to "/api/whatever you want"
      .then(response => {
        // handle success
        console.log(response.data); // The entire response from the Rails API

        console.log(response.data.message); // Just the message
        this.setState({
          message: response.data.message
        });
      });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <BreadCrumbsNav />
          <Route path="/" component={HomePage} exact />
          <Route path="/searchresults" component={SearchResults} />
          <Route path="/article/:id" component={ArticlePage} />

          {/* <h1>{this.state.message}</h1>
          <button onClick={this.fetchData}>Fetch Data</button> */}
        </div>
      </Router>
    );
  }
}

export default App;
