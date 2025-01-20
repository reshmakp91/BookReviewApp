import "./Login.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const location = useLocation();
    console.log(location);  
    const [successMessage, setSuccessMessage] = useState("");
    
    const navigate = useNavigate();

    useEffect(() => {

        const message = sessionStorage.getItem("successMessage");
        if (message) {
            setSuccessMessage(message);
            sessionStorage.removeItem("successMessage");
        }
        const token = sessionStorage.getItem("auth_token");
        if (token) {
            navigate("/"); 
        }
        
    }, [navigate]);

    const handleLogin = async () => {
        const loginData = { username, password };

        try {
            const response = await fetch("http://127.0.0.1:8000/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Login successful:", data);
                if (data.token) {
                    sessionStorage.setItem("auth_token", data.token);
                    sessionStorage.setItem('user_id', data.user_id);
                }
                setSuccess("Login successful!");
                setError("");   
                sessionStorage.setItem('successMessage', 'Login successful!');
                navigate("/");  
            } else {
                setError(data.detail || "Login failed!");
                setSuccess(""); 
            }
        } catch (err) {
            console.error("Error during login:", err);
            setError("Something went wrong. Please try again.");
            setSuccess(""); 
        }
    };

    return (
        <div className="login">
            {successMessage && <p className="successMessage">{successMessage}</p>}
            {error && <p className="errorMessage">{error}</p>}
            <span className="loginTitle">Login</span>
            <form
                className="loginForm"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
                }}
            >
                <label>Username : </label>
                <input
                    type="text"
                    className="loginInput"
                    placeholder="Enter your username here..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>Password : </label>
                <input
                    type="password" // Changed to password
                    className="loginInput"
                    placeholder="Enter your password here..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="loginButton">Login</button>
            </form>
            <p>New User?
                <button type="button" className="loginRegisterButton" onClick={() => { window.location.href = "/register"; }}
                >
                    Register
                </button>
            </p>
        </div>
    );
}

export default Login;
