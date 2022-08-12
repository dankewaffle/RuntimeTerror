import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";

function Home() {
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
    };

    fetchData().catch((error) => {
      setError(true);
      console.log(error);
      setLoading(false);
    });
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) : rooms.length > 1 ? (
          rooms.map((room) => {
            return (
              <div className="col-md-9 mt-3">
                <Room room={room} />
              </div>
            );
          })
        ) : (
          <Error />
        )}
      </div>
    </div>
  );
}

export default Home;
