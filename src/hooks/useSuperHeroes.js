// import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { request } from '../utils/axiosUtils';


const fetchSuperHeroes = () => {
    // return axios.get("http://localhost:4000/superheroes")
    return request({url: '/superheroes'})
}

const addSuperHero = (data) => {
    // return axios.post("http://localhost:4000/superheroes", data)
    return request({url: '/superheroes', method: 'post', data})
}

export const useSuperHeroes = (onSuccess, onError, select) => {

    return useQuery('super-heroes', fetchSuperHeroes, {
        // cacheTime: 5000, // cached time default value is 5 minutes
        // staleTime: 30  // default stale time is 0 second
        // refetchOnMount: "always", // true || false || always
        // refetchOnWindowFocus: true // true || false || always
        // refetchInterval: 2000, // default false
        // refetchIntervalInBackground: true // continue to pull data even when the browser is not in focus
        onSuccess,
        onError,
        select: (data) => {
            if (select) {
                const superHeroNames = data.data.map(hero => hero.name);
                return superHeroNames;
            }
            return data;
        }

    });
}

export const useAddHero = () => {
    const queryClient = useQueryClient()
    return useMutation(addSuperHero, {
        // onSuccess: (response) => {
        //     // queryClient.invalidateQueries('super-heroes') // refetches the data
        //     queryClient.setQueryData('super-heroes', (oldData) => {
        //         return {
        //             ...oldData,
        //             data: [...oldData.data, response.data]
        //         }
        //     })
        // }
        onMutate: async (newHero) => {
            await queryClient.cancelQueries('super-heroes');
            const previousHeroData = queryClient.getQueryData('super-heroes');
            queryClient.setQueryData('super-heroes', (oldData) => {
                return {
                    ...oldData,
                    data: [...oldData.data, { id: oldData.data.length + 1, ...newHero }]
                }
            });
            return {
                previousHeroData,

            }
        },
        onError: (_error, _hero, context) => {
            queryClient.setQueryData('super-heroes', context.previousHeroData)
        },
        onSettled: () => {
            queryClient.invalidateQueries('super-heroes')
        }
    })
}