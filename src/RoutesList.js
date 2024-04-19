import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Navbar";
import Home from "./Home";
import Company from "./Company";
import Companies from "./Companies";
import Jobs from "./Jobs";
import EditProfile from "./EditProfile";
import LoginSignup from "./LoginSignup";
import NotFound from "./NotFound";

const RoutesList = ({login, signup, logout}) => {
  return (
    <BrowserRouter>
      <NavBar logout={logout}/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/companies/:company" element={<Company />} />
        <Route exact path="/companies" element={<Companies />} />
        <Route exact path="/jobs" element={<Jobs />} />
        <Route exact path="/login-signup-form" element={<LoginSignup login={login} signup={signup}/>} />
        <Route exact path="/edit-profile" element={<EditProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesList;
