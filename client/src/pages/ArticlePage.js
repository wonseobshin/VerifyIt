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

  const [sel, setSel] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  function getArticle(articleId) {
    return Axios.get(`/api/articles/${articleId}`);
  }

  function getAnnotations(articleId) {
    return Axios.get(`/api/articles/${articleId}/annotations`);
  }

  // //everytime
  // useEffect(() => {
  //   console.log("GETTING SEL")
  //   setSel( document.getSelection() )
  // },[annotation.new])

  useEffect(() => {
    Axios.all([
      getArticle(match.params.id),
      getAnnotations(match.params.id)
    ]).then(
      Axios.spread(function(res, annotations) {
        const annotationData = annotations.data.map(
          ({ anchorId, focusId, id }) => {
            return {
              start: Number(anchorId),
              end: Number(focusId),
              id
            };
          }
        );

        // console.log(annotations)
        const title = res.data.title;
        const content = res.data.content.split(" ");
        const highlight = "";
        const rating = res.data.rating;
        const fakeboxRating = res.data.fakebox_rating;
        const fakeboxDecision = res.data.fakebox_decision;
        // console.log(rating);

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
    // if(annotation.keepnew){
    //   setAnnotation({new: true, view: false})
    // } else {
    setAnnotation({ new: false, view: false });
    // }
  }

  function onMouseUpHandler(event) {
    // console.log('on mouse up:', event.target);
    const selection = window.getSelection();
    setSel(selection);
    console.log("GETTING SEL");
    const { anchorNode, focusNode } = selection;
    // console.log('anchor:', anchorNode, typeof anchorNode, 'focusNode:', focusNode, typeof focusNode);
    // console.log('anchorID:', anchorNode.parentNode.id, 'focusID:', focusNode.parentNode.id);
    const startID = Math.min(anchorNode.parentNode.id, focusNode.parentNode.id);
    const endID = Math.max(anchorNode.parentNode.id, focusNode.parentNode.id);
    // console.log('start ID:', startID, 'endID:', endID);
    // console.log("event.target['annotation-id']", event.target.annotation_id)
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
      // if(selectionOverlapsExistingHighlight) {
      //   //show form to new new annotation
      //   setAnnotation({new: false, view: false})
      // } else {
      //   setAnnotation({new: true, view: false})
      // }
      setAnnotation({ new: !selectionOverlapsExistingHighlight, view: false });
    } else {
      // //do click stuff: view annotaion
      // if(event.target.getAttribute('annotation_id')){
      //   setAnnotation({new: false, view: true})
      // } else {
      //   setAnnotation({new: false, view: false})
      // }
      setMessage({
        ...message,
        annotationId: event.target.getAttribute("annotation_id")
      });
      setAnnotation({
        new: false,
        view: Boolean(event.target.getAttribute("annotation_id"))
      });
    }

    // console.log('window selection:', selection.toString(), 'end')
  }

  // function keepNewOpen(keepOpen){
  //   if(keepOpen){
  //     setAnnotation({keepnew: true});
  //   } else {
  //     setAnnotation({keepnew: false})
  //   }
  //   console.log("VIEW IS KEPT:",annotation.keepnew)
  // }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={8} />
        <Grid item xs={3}>
          <h5>Hover to see what Fakebox thinks!</h5>
          <div className="flex-container">
            <div className="bias-label">Biased</div>
            <div className="fakebox-bar-cont">
              <div
                className="fakebox-bar"
                style={{ width: fakebox.fakeboxRating + "%" }}
              />
            </div>
            <div className="impartial-label">Impartial</div>
          </div>
          <h5>Hover to see what other users think!</h5>
          <div className="flex-container">
            <div className="user-bar-cont">
              <div
                className="user-bar"
                style={{ width: rating.rating + "%" }}
              />
            </div>
            <div className="rating-display">{rating.rating}</div>
          </div>
          {/* <h2 className="rating-container">Users: {rating.rating}</h2> */}
        </Grid>
        <Grid item xs={2}>
          {/* <div className="instructions-container">
            <h2>Instructions</h2>
            <p>Add an Annotation</p>
            <p>Add a Comment</p>
            <p>Update a Comment</p>
            <p>Add a Rating</p>
          </div> */}
          <h2>Instructions</h2>
          <Instruction />
        </Grid>

        <Grid item xs={8}>
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
                    />
                  );
                })}
              </>
            )}
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

          {annotation.view && (
            <Annotation annotation_id={message.annotationId} {...match} />
          )}
          {annotation.new && <CreateNewAnnotation selected={sel} {...match} />}
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <TagsList article_id={match.params.id} />
        </Grid>
      </Grid>
    </>
  );
}
