import "./LoginCard.style.css";
import logo from "../assets/tutwuri.png";

const LoginCard = () => {
  return (
    <div className="logincard-container">
      <h1>DASHBOARD PEMANTAUAN SARANA SEKOLAH</h1>
      <div className="logincard">
        <img src={logo} alt="logo tutwurihandayani" />
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button>Log in</button>
      </div>
    </div>
  );
};

export default LoginCard;
