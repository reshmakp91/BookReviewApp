import "./Profile.css";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

function Profile() {
    const [profile, setProfile] = useState(null);
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error handling
    const [posts, setPosts] = useState([]);
    const { id } = useParams();
    console.log("User ID from URL:", id);
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("auth_token");
        if (token) {
            setIsLoggedin(true);
            navigate(`/user/${id}`);
        } else {
            setIsLoggedin(false);
        }

        if (id) {
            fetch(`http://127.0.0.1:8000/user/${id}/`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    setProfile(data);
                    setLoading(false);
                })
                .catch((error) => {
                    setError("Error fetching user details.");
                    setLoading(false);
                    console.error("Error fetching user detail:", error);
                });

            fetch(`http://127.0.0.1:8000/posts/?created_by=${id}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log("Fetched Posts:", data);
                    setPosts(data);
                })
                .catch((error) => console.error("Error fetching posts:", error));
        } else {
            console.error("Invalid user ID:", id);
            setError("Invalid user ID.");
        }
    }, [id]);

    const handleEdit = (postId) => {
        console.log("Edit post:", postId);
        navigate(`/edit-post/${postId}`);
    };

    const handleDelete = (postId) => {
        console.log("Delete post:", postId);
    
        // Confirmation popup before deletion
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (confirmDelete) {
            const token = sessionStorage.getItem("auth_token"); // Retrieve the token
    
            fetch(`http://127.0.0.1:8000/posts/${postId}/delete/`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Token ${token}`, // Include token in Authorization header
                    "Content-Type": "application/json"
                },
            })
            .then((response) => {
                if (response.ok) {
                    setPosts(posts.filter((post) => post.id !== postId));
                    sessionStorage.setItem('successMessage', 'Post deleted successfully!');
                } else {
                    console.error("Failed to delete post:", postId);
                    
                }
            })
            .catch((error) => {
                console.error("Error deleting post:", error);
                
            });
        } else {
            console.log("Post deletion canceled");
        }
    };
    

    if (loading) {
        return <div>Loading...</div>; // Display loading message
    }

    if (error) {
        return <div>{error}</div>; // Display error message if something goes wrong
    }

    return (
        <div className="postsContainer">
            
            {error && <p className="errorMessage">{error}</p>}
            <div className="my_posts">
                <div className="my_postsTitle">
                    <h2>My Posts</h2>
                    <hr />
                </div>
                <div className="mypostInfo">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div className="mypost" key={post.id}>
                                <div className="mypostImageContainer">
                                    <Link to={`/post/${post.id}`}>
                                        <img className="mypostImg" src={post.image} alt="bookimage"/>
                                    </Link>
                                    <div className="mypostActions">
                                        <button className="editButton" onClick={() => handleEdit(post.id)} title="Edit">
                                            <i className="fa fa-pencil"></i>
                                        </button>
                                        <button className="deleteButton" onClick={() => handleDelete(post.id)} title="Delete">
                                        <i className="fa fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="mypostInfo">
                                    <Link to={`/post/${post.id}`} className="mypostTitle">{post.title}</Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No posts yet...</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;
