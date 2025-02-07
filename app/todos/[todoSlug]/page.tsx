"use client";

import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import TodoFormDialog from "@/components/TodoFormDialog"

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
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <div className="mx-6 flex gap-6 h-full">
        <div className="w-1/2 flex flex-col gap-6 h-full">
          <h1>Todo App</h1>
          <Divider />
          <div>
            <PrimaryButton startIcon={<AddIcon />} onClick={handleClickOpen}>
              Ajouter une tâche
            </PrimaryButton>
            <TodoFormDialog open={open} handleClose={() => setOpen(false)} />
          </div>

        </div>
        <div className="w-1/2 h-full flex items-center">
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
