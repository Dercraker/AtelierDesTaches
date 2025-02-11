"use client";
import type { SelectChangeEvent } from "@mui/material";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import AddTaskDialog from "@/components/AddTaskDialog";

type TaskCardProps = {
  title: string;
  description: string;
  dueDate: Date;
};

const statusMapping: Record<
  string,
  { label: string; color: "warning" | "info" | "success" }
> = {
  PENDING: { label: "En attente", color: "warning" },
  IN_PROGRESS: { label: "En cours", color: "info" },
  COMPLETED: { label: "Terminé", color: "success" },
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

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as keyof typeof statusMapping);
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
    <div>
      <div>
        <Card variant="outlined">
          <CardContent className="flex flex-col gap-4">
            <div className="flex" style={{ justifyContent: "space-between" }}>
              <div>
                <Typography variant="h4">{title}</Typography>
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
              <Chip
                icon={<CalendarMonthOutlinedIcon />}
                label={dateString}
                style={{ backgroundColor: "#F29A75" }}
              />
              <FormControl size="small">
                <Select
                  labelId="status-label"
                  value={status}
                  onChange={handleChange}
                  renderValue={(selected) => (
                    <Chip
                      label={statusMapping[selected]?.label}
                      color={statusMapping[selected]?.color}
                    />
                  )}
                >
                  {Object.entries(statusMapping).map(
                    ([key, { label, color }]) => (
                      <MenuItem key={key} value={key}>
                        <Chip label={label} color={color} />
                      </MenuItem>
                    ),
                  )}
                </Select>
              </FormControl>
            </div>
          </CardContent>
        </Card>
      </div>
      <div>{selectedComponent}</div>
    </div>
  );
}
