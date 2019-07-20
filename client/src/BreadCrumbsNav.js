import React from "react";
import { Link } from "react-router-dom";

const BreadCrumbsNav = () => (
  <div>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/searchresults">Search Results</Link>
      </li>
      <li>
        <Link to="/article">Article</Link>
      </li>
    </ul>
  </div>
);

export default BreadCrumbsNav;
