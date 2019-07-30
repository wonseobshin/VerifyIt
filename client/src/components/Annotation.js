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
import IconButton from "@material-ui/core/IconButton";
import ThumbUpAlt from "@material-ui/icons/ThumbUpAlt";
import Comment from "@material-ui/icons/Comment";
import Avatar from "@material-ui/core/Avatar";
import trump from "../images/avatar_trump.jpg";
import putin from "../images/avatar_putin.jpg";

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
  },
  avatar: {
    margin: 10
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60
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
      <Paper className="annotation-paper">
        <div className="avatar-container">
          <Avatar src={trump} className={classes.bigAvatar} />
          <Typography className="username" variant="h6" component="h6">
            Donald Trump
          </Typography>
        </div>
        <Typography variant="h4" component="h4">
          Criteria: {annotation.loaded && annotation.category}
          {/* {console.log("CAT:",annotation)} */}
        </Typography>

        <Typography className="annotation-content" variant="h6" component="h6">
          {annotation.loaded && annotation.content}
          <IconButton
            onClick={() => handleUpVote()}
            type="submit"
            className={classes.root}
            aria-label="Vote"
          >
            {" "}
            <ThumbUpAlt /> {annotation.point}
          </IconButton>
          {/* {console.log(annotation.content)} */}
        </Typography>

        <Typography variant="h6" component="h6" />
        <div className="comment-container">
          <Typography variant="h6" component="h6">
            Comments:
          </Typography>
          {commentList.comments.map(comment => (
            <>
              <div className="avatar-container">
                <Avatar src={putin} className={classes.avatar} />
                <Typography className="username" variant="h6" component="h6">
                  Vladimir Putin
                </Typography>
              </div>
              <Typography className="comment-text" variant="p" component="p">
                {comment}
              </Typography>
            </>
          ))}
          <Typography variant="p" component="p" />

          <form
            className={classes.root}
            autoComplete="off"
            onSubmit={handleComment}
          >
            <TextField
              id="standard-full-width"
              style={{ margin: 8 }}
              placeholder="Add a Comment"
              multiline
              fullWidth
              margin="normal"
              value={commentText}
              onChange={event => setCommentText(event.target.value)}
              InputLabelProps={{
                shrink: true
              }}
            />
            <IconButton
              type="submit"
              className={classes.root}
              aria-label="Vote"
            >
              {" "}
              <Comment />
            </IconButton>
          </form>
        </div>
      </Paper>
    </>
  );
}
