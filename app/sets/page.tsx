import Image from "next/image";
import Link from "next/link";

async function fetchAllSets() {
  // fetch all sets from scryfall api
  // https://scryfall.com/docs/api/sets/all

  const setsData = await fetch(`https://api.scryfall.com/sets/`);
  const sets = await setsData.json();

  const serializedSets = sets.data.map((set: any) => ({
    id: set.id,
    name: set.name,
    icon: set.icon_svg_uri,
    card_count: set.card_count,
    code: set.code,
  }));

  return serializedSets;
}

export default async function SetsPage() {
  const sets = await fetchAllSets();
  if (!sets) return <div>No Sets found</div>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-4xl font-bold">All sets</h1>
      <ul className="grid grid-cols-3 md:grid-cols-6 gap-10">
        {sets.map((set: any) => (
          <li key={set.id}>
            <Link href={`/sets/${set.code}`} className="hover:opacity-75">
              <div className="flex flex-col gap-2">
                <Image height={500} width={300} src={set.icon} alt={set.name} />
                <h2 className="text-center text-sm font-bold">{set.name}</h2>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
