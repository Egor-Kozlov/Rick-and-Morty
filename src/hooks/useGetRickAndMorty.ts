import { useCallback, useState } from "react";
import { Character, getCharacters } from "rickmortyapi";

const useGetRickAndMorty = () => {
  const [characters, setCharacters] = useState<Character[] | []>([]);
  const [countOfCharacters, setCountOfCharacters] = useState<number>(0);
  const [countOfPages, setCountOfPages] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const charactersRequest = useCallback(
    async (page: number = 1) => {
      console.log("charactersRequest");
      try {
        setLoading(true);
        const response = await getCharacters({ page });
        if (response.status === 200 && response.data.results) {
          // setCharacters([...characters, ...response.data.results]);
          setCharacters(characters.concat(response.data.results));
          setCountOfCharacters(response.data.info?.count ?? 0);
          setCountOfPages(response.data.info?.pages ?? 0);
        } else {
          throw new Error("Response error");
        }
      } catch (error) {
        console.log("error: ", error);
      } finally {
        setLoading(false);
      }
    },
    [characters]
  );

  return { characters, loading, countOfCharacters, countOfPages, charactersRequest };
};

export default useGetRickAndMorty;
