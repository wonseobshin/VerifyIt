import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Axios from "axios";
import Toggle from "../components/Toggle";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function CheckboxList(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const rating = Math.floor((checked.length / 7) * 100);
    Axios.post(`/api/articles/${props.match.params.id}/ratings`, {
      rating: rating
    })
      .then(response => {
        console.log("sent:", response.data.rating);
        props.updateRating(response.data.rating);
        setChecked([0]);
      })
      .catch(err => console.log("Error", err));
  };

  return (
    <>
      <Paper className="rating-questions-container">
        <h4>Check if you agree with the following statements</h4>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <List className={classes.root}>
              {[
                "This article IS fake news?",
                "The source NOT is reliable?",
                "The author is NOT credible?",
                "The article IS bias?",
                "The article does NOT have supporting sources?",
                "The article does NOT have citations?"
              ].map(value => {
                const labelId = `checkbox-list-label-${value}`;

                return (
                  <ListItem
                    key={value}
                    role={undefined}
                    dense
                    button
                    onClick={handleToggle(value)}
                  >
                    <ListItemText id={labelId} primary={`${value}`} />
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                  </ListItem>
                );
              })}
            </List>

            <Button
              id="rating-button"
              variant="contained"
              color="primary"
              className={classes.button}
              type="submit"
            >
              Submit
            </Button>
          </FormControl>
        </form>
      </Paper>
    </>
  );
}
