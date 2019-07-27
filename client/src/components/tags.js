import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { WithContext as ReactTags } from "react-tag-input";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing(1)
  }
}));

export default function Tags({ article_id }) {
  const classes = useStyles();
  const [tagText, setTagText] = useState("");
  const [newTag, setNewTag] = useState("");

  function handleDelete() {
    alert("You clicked the delete icon.");
  }

  const handleSubmit = e => {
    e.preventDefault();
    Axios.post(`/api/articles/${article_id}/tags`, {
      tag: tagText
    })
      .then(response => {
        console.log("sent:", response.data.tag.tag);
        setNewTag(response.data.tag.tag);
      })
      .catch(err => console.log("Error", err));
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Tag
        </Button>
      </form>
      <Chip
        label={newTag}
        onDelete={handleDelete}
        className={classes.chip}
        color="primary"
      />
    </div>
  );
}
