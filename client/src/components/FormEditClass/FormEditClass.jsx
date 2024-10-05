import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Untuk mendapatkan :id dari URL
import trash from "../assets/delete.png";
import "./FormEditClass.style.css";

const FormEditClass = () => {
  const { id } = useParams(); // Ambil id dari parameter URL
  const [classData, setClassData] = useState(null);
  const [activeCategory, setActiveCategory] = useState("saranas"); // Default Sarana
  const [items, setItems] = useState([]); // Menyimpan data item yang ditampilkan

  useEffect(() => {
    // Ambil data kelas berdasarkan ID
    const fetchClassData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/kelas/${id}`);
        const data = await response.json();
        if (data.status.code === 200) {
          setClassData(data.data);
          setItems(data.data.saranas); // Default item adalah Sarana
        }
      } catch (error) {
        console.error("Error fetching class data:", error);
      }
    };
    fetchClassData();
  }, [id]);

  // Fungsi untuk menghandle klik tombol kategori (Sarana, Prasarana, dll)
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    switch (category) {
      case "saranas":
        setItems(classData.saranas);
        break;
      case "prasaranas":
        setItems(classData.prasaranas);
        break;
      case "mediaBelajars":
        setItems(classData.mediaBelajars);
        break;
      case "sumberBelajars":
        setItems(classData.sumberBelajars);
        break;
      default:
        setItems([]);
    }
  };

  return (
    <div className="formeditclass-container">
      <div className="formeditcard">
        <h1 className="ini">Form Edit Kelas</h1>
        <div className="devide">
          <div className="devide-kiri">
            <div className="devide-nama-kelas">
              <h1>{classData ? classData.className : "N."}</h1>
            </div>
            <div className="devide-menu">
              <button
                onClick={() => handleCategoryClick("saranas")}
                className={activeCategory === "saranas" ? "active-kelas" : ""}
              >
                Sarana
              </button>
              <button
                onClick={() => handleCategoryClick("prasaranas")}
                className={
                  activeCategory === "prasaranas" ? "active-kelas" : ""
                }
              >
                Prasarana
              </button>
              <button
                onClick={() => handleCategoryClick("mediaBelajars")}
                className={
                  activeCategory === "mediaBelajars" ? "active-kelas" : ""
                }
              >
                Media Belajar
              </button>
              <button
                onClick={() => handleCategoryClick("sumberBelajars")}
                className={
                  activeCategory === "sumberBelajars" ? "active-kelas" : ""
                }
              >
                Sumber Belajar
              </button>
            </div>
          </div>
          <div className="devide-kanan">
            <div className="btn">
              <a href="/" className="tambah">
                Tambah
              </a>
              <a href="/admin-dashboard" className="kembali">
                Kembali
              </a>
            </div>

            {items.length > 0 ? (
              items.map((item) => (
                <div className="devide-kanan-row" key={item._id}>
                  <h4 className="devide-kanan-row-nama">{item.name}</h4>
                  <h4
                    className={`devide-kanan-row-kondisi ${
                      item.condition ? "bagus" : "buruk"
                    }`}
                  >
                    {item.condition ? "Bagus" : "Buruk"}
                  </h4>
                  <button>
                    <img src={trash} alt="Delete" />
                  </button>
                </div>
              ))
            ) : (
              <div className="nothing">
                <h4>Null</h4>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditClass;
