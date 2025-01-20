import "./Header.css";

function Header() {
  return (
    <div className="header">
      <div className="headerOverlay">
        <div className="headerTitles">
          <span className="headerTitleLg">The Inked Shelf</span>
          <span className="headerTitleSm">Turning Pages, Sharing Stories...</span>
        </div>
      </div>
      <img
        className="headerImg" src="https://images.unsplash.com/photo-1700681297484-d3fccd892aaa?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9vayUyMGFlc3RoZXRpY3xlbnwwfHwwfHx8MA%3D%3D" alt="Books" />
    </div>
  );
}

export default Header;
