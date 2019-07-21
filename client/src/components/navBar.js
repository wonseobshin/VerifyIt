import React from "react";
import TextField from "@material-ui/core/TextField";
import { Link } from 'react-router-dom'

const NavBar = () => (
    <nav className="nav-bar nav-container">
      <div className="logo-container">
        <Link to={`/`}>
          <h1 className="nav-item main-logo">Verify It</h1>
        </Link>
      </div>
      <div className="search-container">
        <form>
          <TextField
            id="filled-search"
            label="Search field"
            type="search"
            className="search"
            margin="normal"
            variant="filled"
          />
        </form>
      </div>
    </nav>
);

export default NavBar;
