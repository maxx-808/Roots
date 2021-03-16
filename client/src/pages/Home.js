import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../Context/UserContext";
import Slogan from "../components/Slogan/slogan";
import PostContainer from "../components/PostContainer";


const Home = (props) => {
  const { userData } = useContext(UserContext);
  const history = useHistory();

  console.log("userData", userData);
  useEffect(() => {
    if (!userData.user) history.push("/login");
  }, [userData.user, history]);
  return (
    <div>
      <Slogan />
      <PostContainer />
    </div>
  );
};

export default Home;
