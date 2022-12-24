import axios from "axios"
import { useQuery } from "react-query";

const fetchUserByEmail = (email) => {
    return axios.get("http://localhost:4000/users/"+email)
}

const fetchCoursesByChannelId = (channelId) => {
    return axios.get("http://localhost:4000/channels/"+channelId)
}

const DependentQueries = ({email}) => {
    const {data: user} = useQuery(["user", email], () => fetchUserByEmail(email));
    const channelId = user?.data.channelId;
    const {data: courses, isLoading} = useQuery(['courses', channelId], () => fetchCoursesByChannelId(channelId), {
        enabled: !!channelId
    });
    console.log(courses?.data);
    if (isLoading) {
        return <h2>Loading......</h2>
    }

  return (
    <div>
        <h1>DependentQueries</h1>
        <h2>Courses</h2>
        {
            courses?.data.courses.map(course => (
                <h5 key={course}> {course} </h5>
            ))
        }
    </div>
  )
}

export default DependentQueries