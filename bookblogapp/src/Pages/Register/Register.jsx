import "./Register.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

    const[username, setUsername] = useState("");
    const[name, setName] = useState("");
    const[password, setPassword] = useState("");
    const[confirm_password, setConfirmpassword] = useState("");
    const[email, setEmail] = useState("");
    const[gender, setGender] = useState("");
    const[date_of_birth, setDateofbirth] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        navigate('/Register')
    },[navigate])

    const handleRegisterSubmit = async () => {
        const registerData = { name, email, date_of_birth, gender, username, password, confirm_password };

        try {
            const response = await fetch("http://127.0.0.1:8000/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registerData),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Registration successful:", data);
                setSuccess("Registration successful!");
                sessionStorage.setItem('successMessage', 'Registration successful!');
                setError("");  
                navigate("/Login");  
            } else {
                setError(data.detail || "Registration failed!");

                setSuccess(""); 
            }
        } catch (err) {
            console.error("Error during Registration:", err);
            setError("Something went wrong. Please try again.");
            
            setSuccess(""); 
        }
    };

  return (
    <div className="register">
        <span className="registerTitle">Register</span>
        {success && <p className="successMessage">{success}</p>}
        {error && <p className="errorMessage">{error}</p>}
        <form 
            className="registerForm"  
            onSubmit={(e) => { 
                e.preventDefault(); 
                handleRegisterSubmit(); 
                }}
            >
            <div className="formGroup">
                <label>Name:</label>
                <input className="registerInput" type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="formGroup">
                <label>Email:</label>
                <input className="registerInput" type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="formGroup">
                <label>Date of Birth:</label>
                <input className="registerInput" type="date" id="date_of_birth" name="date_of_birth" value={date_of_birth} onChange={(e) => setDateofbirth(e.target.value)} />
            </div>
            <div className="formGroup">
                <label>Gender:</label>
                <select className="registerInput" id="gender" name="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div className="formGroup">
                <label>Username:</label>
                <input className="registerInput" type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="formGroup">
                <label>Password:</label>
                <input className="registerInput" type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="formGroup">
                <label>Confirm Password:</label>
                <input className="registerInput" type="password" id="confirmpassword" name="confirmpassword" value={confirm_password} onChange={(e) => setConfirmpassword(e.target.value)} />
            </div>
            <button type="submit" className="registerButton">Register</button>
        </form>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <p>Already have account?
            <button type="button" className="registerLoginButton" onClick={() => { window.location.href = "/Login"; }}>Login</button>
        </p>
    </div>
  )
}

export default Register
