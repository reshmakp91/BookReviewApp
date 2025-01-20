import "./About.css"
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function About() {

    const [isLoggedin, setIsLoggedin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("auth_token");
        if(token){
          setIsLoggedin(true);
          navigate('/About')
        }
        else{
          setIsLoggedin(false);
        }
    }, [navigate]);

  return (
    <div className="aboutme">
        <h1 className="aboutmetitle">ABOUT ME</h1>
        <p>
            Hi, I'm Reshma, a book lover from Kerala and the creator of this blog. I enjoy both fiction and non-fiction, but my heart leans toward fiction that tugs at the soul. I'm drawn to stories with a deep emotional quotient, domestic fiction, and those beautifully bittersweet narratives that linger long after the last page.
        </p>
        <p>
            This blog is a space where I share my honest reviews of books I've read, whether they're ones I've bought or borrowed. Each review is crafted with care and a genuine passion for the written word.
        </p>
        <p>
            If you're someone who loves exploring heartfelt stories and want to contribute your own reviews, I'd love to have you join this growing community of readers. Let's connect, share, and celebrate the magic of books together.
        </p>
        <p>
            Thank you for visiting, and happy reading!
        </p>
    </div>
  )
}

export default About
