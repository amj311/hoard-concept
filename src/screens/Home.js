import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

import api from '../core/api';

import './Home.css';

const Home = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const signin = async () => {
    const userID = await api.getUserID(username);
    if (!userID) {
      const response = window.confirm("Username does not exist. Sign up instead?");
      if (response) {
        signup();
      } else {
        return;
      }
    } else {
      navigate(`/${userID}`);
    }
  };

  const signup = async () => {
    if (username.length < 6) {
      alert("Username must be at least 6 characters");
      return;
    }
    const userID = await api.getUserID(username);
    if (!userID) {
      const user = await api.addUser(username);
      navigate(`/${user.id}`);
    } else {
      const response = window.confirm("Username already exists. Sign in instead?");
      if (response) {
        signin();
      } else {
        return;
      }
    }
  };

  return (
    <div>
      <h2>Welcome to Hoard!</h2>
      <div className='signin'>
        <label htmlFor="username">Username: </label>
        <input id="username" type="text" value={username} onChange={(event) => setUsername(event.target.value)}></input>
        <br />
        <button onClick={signin}>Sign In</button>
        <span> or </span>
        <button onClick={signup}>Sign Up</button>
      </div>
    </div>
  );
};

export default Home;
