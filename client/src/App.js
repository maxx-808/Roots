import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Nav from "./components/Navbar/nav";

import UserContext from "./Context/UserContext";
import Footer from "./components/Footer/footer";
import Slogan from "./components/Slogan/slogan";

function App() {
  const [userData, setUserData] = useState({
    user: undefined,
    token: undefined,
  });

  const checkLoggedIn = async () => {
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      localStorage.setItem("auth-token", "");
    } else {
      try {
        const userRes = await axios.get("/api/users", {
          headers: { "x-auth-token": token },
        });

        setUserData({ token, user: userRes.data });
      } catch (err) {
        console.log("User must login");
      }
    }
  };

  const logout = () => {
    setUserData({ token: undefined, user: undefined });
    localStorage.setItem("auth-token", "");
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <div className="App">
      <Router>
        {!userData.user ? (
          <>
           < Nav />
           < Slogan />
          </>
        ) : (
          <nav className="nav-wrapper">
          <img style={{marginLeft:"60px"}} src="https://img.icons8.com/ios/100/000000/tms-tree.png"/>
          <ul id="nav-mobile" className="right hide-on-med-and-down"></ul>
          <Link style={{float:"right", paddingRight:"30px"}} to="/" onClick={logout}>
            Logout
          </Link>
          </nav>
        )}

        <UserContext.Provider value={{ userData, setUserData }}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/" component={Home} />
          </Switch>
        </UserContext.Provider>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
