import "./FormCreateClass.style.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormCreateClass = () => {
  const api_url = process.env.REACT_APP_API_URL;
  const [className, setClassName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleCreateClass = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${api_url}/kelas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ className }),
      });

      if (response.ok) {
        setMessage("Kelas berhasil dibuat!");
        setClassName("");
        setTimeout(() => {
          navigate("/admin-dashboard");
        }, 1000);
      } else {
        setMessage("Gagal membuat kelas. Coba lagi.");
      }
    } catch (error) {
      setMessage("Terjadi kesalahan. Coba lagi.");
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value.toUpperCase();
    if (value.length <= 3) {
      setClassName(value);
    }
  };
  return (
    <div className="formcc-container">
      <div className="formcc">
        <h1>Form Create Kelas</h1>
        <h4>Nama Kelas</h4>
        <input
          type="text"
          value={className}
          onChange={handleInputChange}
          required
          maxLength={3}
        />
        <button onClick={handleCreateClass} disabled={className.length !== 3}>
          Create Kelas
        </button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default FormCreateClass;
