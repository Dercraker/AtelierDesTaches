import HomeCard from "@/components/HomeCard";
export default function Home() {
  const cards = [];

  for (let i = 0; i < 20; i++) {
    cards.push(<HomeCard key={i} title="title" description="description" />);
  }

  return <div className="grid grid-cols-3 gap-4">{cards}</div>;
}
