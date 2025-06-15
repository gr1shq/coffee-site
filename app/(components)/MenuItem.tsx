import Image from 'next/image';

interface MenuItemProps {
  name: string;
  price: number;
  image: string;
  tags: string[];
  animationDelay: string;
}

export default function MenuItem({ name, price, image, tags, animationDelay }: MenuItemProps) {
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow fade-in-up"
      data-animate
      style={{ animationDelay }}
      aria-label={`Menu item: ${name}`}
    >
      <Image
        src={image}
        alt={name}
        width={300}
        height={200}
        className="object-cover w-full h-40"
      />
      <div className="p-4">
        <h3 className="text-lg font-inter font-semibold text-gray-900 mb-1">{name}</h3>
        <p className="text-sm font-inter text-gray-700 mb-2">${price.toFixed(2)}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-inter text-white bg-green-600 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}