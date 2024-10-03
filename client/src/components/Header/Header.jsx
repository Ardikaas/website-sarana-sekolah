import "./Header.style.css";
import logout from "../assets/logout.png";

const Header = (props) => {
  return (
    <div className="header-container">
      <h1>{props.tittle}</h1>
      <a href="/">
        <img src={logout} alt="" />
      </a>
    </div>
  );
};

export default Header;
