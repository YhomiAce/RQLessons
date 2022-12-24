import axios from "axios"
import { useQuery } from "react-query"


const fetchSuperHeroes = () => {
    return axios.get("http://localhost:4000/superheroes")
}

const fetchAnimes = () => {
    return axios.get("http://localhost:4000/animes")
}

const ParallelQueries = () => {
   const { data:heroes} = useQuery('super-heroes', fetchSuperHeroes)
    const { data: animes} = useQuery('animes', fetchAnimes)
    console.log({animes, heroes});

  return (
    <div>ParallelQueries</div>
  )
}

export default ParallelQueries