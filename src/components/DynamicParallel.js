import axios from "axios"
import { useQueries } from "react-query"


const fetchAnime = (animeId) => {
    return axios.get("http://localhost:4000/animes/"+animeId)
}

const DynamicParallel = ({animeIds}) => {
    console.log(animeIds);
    const results = useQueries(
        animeIds.map(anime => {
            return {
                querKey: ['anime-'+anime, anime],
                queryFn: () => fetchAnime(anime)
            }
        })
    );

    console.log({results});

  return (
    <div>DynamicParallel</div>
  )
}

export default DynamicParallel