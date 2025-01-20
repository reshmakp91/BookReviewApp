import TopBar from "./components/topbar/TopBar";
import SinglePost from "./components/SinglePost/SinglePost"
import Create from "./Pages/Create/Create";
import About from "./Pages/About/About";
import Home from "./Pages/Homepage/Home";
import Blog from "./Pages/Blog/Blog";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";
import UpdateProfile from "./Pages/UpdateProfile/UpdateProfile";
import UpdatePost from "./Pages/UpdatePost/UpdatePost";
import Register from "./Pages/Register/Register";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Create" element={<Create/>} />
        <Route path="/About" element={<About/>} />
        <Route path="/Blog" element={<Blog/>} />
        <Route path="/post/:id" element={<SinglePost/>} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/user/:id" element={<Profile />} />
        <Route path="/update-profile/:id" element={<UpdateProfile />} />
        <Route path="/edit-post/:id" element={<UpdatePost />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
