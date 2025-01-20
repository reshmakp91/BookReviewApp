import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DOMPurify from "dompurify";
import { marked } from "marked"; 
import "./SinglePost.css";
import ReactMarkdown from 'react-markdown';

function SinglePost() {
  const [book, setBook] = useState(null);
  const { id } = useParams();
  const [isLoggedin, setIsLoggedin] = useState(false);
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem("auth_token");
    if (token) {
      setIsLoggedin(true);
      navigate(`/post/${id}`);
    } else {
      setIsLoggedin(false);
    }

    // Fetch post details
    fetch(`http://127.0.0.1:8000/posts/${id}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setBook(data);
      })
      .catch((error) => console.error("Error fetching post detail:", error));

    // Fetch comments for the post
    fetch(`http://127.0.0.1:8000/comments/view/?post_id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      })
      .catch((error) => console.error("Error fetching comments:", error));
  }, [id, navigate]);

  const handleCommentSubmit = () => {
    if (!name || !email || !comment) {
      alert("Please fill in all fields.");
      return;
    }

    const token = sessionStorage.getItem("auth_token");

    const commentData = {
      name: name,
      email: email,
      comment: comment,
      post: id,
    };

    fetch("http://127.0.0.1:8000/comments/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to post comment.");
        }
        return response.json();
      })
      .then((data) => {
        setComments([data, ...comments]);
        alert("Comment posted successfully!");
        setName('');
        setEmail('');
        setComment('');
      })
      .catch((error) => console.error("Error posting comment:", error));
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  

  return (
    <div className='singlePost'>
      <div className="postDetail">
        <h2>{book.title}</h2>
        <p className='postedby'>Posted By: {book.created_by.name}</p>
        <img src={book.image} alt={book.title} />
        <div className="postContent"/>
          <ReactMarkdown>{book.content}</ReactMarkdown>
        </div>
        <div className="commentSection">
          <p className="comment">Leave a reply</p>
          <textarea 
           className="commentbox" 
            placeholder="Your comment here..." 
            value={comment} 
            onChange={(e) => setComment(e.target.value)} />
        <div className='commentInfo'>
          <div className='name'>
            <label>Name : </label><br/>
            <input 
              type="text" 
              className='commentInput' 
              placeholder='Your Name' 
              value={name} 
              onChange={(e) => setName(e.target.value)} />
          </div>
          <div className='email'>
            <label>Email : </label><br/>
            <input 
              type="text" 
              className='commentInput' 
              placeholder='Your Email'
              value={email} 
              onChange={(e) => setEmail(e.target.value)}  />
          </div>
        </div>
        <button type='submit' className='postButton'onClick={handleCommentSubmit}>Post Comment</button>
      </div>

      <div className="commentsList">
      <p className="comments">Comments</p>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="commentItem">
              <p><strong>{comment.name}</strong></p>
              <p className="commentDate">{new Date(comment.posted_at || new Date()).toLocaleString()}</p>
              <p>{comment.comment}</p>
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
}

export default SinglePost;
