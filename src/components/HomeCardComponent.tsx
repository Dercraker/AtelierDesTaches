"use client";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const PrimaryButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "none",
  lineHeight: 1.5,
  backgroundColor: "#ea642a",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "#ffffff",
    border: "1px solid",
    borderColor: "#ea642a",
    color: "#ea642a",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#f29a75",
    color: "#333333",
  },
  "&:focus": {
    boxShadow: "none",
    backgroundColor: "#f29a75",
    color: "#333333",
  },
});

export default function HomeCardComponent({ todo }: { todo: { title: string; description?: string; image?: string } }) {
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
        <PrimaryButton endIcon={<ArrowForwardIcon />}>
          Voir la To do list
        </PrimaryButton>
      </CardActions>
    </Card>
  );
}
