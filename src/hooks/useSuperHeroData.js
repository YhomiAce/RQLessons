import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';

const fetchSuperHeroe = ({ queryKey }) => {
    const heroId = queryKey[1]
    return axios.get("http://localhost:4000/superheroes/" + heroId)
}

export const useSuperHeroData = (heroId) => {
    const queryClient = useQueryClient()
    return useQuery(["find-hero", heroId], fetchSuperHeroe, {
        initialData: () => {
            const hero = queryClient
            .getQueryData('super-heroes')
            ?.data?.find(where => where.id === parseInt(heroId))
            if (hero) {
                return {
                    data: hero
                }
            }else{
                return undefined
            }
        }
    })
}