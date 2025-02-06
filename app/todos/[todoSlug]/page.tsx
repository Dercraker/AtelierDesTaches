"use client";

import {
  Divider,
  Typography,
  Button,
  CardContent,
  CardActions,
  Card,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
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

export default function Todo() {
  return (
    <div>
      <div className="mx-6 grid grid-cols-2 gap-4">
        <div>
          <h1>Todo App</h1>
          <Divider />
          <PrimaryButton startIcon={<AddIcon />}>
            Ajouter une tâche
          </PrimaryButton>
        </div>
        <div>
          <Card>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                sx={{ color: "text.secondary", fontSize: 14 }}
              >
                Description
              </Typography>
              <Typography component="div">
                Quisque ac enim at lectus vehicula venenatis. Donec sed
                facilisis ligula. Maecenas a tincidunt mi. Aliquam eu faucibus
                eros, at pulvinar mi. Morbi ut ex molestie, pharetra urna eget,
                eleifend sem. Proin pulvinar eget augue sed gravida. Integer sed
                feugiat lacus, nec bibendum orci.
              </Typography>
            </CardContent>
            <CardActions>
              <PrimaryButton>S'abonner</PrimaryButton>
            </CardActions>
          </Card>
        </div>
      </div>
    </div>
  );
}
