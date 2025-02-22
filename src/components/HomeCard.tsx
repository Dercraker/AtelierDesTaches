import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import Link from "next/link";

type HomeCardProps = {
  title: string;
  slug: string;
  isLog: boolean;
  isOwner: boolean;
  isPublic: boolean;
  description?: string;
};

export default function HomeCard({
  title,
  description,
  isLog,
  isOwner,
  isPublic,
  slug,
}: HomeCardProps) {
  return (
    <Card sx={{ maxWidth: 345 }} variant="outlined">
      <CardMedia
        component="img"
        height="140"
        image={"https://via.placeholder.com/345x140"}
        alt={title}
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
        <Link className="btn-primary" href={`/todos/${slug}`}>
          Voir la To do list
        </Link>
      </CardActions>
    </Card>
  );
}
