import "./KepsekMenu.style.css";

const KepsekMenu = () => {
  return (
    <div className="gurumenu-container">
      <div className="gurumenu-card">
        <a href="/kepsek-review">Form Penilaian Guru</a>
        <a href="/kepsek-history">History Penilaian guru</a>
      </div>
    </div>
  );
};

export default KepsekMenu;
