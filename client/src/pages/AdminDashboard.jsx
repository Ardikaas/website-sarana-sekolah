import AdminUtils from "../components/AdminUtils/AdminUtils";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

const AdminDashboard = () => {
  return (
    <div>
      <Header tittle="Dashboard Admin" />
      <AdminUtils />
      <Footer />
    </div>
  );
};

export default AdminDashboard;
