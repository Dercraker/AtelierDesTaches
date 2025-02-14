import { InfiniteTodoList } from "./_components/InfiniteTodoList";

export default function Home() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <InfiniteTodoList />
    </div>
  );
}
