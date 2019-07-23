import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CheckboxList from "../components/RatingQuestions";
import Button from "@material-ui/core/Button";
import CreateNewAnnotation from "../components/CreateNewAnnotation";
import Annotation from "../components/Annotation";
import Toggle from "../components/Toggle";
import Axios from "axios";

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

export default function CenteredGrid({ match }) {
  const classes = useStyles();

  const id = match.params.id;
  const [message, setMessage] = useState({
    title: "",
    content: ""
  });

  useEffect(() => {
    Axios.get(`/api/articles/${match.params.id}`).then(res => {
      const title = res.data.title;
      const content = res.data.content;
      setMessage({ title, content });
    });
  }, []);

  console.log("MESSAGE TITLE:", message.title);

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
          <div className="article-container">
            <h2>{message.title}</h2>
            <p>{message.content}</p>
            <Toggle>
              {({ on, toggle }) => (
                <div>
                  <Button
                    onClick={toggle}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Create Annotation
                  </Button>
                  {on && <CreateNewAnnotation on={on} />}
                </div>
              )}
            </Toggle>
            <Toggle>
              {({ on, toggle }) => (
                <div>
                  <Button
                    onClick={toggle}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    View Annotation
                  </Button>
                  {on && <Annotation on={on} />}
                </div>
              )}
            </Toggle>
          </div>
        </Grid>
        <Grid item xs={2}>
          <Toggle>
            {({ on, toggle }) => (
              <div>
                {" "}
                <Button
                  onClick={toggle}
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Rate
                </Button>
                {on && <CheckboxList on={on} />}
              </div>
            )}
          </Toggle>
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={8} />
      </Grid>
    </>
  );
}

// export default ArticlePage;
