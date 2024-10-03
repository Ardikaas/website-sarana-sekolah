import "./Header.style.css";
import logout from "../assets/logout.png";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    navigate("/");
  };

  return (
    <div className="header-container">
      <h1>{props.tittle}</h1>
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          handleLogout();
        }}
      >
        <img src={logout} alt="Logout" />
      </a>
    </div>
  );
};

export default Header;
