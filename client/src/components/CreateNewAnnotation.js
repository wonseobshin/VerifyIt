import React from "react";
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

export default function CreateNewAnnotation({ params }) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    age: "",
    name: "hai"
  });

  function submitAnnotationHandler(){
    getSelectedText()
  }
  
  function getSelectedText() {
  
    const sel = document.getSelection();
  
    setHighlight(sel);
  }
  
  function setHighlight(sel) {
    const annotation = {}
    annotation.anchorId = parseInt(sel.anchorNode.parentNode.id);
    annotation.focusId = parseInt(sel.focusNode.parentNode.id);
    annotation.category = "cat"
    annotation.user_id = 0
    annotation.content = "ann"
    annotation.point = 0


    if (annotation.focusId < annotation.anchorId) {
      let tempId = annotation.focusId;
      annotation.focusId = annotation.anchorId;
      annotation.anchorId = tempId;
    }
  
    const range = annotation.focusId - annotation.anchorId;
  
    for (let i = 0; i <= range; i++) {
      document.getElementById(annotation.anchorId + i).classList.add("blue");
      // document.getElementById(annotation.anchorId + i).classList.add(params.id);
    }
  
    sendReq(annotation, sel)
  }

  function handleChange(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value
    }));
  }

  function sendReq(annotation){
    Axios.post(`/api/articles/${params.id}/annotations`, { annotation })
      .then(res => {
        // console.log("New annotation response: ",res);
        // console.log(res.data);
        completeAnnotation(annotation, res)
      })
  }

  function completeAnnotation(annotation, res) {
    const range = annotation.focusId - annotation.anchorId;
  
    for (let i = 0; i <= range; i++) {
      document.getElementById(annotation.anchorId + i).classList.add("pink");
      document.getElementById(annotation.anchorId + i).setAttribute('annotation_id', res.data.id);
    }
  }

  return (
    <>
      <Paper className="annotation-container">
        <Typography variant="h5" component="h5">
          Hightlighted Text
        </Typography>
        <Typography variant="h6" component="h6">
          UserName
        </Typography>

        <form className={classes.root} autoComplete="off">
          <FormControl required className={classes.formControl}>
            <InputLabel htmlFor="criteria-required">Criteria</InputLabel>
            <Select
              value={values.name}
              onChange={handleChange}
              name="name"
              inputProps={{
                id: "age-required"
              }}
              className={classes.selectEmpty}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="The source unreliable">
                The source unreliable
              </MenuItem>
              <MenuItem value="The author is not credible">
                The author is not credible
              </MenuItem>
              <MenuItem value="The article is biased">
                The article is biased
              </MenuItem>
              <MenuItem value="There are no supporting sources">
                There are no supporting sources
              </MenuItem>
              <MenuItem value="There are no citations">
                There are no citations
              </MenuItem>
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
          <TextField
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
          <Button
            onClick={submitAnnotationHandler}
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
