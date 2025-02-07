import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from "@mui/material/styles";

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

interface SubscriptionDialogProps {
  open: boolean;
  handleClose: () => void;
}

export default function MainNavBar({ open, handleClose }: SubscriptionDialogProps) {

  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          const email = formJson.email;
          console.log(email);
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
              id="due-date"
              name="due-date"
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
