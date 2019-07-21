import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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
          <MenuItem value="The article is bias?">The article is bias?</MenuItem>
          <MenuItem value="There are supporting sources?">
            There are supporting sources?
          </MenuItem>
          <MenuItem value="There are citations?">There are citations?</MenuItem>
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
    </form>
  );
}
