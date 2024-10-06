import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import KepsekMenu from "../components/KepsekMenu/KepsekMenu";

const KepsekDashboard = () => {
  return (
    <div>
      <Header tittle="Dashboard Kepala Sekolah" />
      <KepsekMenu />
      <Footer />
    </div>
  );
};

export default KepsekDashboard;
