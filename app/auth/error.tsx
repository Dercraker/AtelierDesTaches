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

export default function RouteError({ error, reset }: ErrorParams) {
  useEffect(() => {
    logger.error(error);
  }, [error]);

  return (
    <Card sx={{ height: "fit-content" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Sorry, something went wrong. Please try again later.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="large" onClick={reset}>
          Try again
        </Button>
        <Link href={"/"}>Go home</Link>
      </CardActions>
    </Card>
  );
}
