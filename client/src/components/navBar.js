import React from "react";
import TextField from "@material-ui/core/TextField";
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

export default function HomePage() {
  return (
    <nav className="nav-bar nav-container">
      <div className="logo-container">
        <Link to={`/`}>
          <h1 className="nav-item main-logo">verify it.</h1>
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
              placeholder="Search Articles: Try 'Pyramids'"
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
}

// =======
// import useScrollTrigger from '@material-ui/core/useScrollTrigger';

// function HideOnScroll(props) {
//   const trigger = useScrollTrigger({
//     disableHysteresis: true,
//     threshold: 0,
//   });
//   return (
//     <Slide in={!trigger}>
//       <div>Hello</div>
//     </Slide>
//   );
// }


// // import React from 'react';
// import PropTypes from 'prop-types';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import useScrollTrigger from '@material-ui/core/useScrollTrigger';
// import Box from '@material-ui/core/Box';
// import Container from '@material-ui/core/Container';

// function ElevationScroll(props) {
//   const { children, window } = props;
//   // Note that you normally won't need to set the window ref as useScrollTrigger
//   // will default to window.
//   // This is only being set here because the demo is in an iframe.
//   const trigger = useScrollTrigger({
//     disableHysteresis: true,
//     threshold: 0,
//     target: window ? window() : undefined,
//   });

//   return React.cloneElement(children, {
//     elevation: trigger ? 14 : 0,
//   });
// }

// ElevationScroll.propTypes = {
//   children: PropTypes.element.isRequired,
//   /**
//    * Injected by the documentation to work in an iframe.
//    * You won't need it on your project.
//    */
//   window: PropTypes.func,
// };

// export default function ElevateAppBar(props) {
//   return (
//     <React.Fragment>
//       <CssBaseline />
//       <ElevationScroll {...props}>
//         <nav className="nav-bar nav-container">
//           <div className="logo-container">
//             <Link to={`/`}>
//               <h1 className="nav-item main-logo">verify it.</h1>
//             </Link>
//           </div>
//           <div className="search-container">
//             <form>
//               {/* <TextField
//                 id="filled-search"
//                 label="Search field"
//                 type="search"
//                 className="search"
//                 margin="normal"
//                 variant="filled"
//               /> */}
//               <Paper>
                
//                 <InputBase
//                   className="searchInput"
//                   placeholder="Search Articles: Try 'Pyramids'"
//                   inputProps={{ 'aria-label': 'Search Google Maps' }}
//                 />
//                 <IconButton className="iconButton" aria-label="Search">
//                   <SearchIcon />
//                 </IconButton>
                
//               </Paper>
//             </form>
//           </div>
//         </nav>
//       </ElevationScroll>
//     </React.Fragment>
//   );
// }