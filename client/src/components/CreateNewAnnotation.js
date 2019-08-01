import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FilledInput from "@material-ui/core/FilledInput";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/Add";
import Publish from "@material-ui/icons/Publish";
import Avatar from "@material-ui/core/Avatar";
import trump from "../images/avatar_trump.jpg";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "80%"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function CreateNewAnnotation(prop, { params }) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    category: "cate",
    content: "hai"
  });

  const [page, setPage] = React.useState(1);

  const [state, setState] = React.useState({
    annotation: {},
    page: 1
  });
  // useEffect(() => {

  // },[])

  function submitAnnotationHandler() {
    getSelectedText();
  }

  function getSelectedText() {
    const sel = document.getSelection();
    // console.log("SEL:",prop.selected)

    setHighlight(sel);
  }

  function setHighlight(sel) {
    const annotation = {};
    annotation.anchorId = parseInt(sel.anchorNode.parentNode.id);
    annotation.focusId = parseInt(sel.focusNode.parentNode.id);
    annotation.category = values.category;
    console.log("CATEGORY:------------------", values.category);
    annotation.user_id = 0;
    annotation.content = values.content;
    console.log("CONTETN:------------------", values.content);

    annotation.point = 0;

    setState({ annotation: annotation, page: 2 });

    if (annotation.focusId < annotation.anchorId) {
      let tempId = annotation.focusId;
      annotation.focusId = annotation.anchorId;
      annotation.anchorId = tempId;
    }

    const range = annotation.focusId - annotation.anchorId;

    for (let i = 0; i <= range; i++) {
      document.getElementById(annotation.anchorId + i).classList.add("blue");
    }
  }

  function handleChange(event) {
    setValues({
      category: event.target.value,
      content: values.content
    });
  }

  function handleAnnChange(event) {
    setValues({
      content: event.target.value,
      category: values.category
    });
  }

  function sendReq(annotation) {
    annotation.content = values.content;
    Axios.post(`/api/articles/${prop.params.id}/annotations`, {
      annotation
    }).then(res => {
      completeAnnotation(annotation, res);
    });
  }

  function completeAnnotation(annotation, res) {
    const range = annotation.focusId - annotation.anchorId;

    for (let i = 0; i <= range; i++) {
      document.getElementById(annotation.anchorId + i).classList.add("pink");
      document
        .getElementById(annotation.anchorId + i)
        .setAttribute("annotation_id", res.data.id);
    }

    setState({ page: 0 });
  }

  return (
    <>
      {state.page === 1 && (
        <Paper className="new-annotation-container">
          <div className="avatar-container">
            <Avatar src={trump} className={classes.bigAvatar} />
            <Typography className="username" variant="h6" component="h6">
              Donald Trump
            </Typography>
          </div>

          <form className={classes.root} autoComplete="off">
            <FormControl required className={classes.formControl}>
              <InputLabel htmlFor="criteria-required">Criteria</InputLabel>
              <Select
                value={values.category}
                onChange={handleChange}
                name="category"
                inputProps={{
                  id: "age-required"
                }}
                className={classes.selectEmpty}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="The source is unreliable">
                  Credibility
                </MenuItem>
                <MenuItem value="The author is not credible">
                  Author Attribution                </MenuItem>
                <MenuItem value="The article is biased">
                  Bias and Objectivity
                </MenuItem>
                <MenuItem value="There are no supporting sources">
                  Interviews and Sources
                </MenuItem>
                <MenuItem value="There are no citations">
                  Other
                </MenuItem>
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
            <IconButton
              onClick={submitAnnotationHandler}
              type="submit"
              className={classes.root}
              aria-label="Next"
            >
              <Add />
            </IconButton>
          </form>
        </Paper>
      )}

      {state.page === 2 && (
        <Paper className="new-annotation-container">
          <div className="avatar-container">
            <Avatar src={trump} className={classes.bigAvatar} />
            <Typography className="username" variant="h6" component="h6">
              Donald Trump
            </Typography>
          </div>
          <Typography variant="h5" component="h5">
            Hightlighted Text
          </Typography>

          <form className={classes.root} autoComplete="off">
            <TextField
              onChange={handleAnnChange}
              id="standard-full-width"
              style={{ margin: 8 }}
              placeholder="Why do you think so?"
              multiline
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
            />
            <IconButton
              onClick={() => {
                sendReq(state.annotation);
              }}
              className={classes.root}
              variant="contained"
            >
              <Add />
            </IconButton>
          </form>
        </Paper>
      )}
    </>
  );
}
