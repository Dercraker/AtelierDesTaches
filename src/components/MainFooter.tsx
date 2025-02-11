import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";

export const MainFooter = () => {
  return (
    <footer className="flex flex-wrap items-center justify-center" style={{paddingTop: 24}}>
      <AppBar 
      position="fixed" 
      sx={{
        top: "auto",
        bottom: 0,
        borderTop: "1px solid #ea642a",
        color: "#333",
        backdropFilter: "blur(8px)",
        background: "transparent",
        boxShadow: "none",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: "center" }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} - l'atelier des tâches. Tous droits réservés.
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
    </footer>
  );
};
