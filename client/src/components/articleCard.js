import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  }
});

export default function ImgMediaCard(props) {
  const classes = useStyles();

  return (
    <Link to={`/article/${props.id}`}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h6" component="h2">
              {props.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Fake Certainty Rating {props.rating}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Learn Fake Certainty
          </Button>
        </CardActions>
      </Card>
    </Link>
  );
}
