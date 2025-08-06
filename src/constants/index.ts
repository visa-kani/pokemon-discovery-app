export type PokemonType =
  | "FIRE"
  | "WATER"
  | "GRASS"
  | "ELECTRIC"
  | "PSYCHIC"
  | "DRAGON"
  | "FLYING"
  | "POISON";

export type Pokemon = {
  name: string;
  types: PokemonType[];
  hp: number;
  attack: number;
  defense: number;
  icon: string;
  url: string;
  collection?: boolean
};

export type PokemonStat = {
  types: PokemonType[];
  hp: number;
  attack: number;
  defense: number;
  icon: string;
};

export const typeColors: Record<PokemonType, string> = {
  FIRE: "bg-red-500",
  WATER: "bg-blue-500",
  GRASS: "bg-green-500",
  ELECTRIC: "bg-yellow-500",
  PSYCHIC: "bg-pink-500",
  DRAGON: "bg-gray-600",
  FLYING: "bg-purple-400",
  POISON: "bg-purple-600",
};

export const tailwindToHex: Record<string, string> = {
  "bg-red-500": "#ef4444",
  "bg-blue-500": "#3b82f6",
  "bg-green-500": "#22c55e",
  "bg-yellow-500": "#eab308",
  "bg-pink-500": "#ec4899",
  "bg-purple-600": "#9333ea",
};

export const constantData: PokemonStat[] = [
  {
    types: ["FIRE", "FLYING"],
    hp: 78,
    attack: 84,
    defense: 78,
    icon: "🔥",
  },
  {
    types: ["WATER"],
    hp: 79,
    attack: 83,
    defense: 100,
    icon: "💧",
  },
  {
    types: ["GRASS", "POISON"],
    hp: 80,
    attack: 82,
    defense: 83,
    icon: "🌿",
  },
  {
    types: ["ELECTRIC"],
    hp: 35,
    attack: 55,
    defense: 40,
    icon: "⚡",
  },
  {
    types: ["PSYCHIC"],
    hp: 106,
    attack: 110,
    defense: 90,
    icon: "🧠",
  },
  {
    types: ["DRAGON", "FLYING"],
    hp: 91,
    attack: 134,
    defense: 95,
    icon: "🐉",
  },
];
