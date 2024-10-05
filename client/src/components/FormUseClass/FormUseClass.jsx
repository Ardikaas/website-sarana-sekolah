import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./FormUseClass.style.css";

const FormUseClass = () => {
  const { id } = useParams();
  const [classData, setClassData] = useState(null);

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

  const renderCategoryItems = (items) => {
    return items.map((item) => (
      <div className="formuseclass-category-card" key={item._id}>
        <h4 className="category-card-item">{item.name}</h4>
        <div className="category-card-pil">
          <h4 className="category-card-pil-tit">Digunakan</h4>
          <h4>:</h4>
          <input type="radio" name={`inUse-${item._id}`} />
          <h4 className="lebar">Ya</h4>
          <input type="radio" name={`inUse-${item._id}`} />
          <h4>Tidak</h4>
        </div>
        <div className="category-card-pil">
          <h4 className="category-card-pil-tit">Kondisi</h4>
          <h4>:</h4>
          <input type="radio" name={`condition-${item._id}`} />
          <h4 className="lebar">Baik</h4>
          <input type="radio" name={`condition-${item._id}`} />
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
      </div>
    </div>
  );
};

export default FormUseClass;
