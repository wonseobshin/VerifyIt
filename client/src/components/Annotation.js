import React, {useState, useEffect} from "react";
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

export default function SimpleSelect() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    age: "",
    name: "hai"
  });

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
        <Typography variant="h5" component="h5">
          Hightlighted Text
        </Typography>
        <Typography variant="h6" component="h6">
          UserName
        </Typography>
        <Typography variant="body1" component="p">
          That other text? Sadly, it’s no longer a 10. You know, it really
          doesn’t matter what you write as long as you’ve got a young, and
          beautiful, piece of text. My text is long and beautiful, as, it has
          been well documented, are various other parts of my website.
        </Typography>

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
