import React, { useState, useEffect } from "react";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
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

export default function TagsList(params) {
  const [list, setList] = useState({
    tags: []
  });

  useEffect(() => {
    Axios.get(`/api/articles/${params.article_id}/tags`).then(res => {
      const tags = res.data.tags.map(obj => {
        return obj.tag;
      });
      console.log("Res", tags);
      setList({ tags });
    });
  }, []);
  console.log("list 2", list.tags);
  return (
    <>
      {list.tags.map(tag => (
        <Chip key={tag.id} label={tag} />
      ))}
    </>
  );
}
