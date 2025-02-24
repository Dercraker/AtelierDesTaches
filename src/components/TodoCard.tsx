"use client";

import AddAndUpdateTodoDialog from "@/components/AddAndUpdateTodoDialog";
import InvitationDialog from "./InvitationDialog";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import UserList from "@/components/UserList";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Chip,
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

type TodoPageProps = {
  isOwner: boolean;
  isPublic: boolean;
};

export default function TodoCard({ isOwner, isPublic }: TodoPageProps) {
  const [todoName, setTodoName] = useState("Todo Name");
  const [subscribe, setSubscribe] = useState(false);
  const [todoDescription, setTodoDescription] = useState(
    "Quisque ac enim at lectus vehicula venenatis. Donec sed facilisis ligula. Maecenas a tincidunt mi. Aliquam eu faucibus eros, at pulvinar mi. Morbi ut ex molestie, pharetra urna eget, eleifend sem. Proin pulvinar eget augue sed gravida. Integer sed feugiat lacus, nec bibendum orci.",
  );
  const [selectedComponent, setSelectedComponent] =
    useState<React.ReactNode>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openTodo = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdate = () => {
    setSelectedComponent(
      <AddAndUpdateTodoDialog
        open={true}
        handleClose={() => setSelectedComponent(null)}
      />,
    );
    handleClose();
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSubscribe = () => {
    setSubscribe(true);
  };

  const handleUnsubscribe = () => {
    setSubscribe(false);
  };

  const handleInvite = () => {
    setSelectedComponent(
      <InvitationDialog
        open={true}
        handleClose={() => setSelectedComponent(null)}
      />,
    );
    handleClose();
  };

  return (
    <div>
      <Card variant="outlined">
        <CardContent className="flex flex-col gap-4">
          <div className="flex justify-between">
            <div className="flex">
              <Typography variant="h4" style={{ marginRight: "8px" }}>
                {todoName}
              </Typography>
              {isPublic ? (
                <Chip label="Public" color="success" size="small" />
              ) : (
                <Chip label="Privé" color="error" size="small" />
              )}
            </div>
            <div>
              <IconButton onClick={handleClick} style={{ color: "#333" }}>
                <MoreVertIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={openTodo} onClose={handleClose}>
                <MenuItem onClick={handleUpdate}>Modifier</MenuItem>
                <MenuItem onClick={handleClose}>Supprimer</MenuItem>
              </Menu>
            </div>
          </div>

          <Typography
            gutterBottom
            variant="h5"
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            Description
          </Typography>
          <Typography component="div">{todoDescription}</Typography>
          <div>
            <UserList />
          </div>
        </CardContent>
        <CardActions>
          {isPublic ? (
            subscribe ? (
              <PrimaryButton onClick={handleUnsubscribe}>
                Se désabonner
              </PrimaryButton>
            ) : (
              <PrimaryButton onClick={handleSubscribe}>S'abonner</PrimaryButton>
            )
          ) : subscribe ? (
            <PrimaryButton onClick={handleUnsubscribe}>
              Se désabonner
            </PrimaryButton>
          ) : isOwner ? (
            <PrimaryButton onClick={handleInvite}>Invite</PrimaryButton>
          ) : (
            <></>
          )}
        </CardActions>
      </Card>
      <div>{selectedComponent}</div>
    </div>
  );
}
