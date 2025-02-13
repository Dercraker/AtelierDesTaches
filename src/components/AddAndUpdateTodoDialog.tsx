"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Switch,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";

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

export default function AddAndUpdateTodoDialog({
  open,
  handleClose,
}: AddTaskDialogProps) {
  const [isPrivate, setisPrive] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setisPrive(event.target.checked);
  };

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
          handleClose();
        },
      }}
    >
      <DialogTitle>Créer ou modifier un To Do List </DialogTitle>
      <DialogContent>
        <div className="mx-6 flex flex-col gap-4">
          <div>
            <span>Privé</span>
            <Switch checked={isPrivate} onChange={handleChange} />
          </div>
          <div>
            <span>Titre de la To Do List</span>
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
        </div>
      </DialogContent>
      <DialogActions>
        <OutlinedButton onClick={handleClose}>Annuler</OutlinedButton>
        <PrimaryButton type="submit" href="/todos/[todoSlug]">
          Sauvegarder
        </PrimaryButton>
      </DialogActions>
    </Dialog>
  );
}
