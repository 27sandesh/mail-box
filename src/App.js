import { Route } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
function App() {
  return (
    <div>
      <Login />
      <Route path="/Home">
        <Home />
      </Route>
    </div>
  );
}

export default App;
