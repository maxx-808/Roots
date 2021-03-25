import React, { useState, useContext, useEffect } from "react";
import UserContext from "../Context/UserContext.js";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Slogan from "../components/Slogan/slogan";
import Nav from "../components/Navbar/nav";

const Register = () => {
  const [form, setForm] = useState();
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = await axios.post("/api/users/register", form);
      console.log(newUser);
      // history.push("/login");
      console.log(form);
      const { data } = await axios.post("api/users/login", {
        email: form.email,
        password: form.password,
      });
      setUserData({
        token: data.token,
        user: data.user,
      });
      localStorage.setItem("auth-token", data.token);
      history.push("/");
    } catch (err) {
      console.log(err.response);

      const regErr = document.getElementById("registerErr");
      regErr.innerHTML = err.response.data.msg;
      regErr.classList.remove("hidden");
      regErr.classList.add("err");
    }
  };

  useEffect(() => {
    if (userData.user) history.push("/");
  }, [userData.user, history]);

  return (
    <div>
      <Nav />
      <Slogan />
      <form onSubmit={submit} className="reg-form">
        <h1 style={{ paddingTop: "20px" }}>SignUp</h1>
        <p id="registerErr" className="hidden"></p>
        <label style={{ color: "black" }}>Email</label>
        <input
          style={{ color: "black", borderBottom: "1px solid grey" }}
          onChange={onChange}
          type="text"
          name="email"
        />
        <label style={{ color: "black" }}>Password</label>
        <input
          style={{ color: "black", borderBottom: "1px solid grey" }}
          onChange={onChange}
          type="text"
          name="password"
        />
        <label style={{ color: "black" }}>Password Check</label>
        <input
          style={{ color: "black", borderBottom: "1px solid grey" }}
          onChange={onChange}
          type="text"
          name="passwordCheck"
        />
        <label style={{ color: "black" }}>Display Name</label>
        <input
          style={{ color: "black", borderBottom: "1px solid grey" }}
          onChange={onChange}
          type="text"
          name="displayName"
        />
        <label style={{ color: "black" }}>Native Language</label>
        <input
          style={{ color: "black", borderBottom: "1px solid grey" }}
          onChange={onChange}
          type="text"
          name="native_lang"
        />
        <label style={{ color: "black" }}>Language you want to learn:</label>
        <input
          style={{ color: "black", borderBottom: "1px solid grey" }}
          onChange={onChange}
          type="text"
          name="learn_lang"
        />
        <input
          style={{
            marginTop: "20px",
            backgroundColor: "lightGrey",
            borderRadius: "10px",
          }}
          type="submit"
          name="Register"
        />
      </form>
    </div>
  );
};

export default Register;
