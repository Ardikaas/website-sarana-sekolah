import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ClassList.style.css";
import edit from "../assets/edit.png";
import trash from "../assets/delete.png";

const ClassList = () => {
  const api_url = process.env.REACT_APP_API_URL;
  const [kelasList, setKelasList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKelas = async () => {
      try {
        const response = await fetch(`${api_url}/kelas`);
        const result = await response.json();
        if (result.status.code === 200) {
          setKelasList(result.data);
        } else {
          alert("Gagal memuat data kelas.");
        }
      } catch (error) {
        console.error("Error fetching kelas:", error);
        alert("Terjadi kesalahan saat memuat data kelas.");
      }
    };

    fetchKelas();
  }, [api_url]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus kelas ini?");
    if (confirmDelete) {
      try {
        const response = await fetch(`${api_url}/kelas/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setKelasList(kelasList.filter((kelas) => kelas._id !== id));
        } else {
          alert("Gagal menghapus kelas.");
        }
      } catch (error) {
        console.error("Error deleting kelas:", error);
        alert("Terjadi kesalahan saat menghapus kelas.");
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-class/${id}`);
  };

  const formatWaktu = (utcString) => {
    const date = new Date(utcString);
    const wibTime = new Date(date.getTime() + 7 * 60 * 60 * 1000);
    const hours = wibTime.getUTCHours().toString().padStart(2, "0");
    const minutes = wibTime.getUTCMinutes().toString().padStart(2, "0");
    const tanggal = wibTime.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return {
      jamMenit: `${hours}:${minutes} WIB`,
      tanggal,
    };
  };

  return (
    <div className="tabel-kelas">
      <a href="/create-class" className="create">
        Create Kelas
      </a>

      {kelasList.map((kelas) => {
        const { jamMenit, tanggal } = formatWaktu(kelas.updatedAt);

        return (
          <div key={kelas._id} className="row-kelas">
            <h1 className="nama-kelas">{kelas.className}</h1>
            <div className="fasilitas">
              <h2>Fasilitas Kelas</h2>
              <li>
                Sarana :{" "}
                {kelas.saranas.length > 0
                  ? kelas.saranas.map((sarana) => sarana.name).join(", ")
                  : "-"}
              </li>
              <li>
                Prasarana :{" "}
                {kelas.prasaranas.length > 0
                  ? kelas.prasaranas
                      .map((prasarana) => prasarana.name)
                      .join(", ")
                  : "-"}
              </li>
              <li>
                Media Belajar :{" "}
                {kelas.mediaBelajars.length > 0
                  ? kelas.mediaBelajars
                      .map((mediaBelajar) => mediaBelajar.name)
                      .join(", ")
                  : "-"}
              </li>
              <li>
                Sumber Belajar :{" "}
                {kelas.sumberBelajars.length > 0
                  ? kelas.sumberBelajars
                      .map((sumberBelajar) => sumberBelajar.name)
                      .join(", ")
                  : "-"}
              </li>
            </div>
            <div className="lastupdate">
              <h6>Last Update:</h6>
              <h6>{tanggal}</h6>
              <h2>{jamMenit}</h2>
            </div>
            <div className="edmv-container">
              <button className="ed" onClick={() => handleEdit(kelas._id)}>
                <img src={edit} alt="Edit" />
              </button>
              <button className="mv" onClick={() => handleDelete(kelas._id)}>
                <img src={trash} alt="Delete" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ClassList;
