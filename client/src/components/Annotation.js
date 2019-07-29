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

  const [comments, setCommments] = React.useState({
    content: []
  });

  useEffect(() => {
    // console.log("article id from annotation component:", params.params.id)
    Axios.get(
      `/api/articles/${params.params.id}/annotations/${params.annotation_id}`
    )
      .then(res => {
        console.log("GET RES DATA:", res.data);
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
        console.log("Votes:", response.data.point.point);
        const newVote = response.data.point.point;
        setAnnotation({ ...annotation, point: newVote });
      })
      .catch(err => console.log("Error", err));
  };

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

        <form className={classes.root} autoComplete="off">
          <TextField
            id="standard-full-width"
            style={{ margin: 8 }}
            placeholder="Comment"
            multiline
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </>
  );
}
