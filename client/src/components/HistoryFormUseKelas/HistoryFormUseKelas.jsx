import "./HistoryFormUseKelas.style.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const HistoryFormUseKelas = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [historyData, setHistoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State untuk error

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenCookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="));
        const token = tokenCookie ? tokenCookie.split("=")[1] : null;

        console.log("Token:", token); // Log token untuk debugging

        if (!token) {
          throw new Error("Token not found");
        }

        const response = await fetch("http://localhost:8080/user/history", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id }), // Mengirimkan ID sebagai body request
        });

        console.log("Response status:", response.status); // Log status respons

        const result = await response.json();
        console.log("API result:", result); // Log hasil dari API

        if (result.status.code === 200) {
          const data = result.data.find((item) => item._id === id);
          console.log("Fetched data:", data); // Log data yang didapat

          if (data) {
            setHistoryData(data);
          } else {
            console.error("Data not found for the given ID."); // Log jika data tidak ditemukan
            setError("No data found for the given ID.");
          }
        } else {
          console.error("Error fetching data:", result.status.message);
          setError(result.status.message); // Set error message dari API
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching data."); // Set error message jika terjadi error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>; // Tampilkan pesan error jika ada
  }

  if (!historyData) {
    return <div>No data found</div>;
  }

  const handleGoBack = () => {
    navigate(-1); // Navigasi kembali
  };

  return (
    <div className="historyformusekelas-container">
      <div className="historyuser-devide">
        <div className="historyuser-devide-kiri">
          <h1>10A</h1>
          <button onClick={handleGoBack}>Kembali</button>
        </div>
        <div className="historyuser-devide-kanan">
          <div className="historyuser-column">
            <div className="historyuser-card-category">
              <h2>Sarana</h2>
              {historyData.sarana.map((item) => (
                <div className="historyuser-card-item" key={item._id}>
                  <h5 className="historyuser-itemname">{item.itemName}</h5>
                  <h5 className="historyuser-itemcondition">
                    {item.condition === "true" ? "Baik" : "Buruk"}
                  </h5>
                </div>
              ))}
            </div>
            <div className="historyuser-card-category">
              <h2>Prasarana</h2>
              {historyData.prasarana.map((item) => (
                <div className="historyuser-card-item" key={item._id}>
                  <h5 className="historyuser-itemname">{item.itemName}</h5>
                  <h5 className="historyuser-itemcondition">
                    {item.condition === "true" ? "Baik" : "Buruk"}
                  </h5>
                </div>
              ))}
            </div>
          </div>
          <div className="historyuser-column">
            <div className="historyuser-card-category">
              <h2>Media Belajar</h2>
              {historyData.mediaBelajar.map((item) => (
                <div className="historyuser-card-item" key={item._id}>
                  <h5 className="historyuser-itemname">{item.itemName}</h5>
                  <h5 className="historyuser-itemcondition">
                    {item.condition === "true" ? "Baik" : "Buruk"}
                  </h5>
                </div>
              ))}
            </div>
            <div className="historyuser-card-category">
              <h2>Sumber Belajar</h2>
              {historyData.sumberBelajar.map((item) => (
                <div className="historyuser-card-item" key={item._id}>
                  <h5 className="historyuser-itemname">{item.itemName}</h5>
                  <h5 className="historyuser-itemcondition">
                    {item.condition === "true" ? "Baik" : "Buruk"}
                  </h5>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryFormUseKelas;
