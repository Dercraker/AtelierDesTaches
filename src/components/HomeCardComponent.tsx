import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default function HomeCardComponent({
  todo,
}: {
  todo: { title: string; description?: string; image?: string };
}) {
  return (
    <Card sx={{ maxWidth: 345 }} variant="outlined">
      <CardMedia
        component="img"
        height="140"
        image={todo.image || "https://via.placeholder.com/345x140"}
        alt={todo.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {todo.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {todo.description || "Aucune description disponible."}
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
