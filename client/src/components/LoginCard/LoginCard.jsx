import "./LoginCard.style.css";
import logo from "../assets/tutwuri.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginCard = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        // Simpan token di cookies
        document.cookie = `token=${data.token}; path=/; max-age=3600; secure; samesite=strict;`;
        document.cookie = `role=${data.data.role}; path=/; max-age=3600; secure; samesite=strict;`;
        alert("Login Successful!");
        // Kamu bisa redirect ke halaman lain di sini jika perlu
        switch (data.data.role) {
          case "admin":
            navigate("/admin-dashboard");
            break;
          case "guru":
            navigate("/guru-dashboard");
            break;
          case "kepsek":
            navigate("/kepsek-dashboard");
            break;
          default:
            alert("Role not recognized!");
        }
      } else {
        // Menangani kesalahan
        alert(data.status.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Login failed! Please try again.");
    }
  };
  return (
    <div className="logincard-container">
      <h1>DASHBOARD PEMANTAUAN SARANA SEKOLAH</h1>
      <div className="logincard">
        <img src={logo} alt="logo tutwurihandayani" />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button onClick={handleLogin}>Log in</button>
      </div>
    </div>
  );
};

export default LoginCard;
