import { Box } from "@mui/material";
import { InfiniteTodoList } from "./_components/InfiniteTodoList";

export default function Home() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <InfiniteTodoList />
    </Box>
  );
}


  return <div className="grid grid-cols-3 gap-4">{cards}</div>;
}
