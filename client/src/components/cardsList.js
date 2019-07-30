import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import ImgMediaCard from "./articleCard";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

export default function CardsList() {
  const [list, setList] = useState({
    cards: []
  });

  useEffect(() => {
    Axios.get("/api/articles").then(res => {
      // console.log(res.data.articles[0].title);
      const cards = res.data.articles;
      setList({ cards });
    });
  }, []);
  return (
    <>
    <Grid container spacing={3} style={{ padding: 24 }}>
        {list.cards.map(article => (
          <Grid
            className="article-card-container"
            item
            xs={12}
            sm={4}
            lg={4}
            xl={3}
          >
            <ImgMediaCard
              key={article.id}
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
