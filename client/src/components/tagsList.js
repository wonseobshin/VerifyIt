import React, { useState, useEffect } from "react";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import TagsForm from "./tagsForm";

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

export default function TagsList(params) {
  const classes = useStyles();
  const [list, setList] = useState({
    tags: []
  });

  useEffect(() => {
    Axios.get(`/api/articles/${params.article_id}/tags`).then(res => {
      console.log(res.data);
      const tags = res.data.map(obj => {
        return obj.tag;
      });
      setList({ tags });
    });
  }, []);

  // function handleDelete(params) {
  //   console.log(params);
  //   Axios.delete(`/api/articles/${params.article_id}/tags/${params.id}`).then(
  //     res => {
  //       console.log(res.data);
  //     }
  //   );
  // }
  function handleResponse(tag) {
    setList({ tags: [...list.tags, tag.tag] });
  }

  return (
    <>
      <TagsForm
        article_id={params.article_id}
        handleResponse={handleResponse}
      />

      {list.tags.map(tag => (
        <Chip
          key={tag.id}
          label={tag}
          // onDelete={handleDelete}
          className={classes.chip}
        />
      ))}
    </>
  );
}
