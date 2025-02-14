"use client";

import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const pages = [
  { name: "DashBoard", path: "/dashboard" },
  { name: "Profile", path: "/profile" },
  { name: "Deconnexion", path: "/" },
];

const OutlinedButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  borderColor: "#ffffff",
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
});

export default function MainNavBar() {
  const [alreadyLog, setAlreadyLog] = useState(true);
  const router = useRouter();

  return (
    <AppBar
      position="sticky"
      style={{ backgroundColor: "#ea642a", height: "fit-content" }}
    >
      <Toolbar className="flex items-center justify-between">
        <div className="flex">
          <Image
            src="/logo_atelier_des_taches_blanc.svg"
            alt="logo atelier des tâches"
            width={50}
            height={40}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href={alreadyLog ? "/dashboard" : "/"}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#fff",
              textDecoration: "none",
            }}
            style={{ alignItems: "end" }}
          >
            Atelier des tâches
          </Typography>
        </div>

        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          {alreadyLog &&
            pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => router.push(page.path)}
                sx={{ mx: 2, my: 2, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          {alreadyLog ? (
            <IconButton sx={{ p: 0 }}>
              <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
            </IconButton>
          ) : (
            <OutlinedButton onClick={() => setAlreadyLog(true)}>
              Se connecter
            </OutlinedButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
