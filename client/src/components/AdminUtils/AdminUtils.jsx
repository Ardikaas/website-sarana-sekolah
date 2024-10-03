import "./AdminUtils.style.css";
import edit from "../assets/edit.png";
import trash from "../assets/delete.png";
import { useEffect, useState } from "react";

const AdminUtils = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/user")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      fetch(`http://localhost:8080/user/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then(() => {
          alert("User deleted successfully!");
          setUsers(users.filter((user) => user._id !== id)); // Remove the user from state after deletion
        })
        .catch((error) => console.error("Error deleting user:", error));
    }
  };
  return (
    <div className="adminutils-container">
      <div className="adminutils-menu">
        <h2>Menu</h2>
        <a href="">List User</a>
        <a href="">List Kelas</a>
        <a href="">Logbook Guru</a>
      </div>
      <div className="adminutils-content">
        <h2>Dashboard Pemantauan Sarana Sekolah</h2>
        <div className="tabel-user">
          <a href="" className="create">
            Create User
          </a>
          {users.map((user) => (
            <div className="row" key={user._id}>
              <h5 className="nama">{user.username}</h5>
              <h5 className="tanggal">
                {new Date(user.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </h5>
              <h5 className="role">{user.role}</h5>
              <a href="" className="edit">
                <img src={edit} alt="Edit" />
              </a>
              <a
                href="#"
                className="trash"
                onClick={() => deleteUser(user._id)}
              >
                <img src={trash} alt="Delete" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminUtils;
