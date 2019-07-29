import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FilledInput from "@material-ui/core/FilledInput";
import Axios from "axios";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function Annotation(params) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    age: "",
    name: ""
  });
  const [annotation, setAnnotation] = React.useState({
    loaded: false,
    point: 0
  });

  const [commentText, setCommentText] = React.useState("");

  const [commentList, setCommentList] = useState({
    comments: []
  });

  useEffect(() => {
    // console.log("article id from annotation component:", params.params.id)
    Axios.get(
      `/api/articles/${params.params.id}/annotations/${params.annotation_id}`
    )
      .then(res => {
        const resAnnotation = res.data;
        // setAnnotation({resAnnotation})
        // console.log("ANNOTATION SET")
        // setList({ tags });
        return resAnnotation;
      })
      .then(resAnnotation => {
        setAnnotation({ ...resAnnotation, loaded: true });
      });
  }, []);

  const handleUpVote = e => {
    let addVote = annotation.point + 1;
    Axios.put(
      `/api/articles/${params.params.id}/annotations/${params.annotation_id}`,
      {
        point: addVote
      }
    )
      .then(response => {
        const newVote = response.data.point.point;
        setAnnotation({ ...annotation, point: newVote });
      })
      .catch(err => console.log("Error", err));
  };

  const handleComment = e => {
    e.preventDefault();
    Axios.post(
      `/api/articles/${params.params.id}/annotations/${
        params.annotation_id
      }/comments`,
      {
        content: commentText
      }
    )
      .then(response => {
        console.log("comment sent:", response.data.content);
        setCommentList({
          comments: [...commentList.comments, response.data.content]
        });
        setCommentText("");
      })
      .catch(err => console.log("Error", err));
  };

  useEffect(() => {
    Axios.get(
      `/api/articles/${params.params.id}/annotations/${
        params.annotation_id
      }/comments`
    ).then(res => {
      console.log("Comments", res.data);
      const comments = res.data.comment.map(obj => {
        return obj.content;
      });
      setCommentList({ comments });
    });
  }, []);

  // const inputLabel = React.useRef(null);
  // const [labelWidth, setLabelWidth] = React.useState(0);
  // React.useEffect(() => {
  //   setLabelWidth(inputLabel.current.offsetWidth);
  // }, []);

  function handleChange(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value
    }));
  }

  return (
    <>
      <Paper className="annotation-container">
        <Typography variant="h4" component="h4">
          {annotation.loaded && annotation.category}
          {/* {console.log("CAT:",annotation)} */}
        </Typography>
        <Typography variant="h6" component="h6">
          {annotation.loaded && annotation.content}
          {/* {console.log(annotation.content)} */}
        </Typography>

        <Typography variant="h6" component="h6">
          Votes: {annotation.point}
        </Typography>
        <Button
          onClick={() => handleUpVote()}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Up Vote
        </Button>

        <Typography variant="h6" component="h6">
          Comments:
        </Typography>
        {commentList.comments.map(comment => (
          <Typography variant="p" component="p">
            {comment}
          </Typography>
        ))}
        <Typography variant="p" component="p" />

        <Typography variant="h6" component="h6">
          Add a Comment
        </Typography>
        <form
          className={classes.root}
          autoComplete="off"
          onSubmit={handleComment}
        >
          <TextField
            id="standard-full-width"
            style={{ margin: 8 }}
            placeholder="Comment"
            multiline
            fullWidth
            margin="normal"
            value={commentText}
            onChange={event => setCommentText(event.target.value)}
            InputLabelProps={{
              shrink: true
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Add Comment
          </Button>
        </form>
      </Paper>
    </>
  );
}
