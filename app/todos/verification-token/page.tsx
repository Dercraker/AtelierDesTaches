"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useQuery, useMutation } from "@tanstack/react-query";
import { VerifyTokenAction } from "@/features/todo/multiUser/VerifyTokenInvite.action";
import { AddUserOnTodoAction } from "@/features/todo/multiUser/AddUserOnTodo.action";
import { isActionSuccessful } from "@/lib/action/ActionUtils";

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

  if (!token) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
        <Typography color="error">Token invalide</Typography>
      </Box>
    );
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ["verifyToken", token],
    queryFn: async () => {
      const result = await VerifyTokenAction({ token });
      if (!isActionSuccessful(result)) throw new Error(result?.serverError);
      return result.data;
    },
    enabled: !!token,
  });

  if(!data){
    return (
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
        <Typography color="error">Token invalide</Typography>
      </Box>
    );
  }

  const mutation = useMutation({
    mutationFn: async () => {
      const result = await AddUserOnTodoAction({ todoSlug: data.todoSlug });
      if (!isActionSuccessful(result)) throw new Error(result?.serverError);
      return result.data;
    },
    onSuccess: () => router.push(`/dashboard/todo/${data.todoSlug}`),
    onError: (err) => console.error(err),
  });

  if (isLoading) return <Typography>Chargement...</Typography>;
  if (error) return <Typography color="error">{error.message}</Typography>;

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      <Typography variant="h6" gutterBottom>
        {data.invitedUser} a été invité à rejoindre la todo "{data.todoTitle}" par {data.invitedBy}
      </Typography>
      <PrimaryButton onClick={() => mutation.mutate()} sx={{ mt: 2 }}>
        Rejoindre
      </PrimaryButton>
      <Button onClick={() => router.push("/dashboard")} sx={{ mt: 2 }}>
        Refuser
      </Button>
    </Box>
  );
}
