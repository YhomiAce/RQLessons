import { Link } from 'react-router-dom';
import { useSuperHeroes } from '../hooks/useSuperHeroes';

const FetchDataByUser = () => {
    const onSuccess = () => {
        console.log("Side effect after data fetching", data);
    }
    const onError = () => {
        console.log("Side effect after encountering error");
    }
    const { isError, isLoading, data, error, refetch, isFetching } = useSuperHeroes(onSuccess, onError)

    if (isLoading || isFetching) {
        return <h2>Loading...</h2>
    }

    if (isError) {
        return <h2>{error.message}</h2>
    }

    return (
        <>
            <h2>Load Super Heroes on Click</h2>
            <button onClick={refetch}>Fetch Heroes</button>
            {
                data?.data.map(hero => (
                    <div key={hero.id}>
                        <Link to={`/heroes/${hero.id}`}>{hero.name}</Link>
                    </div>
                ))
            }
        </>
    )
}

export default FetchDataByUser