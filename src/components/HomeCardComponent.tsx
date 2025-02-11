import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default function HomeCardComponent() {
  return (
    <Card sx={{ maxWidth: 345 }} variant="outlined">
      <CardMedia
        component="img"
        height="140"
        image="https://static.vecteezy.com/ti/vecteur-libre/p1/13160044-fond-d-ecran-de-vecteur-de-paysage-fond-de-printemps-ou-d-automne-vectoriel.jpg"
        alt="Random Image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          TodoList Name
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "end" }}>
        <Link className="btn-home-card" href={"/todos/currentTodoSlug"}>
          Voir la To do list
        </Link>
      </CardActions>
    </Card>
  );
}
