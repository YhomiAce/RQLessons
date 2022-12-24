import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

const fetchUsers = async (pageNumber) => {
    const page = pageNumber === 0 ? 0 : 4 + pageNumber
    return await axios.get("https://dummyjson.com/users?limit=5&skip=" + page);
}


const PaginatedQueries = () => {
    const [pageNumber, setPageNumber] = useState(0)
    const { isLoading, isError, error, data } = useQuery(['users', pageNumber], () => fetchUsers(pageNumber), {
        keepPreviousData: true
    });

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    if (isError) {
        return <h2>{error.message}</h2>
    }


    return (
        <>
            <div>
                <h1>PaginatedQueries</h1>
                {
                    data?.data.users.map(user => (
                        <div key={user.id}>
                            <h4> {user.firstName} {user.lastName} </h4>
                        </div>
                    ))
                }
            </div>
            <div>
                <button onClick={() => setPageNumber(page => page -1)} disabled={pageNumber === 0}>Prev</button>
                <button onClick={() => setPageNumber(page => page +1)} disabled={pageNumber === 10}>Next Page</button>
                {/* <button>Next</button> */}
            </div>
        </>
    )
}

export default PaginatedQueries