import "./AdminUtils.style.css";
import UserList from "../UserList/UserList";
import ClassList from "../ClassList/ClassList";
import { useState } from "react";

const AdminUtils = () => {
  const [activeComponent, setActiveComponent] = useState("user");
  const handleMenuClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="adminutils-container">
      <div className="adminutils-menu">
        <h2 className="adminutils-menu-h2">Menu</h2>
        <a
          href="#"
          className={activeComponent === "user" ? "active" : ""}
          onClick={() => handleMenuClick("user")}
        >
          List User
        </a>
        <a
          href="#"
          className={activeComponent === "class" ? "active" : ""}
          onClick={() => handleMenuClick("class")}
        >
          List Kelas
        </a>
        <a href="">Logbook Guru</a>
      </div>
      <div className="adminutils-content">
        <h2 className="title-admin">Dashboard Pemantauan Sarana Sekolah</h2>
        {activeComponent === "user" && <UserList />}
        {activeComponent === "class" && <ClassList />}
      </div>
    </div>
  );
};

export default AdminUtils;
