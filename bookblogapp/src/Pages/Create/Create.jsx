import "./Create.css"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactMarkdown from'react-markdown';
import { Link } from 'react-router-dom';

function Create() {

  const [file,setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("") 
  const [isLoggedin, setIsLoggedin] = useState(false);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(null); // Success message
  const [error, setError] = useState(null); // Error handling
  const [showGuide, setShowGuide] = useState(false);

  const toggleGuide = () => {
    setShowGuide((prevShowGuide) => !prevShowGuide);
  };

  useEffect(()=>{
    const token = sessionStorage.getItem("auth_token");
    if(token){
      setIsLoggedin(true);
      navigate('/Create')
    }
    else{
      setIsLoggedin(false);
    }
  },[navigate])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append("image", file);
    }
    formData.append("title", title);
    formData.append("content", content);

    try {
      const token = sessionStorage.getItem('auth_token');
      const response = await fetch("http://127.0.0.1:8000/posts/create/", {
        method: "POST",
        headers: {
          'Authorization': `Token ${token}`, // Note the correct placement of the token
        },
        body: formData, 
      });

      console.log("Response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("Blog created successfully:", data);
        setSuccess("Blog created successfully");
        sessionStorage.setItem('successMessage', 'Blog created successfully');
        setError(null);
        navigate("/Blog");
      } else {
        const errorData = await response.json();
        console.error("Failed to create blog:", errorData);
        setError("Failed to create blog");
        setSuccess(null);
      }
    } catch (err) {
      console.error("An error occurred:", err);
      alert("An error occurred")
      setError("Failed to update profile.");
      setSuccess(null);
    }
  };

  return (
    <div className="write">
      {error && <p className="errorMessage">{error}</p>}
      <div className="writeGuide">
        <button className="link" onClick={toggleGuide}>
          Need Help? Click Here for a Quick Guide to Create your Post! 
        </button>
      </div>
      {showGuide && (
        <div className="guideContent">
          <h3>Follow these simple steps to create an amazing post:</h3><br/>
          <ul>
            <li>
              Add a Title: Think of a catchy and descriptive title that grabs attention.
            </li>
            <li>
              Write Your Post content: Refer the guidelines to write in markdown format.
            </li>
            <li>
              Upload an Image (Optional): Click the "+" icon to attach an image for your post.
            </li>
            <li>Click Publish: Once you're done, hit the "Publish" button to share your post.</li>
          </ul><br/>
          <h3>
            Here’s a quick reference to use <strong>Markdown</strong> to style your content (e.g., headings, lists, bold text):
          </h3>
          <ul>
            <li># Heading 1</li>
            <li>## Heading 2</li>
            <li>### Heading 3</li>
            <li>- List item</li>
            <li>**Bold text**</li>
            <li>*Italic text*</li>
          </ul>
          <p>Happy Posting!</p>
        </div>
      )}
      {isLoggedin ? (
        <form className="writeForm" onSubmit={handleSubmit}>
          <div className="writeFormGroup">
            <label htmlFor="fileInput">
              <i className="writeIcon fas fa-plus"></i>
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <input
              className="writeInput"
              placeholder="Title"
              type="text"
              autoFocus={true}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="writeFormGroup">
            <textarea
              className="writeInput writeText"
              placeholder="Write your review..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <button className="writeSubmit" type="submit">
            Publish
          </button>
        </form>
      ) : (
        <p className="writeLoginMessage">Log in to create a post</p>
      )}
       {/* Markdown Preview Section */}
       {content && (
                <div className="markdownPreview">
                    <h3>Markdown Preview:</h3>
                    <ReactMarkdown>{content}</ReactMarkdown>
                </div>
            )}
    </div>
  );
}

export default Create
