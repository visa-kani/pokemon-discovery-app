import { useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Pokemon, tailwindToHex, typeColors } from "../../constants";
import { IoMdAdd } from "react-icons/io";
import { IoClose } from "react-icons/io5";

const ItemType = "POKEMON_CARD";

type Props = {
  pokemon: Pokemon;
  onToggleCollection: (pokemon: Pokemon) => void;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
};

export const PokemonCard = ({
  pokemon,
  onToggleCollection,
  index,
  moveCard,
}: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: ItemType,
    hover(item: { index: number }, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(drop(ref)); // Connect both drag and drop

  const addIcon = IoMdAdd({});
  const closeIcon = IoClose({});

  return (
    <div>
      <div
        ref={ref}
        className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden cursor-grab"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          opacity: isDragging ? 0.4 : 1,
        }}
      >
        {/* Action button */}
        <div
          className="h-[4px] rounded-2xl w-[115%] m-auto relative top-[-25px] -left-5 z-10"
          style={{
            background: `linear-gradient(to right, ${Object.values(
              tailwindToHex
            ).join(",")})`,
          }}
        />

        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => onToggleCollection(pokemon)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
              pokemon?.collection
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            {pokemon.collection ? closeIcon : addIcon}
          </button>
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-3xl shadow-lg">
            {pokemon.icon}
          </div>
        </div>

        {/* Name */}
        <h3 className="text-xl font-bold text-center text-gray-800 mb-3">
          {pokemon.name}
        </h3>

        {/* Types */}
        <div className="flex justify-center gap-2 mb-4">
          {pokemon.types.map((type, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${typeColors[type]}`}
            >
              {type}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-500">{pokemon.hp}</div>
            <div className="text-sm text-gray-600">HP</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-500">
              {pokemon.attack}
            </div>
            <div className="text-sm text-gray-600">Attack</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-500">
              {pokemon.defense}
            </div>
            <div className="text-sm text-gray-600">Defense</div>
          </div>
        </div>

        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent pointer-events-none rounded-2xl"></div>
        )}
      </div>
    </div>
  );
};
