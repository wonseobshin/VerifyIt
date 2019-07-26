import React from "react";
import Grid from "@material-ui/core/Grid";
import ImgMediaCard from "./articleCard";

export default CardsList () {
  
  const [list, setList] = useState({
  cards: []
  });

  useEffect(() => {
    Axios.get('/api/articles').then(res => {
      // const title = res.data.title;
      // const rating = res.data.rating;
    });
  }, []);

  return (

  )
}