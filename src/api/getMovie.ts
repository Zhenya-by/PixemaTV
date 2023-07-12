import { IMovie } from "../components/Movies/Movies";
import { OMDB_URL, API_KEY } from "./apiKey";

export const getMovie = async (id: string): Promise<IMovie | null> => {
  const url = `${OMDB_URL}?i=${id}&${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
