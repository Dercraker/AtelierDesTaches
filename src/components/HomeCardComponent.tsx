import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Link from "next/link";

// const PrimaryButton = styled(Button)({
//   boxShadow: "none",
//   textTransform: "none",
//   fontSize: 16,
//   padding: "6px 12px",
//   border: "none",
//   lineHeight: 1.5,
//   backgroundColor: "#ea642a",
//   color: "#ffffff",
//   "&:hover": {
//     backgroundColor: "#ffffff",
//     border: "1px solid",
//     borderColor: "#ea642a",
//     color: "#ea642a",
//     boxShadow: "none",
//   },
//   "&:active": {
//     boxShadow: "none",
//     backgroundColor: "#f29a75",
//     color: "#333333",
//   },
//   "&:focus": {
//     boxShadow: "none",
//     backgroundColor: "#f29a75",
//     color: "#333333",
//   },
// });

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
        <Link className="Desing de button" href={"/todos/currentTodoSlug"}>
          Voir la To do list
        </Link>
        {/* <PrimaryButton endIcon={<ArrowForwardIcon />}></PrimaryButton> */}
      </CardActions>
    </Card>
  );
}
