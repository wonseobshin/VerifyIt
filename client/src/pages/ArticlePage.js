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

  const [progressBar, setProgressBar] = useState({
    fakeboxBar: "",
    userBar: ""
  });

  const [fakebox, setFakebox] = useState({
    rating: 0,
    decision: [],
    category: [],
    url: ""
  });

  const [domCat, setDomCat] = useState(false);

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

  const [upVotes, setUpVotes] = useState(0);

  function handlePoints(points) {
    console.log("NEW VOTES", points);
    setUpVotes(points);
  }
  console.log("YO", upVotes);

  const [sel, setSel] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  function getArticle(articleId) {
    return Axios.get(`/api/articles/${articleId}`);
  }

  function getAnnotations(articleId) {
    return Axios.get(`/api/articles/${articleId}/annotations`);
  }

  function setUserBarRating() {
    setProgressBar({ userBar: "fill", fakeboxBar: progressBar.fakeboxBar });
  }

  function setFakeboxBarRating() {
    setProgressBar({ fakeboxBar: "fill", userBar: progressBar.userBar });
  }

  function onDomCatEnter() {
    setDomCat(true);
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
        const rating = Math.round(res.data.rating);
        const fakeboxRating = res.data.fakebox_rating;
        const fakeboxDecision = res.data.fakebox_decision;
        const fakeboxDomainCategory = res.data.fakebox_domain_category;
        const url = res.data.url.split("/")[2];

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
        setFakebox({
          fakeboxRating,
          fakeboxDecision,
          fakeboxDomainCategory,
          url
        });
        console.log(
          "Heylo",
          res.data.fakebox_rating,
          res.data.fakebox_decision,
          res.data.fakebox_domain_category,
          res.data.url.split("/")[2]
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

  function setViewFalse() {
    setAnnotation({ new: false, view: false });
    //next few lines are completely unrelated to setting views
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

        const title = res.data.title;
        const content = res.data.content.split(" ");
        const highlight = "";
        const rating = res.data.rating;
        const fakeboxRating = res.data.fakebox_rating;
        const fakeboxDecision = res.data.fakebox_decision;
        const fakeboxDomainCategory = res.data.fakebox_domain_category;
        const url = res.data.url.split("/")[2];

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
        setFakebox({
          fakeboxRating,
          fakeboxDecision,
          fakeboxDomainCategory,
          url
        });
        console.log(
          "Heylo",
          res.data.fakebox_rating,
          res.data.fakebox_decision,
          res.data.fakebox_domain_category,
          res.data.url.split("/")[2]
        );
      })
    );
  }

  return (
    <>
      {(annotation.view || annotation.new) && (
        <div className="annotation-container">
          {annotation.view && (
            <Annotation annotation_id={message.annotationId} {...match} />
          )}
          {annotation.new && (
            <CreateNewAnnotation
              upVotes={upVotes}
              setViewFalse={setViewFalse}
              selected={sel}
              {...match}
            />
          )}
        </div>
      )}
      <Grid container spacing={3}>
        <Grid id="palm" item xs={1} /> {/*s PALM */}
        <Grid id="peach" item xs={7}>
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
                  // console.log("inside map");
                  // console.log("upvotes", upVotes);
                  return (
                    <Word
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
        <Grid id="pear" item xs={3}>
          {/* PEAR */}
          <h4>Try hovering over the progress bars...</h4>
          <div className="flex-container">
            <div className="fakebox-label">Fakebox: </div>
            <div
              className={"fakebox-bar-cont " + progressBar.fakeboxBar}
              onMouseOver={setFakeboxBarRating}
            >
              <div className="fakebox-bar">
                <span className="bias-label">Biased</span>
                <span className="impartial-label">Impartial</span>
                <div
                  className="fakebox-background"
                  style={{ width: fakebox.fakeboxRating + "%" }}
                />
              </div>
            </div>
            <br />
            <div className="flex-container">
              <div className="users-label">Users: </div>
              <div
                className={"user-bar-cont " + progressBar.userBar}
                onMouseOver={setUserBarRating}
              >
                <div className="user-bar">
                  <span className="user-rating-text">{rating.rating}%</span>
                  <div
                    className="user-bar-background"
                    style={{ width: rating.rating + "%" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="domain-decision-cont" onMouseEnter={onDomCatEnter}>
            <h4>Hover to check if it's fake</h4>
            {domCat && (
              <div className="domain-name">
                {fakebox.url} === {fakebox.fakeboxDomainCategory}
              </div>
            )}
          </div>
          <Toggle>
            {({ on, toggle }) => (
              <div className="rating-btn-container">
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
          <div className="instruction-container">
            <h2>Instructions</h2>
            <Instruction />
          </div>
          <div className="tag-list-container">
            <TagsList article_id={match.params.id} />
          </div>
        </Grid>
        <Grid id="pine" item xs={1} /> {/* PINE */}
      </Grid>
    </>
  );
}
