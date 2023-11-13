import { slugify } from "@/app/lib/slugify";
import Image from "next/image";
import Link from "next/link";

async function fetchSetMtg(setCode: string) {
  //use scryfall api to fetch a collection based on the set code
  //https://scryfall.com/docs/api/sets

  const setData = await fetch(`https://api.scryfall.com/sets/${setCode}`);

  const set = await setData.json();

  if (!set) return null;

  const cardsData = await fetch(set.search_uri);
  const cards = await cardsData.json();

  if (!cards) return null;

  const serializedSet = {
    id: set.id,
    name: set.name,
    images: set.image_uris,
    cards: {
      total: set.card_count,
      data: cards.data.map((card: any) => ({
        id: card.id,
        name: card.name,
        images: card.image_uris,
        card_faces: card.card_faces,
      })),
    },
  };

  return serializedSet;
}

export default async function IndexSetsPage({
  params,
}: {
  params: { set: string };
}) {
  if (!params.set) return <div>no params</div>;

  const set = await fetchSetMtg(params.set);

  if (!set) return <div>no set found</div>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-4xl font-bold">{set.name}</h1>
      <div className="mt-10">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {set.cards.data.map((card: any) => (
            <li key={card.id}>
              <Link href={`/sets/${params.set}/cards/${slugify(card.name)}`}>
                <Image
                  height={500}
                  width={300}
                  src={
                    card.images?.normal || card?.card_faces[0].image_uris.normal
                  }
                  alt={card.name}
                  className="rounded-lg hover:opacity-75 transition-opacity"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
