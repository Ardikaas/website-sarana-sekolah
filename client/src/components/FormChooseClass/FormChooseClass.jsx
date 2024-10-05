import "./FormChooseClass.style.css";
import { useEffect, useState } from "react";

const FormChooseClass = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/kelas/")
      .then((response) => response.json())
      .then((data) => {
        if (data.status.code === 200) {
          setClasses(data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
      });
  }, []);
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
    </div>
  );
};

export default FormChooseClass;
