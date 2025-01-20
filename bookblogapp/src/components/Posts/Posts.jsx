import { useState, useEffect } from "react";
import "./Posts.css";
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export default function Posts() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/posts/")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Posts:", data);
        setBooks(data.slice(0, 3));
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  return (
    <div className="recent">
      <div className="sectionTitle">
        <h2>Recent Posts</h2>
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
        <div className="viewMore">
          <Link to="/Blog" className="link">Click here to view all posts</Link>
        </div>
      </div>
    </div>
  );
}
