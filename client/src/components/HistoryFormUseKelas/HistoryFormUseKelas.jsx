import "./HistoryFormUseKelas.style.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const HistoryFormUseKelas = () => {
  const api_url = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const { id } = useParams();
  const [historyData, setHistoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenCookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="));
        const token = tokenCookie ? tokenCookie.split("=")[1] : null;

        if (!token) {
          throw new Error("Token not found");
        }

        const response = await fetch(`${api_url}/user/history`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id }),
        });

        console.log("Raw API Response:", response);

        if (!response.ok) {
          console.error(
            "API response error:",
            response.status,
            response.statusText
          );
        }

        const result = await response.json();
        console.log("Parsed API Response:", result);

        if (result.status.code === 200) {
          console.log("Success Data:", result.data);
          const data = result.data.find((item) => item._id === id);
          console.log("Filtered Data:", data);
          if (data) {
            setHistoryData(data);
          } else {
            setError("No data found for the given ID.");
          }
        } else {
          setError(result.status.message);
        }
      } catch (error) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [api_url, id]);

  return (
    <div className="historyformusekelas-container">
      <div className="formuseclass-container">
        <div className="formuseclass-card">
          <h1 className="kasipad">History Pemakaian Kelas</h1>
          <div className="formuseclass-devide">
            <div className="formuseclass-left">
              <h1 className="formuseclass-classname-tit">
                {historyData ? historyData.className : "Loading..."}
              </h1>
            </div>
            <div className="formuseclass-right">
              <div className="formuseclass-right-sarana">
                <h1>Sarana</h1>
                <div className="formuseclass-right-sarana-con">
                  {historyData &&
                    historyData.sarana.map((item) => (
                      <div className="formuseclass-right-card" key={item._id}>
                        <h2>{item.itemName}</h2>
                        <div className="formuseclass-right-card-incon">
                          <div className="formuseclass-right-card-input">
                            <h4>Bagus</h4>
                            <input
                              type="text"
                              value={item.good_quantity}
                              readOnly
                            />
                          </div>
                          <div className="formuseclass-right-card-input">
                            <h4>Rusak</h4>
                            <input
                              type="text"
                              value={item.bad_quantity}
                              readOnly
                            />
                          </div>
                          <div className="formuseclass-right-card-input">
                            <h4>Total</h4>
                            <input
                              type="text"
                              value={item.total_quantity}
                              readOnly
                            />
                          </div>
                          <div className="formuseclass-right-card-input">
                            <h4>Ket.</h4>
                            <input
                              type="text"
                              value={item.additional}
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="formuseclass-right-prasarana">
                <h1>Prasarana</h1>
                <div className="formuseclass-right-sarana-con">
                  {historyData &&
                    historyData.prasarana.map((item) => (
                      <div className="formuseclass-right-card" key={item._id}>
                        <h2>{item.itemName}</h2>
                        <div className="formuseclass-right-card-incon">
                          <div className="formuseclass-right-card-input">
                            <h4>Bagus</h4>
                            <input
                              type="text"
                              value={item.good_quantity}
                              readOnly
                            />
                          </div>
                          <div className="formuseclass-right-card-input">
                            <h4>Rusak</h4>
                            <input
                              type="text"
                              value={item.bad_quantity}
                              readOnly
                            />
                          </div>
                          <div className="formuseclass-right-card-input">
                            <h4>Total</h4>
                            <input
                              type="text"
                              value={item.total_quantity}
                              readOnly
                            />
                          </div>
                          <div className="formuseclass-right-card-input">
                            <h4>Ket.</h4>
                            <input
                              type="text"
                              value={item.additional}
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="formuseclass-right-media">
                <h1>Media Pembelajaran</h1>
                {historyData &&
                  historyData.mediaBelajar.map((item) => (
                    <div className="formuseclass-right-card-old" key={item._id}>
                      <h2>{item.itemName}</h2>
                      <div className="formuseclass-right-card-inold">
                        <h4 className="right-card-inold-tit">Kondisi</h4>
                        <h4>:</h4>
                        <div className="right-card-inold-rad">
                          <input
                            type="radio"
                            name={`media-${item._id}`}
                            checked={item.condition === "true"}
                            readOnly
                          />
                          <h4>Baik</h4>
                        </div>
                        <div className="right-card-inold-rad">
                          <input
                            type="radio"
                            name={`media-${item._id}`}
                            checked={item.condition === "false"}
                            readOnly
                          />
                          <h4>Buruk</h4>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="formuseclass-right-sumber">
                <h1>Sumber Pembelajaran</h1>
                {historyData &&
                  historyData.sumberBelajar.map((item) => (
                    <div className="formuseclass-right-card-old" key={item._id}>
                      <h2>{item.itemName}</h2>
                      <div className="formuseclass-right-card-inold">
                        <h4 className="right-card-inold-tit">Kondisi</h4>
                        <h4>:</h4>
                        <div className="right-card-inold-rad">
                          <input
                            type="radio"
                            name={`sumber-${item._id}`}
                            checked={item.condition === "true"}
                            readOnly
                          />
                          <h4>Baik</h4>
                        </div>
                        <div className="right-card-inold-rad">
                          <input
                            type="radio"
                            name={`sumber-${item._id}`}
                            checked={item.condition === "false"}
                            readOnly
                          />
                          <h4>Buruk</h4>
                        </div>
                      </div>
                    </div>
                  ))}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryFormUseKelas;
