import React from "react";
import TextField from "@material-ui/core/TextField";

const NavBar = () => (
  <nav className="nav-bar">
    <h1 className="nav-item">Verify It</h1>
    <div className="search-container">
      <form>
        <TextField
          className="search"
          id="outlined-search"
          style={{ margin: 8 }}
          type="search"
          placeholder="Search..."
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true
          }}
        />
      </form>
    </div>
  </nav>
);

export default NavBar;
