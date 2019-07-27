import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CheckboxList from "../components/RatingQuestions";
import Button from "@material-ui/core/Button";
import CreateNewAnnotation from "../components/CreateNewAnnotation";
import Annotation from "../components/Annotation";
import Toggle from "../components/Toggle";
import Axios from "axios";
import Word from "../components/Word";
import TagsList from "../components/tagsList";

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

  const [message, setMessage] = useState({
    title: "",
    content: [],
    highlight: "",
    annotationId: ""
  });

  const [rating, setRating] = useState({
    rating: ""
  });

  useEffect(() => {
    Axios.get(`/api/articles/${match.params.id}`).then(res => {
      const title = res.data.title;
      const content = res.data.content.split(" ");
      const highlight = "";
      const rating = res.data.rating;
      setMessage({ title, content, highlight });
      setRating({ rating });
    });
  }, []);

  function updateRating(newRating) {
    const rating = newRating;
    setRating({ rating });
  }

  function clickAnnotationHandler() {}

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={10} />

        <Grid item xs={2}>
          <h1 className="rating-container">{rating.rating}</h1>
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

            {/* {console.log(typeof message.content)} */}
            {message.content.map((word, pos) => {
              return (
                <Word
                  clickAnnotationHandler={clickAnnotationHandler}
                  key={pos}
                  pos={pos}
                  word={word}
                  highlight={message.highlight}
                />
              );
            })}

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
                  {on && <CreateNewAnnotation {...match} on={on} />}
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
                {on && (
                  <CheckboxList
                    updateRating={updateRating}
                    match={match}
                    on={on}
                  />
                )}
              </div>
            )}
          </Toggle>
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <TagsList article_id={match.params.id} />
        </Grid>
      </Grid>
    </>
  );
}
