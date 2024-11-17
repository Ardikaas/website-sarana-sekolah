import "./FormChooseClass.style.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FormChooseClass = () => {
  const api_url = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch(`${api_url}/kelas/`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status.code === 200) {
          setClasses(data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
      });
  }, [api_url]);
  return (
    <div className="formchooseclass-container">
      <div className="formchooseclass-card">
        <div className="formchooseclass-title">
          <h1>Form Pemakaian Kelas</h1>
        </div>
        <div className="pilih-kelas">
          {classes.map((kelas) => (
            <a key={kelas._id} href={`/use-class/${kelas._id}`}>
              {kelas.className}
            </a>
          ))}
        </div>
      </div>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        Kembali
      </button>
    </div>
  );
};

export default FormChooseClass;
