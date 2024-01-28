import { useCallback, useState } from "react";
import { Character, getCharacters } from "rickmortyapi";

const useGetRickAndMorty = () => {
  const [characters, setCharacters] = useState<Character[] | []>([]);
  const [countOfPages, setCountOfPages] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const charactersRequest = useCallback(
    async (page: number = 1) => {
      try {
        setLoading(true);
        const response = await getCharacters({ page });
        if (response.status === 200 && response.data.results) {
          setCharacters([...characters, ...response.data.results]);
          setCountOfPages(response.data.info?.pages ?? 0);
        } else {
          throw new Error("Response error");
        }
      } catch (error) {
        setError(error as Error);
        console.log("error: ", error);
      } finally {
        setLoading(false);
      }
    },
    [characters]
  );

  return { characters, loading, error, countOfPages, charactersRequest };
};

export default useGetRickAndMorty;
