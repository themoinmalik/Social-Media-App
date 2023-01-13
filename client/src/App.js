import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import MyProfile from "./pages/profile/MyProfile";
import Login from "./pages/login/Login";
import PrivateRoute from "./privateRoutes/PrivateRoute";
import LoginPrivateRoute from "./privateRoutes/LoginPrivateRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Messenger from "./pages/messenger/Messenger";


export default function App() {

  

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact element={<LoginPrivateRoute />}>
            <Route exact path="/" element={<Login />} />
          </Route>
          <Route exact element={<PrivateRoute />}>
            <Route exact path="/feeds" element={<Home />} />
             <Route exact path ="/feeds/myprofile/:name" element={<MyProfile />} />
            
          </Route>

          <Route exact path="/feeds/userprofile/:name" element={<Profile />} />
          <Route exact path="/messenger" element = {<Messenger/>} />
          
        
        </Routes>
      </div>
    </Router>
  );
}
