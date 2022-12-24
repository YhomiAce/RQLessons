import axios from "axios";
import { Fragment } from "react";
import {  useInfiniteQuery } from "react-query";

const fetchProducts = async ({pageParam = 1 }) => {
    return await axios.get("https://dummyjson.com/products?limit=3&skip="+pageParam);
}


const InfiniteQueries = () => {
    const { isLoading, isError, error, data, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery('products', fetchProducts, {
        getNextPageParam: (_, pages) => {
            if (pages.length < 10) {
                return pages.length + 1;
            }else{
                return undefined;
            }
        }
    });
    console.log({data});

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    if (isError) {
        return <h2>{error.message}</h2>
    }


    return (
        <>
            <div>
                <h1>Inifnited Queries</h1>
                {
                    data?.pages.map((group, i) => (
                        <Fragment key={i}>
                           {
                            group.data.products.map(product => {
                                return <h4 key={product.id}> {product.title} </h4>
                            })
                           } 
                        </Fragment>
                    ))
                }
            </div>
            <div>
                {
                    isFetching && isFetchingNextPage ? 'Fetching...' : null
                }
            </div>
            <div>
                <button disabled={!hasNextPage} onClick={fetchNextPage} > Load More</button>
            </div>
            
        </>
    )
}

export default InfiniteQueries