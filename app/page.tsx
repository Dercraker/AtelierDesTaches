import { Box } from "@mui/material";
import { InfiniteTodoList } from "./_components/InfiniteTodoList";

export default function Home() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <InfiniteTodoList />
    </Box>
  );
}

