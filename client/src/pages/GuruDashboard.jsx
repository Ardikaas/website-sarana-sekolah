import Footer from "../components/Footer/Footer";
import GuruMenu from "../components/GuruMenu/GuruMenu";
import Header from "../components/Header/Header";

const GuruDashboard = () => {
  return (
    <div>
      <Header tittle="Dashboard Guru" />
      <GuruMenu />
      <Footer />
    </div>
  );
};

export default GuruDashboard;
