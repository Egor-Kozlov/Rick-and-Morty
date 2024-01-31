import CharacterCard from "@app-components/CharacterCard";
import useGetRickAndMorty from "@app-hooks/useGetRickAndMorty";
import { FC, memo, useEffect } from "react";

type StackProps = {
  pageToLoad: number;
  setMaxPage?: (value: number) => void;
  setError: (value: boolean) => void;
};

const Stack: FC<StackProps> = ({ pageToLoad, setMaxPage, setError }) => {
  const { characters, countOfPages, charactersRequest, error } = useGetRickAndMorty();

  useEffect(() => {
    charactersRequest(pageToLoad);
  }, [pageToLoad, charactersRequest]);

  useEffect(() => {
    if (setMaxPage && countOfPages) {
      setMaxPage(countOfPages);
    }
  }, [countOfPages, setMaxPage]);

  useEffect(() => {
    if (error) {
      setError(true);
    }
  }, [error, setError]);

  if (characters.length === 0) {
    return Array.from(Array(20).keys()).map((_, index) => <CharacterCard key={index} isEmptyCard />);
  }

  return characters.map((character) => <CharacterCard key={character.id} character={character} />);
};

const MemoComponent = memo(Stack);
export default MemoComponent;
