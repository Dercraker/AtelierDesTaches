"use client";

import AddTaskDialog from "@/components/AddTaskDialog";
import TaskCard from "@/components/TaskCard";
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
  const [todoName, setTodoName] = useState("Todo Name");
  const [todoDescription, setTodoDescription] = useState(
    "Quisque ac enim at lectus vehicula venenatis. Donec sed facilisis ligula. Maecenas a tincidunt mi. Aliquam eu faucibus eros, at pulvinar mi. Morbi ut ex molestie, pharetra urna eget, eleifend sem. Proin pulvinar eget augue sed gravida. Integer sed feugiat lacus, nec bibendum orci.",
  );

  type Task = {
    id: number;
    title: string;
    description: string;
    dueDate: Date;
  };

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Faire les courses",
      description: "Acheter des fruits, légumes et du pain.",
      dueDate: new Date("2025-02-14T09:00:00"),
    },
    {
      id: 2,
      title: "Réunion avec l'équipe",
      description: "Discuter des prochaines étapes du projet.",
      dueDate: new Date("2025-02-15T14:00:00"),
    },
    {
      id: 3,
      title: "Répondre aux emails",
      description: "Répondre aux emails en attente de la journée.",
      dueDate: new Date("2025-02-13T12:00:00"),
    },
    {
      id: 4,
      title: "Préparer la présentation",
      description:
        "Créer une présentation PowerPoint pour la réunion de demain.",
      dueDate: new Date("2025-02-14T16:00:00"),
    },
    {
      id: 5,
      title: "Nettoyer la maison",
      description: "Passer l'aspirateur et nettoyer les surfaces.",
      dueDate: new Date("2025-02-16T10:00:00"),
    },
  ]);

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
          <div
            className="flex flex-col gap-6 overflow-auto"
            style={{ height: "calc(100vh - 310px)" }}
          >
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  title={task.title}
                  description={task.description}
                  dueDate={task.dueDate}
                />
              ))
            ) : (
              <p>Aucune tâche n'a été créé.</p>
            )}
          </div>
        </div>
        <div className="flex h-full w-1/2 items-center">
          <Card variant="outlined">
            <CardContent className="flex flex-col gap-4">
              <Typography variant="h4">{todoName}</Typography>
              <Typography
                gutterBottom
                variant="h5"
                sx={{ color: "text.secondary", fontSize: 14 }}
              >
                Description
              </Typography>
              <Typography component="div">{todoDescription}</Typography>
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
