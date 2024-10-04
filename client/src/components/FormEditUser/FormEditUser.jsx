import "./FormEditUser.style.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const FormEditUser = () => {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [mapel, setMapel] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [showAccountCard, setShowAccountCard] = useState(false);
  const [createdUser, setCreatedUser] = useState({
    username: "",
    plainPassword: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8080/user/${id}`, {
          method: "GET",
        });
        const data = await response.json();
        if (response.ok) {
          setUsername(data.data.username);
          setMapel(data.data.mapel);
          setRole(data.data.role);
        } else {
          alert("Error fetching user data");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !role) {
      alert("Username dan Role wajib diisi!");
      return;
    }

    const confirmation = window.confirm("Yakin untuk mengubah user?");
    if (!confirmation) return;

    try {
      const response = await fetch(`http://localhost:8080/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, mapel, role, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setCreatedUser({
          username: data.data.username,
          plainPassword: password ? password : "Tidak diubah",
        });
        setShowAccountCard(true);
      } else {
        alert("Error updating user");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan, silakan coba lagi.");
    }
  };

  return (
    <div className="formcreateuser-container">
      <div className={`form-card ${showAccountCard ? "hide" : ""}`}>
        <h1>Form Edit User</h1>
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
          type="password"
          placeholder="Password (Kosongkan jika tidak diubah)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
              checked={role === "admin"}
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
              checked={role === "guru"}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <div className="subrole">
            <h6>Kepala Sekolah</h6>
            <input
              type="radio"
              name="role"
              value="kepsek"
              checked={role === "kepsek"}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
        </div>
        <button onClick={handleSubmit}>Edit User</button>
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

export default FormEditUser;
