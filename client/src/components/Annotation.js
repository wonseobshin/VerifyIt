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
        <Typography variant="h5" component="h5">
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
              <MenuItem value="The source is reliable?">
                The source is reliable?
              </MenuItem>
              <MenuItem value="The author is credible?">
                The author is credible?
              </MenuItem>
              <MenuItem value="The article is bias?">
                The article is bias?
              </MenuItem>
              <MenuItem value="There are supporting sources?">
                There are supporting sources?
              </MenuItem>
              <MenuItem value="There are citations?">
                There are citations?
              </MenuItem>
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
          <TextField
            id="standard-full-width"
            style={{ margin: 8 }}
            placeholder="Annotate"
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
