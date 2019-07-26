import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import ImgMediaCard from "./articleCard";
import Axios from "axios";

export default function CardsList() {
  const [list, setList] = useState({
    cards: []
  });

  useEffect(() => {
    Axios.get("/api/articles").then(res => {
      // console.log(res.data.articles[0].title);
      const cards = res.data.articles;
      console.log(cards);
      setList({ cards });
    });
  }, []);
  return (
    <>
      <Grid container spacing={24} style={{ padding: 24 }}>
        {list.cards.map(article => (
          <Grid item xs={8} sm={4} lg={4} xl={3}>
            <ImgMediaCard
              id={article.id}
              title={article.title}
              rating={article.rating}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
