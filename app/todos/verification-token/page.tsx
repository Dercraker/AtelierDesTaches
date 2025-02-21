"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

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
});

export default function VerifyTokenPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [todoTitle, setTodoTitle] = useState("");
  const [invitedBy, setInvitedBy] = useState("");
  const [invitedUser, setInvitedUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    const fetchTokenDetails = async () => {
      try {
        const res = await fetch("/api/verify-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        setTodoTitle(data.todoTitle);
        setInvitedBy(data.invitedBy);
        setInvitedUser(data.invitedUser);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Une erreur inconnue s'est produite.");
      } finally {
        setLoading(false);
      }
    };

    fetchTokenDetails();
  }, [token]);

  const handleAction = async (accept: boolean) => {
    try {
      const res = await fetch("/api/respond-invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, accept }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      router.push("/dashboard");
    } catch (err) {
      setError(err as Error);
    }
  };

  if (loading) return <Typography>Chargement...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      <Typography variant="h6" gutterBottom>
        {invitedUser} à été invité à rejoindre la todo "{todoTitle}" par {invitedBy}
      </Typography>
      <PrimaryButton onClick={() => handleAction(true)} sx={{ mt: 2 }}>
        Rejoindre
      </PrimaryButton>
      <Button onClick={() => handleAction(false)} sx={{ mt: 2 }}>
        Refuser
      </Button>
    </Box>
  );
}
