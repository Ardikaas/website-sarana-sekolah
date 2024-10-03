import "./AdminUtils.style.css";
import UserList from "../UserList/UserList";

const AdminUtils = () => {
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
        <UserList />
      </div>
    </div>
  );
};

export default AdminUtils;
