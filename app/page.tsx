import HomeCardComponent from "@/components/HomeCardComponent";
export default function Home() {
  const cards = [];

  for (let i = 0; i < 20; i++) {
    cards.push(<HomeCardComponent key={i} />);
  }

  return <div className="grid grid-cols-3 gap-4">{cards}</div>;
}
