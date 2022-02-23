import React, {useContext, useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { authContext } from '../App';

import api from '../core/api';

import './Home.css';

const LoginPage = () => {
  const userID = useContext(authContext).userID;
  const {setUserID} = useContext(authContext);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (userID && navigate) {
      navigate(`/dashboard`);
    }
  }, [navigate, userID]);

  const signin = async () => {
    const id = await api.getUserID(username);
    if (!id) {
      const response = window.confirm("Username does not exist. Sign up instead?");
      if (response) {
        signup();
      } else {
        return;
      }
    } else {
      setUserID(id);
    }
  };

  const signup = async () => {
    if (username.length < 6) {
      alert("Username must be at least 6 characters");
      return;
    }
    const id = await api.getUserID(username);
    if (!id) {
      const user = await api.addUser(username);
      setUserID(user.id);
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

export default LoginPage;
