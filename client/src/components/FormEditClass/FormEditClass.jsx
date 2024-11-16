import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import trash from "../assets/delete.png";
import "./FormEditClass.style.css";

const FormEditClass = () => {
  const api_url = process.env.REACT_APP_API_URL;
  const { id } = useParams();
  const [classData, setClassData] = useState(null);
  const [activeCategory, setActiveCategory] = useState("saranas");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const response = await fetch(`${api_url}/kelas/${id}`);
        const data = await response.json();
        if (data.status.code === 200) {
          setClassData(data.data);
          setItems(data.data.saranas);
        }
      } catch (error) {
        console.error("Error fetching class data:", error);
      }
    };
    fetchClassData();
  }, [api_url, id]);

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

  const handleDelete = async (itemId) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus item ini?"
    );
    if (confirmDelete) {
      try {
        let category;
        switch (activeCategory) {
          case "saranas":
            category = "sarana";
            break;
          case "prasaranas":
            category = "prasarana";
            break;
          case "mediaBelajars":
            category = "mediabelajar";
            break;
          case "sumberBelajars":
            category = "sumberbelajar";
            break;
          default:
            category = "";
        }

        const deleteUrl = `${api_url}/kelas/${id}/${category}/${itemId}`;
        console.log("Deleting item at:", deleteUrl);

        const response = await fetch(deleteUrl, {
          method: "DELETE",
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error details:", errorData);
          alert("Gagal menghapus item.");
          return;
        }

        setItems(items.filter((item) => item._id !== itemId));
        alert("Item berhasil dihapus.");
      } catch (error) {
        console.error("Error deleting item:", error);
        alert("Terjadi kesalahan saat menghapus item.");
      }
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
              <a
                href={`/edit-class/${id}/facility/${activeCategory}`}
                className="tambah"
              >
                Tambah
              </a>
              <a href="/admin-dashboard" className="kembali">
                Kembali
              </a>
            </div>
            <div className="card-facility-container">
              {["saranas", "prasaranas"].includes(activeCategory) && (
                <div className="card-facility-new-container">
                  {items.length > 0 ? (
                    items.map((item) => (
                      <div className="card-facility-new" key={item._id}>
                        <div className="card-facility-new-top">
                          <h1>{item.name}</h1>
                          <button onClick={() => handleDelete(item._id)}>
                            <img src={trash} alt="Delete" />
                          </button>
                        </div>
                        <div className="card-facility-new-column">
                          <div className="card-facility-new-row">
                            <h4 className="gap-card-fasil">Bagus</h4>
                            <h4>: {item.good_quantity || 0}</h4>
                          </div>
                          <div className="card-facility-new-row">
                            <h4 className="gap-card-fasil">Rusak</h4>
                            <h4>: {item.bad_quantity || 0}</h4>
                          </div>
                          <div className="card-facility-new-row">
                            <h4 className="gap-card-fasil">Jumlah</h4>
                            <h4>: {item.total_quantity || 0}</h4>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="nothing">
                      <h4>Null</h4>
                    </div>
                  )}
                </div>
              )}

              {["mediaBelajars", "sumberBelajars"].includes(activeCategory) && (
                <div className="card-facility-old-container">
                  {items.length > 0 ? (
                    items.map((item) => (
                      <div className="devide-kanan-row" key={item._id}>
                        <h4 className="devide-kanan-row-nama">{item.name}</h4>
                        <button onClick={() => handleDelete(item._id)}>
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditClass;
