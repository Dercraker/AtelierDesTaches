"use client";
import AddAndUpdateTaskDialog from "@/components/AddAndUpdateTaskDialog";
import TaskCard from "@/components/TaskCard";
import TodoCard from "@/components/TodoCard";
import { GetManyTaskAction } from "@/features/task/crudBase/GetManyTask.action";
import { GetTodoBySlugAction } from "@/features/todo/crudBase/getTodoBySlug.action";
import { GetTodoMemberShipByUserIdAndTodoSlugAction } from "@/features/todo/multiUser/GetTodoMemberShipByUserIdAndTodoSlug.action";
import { isActionSuccessful } from "@/lib/action/ActionUtils";
import { logger } from "@/lib/logger";
import AddIcon from "@mui/icons-material/Add";
import { Button, Divider, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

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

const TodoPage = () => {
  const session = useSession();

  const { todoSlug } = useParams();

  if (!todoSlug) throw new Error("invalid slug");

  const [open, setOpen] = useState(false);

  const { data: tasks } = useQuery({
    queryKey: ["Todos", todoSlug, "Tasks"],
    queryFn: async () => {
      const result = await GetManyTaskAction({
        todoSlug: todoSlug as string,
      });

      if (!isActionSuccessful(result)) {
        logger.error(result?.serverError);
        return;
      }

      return result?.data;
    },
  });

  const { data: todo } = useQuery({
    queryKey: ["Todos", todoSlug],
    queryFn: async () => {
      const result = await GetTodoBySlugAction({
        todoSlug: todoSlug as string,
      });

      if (!isActionSuccessful(result)) throw new Error("failed");

      return result.data;
    },
  });
  const { data: todoMembership } = useQuery({
    queryKey: ["Todos", todoSlug, "Memberships"],
    queryFn: async () => {
      if (!todo || !session.data?.user) return null;
      const result = await GetTodoMemberShipByUserIdAndTodoSlugAction({
        todoId: todo?.id as string,
        userId: session.data?.user?.id as string,
      });

      if (!isActionSuccessful(result)) throw new Error("failed");

      return result.data;
    },
    enabled: !!todo && !!session.data?.user,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const isOwner = useMemo(() => {
    if (!todoMembership) return false;
    return todoMembership.roles.includes("OWNER");
  }, [todoMembership]);

  return (
    <div>
      <div className="mx-6 flex h-full gap-6">
        <div className="flex h-full w-1/2 flex-col gap-6">
          <Typography variant="h4">Liste des tâches</Typography>
          <Divider />
          <div>
            <PrimaryButton startIcon={<AddIcon />} onClick={handleClickOpen}>
              Ajouter une tâche
            </PrimaryButton>
            <AddAndUpdateTaskDialog
              open={open}
              handleClose={() => setOpen(false)}
            />
          </div>
          <div
            className="flex flex-col gap-6 overflow-auto"
            style={{ height: "calc(100vh - 325px)" }}
          >
            {tasks && tasks.length > 0 ? (
              tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  title={task.title}
                  description={task.description ?? undefined}
                  dueDate={task.dueDate ?? undefined}
                />
              ))
            ) : (
              <p>Aucune tâche n'a été créé.</p>
            )}
          </div>
        </div>
        <div className="flex h-full w-1/2 items-center">
          <TodoCard isOwner={isOwner} isPublic={todo?.state === "PUBLIC"} />
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
