import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Blog.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ReactMarkdown from 'react-markdown';

function Blog() {

  const location = useLocation();
  console.log(location);  
  const [successMessage, setSuccessMessage] = useState("");
  const [books, setBooks] = useState([]);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("auth_token");
    if(token){
      setIsLoggedin(true);
      navigate('/Blog')
    }
    else{
      setIsLoggedin(false);
    }
    const message = sessionStorage.getItem("successMessage");
        if (message) {
            setSuccessMessage(message);
            sessionStorage.removeItem("successMessage");
        }

      fetch("http://127.0.0.1:8000/posts/")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Posts:", data);
        setBooks(data);
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, [navigate]);

  return (
    <div className="blog">
      {successMessage && <p className="successMessage">{successMessage}</p>}
      <div className="blogTitle">
        <h2>All Posts</h2>
        <hr />
      </div>    
      <div className="posts">
        {books.map((book) => (
          <div className="post" key={book.id}>
            <Link to={`/post/${book.id}`}><img className="postImg" src={book.image} alt="bookimage" /></Link>
            <div className="postInfo">
              <Link to={`/post/${book.id}`} className="postTitle">{book.title}</Link>
              <hr />
              <span className="postAuthor">Posted By: {book.created_by.name}</span>
            </div>
            <p className="postDesc">
              <ReactMarkdown>{book.content}</ReactMarkdown>
            </p>
            <Link to={`/post/${book.id}`} className="readMoreLink">Read More...</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;
