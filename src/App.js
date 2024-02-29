import { useState, useEffect } from "react";
import RoutesList from "./RoutesList";
import { jwtDecode } from "jwt-decode";
import "./App.css";
import JoblyApi from "./api";
import UserContext from "./UserContext";

function App() {
  
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    async function getUser() {
      console.log('refresh DOM');
      if (localStorage.getItem('authToken')) {
        let token = localStorage.getItem('authToken');
        try {
          let username = jwtDecode(token);
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username.username);
          setCurrentUser(currentUser);
        } catch (e) {
          console.log(e);
          console.log('---');
        }
      }
    }

    getUser();
  }, [token]);
  

  /** Handles site-wide logout. */
  function logout() {
    setCurrentUser(null);
    localStorage.removeItem('authToken');
  }

  /** Handles site-wide signup.
   *
   * Automatically logs them in (set token) upon signup.
   *
   * Make sure you await this function and check its return value!
   */
  async function signup(signupData) {
    try {
      let token = await JoblyApi.signup(signupData);
      localStorage.setItem('authToken', token);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  /** Handles site-wide login.
   *
   * Make sure you await this function and check its return value!
   */
  async function login(loginData) {
    try {
      let token = await JoblyApi.login(loginData);
      localStorage.setItem('authToken', token);
      setToken(token);
      return { 
        success: true,
        token
      };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  return (
    <div className="App">
      <UserContext.Provider value={{currentUser, setCurrentUser}}>
      <RoutesList login={login} signup={signup} logout={logout}/>
      </UserContext.Provider>
    </div>
  );
}

export default App;
