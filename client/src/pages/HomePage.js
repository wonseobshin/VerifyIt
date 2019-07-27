import React, {useState} from "react";
import {Redirect} from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CardsList from "../components/cardsList";
import ImgMediaCard from "../components/articleCard";
import rp from "../lib/scrapers/reutersScraper";
import Axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

export default function HomePage() {
  const classes = useStyles();
  const [newArticle, changeArticle] = useState(undefined);
  const [newURL, changeURL] = useState(undefined);
  const handleSubmit = e => {
    e.preventDefault();
    console.log(newURL)
    rp(newURL, (article) => {
      console.log(article);
      Axios.post("/api/articles", article)
      .then(res => {
        console.log('res:', res);
        // Manually redirecting because redirects for AJAX POST not working
        // window.location.href = res.request.responseURL;

        changeArticle({id: res.data.article_id});
      })
      .catch(err => console.log("error", err));
    });
  }

  const handleChange = e => {
    changeURL(e.target.value)
  }

  return (
    newArticle ? <Redirect to={"/article/" + newArticle.id}/> :
      <Grid container spacing={3}>
        <Grid item xs={3} />
        <Grid item xs={6} className="text-container">
          <Typography>
            <h1>Welcome to Verify It</h1>
            <p>
              That other text? Sadly, it’s no longer a 10. You know, it really
              doesn’t matter what you write as long as you’ve got a young, and
              beautiful, piece of text. My text is long and beautiful, as, it
              has been well documented, are various other parts of my website.
            </p>
          </Typography>
        </Grid>
        <Grid item xs={3} />
        <Grid item xs={3} />
        <Grid item xs={6}>
          <form className="URL-form" onSubmit={handleSubmit}>
            <TextField
              onChange={handleChange}
              id="filled-full-width"
              style={{ margin: 8 }}
              placeholder="Enter URL..."
              fullWidth
              margin="normal"
              variant="outlined"
              name="urlInput"
              InputLabelProps={{
                shrink: true
              }}
            />
          </form>
        </Grid>
        <Grid item xs={3} />

        <Grid item xs={12} className="article-card-container">
          <CardsList />
        </Grid>
      </Grid>
  );
}
