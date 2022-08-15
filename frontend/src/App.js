import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Book from "./pages/Book";
import Join from "./pages/Join";
import Signin from "./pages/Signin";
import Account from "./pages/Account";
import Management from "./pages/Management";

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Route path="/home" exact component={Home} />
        <Route path="/book/:roomid/:checkIn/:checkOut" exact component={Book} />
        <Route path="/join" exact component={Join} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/account" exact component={Account} />
        <Route path="/management" exact component={Management} />
      </BrowserRouter>
    </div>
  );
}

export default App;
