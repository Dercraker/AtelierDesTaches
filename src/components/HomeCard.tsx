import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Chip,
} from "@mui/material";
import Link from "next/link";

type HomeCardProps = {
  title: string;
  description: string;
  isLog: boolean;
  isOwner: boolean;
  isPublic: boolean;
};

export default function HomeCard({
  title,
  description,
  isLog,
  isOwner,
  isPublic,
}: HomeCardProps) {
  return (
    <Card sx={{ maxWidth: 345 }} variant="outlined">
      <CardMedia
        component="img"
        height="140"
        image="https://static.vecteezy.com/ti/vecteur-libre/p1/13160044-fond-d-ecran-de-vecteur-de-paysage-fond-de-printemps-ou-d-automne-vectoriel.jpg"
        alt="Random Image"
      />
      <CardContent>
        {isLog ? (
          <div className="flex items-center gap-4">
            <Typography
              gutterBottom
              variant="h5"
              style={{ marginBottom: "0px" }}
            >
              {title}
            </Typography>
            <div>
              {isPublic ? (
                <Chip label="Public" color="success" size="small" />
              ) : (
                <Chip label="Privé" color="error" size="small" />
              )}
              {isOwner ? (
                <Chip
                  label="Propriétaire"
                  size="small"
                  style={{ marginLeft: "4px", backgroundColor: "#facacd" }}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : (
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
        )}
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
