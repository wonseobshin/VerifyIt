import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CheckboxList from "../components/RatingQuestions";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

export default function CenteredGrid() {
  const classes = useStyles();

  // const ArticlePage = ({ match }) => {
  //   const id = match.params.id;
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={10} />

        <Grid item xs={2}>
          <p className="rating-container">85</p>
        </Grid>
        <Grid item xs={2}>
          <div className="instructions-container">
            <h2>Instructions</h2>
            <p>Add an Annotation</p>
            <p>Add a Comment</p>
            <p>Update a Comment</p>
            <p>Add a Rating</p>
          </div>
        </Grid>
        <Grid item xs={8}>
          <div class="article-container">
            <h1>Article Container</h1>
          </div>
        </Grid>
        <Grid item xs={2}>
          <CheckboxList />
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper} />
        </Grid>
      </Grid>
    </>
  );
}

// export default ArticlePage;
