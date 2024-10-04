import edit from "../assets/edit.png";
import trash from "../assets/delete.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

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
          setUsers(users.filter((user) => user._id !== id));
        })
        .catch((error) => console.error("Error deleting user:", error));
    }
  };

  const editUser = (id) => {
    navigate(`/edit-user/${id}`);
  };

  return (
    <div className="tabel-user">
      <a href="/create-user" className="create">
        Create User
      </a>
      {users.map((user) => (
        <div className="row" key={user._id}>
          <h5 className="nama">{user.username}</h5>
          <h5 className="tanggal">
            {new Date(user.updatedAt).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </h5>
          <h5 className="role">{user.role}</h5>
          <a href="#" className="edit" onClick={() => editUser(user._id)}>
            <img src={edit} alt="Edit" />
          </a>
          <a href="#" className="trash" onClick={() => deleteUser(user._id)}>
            <img src={trash} alt="Delete" />
          </a>
        </div>
      ))}
    </div>
  );
};

export default UserList;
