import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ImgMediaCard from "../components/articleCard";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

// const handleSubmit = (event) => {
  // event.preventDefault();
  //decide which scraper to call (optional)
  

  //call the scraper

  // send scraper data to 
  //post localhost:3001/articles

  //will return an article object
  //also save article to db

  //redirect to articles/article.id
// }


export default function HomePage() {
  const classes = useStyles();
  return (
    <>
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
          <form className="URL-form">
            <TextField
              id="filled-full-width"
              style={{ margin: 8 }}
              placeholder="Enter URL..."
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true
              }}
            />
          </form>
        </Grid>
        <Grid item xs={3} />

        <Grid item xs={12} className="article-card-container">
          <ImgMediaCard />
          <ImgMediaCard />
          <ImgMediaCard />
          <ImgMediaCard />
        </Grid>
      </Grid>
    </>
  );
}
