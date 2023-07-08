import { useParams } from "react-router-dom";


const OMDB_URL = 'http://www.omdbapi.com/';
const API_KEY = 'apikey=797d76c8';

export const urls = {
    GET_POSTS: `${OMDB_URL}&${API_KEY}`,
}

