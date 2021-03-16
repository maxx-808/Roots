import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css"

const PostContainer = () => {
  // const [form, setForm] = useState({ title: "", text: "" });
  const [posts, setPosts] = useState([]);
  // const onChange = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

  // const submitPost = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const newPost = await axios.post("/api/posts", form, {
  //       headers: { "x-auth-token": localStorage.getItem("auth-token") },
  //     });

  //     setPosts([...posts, newPost]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    let cancelToken = axios.CancelToken;
    let source = cancelToken.source();
    (async () => {
      try {
        const allPosts = await axios.get("/api/posts", {
          cancelToken: source.token,
          // headers: { "x-auth-token": localStorage.getItem("auth-token") },
        });

        setPosts(allPosts.data);
      } catch (err) {
        axios.isCancel(err)
          ? console.log("Request cancelled")
          : console.log(err);
      }
    })();
    return () => source.cancel();
  }, []);

  return (
    <div>
      <h1 style={{marginTop:"30px"}}>Welcome to Roots!!</h1>

      <div className="container">
        {posts.map((post, index) => (
          <div style={{background:"rgba(255, 255, 255, 0.250)", marginTop:"50px", borderRadius:"15px"}} className="card" key={index}>
            <h3>{post.displayName}</h3>
            <p>{post.message}</p>
            <form>
              <input style={{color:"lightGrey"}} type="text" className="chatInput" placeholder="Type message here:" />
              <button style={{marginBottom:"10px", marginTop:"10px", backgroundColor:"lightGrey", borderRadius:"10px"}} type="submit" className="chatSubmit">
                Send
              </button>
            </form>
            {post.chat.map((msg, index) => (
              <p key={index}>{msg}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostContainer;
