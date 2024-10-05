import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddFacilityForm.style.css";

const AddFacilityForm = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const { id, category } = useParams();

  useEffect(() => {
    const titleMap = {
      saranas: "Sarana",
      prasaranas: "Prasarana",
      mediaBelajars: "Media Belajar",
      sumberBelajars: "Sumber Belajar",
    };
    setTitle(titleMap[category] || "Item");
  }, [category]);

  const handleSubmit = async () => {
    if (!name) {
      alert("Nama item tidak boleh kosong.");
      return;
    }

    const endpoint = `http://localhost:8080/kelas/${id}/${
      category.endsWith("s") ? category.slice(0, -1) : category
    }`;
    console.log("Fetching:", endpoint);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        alert(`${title} berhasil ditambahkan.`);
        navigate(`/edit-class/${id}`);
      } else {
        alert(`Gagal menambahkan ${title}.`);
      }
    } catch (error) {
      console.error("Error submitting facility:", error);
      alert(`Terjadi kesalahan saat menambahkan ${title}.`);
    }
  };

  return (
    <div className="addfacilityform-container">
      <div className="addfacilityform-card">
        <h1>Formulir Penambahan {title}</h1>
        <input
          type="text"
          placeholder="Nama Item"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="addfacilityform-card-button">
          <button
            className="addfacilityform-button-kembali"
            onClick={() => navigate(`/edit-class/${id}`)}
          >
            Kembali
          </button>
          <button
            className="addfacilityform-button-tambah"
            onClick={handleSubmit}
          >
            Tambah
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFacilityForm;
