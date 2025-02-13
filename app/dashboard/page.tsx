"use client";

import HomeCard from "@/components/HomeCard";
import AddAndUpdateTodoDialog from "@/components/AddAndUpdateTodoDialog";
import AddIcon from "@mui/icons-material/Add";
import { Button, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";

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

const cardData = [
  {
    id: 1,
    title: "Tâche 1",
    description: "Description de la tâche 1",
    isLog: true,
    isOwner: true,
    isPublic: false,
  },
  {
    id: 2,
    title: "Tâche 2",
    description: "Description de la tâche 2",
    isLog: true,
    isOwner: false,
    isPublic: true,
  },
  {
    id: 3,
    title: "Tâche 3",
    description: "Description de la tâche 3",
    isLog: true,
    isOwner: true,
    isPublic: false,
  },
  {
    id: 4,
    title: "Tâche 4",
    description: "Description de la tâche 4",
    isLog: true,
    isOwner: false,
    isPublic: true,
  },
  {
    id: 5,
    title: "Tâche 5",
    description: "Description de la tâche 5",
    isLog: true,
    isOwner: true,
    isPublic: false,
  },
];

export default function Home() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div className="flex flex-col gap-6">
      <h1>Todo App</h1>
      <Divider />
      <AddAndUpdateTodoDialog open={open} handleClose={() => setOpen(false)} />
      <PrimaryButton
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
        style={{ width: "fit-content" }}
      >
        Ajouter une tâche
      </PrimaryButton>
      <div className="grid grid-cols-3 gap-4">
        {cardData.map((card) => (
          <HomeCard
            key={card.id}
            title={card.title}
            description={card.description}
            isLog={card.isLog}
            isOwner={card.isOwner}
            isPublic={card.isPublic}
          />
        ))}
      </div>
    </div>
  );
}
