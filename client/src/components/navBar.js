import React from "react";
import TextField from "@material-ui/core/TextField";
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const NavBar = () => (
    <nav className="nav-bar nav-container">
      <div className="logo-container">
        <Link to={`/`}>
          <h1 className="nav-item main-logo">Verify It</h1>
        </Link>
      </div>
      <div className="search-container">
        <form>
          {/* <TextField
            id="filled-search"
            label="Search field"
            type="search"
            className="search"
            margin="normal"
            variant="filled"
          /> */}
          <Paper>
            
            <InputBase
              className="searchInput"
              placeholder="Search..."
              inputProps={{ 'aria-label': 'Search Google Maps' }}
            />
            <IconButton className="iconButton" aria-label="Search">
              <SearchIcon />
            </IconButton>
            
          </Paper>
        </form>
      </div>
    </nav>
);

export default NavBar;
