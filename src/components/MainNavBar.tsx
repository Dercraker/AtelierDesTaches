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
import { useMutation } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const pages = [
  { name: "DashBoard", path: "/dashboard" },
  { name: "Profile", path: "/profile" },
  { name: "Déconnexion" },
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
    backgroundColor: "#fadacd",
    border: "none",
    color: "#333333",
    boxShadow: "none",
  },
});

export default function MainNavBar() {
  const router = useRouter();
  const session = useSession();
  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      signOut({
        redirect: false,
        redirectTo: "/",
      });
    },
  });

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
            href={session.status === "authenticated" ? "/dashboard" : "/"}
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
          {session.status === "authenticated" &&
            pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => (page.path ? router.push(page.path) : logout())}
                sx={{ mx: 2, my: 2, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          {session.status === "authenticated" ? (
            <IconButton sx={{ p: 0 }}>
              <Avatar
                alt={session.data.user?.name ?? "User"}
                src={session.data.user?.image ?? undefined}
              />
            </IconButton>
          ) : (
            <OutlinedButton onClick={() => router.push("/auth/signin")}>
              Se connecter
            </OutlinedButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
