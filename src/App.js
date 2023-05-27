import { Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import Header from "./Components/Header/Header";
import Inbox from "./Components/Inbox/Inbox";
import SentBox from "./Components/sentbox/SentBox";
function App() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Switch>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/Home">
            <Home />
          </Route>
          <Route path="/Inbox">
            <Inbox />
          </Route>
          <Route path="/SentBox">
            <SentBox />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
