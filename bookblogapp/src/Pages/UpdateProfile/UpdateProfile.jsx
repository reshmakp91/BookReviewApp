import "./UpdateProfile.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function UpdateProfile() {
    const [profile, setProfile] = useState(null);
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [loading, setLoading] = useState(true); // Loading state
    const [success, setSuccess] = useState(null); // Success message
    const [error, setError] = useState(null); // Error handling
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("auth_token");
        if (token) {
            setIsLoggedin(true);
            navigate(`/update-profile/${id}`);
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
                });
        } else {
            setError("Invalid user ID.");
        }
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem("auth_token");

        fetch(`http://127.0.0.1:8000/user/${id}/`, {
            method: "PATCH", // Use PATCH for partial updates
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(profile),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setSuccess("Profile updated successfully.");
                sessionStorage.setItem('successMessage', 'Blog updated successfully');
                setError(null);
            })
            .catch((error) => {
                setError("Failed to update profile.");
                setSuccess(null);
            });
    };

    if (loading) {
        return <div>Loading...</div>; // Display loading message
    }

    if (error) {
        return <div>{error}</div>; // Display error message if something goes wrong
    }

    return (
        <div className="profileContainer">
            <form className="updateForm" onSubmit={handleSubmit}>
                <h2>Update Profile</h2>
                <hr />
                {success && <p className="successMessage">{success}</p>}
                {error && <p className="errorMessage">{error}</p>}
                <div className="formGroup">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={profile.name || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="formGroup">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={profile.email || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="formGroup">
                    <label htmlFor="date_of_birth">Date of Birth:</label>
                    <input
                        type="date"
                        id="date_of_birth"
                        name="date_of_birth"
                        value={profile.date_of_birth || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="formGroup">
                    <label htmlFor="gender">Gender:</label>
                    <select
                        id="gender"
                        name="gender"
                        value={profile.gender || ""}
                        onChange={handleChange}
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <button type="submit" className="updateButton">
                    Update Details
                </button>
            </form>
        </div>
    );
}

export default UpdateProfile;
