import React , { useState , useEffect } from "react";
import axios from "axios";

function Homepage() {

    const[rooms , setRooms] = useState([])

    // deprecated react code
/*
    useEffect(async() => {
        try {
            const data = (await axios.get('/api/rooms/allrooms')).data

            setRooms(data)
        } catch (error) {
            console.log(error)
        }
    }, []);
*/

    useEffect(() => {
        const fetchData = async () => {
            const data = await axios('/api/rooms/allrooms')
            setRooms(data.data)
            console.log(data)
        }

        fetchData()
            .catch(console.error);
    }, [])


    return (
        <div>
            <h1>Home Page</h1>
            <h1>There are {rooms.length} rooms</h1>
        </div>
    )
}

export default Homepage;