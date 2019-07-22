import React from "react";
import { Link } from "react-router-dom";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import link from "@material-ui/core/Link";

const BreadCrumbsNav = () => (
  <div className="bread-crumb-nav">
    <Breadcrumbs aria-label="Breadcrumb">
      <Link color="inherit" to="/">
        Home
      </Link>

      <Link color="inherit" to="/searchresults">
        Search Results
      </Link>

      <Link color="inherit" to="/article/:id">
        Article
      </Link>
    </Breadcrumbs>
  </div>
);

export default BreadCrumbsNav;
