import "./Topbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function TopBar() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userId, setUserId] = useState(null); 
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);  
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("auth_token");
    if (token) {
      setIsLoggedin(true);
      const userIdFromToken = sessionStorage.getItem("user_id"); 
      setUserId(userIdFromToken); 
      navigate("/"); 
    } else {
      setIsLoggedin(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("auth_token");
    sessionStorage.removeItem("user_id"); 
    setIsLoggedin(false);
    sessionStorage.setItem('successMessage', 'Logged out successfully!');
    navigate("/Login"); 
  };

  const toggleSettingsDropdown = () => {
    setShowSettingsDropdown(!showSettingsDropdown);
  };

  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="listItem">
            <Link className="link" to="/">HOME</Link>
          </li>
          <li className="listItem">
            <Link className="link" to="/About">ABOUT</Link>
          </li>
          <li className="listItem">
            <Link className="link" to="/Create">CREATE</Link>
          </li>
          <li className="listItem">
            <Link className="link" to="/Blog">BLOG</Link>
          </li>
        </ul>
      </div>
      <div className="topRight">
        {isLoggedin ? (
          <>
            <li className="profileItem" onClick={toggleSettingsDropdown}>My Profile</li>
            {showSettingsDropdown && (
              <ul className="settingsDropdown">
                <li className="dropdownItem" onClick={toggleSettingsDropdown}>
                  <Link className="link" to={`/user/${userId}`} >My Posts</Link>
                </li>
                <li className="dropdownItem" onClick={toggleSettingsDropdown}>
                  <Link className="link" to={`/update-profile/${userId}`}>Update Profile</Link>
                </li>
              </ul>
            )}
            <li className="profileItem" onClick={handleLogout}>Logout</li>
          </>
        ) : (
          <ul className="profile">
            <li className="profileItem"><Link className="link" to="/Register">Register</Link></li>
            <li className="profileItem"><Link className="link" to="/login">Login</Link></li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default TopBar;
