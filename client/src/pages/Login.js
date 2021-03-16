import React, { useState, useContext, useEffect } from "react";
import UserContext from "../Context/UserContext.js";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../App.css";


const Login = () => {
  const [form, setForm] = useState();
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitLoginForm = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/users/login", form);
      console.log(data);

      setUserData({
        token: data.token,
        user: data.user,
      });

      localStorage.setItem("auth-token", data.token);
      history.push("/");
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    if (userData.user) history.push("/");
  }, [userData.user, history]);

  return (
    <div>
      <form onSubmit={submitLoginForm} className="login-form">
        <h1 style={{padding:"auto"}}>Login:</h1>
        <label>email</label>
        <input onChange={onChange} type="text" name="email" />
        <label>Password</label>
        <input onChange={onChange} type="text" name="password" />
        <input style={{marginTop:"20px", backgroundColor:"lightGrey", borderRadius:"10px"}} type="submit" name="Login" />
      </form>
    </div>
  );
};

export default Login;
