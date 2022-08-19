import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  async function signin() {
    const account = {
      email,
      password,
    };
    try {
      setLoading(true);
      const result = await axios.post("/api/accounts/signin", account);
      setLoading(false);

      localStorage.setItem("currentAccount", JSON.stringify(result));
      window.location.href = "/home";
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  }

  return (
    <div>
      {loading && <Loader />}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {error && <Error message="Invalid Credentials" />}
          <div className="bs" style={{ backgroundColor: "white" }}>
            <h2>Sign In to Your RuntimeTerror Members Account</h2>
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <button className="btn btn-primary mt-3" onClick={signin}>
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
