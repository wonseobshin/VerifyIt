import React from "react";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

const BreadCrumbsNav = () => (
  <div className="bread-crumb-nav">
    <Breadcrumbs aria-label="Breadcrumb">
      <Link color="inherit" to="/">
        Home
      </Link>

      <Link color="inherit" to="/searchresults">
        Search Results
      </Link>

      <Link color="inherit" to="/article">
        Article
      </Link>
    </Breadcrumbs>
  </div>
);

export default BreadCrumbsNav;
