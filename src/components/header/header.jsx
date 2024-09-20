import React from "react";
import "./header.css";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";

const Header = () => {
  const Logout = () => {
    auth.signOut();
    <Link to="/" style={{ textDecoration: "none" }}></Link>;
  };

  return (
    <div className="admin_nav">
      <div className="orn_logo">
        <h2>ORN Admin</h2>
      </div>

      <div className="orn_pages">
        <Link className="pageBtn" to="/pg">
          <p>PGs/Apartments</p>
        </Link>

        <Link className="pageBtn" to="/library">
          <div>Library</div>
        </Link>

        <Link className="pageBtn" to="/coaching">
          <p>Coaching centre</p>
        </Link>

        <Link className="pageBtn" to="/tiffin">
          <p>Food Services</p>
        </Link>

        <Link className="pageBtn" to="/study-material">
          <p>Study Material</p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
