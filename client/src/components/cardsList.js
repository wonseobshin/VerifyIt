import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import ImgMediaCard from "./articleCard";
import Axios from "axios";

export default function CardsList(props) {
  const [list, setList] = useState({
    cards: []
  });

  useEffect(() => {
    Axios.get("/api/articles/").then(res => {
      const cards = res.data.articles;
      setList({ cards });
    });
  }, []);
  return (
    <>
      <Grid container spacing={3} style={{ padding: 24 }}>
        {list.cards.map(article => (
          <Grid item xs={12} sm={4} lg={4} xl={3}>
            <ImgMediaCard id={article.id} title={article.title} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
