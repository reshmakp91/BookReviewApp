import Header from "../../components/Header/Header";
import "./Home.css";
import Posts from "../../components/Posts/Posts";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Home() {
  const location = useLocation();
  console.log(location);  
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
  
    const message = sessionStorage.getItem("successMessage");
    if (message) {
        setSuccessMessage(message);
        sessionStorage.removeItem("successMessage");  // Clear it after use
    }
}, []);
  return (
    <>
      <div className="home">
        <div className="homeMsg">
        {successMessage && <p className="successMessage">{successMessage}</p>}
        </div>
        <Header />
        <div className="homePosts">
          <Posts />
        </div>
      </div>
    </>
  );
}

export default Home;
