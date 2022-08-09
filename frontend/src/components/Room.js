import React from "react";

//change Max Count / Capacity in backend/database and in MongoDB

function Room({ room }) {
  return (
    <div className='row'>
        <div className="col-md-4">
            <img src={room.imageurls[0]} className='smallimg'/>
        </div>
        <div className="col-md-7">
            <h1>{room.name}</h1>
            <p>Max Count : {room.capacity}</p>
            <p>Phone Number : {room.phonenumber}</p>
            <p>Type : {room.type}</p>
        </div>
    </div>
  );
}


export default Room;
