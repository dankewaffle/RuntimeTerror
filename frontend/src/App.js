import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter , Route , Link } from 'react-router-dom';
import Homepage from "./pages/Homepage";

function App() {
  return (
    <div className="App">
        <Navbar/>
        <BrowserRouter>

            <Route path="/home" exact component={Homepage} />

        </BrowserRouter>


    </div>
  );
}

export default App;
