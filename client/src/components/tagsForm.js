import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { WithContext as ReactTags } from "react-tag-input";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import { List } from "@material-ui/core";
import LocalOffer from "@material-ui/icons/LocalOffer";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "row"
  },
  chip: {
    margin: theme.spacing(1)
  },
  button: {}
}));

export default function TagsForm({ article_id, handleResponse }) {
  const classes = useStyles();
  const [tagText, setTagText] = useState("");
  // const [newTag, setNewTag] = useState("");

  function handleDelete() {
    alert("You clicked the delete icon.");
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log("e.target.value", tagText);
    if (tagText !== "") {
      Axios.post(`/api/articles/${article_id}/tags`, {
        tag: tagText
      })
        .then(response => {
          console.log("sent:", response.data.tag);
          const tag = response.data.tag;
          // const tags = response.data.map(obj => {
          //   return obj.tag;
          // });
          // setList({ tags });
          handleResponse(tag);
        })
        .catch(err => console.log("Error", err));
    }
    setTagText("");
  };

  return (
    <div className={classes.root}>
      <form className={classes.root} onSubmit={handleSubmit}>
        <TextField
          id="standard-full-width"
          style={{ margin: 8 }}
          placeholder="Add Tag..."
          multiline
          fullWidth
          margin="normal"
          value={tagText}
          onChange={event => setTagText(event.target.value)}
          InputLabelProps={{
            shrink: true
          }}
        />
        <IconButton type="submit" className={classes.root} aria-label="Tag">
          <LocalOffer />
        </IconButton>
        {/* <Button
          type="submit"
          variant="contained"
          color="primary"
          id="tag-button"
          className={classes.button}
        >
          Tag
        </Button> */}
      </form>
    </div>
  );
}
