import {useContext } from "react";
import UserContext from "./UserContext";
import './Home.css';

const Home = () => {
  // Homepage
  const user = useContext(UserContext);

  return (
    <div className="home-display">
      {user.currentUser ? (
        <h1>Welcome, {user.currentUser.firstName}</h1>
      ) : (
        <h1>Welcome to Jobly</h1>
      )}
    </div>
  );
};

export default Home;
