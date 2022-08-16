import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init({
  duration: "1000",
});

//change Max Count / Capacity in backend/database and in MongoDB

function Room({ room, checkIn, checkOut }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="row bs" data-aos='fade-up'>
      <div className="col-md-4">
        <img src={room.imageurls[0]} className="smallimg" alt="" />
      </div>
      <div className="col-md-7">
        <h1>{room.name}</h1>
        <p>
          <b>Sleeps:</b> {room.capacity}
        </p>
        <p>
          <b>Phone Number:</b> {room.phonenumber}
        </p>
        <p>
          <b>Type:</b> {room.type}
        </p>
        {/* Main Card Buttons */}
        <div style={{ float: "right" }}>
          {checkIn && checkOut && (
            <Link to={`/book/${room._id}/${checkIn}/${checkOut}`}>
              <button className="btn btn-primary m-2">Book Now</button>
            </Link>
          )}

          <button className="btn btn-primary" onClick={handleShow}>
            View Details
          </button>
        </div>
      </div>
      {/* React-Bootstrap Modal Popup */}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* React-Bootstrap Image Carousel */}
          <Carousel prevLabel="" nextLabel="">
            {room.imageurls.map((url) => {
              return (
                <Carousel.Item>
                  <img className="d-block w-100 bigimg" src={url} alt="" />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;
