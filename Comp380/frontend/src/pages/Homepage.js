import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room";

function Homepage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  // deprecated react code
  /*
    useEffect(async() => {
        try {
            setLoading(true)
            const data = (await axios.get('/api/rooms/allrooms')).data

            setRooms(data)
            setLoading(false)
        } catch (error) {
            setError(true)
            console.log(error)
            setLoading(false)
        }
    }, []);
*/

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await axios("/api/rooms/allrooms");

      setRooms(data.data);
      setLoading(false);
      //console.log(data);
    };

    fetchData().catch((error) => {
      setError(true);
      console.log(error);
      setLoading(false);
    });
  }, []);

  return (
    <div className='container'>
      <div className="row justify-content-center mt-5">
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>Error</h1>
        ) : (
          rooms.map((room) => {
            return (
              <div className="col-md-9 mt-2">
                <Room room={room} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Homepage;
