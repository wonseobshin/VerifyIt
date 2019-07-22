import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import HomePage from "./pages/HomePage";
import SearchBarApp from "./components/navBar";
import BreadCrumbsNav from "./components/BreadCrumbsNav";
import SearchResults from "./pages/SearchResultsPage";
import ArticlePage from "./pages/ArticlePage";
import NotFoundPage from "./pages/NotFoundPage";
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
          <SearchBarApp />
          <BreadCrumbsNav />
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/searchresults" component={SearchResults} />
            <Route path="/article/:id" component={ArticlePage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
