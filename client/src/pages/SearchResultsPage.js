// import React, { useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Chip from "@material-ui/core/Chip";
// import { WithContext as ReactTags } from "react-tag-input";
// import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
// import Axios from "axios";

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: "flex",
//     justifyContent: "center",
//     flexWrap: "wrap"
//   },
//   chip: {
//     margin: theme.spacing(1)
//   }
// }));

// export default function SearchResults({ article_id, setTag }) {
//   const classes = useStyles();
//   const [tagText, setTagText] = useState("");

//   function handleDelete() {
//     alert("You clicked the delete icon.");
//   }

//   const handleSubmit = e => {
//     e.preventDefault();
//     Axios.post(`/api/articles/1/tags`, {
//       tag: tagText
//     })
//       .then(response => {
//         console.log("sent:", response.data.tag.tag);
//         setTag(response.data.tag.tag);
//       })
//       .catch(err => console.log("Error", err));
//   };

//   return (
//     <div className={classes.root}>
//       <form className={classes.root} onSubmit={handleSubmit}>
//         <TextField
//           id="standard-full-width"
//           style={{ margin: 8 }}
//           placeholder="Add Tag..."
//           multiline
//           fullWidth
//           margin="normal"
//           value={tagText}
//           onChange={event => setTagText(event.target.value)}
//           InputLabelProps={{
//             shrink: true
//           }}
//         />
//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           className={classes.button}
//           onClick={() => addTag()}
//         >
//           Tag
//         </Button>
//       </form>
//       <Chip
//         // label={response.data.tag}
//         onDelete={handleDelete}
//         className={classes.chip}
//         color="primary"
//       />
//     </div>
//   );
// }
