import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
// import {Link} from "react-router-dom"

function Feed() {

  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [posts, setPosts] = useState([]);

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
  useEffect(() => {
    fetchPosts();
  }, [pageNumber]);

  const fetchPosts = async () => {
    axios
      .get(`http://localhost:8000/postupload?page=${pageNumber}`)
      .then((res) => {
        setPosts(res.data.postData);
        setNumberOfPages(res.data.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const goToNext = () => {
    setPageNumber(Math.min(numberOfPages, pageNumber + 1));
  };

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((post) => {
          return <Post key={post._id} post={post} />;
        })}


        {/* <button onClick={goToPrevious}>Previous</button>

        {pages.map((pageIndex) => (
          <button onClick={() => setPageNumber(pageIndex)}>
            {pageIndex + 1}
          </button>
        ))}
        <button onClick={goToNext}>Next</button> */}
      </div>
    </div>
  );
}

export default Feed;
