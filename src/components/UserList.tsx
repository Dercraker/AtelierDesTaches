import { useState } from "react";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  Paper,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

type UserProps = {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  avatar: string;
};

const usersData: UserProps[] = [
  {
    id: 1,
    firstName: "Alice",
    lastName: "Dupont",
    role: "Admin",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    firstName: "Bob",
    lastName: "Martin",
    role: "User",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    firstName: "Charlie",
    lastName: "Lemoine",
    role: "Editor",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    firstName: "Bob",
    lastName: "Martin",
    role: "User",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 5,
    firstName: "Charlie",
    lastName: "Lemoine",
    role: "Editor",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 6,
    firstName: "Bob",
    lastName: "Martin",
    role: "User",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 7,
    firstName: "Charlie",
    lastName: "Lemoine",
    role: "Editor",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
];

export default function UserList() {
  const [users, setUsers] = useState<UserProps[]>(usersData);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<UserProps | null>(null);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    user: UserProps,
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleEditRole = () => {
    if (selectedUser) {
      alert(
        `Modifier le rôle de ${selectedUser.firstName} ${selectedUser.lastName}`,
      );
    }
    handleMenuClose();
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      setUsers(users.filter((user) => user.id !== selectedUser.id));
    }
    handleMenuClose();
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Liste des utilisateurs
      </Typography>
      <Paper
        elevation={0}
        sx={{ width: "100%", maxHeight: 300, overflowY: "auto", p: 2 }}
      >
        <List>
          {users.map((user) => (
            <ListItem
              key={user.id}
              secondaryAction={
                <IconButton onClick={(e) => handleMenuOpen(e, user)}>
                  <MoreVertIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar src={user.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={`${user.firstName} ${user.lastName}`}
                secondary={user.role}
              />
            </ListItem>
          ))}
        </List>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEditRole}>Modifier le rôle</MenuItem>
          <MenuItem onClick={handleDeleteUser}>Supprimer</MenuItem>
        </Menu>
      </Paper>
    </div>
  );
}
