import Image from "next/image";

async function fetchCard(cardName: string, setCode: string) {
  //fetch card from scryfall api
  //https://scryfall.com/docs/api/cards/named

  const cardData = await fetch(
    `https://api.scryfall.com/cards/named?fuzzy=${cardName}&set=${setCode}`
  );

  const card = await cardData.json();

  const serializedCard = {
    id: card.id,
    name: card.name,
    images: card.image_uris,
    description: card.oracle_text,
    card_faces: card.card_faces,
  };

  return serializedCard;
}

export default async function SingleCardPage({
  params,
}: {
  params: { set: string; name: string };
}) {
  const card = await fetchCard(params.name, params.set);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex flex-col gap-5">
        <h1 className="text-4xl font-bold">{card.name}</h1>
        <p className="max-w-[300px]">{card.description}</p>
        <Image
          height={500}
          width={300}
          src={card.images?.normal || card.card_faces[0].image_uris.normal}
          alt={card.name}
          className="rounded-lg"
        />
      </div>
      <h2 className="text-2xl font-bold mt-10">Alternate Card faces</h2>
      <div className="grid grid-cols-4 gap-2 mt-10">
        {card.card_faces?.map((face: any) => (
          <div key={face.id}>
            <Image
              height={500}
              width={300}
              src={face.image_uris?.normal}
              alt={face.name}
              className="rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
