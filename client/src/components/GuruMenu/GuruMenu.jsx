import "./GuruMenu.style.css";

const GuruMenu = () => {
  return (
    <div className="gurumenu-container">
      <div className="gurumenu-card">
        <a href="/choose-class">Form Penilaian Kelas</a>
        <a href="/history-review">History Penilaian Kelas</a>
      </div>
    </div>
  );
};

export default GuruMenu;
