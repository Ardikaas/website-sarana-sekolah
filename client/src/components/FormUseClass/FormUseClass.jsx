import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./FormUseClass.style.css";

const FormUseClass = () => {
  const api_url = process.env.REACT_APP_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();
  const [classData, setClassData] = useState(null);
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${api_url}/kelas/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setClassData(data.data);
      } catch (error) {
        console.error("Error fetching class data:", error);
      }
    };

    fetchData();
  }, [api_url, id]);

  const handleInputChange = (itemId, type, value) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [itemId]: {
        ...prevInputs[itemId],
        [type]: value.replace(/\D/g, ""),
      },
    }));
  };

  const handleRadioChange = (itemId, condition) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [itemId]: {
        ...prevInputs[itemId],
        condition: condition,
      },
    }));
  };

  const handleSubmit = () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      console.error("Token not found");
      return;
    }

    let allInputsValid = true;
    let errorMessage = "";

    classData?.saranas.forEach((sarana) => {
      const good = inputs[sarana._id]?.good || "";
      const bad = inputs[sarana._id]?.bad || "";

      if (good === "" || bad === "") {
        allInputsValid = false;
        errorMessage = `Mohon lengkapi input untuk sarana: ${sarana.name}`;
      }
    });

    classData?.prasaranas.forEach((prasarana) => {
      const good = inputs[prasarana._id]?.good || "";
      const bad = inputs[prasarana._id]?.bad || "";

      if (good === "" || bad === "") {
        allInputsValid = false;
        errorMessage = `Mohon lengkapi input untuk prasarana: ${prasarana.name}`;
      }
    });

    classData?.mediaBelajars.forEach((media) => {
      const condition = inputs[media._id]?.condition;

      if (!condition) {
        allInputsValid = false;
        errorMessage = `Mohon pilih kondisi untuk media pembelajaran: ${media.name}`;
      }
    });

    classData?.sumberBelajars.forEach((sumber) => {
      const condition = inputs[sumber._id]?.condition;

      if (!condition) {
        allInputsValid = false;
        errorMessage = `Mohon pilih kondisi untuk sumber pembelajaran: ${sumber.name}`;
      }
    });

    if (!allInputsValid) {
      alert(errorMessage);
      return;
    }

    const reviews = [];

    classData?.saranas.forEach((sarana) => {
      const good = inputs[sarana._id]?.good || "";
      const bad = inputs[sarana._id]?.bad || "";
      const total = (parseInt(good) || 0) + (parseInt(bad) || 0);
      let ket = "OK";
      if (total < sarana.total_quantity) {
        ket = `-${sarana.total_quantity - total}`;
      } else if (total > sarana.total_quantity) {
        ket = `+${total - sarana.total_quantity}`;
      }

      reviews.push({
        itemId: sarana._id,
        good_quantity: good,
        bad_quantity: bad,
        total_quantity: total,
        additional: ket,
      });
    });

    classData?.prasaranas.forEach((prasarana) => {
      const good = inputs[prasarana._id]?.good || "";
      const bad = inputs[prasarana._id]?.bad || "";
      const total = (parseInt(good) || 0) + (parseInt(bad) || 0);
      let ket = "OK";
      if (total < prasarana.total_quantity) {
        ket = `-${prasarana.total_quantity - total}`;
      } else if (total > prasarana.total_quantity) {
        ket = `+${total - prasarana.total_quantity}`;
      }

      reviews.push({
        itemId: prasarana._id,
        good_quantity: good,
        bad_quantity: bad,
        total_quantity: total,
        additional: ket,
      });
    });

    classData?.mediaBelajars.forEach((media) => {
      const condition = inputs[media._id]?.condition || "";
      reviews.push({
        itemId: media._id,
        condition: condition === "true" ? "true" : "false",
      });
    });

    classData?.sumberBelajars.forEach((sumber) => {
      const condition = inputs[sumber._id]?.condition || "";
      reviews.push({
        itemId: sumber._id,
        condition: condition === "true" ? "true" : "false",
      });
    });

    const payload = { reviews };
    console.log("Submitting review data:", payload);

    fetch(`${api_url}/kelas/${id}/review-kelas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Review submitted:", data);
        alert("Review submitted successfully!");
        navigate(-1);
      })
      .catch((error) => {
        console.error("Error submitting review:", error);
        alert("Failed to submit review. Please try again.");
      });
  };

  return (
    <div className="formuseclass-container">
      <div className="formuseclass-card">
        <h1 className="kasipad">Form Pemakaian Kelas</h1>
        <div className="formuseclass-devide">
          <div className="formuseclass-left">
            <h1 className="formuseclass-classname-tit">
              {classData?.className}
            </h1>
          </div>
          <div className="formuseclass-right">
            <div className="formuseclass-right-sarana">
              <h1>Sarana</h1>
              <div className="formuseclass-right-sarana-con">
                {classData?.saranas.map((sarana) => {
                  const good = inputs[sarana._id]?.good || "";
                  const bad = inputs[sarana._id]?.bad || "";
                  const total = (parseInt(good) || 0) + (parseInt(bad) || 0);

                  let ket = "OK";
                  if (total < sarana.total_quantity) {
                    ket = `-${sarana.total_quantity - total}`;
                  } else if (total > sarana.total_quantity) {
                    ket = `+${total - sarana.total_quantity}`;
                  }

                  return (
                    <div key={sarana._id} className="formuseclass-right-card">
                      <h2>{sarana.name}</h2>
                      <div className="formuseclass-right-card-incon">
                        <div className="formuseclass-right-card-input">
                          <h4>Bagus</h4>
                          <input
                            type="text"
                            value={good}
                            onChange={(e) =>
                              handleInputChange(
                                sarana._id,
                                "good",
                                e.target.value
                              )
                            }
                            placeholder=""
                            required
                          />
                        </div>
                        <div className="formuseclass-right-card-input">
                          <h4>Rusak</h4>
                          <input
                            type="text"
                            value={bad}
                            onChange={(e) =>
                              handleInputChange(
                                sarana._id,
                                "bad",
                                e.target.value
                              )
                            }
                            placeholder=""
                            required
                          />
                        </div>
                        <div className="formuseclass-right-card-input">
                          <h4>Total</h4>
                          <input type="text" value={total || ""} readOnly />
                        </div>
                        <div className="formuseclass-right-card-input">
                          <h4>Ket.</h4>
                          <input type="text" value={ket} readOnly />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="formuseclass-right-prasarana">
              <h1>Prasarana</h1>
              <div className="formuseclass-right-sarana-con">
                {classData?.prasaranas.map((prasarana) => {
                  const good = inputs[prasarana._id]?.good || "";
                  const bad = inputs[prasarana._id]?.bad || "";
                  const total = (parseInt(good) || 0) + (parseInt(bad) || 0);

                  let ket = "OK";
                  if (total < prasarana.total_quantity) {
                    ket = `-${prasarana.total_quantity - total}`;
                  } else if (total > prasarana.total_quantity) {
                    ket = `+${total - prasarana.total_quantity}`;
                  }

                  return (
                    <div
                      key={prasarana._id}
                      className="formuseclass-right-card"
                    >
                      <h2>{prasarana.name}</h2>
                      <div className="formuseclass-right-card-incon">
                        <div className="formuseclass-right-card-input">
                          <h4>Bagus</h4>
                          <input
                            type="text"
                            value={good}
                            onChange={(e) =>
                              handleInputChange(
                                prasarana._id,
                                "good",
                                e.target.value
                              )
                            }
                            placeholder=""
                            required
                          />
                        </div>
                        <div className="formuseclass-right-card-input">
                          <h4>Rusak</h4>
                          <input
                            type="text"
                            value={bad}
                            onChange={(e) =>
                              handleInputChange(
                                prasarana._id,
                                "bad",
                                e.target.value
                              )
                            }
                            placeholder=""
                            required
                          />
                        </div>
                        <div className="formuseclass-right-card-input">
                          <h4>Total</h4>
                          <input type="text" value={total || ""} readOnly />
                        </div>
                        <div className="formuseclass-right-card-input">
                          <h4>Ket.</h4>
                          <input type="text" value={ket} readOnly />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="formuseclass-right-media">
              <h1>Media Pembelajaran</h1>
              {classData?.mediaBelajars.map((media) => (
                <div className="formuseclass-right-card-old" key={media._id}>
                  <h2>{media.name}</h2>
                  <div className="formuseclass-right-card-inold">
                    <h4 className="right-card-inold-tit">Kondisi</h4>
                    <h4>:</h4>
                    <div className="right-card-inold-rad">
                      <input
                        type="radio"
                        name={`media-${media._id}-kondisi`}
                        value="true"
                        onChange={() => handleRadioChange(media._id, "true")}
                        required
                      />
                      <h4>Baik</h4>
                    </div>
                    <div className="right-card-inold-rad">
                      <input
                        type="radio"
                        name={`media-${media._id}-kondisi`}
                        value="false"
                        onChange={() => handleRadioChange(media._id, "false")}
                        required
                      />
                      <h4>Buruk</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="formuseclass-right-sumber">
              <h1>Sumber Pembelajaran</h1>
              {classData?.sumberBelajars.map((sumber) => (
                <div className="formuseclass-right-card-old" key={sumber._id}>
                  <h2>{sumber.name}</h2>
                  <div className="formuseclass-right-card-inold">
                    <h4 className="right-card-inold-tit">Kondisi</h4>
                    <h4>:</h4>
                    <div className="right-card-inold-rad">
                      <input
                        type="radio"
                        name={`sumber-${sumber._id}-kondisi`}
                        value="true"
                        onChange={() => handleRadioChange(sumber._id, "true")}
                        required
                      />
                      <h4>Baik</h4>
                    </div>
                    <div className="right-card-inold-rad">
                      <input
                        type="radio"
                        name={`sumber-${sumber._id}-kondisi`}
                        onChange={() => handleRadioChange(sumber._id, "false")}
                        value="false"
                        required
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
          <button className="formuseclass-button-submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormUseClass;
