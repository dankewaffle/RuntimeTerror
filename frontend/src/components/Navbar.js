import React from "react";

function Navbar() {
  const account = JSON.parse(localStorage.getItem("currentAccount"));
  function signout() {
    localStorage.removeItem("currentAccount");
    window.location.href = "/signin";
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg border-bottom">
        <div className="container-fluid">
          <a className="navbar-brand ms-3 mt-1 mb-1" href="/home">
            Runtime Terror Hotel
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <i className="fa-solid fa-bars" style={{ color: "white" }}></i>
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-3">
              {account ? (
                <>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa-solid fa-user"></i>
                      &nbsp;
                      {account.data.name}
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="/account">
                          My Account
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/management">
                          Management Portal
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#" onClick={signout}>
                          Sign Out
                        </a>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <li className="nav-item active">
                    <a className="nav-link" href="/join">
                      Join
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/signin">
                      Sign In
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
