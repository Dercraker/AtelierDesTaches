"use client";

import { logger } from "@/lib/logger";
import type { ErrorParams } from "@/types/next";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";
import { styled } from "@mui/material/styles";

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

export default function RouteError({ error, reset }: ErrorParams) {
  useEffect(() => {
    logger.error(error);
  }, [error]);

  return (
    <div className="flex h-full items-center">
      <Card sx={{ height: "fit-content" }} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            Désolé, une erreur c'est produite. Veuillez réessayer plus tard.
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "end" }}>
          <Link href={"/"} className="btn-outlined">
            Retour
          </Link>
          <PrimaryButton onClick={reset}>Réessayer</PrimaryButton>
        </CardActions>
      </Card>
    </div>
  );
}
