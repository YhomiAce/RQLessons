import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSuperHeroes, useAddHero } from '../hooks/useSuperHeroes';

const RQSuperHeroesPage = () => {
    const [heroData, setHeroData] = useState({
        name: '',
        alterEgo: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHeroData({ ...heroData, [name]: value });
    }

    const { mutate } = useAddHero()

    const onSuccess = (data) => {
        console.log("Side effect after data fetching", data);
    }
    const onError = (error) => {
        console.log("Side effect after encountering error", error);
    }
    const { isLoading, data, isError, error, isFetching } = useSuperHeroes(onSuccess, onError)
    console.log({ isLoading, isFetching });
    if (isLoading) {
        return <h2>Loading...</h2>
    }

    if (isError) {
        return <h2>{error.message}</h2>
    }
    const { name, alterEgo } = heroData;

    const handleAddHero = () => {
        console.log(name, alterEgo);
        const payload = {name, alterEgo}
        mutate(payload)
    }

    return (
        <>
            <h2>RQ Super Heroes Page</h2>
            <div>
                <input type="text" name="name" value={name} onChange={handleChange} />
                <input type="text" name="alterEgo" value={alterEgo} onChange={handleChange} />
                <button onClick={handleAddHero}>Add Hero</button>
            </div>
            {
                data?.data.map(hero => (
                    <div key={hero.id}>
                        <Link to={`/heroes/${hero.id}`}>{hero.name}</Link>
                    </div>
                ))
                // data.map(hero => (
                //     <div key={hero}>{hero}</div>
                // ))
            }
        </>
    )
}

export default RQSuperHeroesPage