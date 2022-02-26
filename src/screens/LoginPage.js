import React, {useContext, useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { authContext } from '../App';

import api from '../core/api';

import './LoginPage.css';

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
    try {
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
    } catch (err) {
      alert(err);
    }
  };

  const signup = async () => {
    if (username.length < 6) {
      alert("Username must be at least 6 characters");
      return;
    }
    if (!username.match(/^\S*$/g)) {
      alert("Username can not have spaces");
      return;
    }
    try {
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
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className='container'>
      <div id="logo">
        <img id="imgLogo" src="hoardLogo.png"/>
      </div>
      <div className='signin'>
        <label htmlFor="username">Username: </label>
        <input id="username" type="text" value={username} onChange={(event) => setUsername(event.target.value)}></input>
        <br />
        <button className='hoard-button' onClick={signin}>Sign In</button>
        <span> or </span>
        <button className='hoard-button' onClick={signup}>Sign Up</button>
      </div>
    </div>
  );
};

export default LoginPage;
