"use client";

import { AddTaskOnTodoAction } from "@/features/task/crudBase/addTaskOnTodo.action";
import { isActionSuccessful } from "@/lib/action/ActionUtils";
import { inngest } from "@/lib/inngest/InngestClient";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { parseISO } from "date-fns";
import { useParams } from "next/navigation";

const OutlinedButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  borderColor: "#ea642a",
  backgroundColor: "#ffffff",
  color: "#ea642a",
  "&:hover": {
    backgroundColor: "#fadacd",
    border: "none",
    color: "#333333",
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

type AddTaskDialogProps = {
  open: boolean;
  handleClose: () => void;
};

export default function AddAndUpdateTaskDialog({
  open,
  handleClose,
}: AddTaskDialogProps) {
  const { todoSlug } = useParams();
  const queryClient = useQueryClient();

  const { mutate: addTask } = useMutation({
    mutationFn: async (formJson: Record<string, string>) => {
      const result = await AddTaskOnTodoAction({
        title: formJson.title,
        description: formJson.description,
        dueDate: parseISO(formJson.dueDate),
        todoSlug: todoSlug as string,
      });
      console.log("🚀 ~ mutationFn: ~ result:", result);
      console.log("🚀 ~ mutationFn: ~ result:", result?.serverError);

      if (!isActionSuccessful(result)) throw new Error("Add task failed");

      return result.data;
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["Todos", todoSlug, "Tasks"] });
      inngest.send({
        name: "NewTaskAddedNotification",
        data: {
          taskId: data.id,
        },
      });
    },
  });

  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries()) as Record<
            string,
            string
          >;
          const email = formJson.email;
          addTask(formJson);
          handleClose();
        },
      }}
    >
      <DialogTitle>Créer ou modifier un tâche </DialogTitle>
      <DialogContent>
        <div className="mx-6 flex flex-col gap-4">
          <div>
            <span>Titre de la tâche</span>
            <TextField
              autoFocus
              required
              margin="none"
              id="title"
              name="title"
              fullWidth
              variant="outlined"
            />
          </div>
          <div>
            <span>Description</span>
            <TextField
              margin="none"
              multiline
              minRows={3}
              maxRows={10}
              id="description"
              name="description"
              variant="outlined"
              fullWidth
            />
          </div>
          <div>
            <span>Date d'échéance</span>
            <TextField
              margin="none"
              id="dueDate"
              name="dueDate"
              variant="outlined"
              fullWidth
              type="date"
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <OutlinedButton onClick={handleClose}>Annuler</OutlinedButton>
        <PrimaryButton type="submit">Sauvegarder</PrimaryButton>
      </DialogActions>
    </Dialog>
  );
}
