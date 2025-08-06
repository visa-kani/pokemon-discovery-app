import { useDispatch, useSelector } from "react-redux";
import { PokemonCard } from "../../component/pokemon-card";
import { Pokemon } from "../../constants";
import {
  addPokemon,
  removePokemon,
  reorderPokemons,
} from "../../redux/slice/myCollectionsSlice";
import { AppDispatch } from "../../redux/store";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const MyCollections = () => {
  const dispatch = useDispatch<AppDispatch>();
  const MyCollections = useSelector((store: any) => store.collections.list);
  const toggleCollection = (pokemon: Pokemon) => {
    if (pokemon.collection) {
      dispatch(removePokemon(pokemon.url));
    } else {
      dispatch(addPokemon(pokemon));
    }
  };

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    dispatch(reorderPokemons({ fromIndex: dragIndex, toIndex: hoverIndex }));
  };
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <div className=" m-auto bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 h-[500px]">
          <div className="container max-w-6xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden">
              {MyCollections.length === 0 ? (
                <div className="flex justify-center items-center w-full col-span-3 mt-10">
                  <div className="font-semibold text-center p-6 bg-white rounded-lg">
                    You haven't added any Pokémon to your collection yet.
                  </div>
                </div>
              ) : (
                MyCollections.map((poke: Pokemon, index: number) => (
                  <PokemonCard
                    pokemon={poke}
                    index={index}
                    key={index}
                    onToggleCollection={toggleCollection}
                    moveCard={moveCard}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </DndProvider>
    </div>
  );
};

export default MyCollections;
