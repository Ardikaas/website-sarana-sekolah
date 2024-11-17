import "./FormCreateUser.style.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormCreateUser = () => {
  const api_url = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [mapel, setMapel] = useState("");
  const [role, setRole] = useState("");
  const [showAccountCard, setShowAccountCard] = useState(false);
  const [createdUser, setCreatedUser] = useState({
    username: "",
    plainPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !role) {
      alert("Username dan Role wajib diisi!");
      return;
    }

    const confirmation = window.confirm("Yakin untuk menambahkan user?");
    if (!confirmation) return;

    try {
      const response = await fetch(`${api_url}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, mapel, role }),
      });

      const data = await response.json();

      if (response.ok) {
        setCreatedUser({
          username: data.data.username,
          plainPassword: data.data.plainPassword,
        });
        setShowAccountCard(true);
      } else if (data.username) {
        alert(
          `Username "${data.username}" sudah ada dengan role "${data.role}".`
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan, silakan coba lagi.");
    }
  };
  return (
    <div className="formcreateuser-container">
      <div className={`form-card ${showAccountCard ? "hide" : ""}`}>
        <h1>Form Create User</h1>
        <input
          className="text"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="text"
          type="text"
          placeholder="Mata Pelajaran"
          value={mapel}
          onChange={(e) => setMapel(e.target.value)}
        />
        <h4>Role User :</h4>
        <div className="role-section">
          <div className="subrole">
            <h6>Admin</h6>
            <input
              type="radio"
              name="role"
              value="admin"
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>
          <div className="subrole">
            <h6>Guru</h6>
            <input
              type="radio"
              name="role"
              value="guru"
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <div className="subrole">
            <h6>Kepala Sekolah</h6>
            <input
              type="radio"
              name="role"
              value="kepsek"
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
        </div>
        <div className="formcreateuser-button">
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            Kembali
          </button>
          <button onClick={handleSubmit}>Create User</button>
        </div>
      </div>
      <div className={`account-card ${showAccountCard ? "" : "hide"}`}>
        <h1>Username :</h1>
        <h3>{createdUser.username}</h3>
        <h1>Password :</h1>
        <h3>{createdUser.plainPassword}</h3>
        <a href="/admin-dashboard">Back to Dashboard</a>
      </div>
    </div>
  );
};

export default FormCreateUser;
