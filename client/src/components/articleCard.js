import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  }
});

export default function ImgMediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Trump"
          height="140"
          image={require("../images/trump_smile.jpg")}
          title="Trump"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Trump Is At It Again
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Trump has never lied.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Learn Fake Certainty
        </Button>
      </CardActions>
    </Card>
  );
}
