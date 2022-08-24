import React from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init({
  duration: "2000",
});

function Landing() {
  return (
    <div
      className="bgimg"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg')" }}
    >
      <div className="row landing justify-content-center">
        <div
          className="col-md-9 my-auto text-center"
          //style={{ borderRight: "8px solid white" }}
        >
          <h2
            data-aos="zoom-in"
            style={{
              color: "white",
              fontSize: "130px",
              fontWeight: "bold",
              textShadow: "4px 4px 5px black",
            }}
          >
            Runtime Terror Hotel
          </h2>

          <h2
            data-aos="zoom-out"
            style={{
              color: "white",
              fontSize: "50px",
              textShadow: "4px 4px 5px black",
            }}
          >
            Your stay. Your way.
          </h2>
          <Link to="home">
            <button
              className="btn landingButton btn-lg"
              style={{ boxShadow: "back", border: "black" }}
            >
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
