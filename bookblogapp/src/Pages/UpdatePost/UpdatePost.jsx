import "./UpdatePost.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import DOMPurify from "dompurify";
import { marked } from "marked"; 

function UpdatePost() {
    const [file, setFile] = useState(null);
    const [book, setBook] = useState(null);
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState(""); 
    const [isLoggedin, setIsLoggedin] = useState(false);
    const navigate = useNavigate();
    const [success, setSuccess] = useState(null); // Success message
    const [error, setError] = useState(null); // Error handling

    useEffect(() => {
        const token = sessionStorage.getItem("auth_token");
        if(token){
            setIsLoggedin(true);
            navigate(`/edit-post/${id}`);
        }
        else{
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
                setTitle(data.title);  // Set title and content from the fetched data
                setContent(data.content);
            })
            .catch((error) => console.error("Error fetching post detail:", error));
    }, [navigate, id]);

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
            const response = await fetch(`http://127.0.0.1:8000/posts/${id}/update/`, {
                method: "PUT", 
                headers: {
                    'Authorization': `Token ${token}`,
                },
                body: formData,
            });

            console.log("Response status:", response.status);

            if (response.ok) {
                const data = await response.json();
                console.log("Blog updated successfully:", data);
                setSuccess("Blog updated successfully.");
                sessionStorage.setItem('successMessage', 'Post updated successfully');
                navigate("/Blog");
            } else {
                const errorData = await response.json();
                console.error("Failed to update blog:", errorData);
                setError("Failed to update blog");
            }
        } catch (err) {
            console.error("An error occurred:", err);
            alert("An error occurred while updating");
        }
    };

    return (
        <div className="write">
            {success && <p className="successMessage">{success}</p>}
            {error && <p className="errorMessage">{error}</p>}
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
                            value={title}  // Bind the input to title state
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="writeFormGroup">
                        <textarea
                            className="writeInput writeText"
                            placeholder="Write your review..."
                            value={content} // Bind the input to content state
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

export default UpdatePost;
