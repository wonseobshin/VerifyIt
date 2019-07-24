import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CheckboxList from "../components/RatingQuestions";
import Button from "@material-ui/core/Button";
import CreateNewAnnotation from "../components/CreateNewAnnotation";
import Annotation from "../components/Annotation";
import Toggle from "../components/Toggle";
import Axios from "axios";
import Word from "../components/Word"

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
    content: [],
    highlight: ""
  });

  useEffect(() => {
    Axios.get(`/api/articles/${match.params.id}`).then(res => {
      const title = res.data.title;
      const content = res.data.content.split(" ");
      const highlight = ""
      setMessage({ title, content, highlight });
    });
  }, []);

  // console.log("MESSAGE TITLE:", message.title);
  function getSelectedText() {
    const selection = {
      start: 0,
      end: 0,
      text: ""
    };
    
    const sel = document.getSelection();
    console.log(sel);

    selection.start = sel.anchorOffset;
    selection.end = sel.focusOffset;
    selection.text = sel.toString();
    
    console.log(selection);

    setHighlight(sel);

    if (sel) return selection;
  }

  function setHighlight(sel) {
    // sel.anchorNode.parentNode.classList.add('blue')
    // sel.focusNode.parentNode.classList.add('blue')

    for(let word in message.content){
      if (word.id > sel.anchorNode.parentNode.id){
        word.classList.add('blue')
      }
    }
  }
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
            {console.log(typeof message.content)}
            {message.content.map((word, pos) => {
              return <Word key={pos} word={word} highlight={message.highlight}/>
            })}
            <button onClick={getSelectedText}>DO THE THING</button>
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
