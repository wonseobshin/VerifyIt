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
import Instruction from "../components/Instruction";
import LoadingSpinner from "../components/LoadingSpinner";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  button: {
    width: "100%"
  }
}));

export default function CenteredGrid({ match }) {
  const classes = useStyles();

  const [fakebox, setFakebox] = useState({
    rating: 0,
    decision: []
  });

  const [message, setMessage] = useState({
    title: "",
    content: [],
    overlappedAnnotations: [],
    highlight: "",
    annotationId: ""
  });

  const [rating, setRating] = useState({
    rating: ""
  });

  const [annotation, setAnnotation] = useState({
    view: false,
    new: false
  });

  const [upVotes, setUpVotes] = useState({
    upVotes: 0
  });

  function handlePoints(points) {
    console.log("NEW VOTES", points);
    setUpVotes(points);
  }

  const [sel, setSel] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  function getArticle(articleId) {
    return Axios.get(`/api/articles/${articleId}`);
  }

  function getAnnotations(articleId) {
    return Axios.get(`/api/articles/${articleId}/annotations`);
  }

  useEffect(() => {
    Axios.all([
      getArticle(match.params.id),
      getAnnotations(match.params.id)
    ]).then(
      Axios.spread(function(res, annotations) {
        const annotationData = annotations.data.map(
          ({ anchorId, focusId, point, id }) => {
            return {
              start: Number(anchorId),
              end: Number(focusId),
              point: Number(point),
              id
            };
          }
        );

        const title = res.data.title;
        const content = res.data.content.split(" ");
        const highlight = "";
        const rating = res.data.rating;
        const fakeboxRating = res.data.fakebox_rating;
        const fakeboxDecision = res.data.fakebox_decision;

        const overlappedAnnotations = content.map((word, index) => {
          const overlappingAnnotation = annotationData.find(
            ({ start, end }) => {
              return index >= start && index <= end;
            }
          );
          return overlappingAnnotation ? overlappingAnnotation.id : undefined;
        });
        setIsLoading(false);
        setMessage({ title, content, highlight, overlappedAnnotations });
        setRating({ rating });
        setFakebox({ fakeboxRating, fakeboxDecision });
        console.log(
          "HAHAHHAHAHA",
          res.data.fakebox_rating,
          res.data.fakebox_decision
        );
      })
    );
  }, []);

  function updateRating(newRating) {
    const rating = newRating;
    setRating({ rating });
  }

  function onMouseDownHandler(e) {
    setAnnotation({ new: false, view: false });
  }

  function onMouseUpHandler(event) {
    const selection = window.getSelection();
    setSel(selection);
    console.log("GETTING SEL");
    const { anchorNode, focusNode } = selection;
    const startID = Math.min(anchorNode.parentNode.id, focusNode.parentNode.id);
    const endID = Math.max(anchorNode.parentNode.id, focusNode.parentNode.id);
    if (selection.toString()) {
      const selectionOverlapsExistingHighlight = message.overlappedAnnotations.some(
        (annotationID, index) => {
          //if there is some annottion
          return annotationID && (startID <= index && endID >= index);
        }
      );

      console.log(
        "selection overlaps existing highlight:",
        selectionOverlapsExistingHighlight
      );
      setAnnotation({ new: !selectionOverlapsExistingHighlight, view: false });
    } else {
      // //do click stuff: view annotaion
      setMessage({
        ...message,
        annotationId: event.target.getAttribute("annotation_id")
      });
      setAnnotation({
        new: false,
        view: Boolean(event.target.getAttribute("annotation_id"))
      });
    }
  }

  return (
    <>
      {(annotation.view || annotation.new) && (
        <div className="annotation-container">
          {annotation.view && (
            <Annotation
              handlePoints={handlePoints}
              annotation_id={message.annotationId}
              {...match}
            />
          )}
          {annotation.new && (
            <CreateNewAnnotation upVotes={upVotes} selected={sel} {...match} />
          )}
        </div>
      )}
      <Grid container spacing={3}>
        <Grid item xs={1} /> {/* PALM */}
        <Grid item xs={6}>
          {" "}
          {/* PEACH */}
          <div
            className="article-container"
            onMouseUp={onMouseUpHandler}
            onMouseDown={onMouseDownHandler}
          >
            {isLoading ? (
              <div className="spinner-container">
                <LoadingSpinner />
              </div>
            ) : (
              <>
                <h2>{message.title}</h2>

                {message.content.map((word, pos) => {
                  return (
                    <Word
                      // clickAnnotationHandler={clickAnnotationHandler}
                      match={match}
                      overlappedAnnotation={message.overlappedAnnotations[pos]}
                      key={pos}
                      pos={pos}
                      word={word}
                      highlight={message.highlight}
                      upVotes={upVotes}
                    />
                  );
                })}
              </>
            )}
          </div>
        </Grid>
        <Grid item xs={4}>
          {" "}
          {/* PEAR */}
          <h5>Try hovering over the progress bars...</h5>
          <div className="flex-container">
            <div className="bias-label">Fakebox: </div>
            <div className="fakebox-bar-cont">
              <div className="fakebox-bar">
                <div
                  className="fakebox-background"
                  style={{ width: fakebox.fakeboxRating + "%" }}
                />
              </div>
            </div>
          </div>
          <br />
          <div className="flex-container">
            <div className="users-label">Users: </div>
            <div className="user-bar-cont">
              <div className="user-bar">
                <div
                  className="user-bar-background"
                  style={{ width: rating.rating + "%" }}
                />
              </div>
            </div>
            <div className="rating-display">{rating.rating}</div>
          </div>
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
                  Add a Rating
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
          <h2>Instructions</h2>
          <Instruction />
          <TagsList article_id={match.params.id} />
        </Grid>
        <Grid item xs={1} /> {/* PINE */}
      </Grid>
    </>
  );
}
