import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Link from "next/link";

type HomeCardProps = {
  title: string;
  description: string;
};

export default function HomeCard({ title, description }: HomeCardProps) {
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
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {description}
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
