import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./FormUseClass.style.css";

const FormUseClass = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [classData, setClassData] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/kelas/${id}`);
        const data = await response.json();
        setClassData(data.data);
      } catch (error) {
        console.error("Error fetching class data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!classData) {
    return <div>Loading...</div>;
  }

  const handleConditionChange = (itemId, condition) => {
    setReviews((prevReviews) => {
      const existingReviewIndex = prevReviews.findIndex(
        (review) => review.itemId === itemId
      );
      if (existingReviewIndex !== -1) {
        const updatedReviews = [...prevReviews];
        updatedReviews[existingReviewIndex].condition = condition;
        return updatedReviews;
      }
      return [...prevReviews, { itemId, condition }];
    });
  };

  const renderCategoryItems = (items) => {
    return items.map((item) => (
      <div className="formuseclass-category-card" key={item._id}>
        <h4 className="category-card-item">{item.name}</h4>
        <div className="category-card-pil">
          <h4 className="category-card-pil-tit">Kondisi</h4>
          <h4>:</h4>
          <input
            type="radio"
            name={`condition-${item._id}`}
            onChange={() => handleConditionChange(item._id, "true")}
          />
          <h4 className="lebar">Baik</h4>
          <input
            type="radio"
            name={`condition-${item._id}`}
            onChange={() => handleConditionChange(item._id, "false")}
          />
          <h4>Buruk</h4>
        </div>
      </div>
    ));
  };

  const renderCategorySection = (title, items) => {
    const titleClass =
      items.length === 0
        ? "formuseclass-category-tit hide"
        : "formuseclass-category-tit";

    return (
      <>
        <h3 className={titleClass}>{title}</h3>
        {items.length > 0 && renderCategoryItems(items)}
      </>
    );
  };

  const handleSubmit = async () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      console.error("Token not found");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/kelas/${id}/review-kelas`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ reviews }),
        }
      );

      if (response.ok) {
        alert("Review submitted successfully");
        navigate("/guru-dashboard");
      } else {
        const errorData = await response.json();
        console.error("Error submitting review:", errorData);
        alert("Gagal mengirim review. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Terjadi kesalahan saat mengirim review. Silakan coba lagi.");
    }
  };

  return (
    <div className="formuseclass-container">
      <div className="formuseclass-card">
        <h1 className="kasipad">Form Pemakaian Kelas</h1>
        <div className="formuseclass-devide">
          <div className="formuseclass-left">
            <h1 className="formuseclass-classname-tit">
              {classData.className}
            </h1>
          </div>
          <div className="formuseclass-right">
            <div className="category-loop">
              {renderCategorySection("Sarana", classData.saranas)}
              {renderCategorySection("Prasarana", classData.prasaranas)}
              {renderCategorySection("Media Belajar", classData.mediaBelajars)}
              {renderCategorySection(
                "Sumber Belajar",
                classData.sumberBelajars
              )}
            </div>
          </div>
        </div>
        <div className="formuseclass-button">
          <button
            className="formuseclass-button-kembali"
            onClick={() => navigate(-1)}
          >
            Kembali
          </button>
          <button
            className="formuseclass-button-submit"
            onClick={handleSubmit} // Mengirimkan data saat klik submit
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormUseClass;
