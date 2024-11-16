import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddFacilityForm.style.css";

const AddFacilityForm = () => {
  const api_url = process.env.REACT_APP_API_URL;
  console.log(api_url);
  const [name, setName] = useState("");
  const [total_quantity, setTotalQuantity] = useState(1);
  const [title, setTitle] = useState("");
  const [isQuantityRequired, setIsQuantityRequired] = useState(false);
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
    const requiresQuantity = ["saranas", "prasaranas"].includes(category);
    setIsQuantityRequired(requiresQuantity);
  }, [category]);

  const handleSubmit = async () => {
    if (!name) {
      alert("Nama item tidak boleh kosong.");
      return;
    }

    if (total_quantity < 1) {
      alert("Kuantitas harus minimal 1.");
      return;
    }

    const endpoint = `${api_url}/kelas/${id}/${
      category.endsWith("s") ? category.slice(0, -1) : category
    }`;
    console.log("Fetching:", endpoint);
    const payload = { name };
    if (isQuantityRequired) {
      payload.total_quantity = total_quantity;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
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
        {isQuantityRequired && (
          <input
            type="number"
            placeholder="Kuantitas"
            min="1"
            value={total_quantity}
            onChange={(e) => setTotalQuantity(parseInt(e.target.value))}
          />
        )}
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
