import CharacterCard from "./components/CharacterCard/CharacterCard";
import InfiniteScroll from "./components/InfiniteScroll/InfiniteScroll";
import useGetRickAndMorty from "./hooks/useGetRickAndMorty";

function App() {
  const { characters, loading, countOfCharacters, countOfPages, charactersRequest } = useGetRickAndMorty();
  console.log("characters: ", characters);

  return (
    <InfiniteScroll
      getItems={charactersRequest}
      countOfItems={countOfCharacters}
      countOfPages={countOfPages}
      limit={50}
      data={characters}
      loading={loading}
      render={(items) =>
        items.map((item, index) => <CharacterCard key={item.id} name={item.name} index={index} imageUrl={item.image} />)
      }
    >
      {/* In case this needs to be a component, the ref must be passed using forwardRef */}
      <div className="loader">Loading...</div>
    </InfiniteScroll>
  );
}

export default App;
