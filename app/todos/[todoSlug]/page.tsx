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
import AddTaskDialog from "@/components/AddTaskDialog";
import TaskCard from "@/components/TaskCard";

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
  const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam commodo, mauris a viverra ultricies, lectus purus facilisis orci, vel malesuada augue lorem commodo augue. Vivamus quis risus ac enim mattis tempor. Nullam placerat felis interdum sapien ornare dictum. Nam in dapibus ex. Nulla neque nisi, auctor et pharetra eu, efficitur et arcu. Phasellus fermentum mauris et eros mattis volutpat. Etiam ut ante a purus malesuada finibus eu in tortor. Nam tempus sit amet quam ut semper. Cras sed turpis a risus scelerisque ullamcorper.";
  const date = new Date();

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <div className="mx-6 flex h-full gap-6">
        <div className="flex h-full w-1/2 flex-col gap-6">
          <h1>Todo App</h1>
          <Divider />
          <div>
            <PrimaryButton startIcon={<AddIcon />} onClick={handleClickOpen}>
              Ajouter une tâche
            </PrimaryButton>
            <AddTaskDialog open={open} handleClose={() => setOpen(false)} />
          </div>
          <TaskCard title="titre" description={description} dueDate={date} status="PENDING"/>
        </div>
        <div className="flex h-full w-1/2 items-center">
          <Card variant="outlined">
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
