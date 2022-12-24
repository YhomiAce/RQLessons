import axios from 'axios';
import { useState, useEffect } from 'react';

const SuperHeroesPage = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true)
        axios.get("http://localhost:4000/superheroes").then(res => {
            setData(res.data);
            setLoading(false)
        }).catch(err => {
            setError(err.message);
            setLoading(false)
        })
    }, []);

    if (loading) {
        return <h2>Loading...</h2>
    }
    if (error) {
        return <h2>{error}</h2>
    }

    return (
        <>
            <h2>Super Heroes Page</h2>
            {
                data.map(hero => (
                    <div key={hero.id}>{hero.name}</div>
                ))
            }
        </>
    )
}

export default SuperHeroesPage