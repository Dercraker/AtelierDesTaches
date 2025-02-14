"use client";
import AddTaskDialog from "@/components/AddAndUpdateTaskDialog";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import {
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import type { ReactElement } from "react";
import { useState } from "react";

type TaskCardProps = {
  title: string;
  description: string;
  dueDate: Date;
};

const statusMapping: Record<
  string,
  { label: string; color: "warning" | "info" | "success"; icon: ReactElement }
> = {
  PENDING: {
    label: "En attente",
    color: "warning",
    icon: <PauseCircleOutlineIcon />,
  },
  IN_PROGRESS: { label: "En cours", color: "info", icon: <AutoModeIcon /> },
  COMPLETED: {
    label: "Terminé",
    color: "success",
    icon: <CheckCircleOutlineIcon />,
  },
};

export default function TaskCard({
  title,
  description,
  dueDate,
}: TaskCardProps) {
  const dateString = dueDate.toLocaleDateString("fr-FR");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedComponent, setSelectedComponent] =
    useState<React.ReactNode>(null);
  const open = Boolean(anchorEl);
  const [status, setStatus] = useState<keyof typeof statusMapping>("PENDING");

  const handleStatusChange = (
    event: React.MouseEvent<HTMLElement>,
    newStatus: string,
  ) => {
    if (newStatus !== null) {
      setStatus(newStatus);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdate = () => {
    setSelectedComponent(
      <AddTaskDialog
        open={true}
        handleClose={() => setSelectedComponent(null)}
      />,
    );
    handleClose();
  };

  return (
    <div style={{ marginRight: "8px" }}>
      <div>
        <Card variant="outlined">
          <CardContent className="flex flex-col gap-4">
            <div className="flex" style={{ justifyContent: "space-between" }}>
              <div
                className="items-center"
                style={{ display: "flex", gap: "16px" }}
              >
                <Typography variant="h5">{title}</Typography>
                <ToggleButtonGroup
                  value={status}
                  exclusive
                  onChange={handleStatusChange}
                  aria-label="status"
                  size="small"
                >
                  {Object.entries(statusMapping).map(
                    ([key, { label, color, icon }]) => (
                      <Tooltip key={key} title={label}>
                        <ToggleButton
                          value={key}
                          aria-label={label}
                          color={color}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {icon}
                        </ToggleButton>
                      </Tooltip>
                    ),
                  )}
                </ToggleButtonGroup>
              </div>
              <div>
                <IconButton onClick={handleClick} style={{ color: "#333" }}>
                  <MoreVertIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                  <MenuItem onClick={handleUpdate}>Modifier</MenuItem>
                  <MenuItem onClick={handleClose}>Supprimer</MenuItem>
                </Menu>
              </div>
            </div>
            <div>
              <Typography variant="body2">{description}</Typography>
            </div>
            <div className="flex" style={{ justifyContent: "space-between" }}>
              <Typography
                variant="subtitle1"
                color="error"
                className="flex items-center"
              >
                Echeance : {dateString}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>
      <div>{selectedComponent}</div>
    </div>
  );
}
