import React from "react";
<<<<<<< HEAD
=======
import { Link } from "react-router-dom";

>>>>>>> feature/article-page
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import link from "@material-ui/core/Link";

const BreadCrumbsNav = () => (
  <div className="bread-crumb-nav">
    <Breadcrumbs aria-label="Breadcrumb">
      <Link color="inherit" href="/">
        Home
      </Link>

      <Link color="inherit" href="/searchresults">
        Search Results
      </Link>

<<<<<<< HEAD
      <Link color="inherit" href="/article">
=======
      <Link color="inherit" to="/article/:id">
>>>>>>> feature/article-page
        Article
      </Link>
    </Breadcrumbs>
  </div>
);

export default BreadCrumbsNav;
