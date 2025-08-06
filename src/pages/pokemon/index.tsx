import { useEffect, useState } from "react";
import { PokemonCard } from "../../component/pokemon-card";
import { useQuery } from "@tanstack/react-query";
import { AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { GetPokemonData } from "../../redux/slice/pokemonSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { constantData, Pokemon } from "../../constants";
import {
  addPokemon,
  removePokemon,
} from "../../redux/slice/myCollectionsSlice";

interface PokemonAPIResponse {
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
}

const DiscoverPokemon = () => {
  const [pagination, setPagination] = useState({
    limit: 6,
    offset: 0,
    next: "",
    previous: "",
  });
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const MyCollections = useSelector((store: any) => store.collections.list);
  const dispatch = useDispatch<AppDispatch>();

  const toggleCollection = (pokemon: Pokemon) => {
    if (pokemon.collection) {
      dispatch(removePokemon(pokemon.url));
    } else {
      const addPokemonData = {
        ...pokemon,
        collection: true,
      };
      dispatch(addPokemon(addPokemonData));
    }
  };

  const { isPending, error, data, refetch } = useQuery<PokemonAPIResponse>({
    queryKey: ["repoData", pagination.offset],
    queryFn: async () => {
      const response = await dispatch(
        GetPokemonData({
          limit: pagination.limit,
          offset: pagination.offset,
        })
      );
      const nextURL = response.payload.next;
      const prevURL = response.payload.previous;
      if (nextURL) {
        const nextParams = new URL(nextURL).searchParams;
        const offsetParam = nextParams.get("offset");
        if (offsetParam) {
          setPagination((prev) => ({
            ...prev,
            next: response.payload.next,
            previous: prevURL,
          }));
        }
      } else {
        setHasMore(false); // No more data
      }
      return response.payload;
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data?.results) {
      const shuffledNames = [...data.results]
        .sort(() => Math.random() - 0.5)
        .slice(0, constantData.length);

      const finalPokemonData: Pokemon[] = shuffledNames.map((item, index) => {
        const baseData = {
          name: item.name,
          url: item.url,
          ...constantData[index % constantData.length],
        };
        const isCollected = MyCollections.some(
          (collected: Pokemon) => collected.url === item.url
        );

        return isCollected ? { ...baseData, collection: true } : baseData;
      });
      setPokemonList((prev) => [...prev, ...finalPokemonData]);
    }
  }, [data]);

  useEffect(() => {
    setPokemonList((prevList) =>
      prevList.map((pokemon) => {
        const isCollected = MyCollections.some(
          (collected: Pokemon) => collected.url === pokemon.url
        );
        return { ...pokemon, collection: isCollected };
      })
    );
  }, [MyCollections]);

  const fetchMoreData = () => {
    if (!pagination.next) {
      setHasMore(false);
      return;
    }
    const nextParams = new URL(pagination.next).searchParams;
    const nextOffset = Number(nextParams.get("offset") || 0);

    setPagination((prev) => ({
      ...prev,
      offset: nextOffset,
    }));

    refetch();
  };

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    setPokemonList((prevList) => {
      const updatedList = [...prevList];
      const [removed] = updatedList.splice(dragIndex, 1);
      updatedList.splice(hoverIndex, 0, removed);
      return updatedList;
    });
  };

  return (
    <div className=" m-auto bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800">
      {/* Content */}
      <div className="container max-w-6xl mx-auto px-4 py-8">
        {isPending && pokemonList.length === 0 ? (
          <div className="flex justify-center items-center mt-8 text-white">
            <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full mr-3"></div>
            <span className="text-lg">Loading Pokemon...</span>
          </div>
        ) : error ? (
          <div className="text-red-300 text-center mt-8">
            Failed to load Pokemon data.
          </div>
        ) : (
          <DndProvider backend={HTML5Backend}>
            <div
              id="scrollableDiv"
              style={{
                height: "450px",
                overflow: "auto",
              }}
              className="scrollBar"
            >
              <InfiniteScroll
                dataLength={pokemonList.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={
                  <div className="flex justify-center items-center mt-8 text-white">
                    <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full mr-3"></div>
                    <span className="text-lg">Loading more Pokemon...</span>
                  </div>
                }
                scrollableTarget="scrollableDiv"
                endMessage={
                  <p className="text-center text-white mt-8">
                    🎉 You've caught all available Pokemon!
                  </p>
                }
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden">
                  {pokemonList.map((poke, index) => (
                    <PokemonCard
                      pokemon={poke}
                      index={index}
                      key={index}
                      onToggleCollection={toggleCollection}
                      moveCard={moveCard}
                    />
                  ))}
                </div>
              </InfiniteScroll>
            </div>
          </DndProvider>
        )}
      </div>
    </div>
  );
};

export default DiscoverPokemon;
