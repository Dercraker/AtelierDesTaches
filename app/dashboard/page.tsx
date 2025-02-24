"use client";

import AddAndUpdateTodoDialog from "@/components/AddAndUpdateTodoDialog";
import HomeCard from "@/components/HomeCard";
import { GetUserTodosAction } from "@/features/todos/GetUserTodos.action";
import { isActionSuccessful } from "@/lib/action/ActionUtils";
import AddIcon from "@mui/icons-material/Add";
import { Button, Divider, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
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

export default function Home() {
  const [open, setOpen] = useState(false);
  const { todoSlug } = useParams();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const session = useSession();

  const { data: cardData } = useQuery({
    queryKey: ["Dashboard", session.data?.user?.id, "Todos"],
    queryFn: async () => {
      const result = await GetUserTodosAction({});

      if (!isActionSuccessful(result)) throw new Error("failed");

      return result.data;
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <Typography variant="h3">Dashboard</Typography>
      <Divider />
      <AddAndUpdateTodoDialog open={open} handleClose={() => setOpen(false)} />
      <PrimaryButton
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
        style={{ width: "fit-content" }}
      >
        Créer une To Do List
      </PrimaryButton>
      <div className="grid grid-cols-3 gap-4">
        {cardData?.length
          ? cardData.map((card) => (
              <HomeCard
                key={card.id}
                slug={card.slug}
                title={card.title}
                description={card.description ?? undefined}
                isLog={session.status === "authenticated"}
                isOwner={true}
                isPublic={true}
              />
            ))
          : "Aucune task"}
      </div>
    </div>
  );
}
