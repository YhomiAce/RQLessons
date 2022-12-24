import { useParams } from "react-router-dom";
import { useSuperHeroData } from "../hooks/useSuperHeroData";

const RQSuperHeroe = () => {
    const { heroId } = useParams()
    const { isError, isLoading, data, error } = useSuperHeroData(heroId);

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    if (isError) {
        return <h2>{error.message}</h2>
    }

  return (
    <div>
        <h2>Super Heroe Details Page</h2>
        <h5>{data?.data.name}</h5>
        <h5>{data?.data.alterEgo}</h5>
    </div>
  )
}

export default RQSuperHeroe