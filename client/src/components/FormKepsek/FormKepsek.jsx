import "./FormKepsek.style.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FormKepsek = () => {
  const navigate = useNavigate();
  const [gurus, setGurus] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedGuru, setSelectedGuru] = useState({ username: "", mapel: "" });
  const [selectedClass, setSelectedClass] = useState({ id: null, name: "" });
  const [currentTime, setCurrentTime] = useState("");
  const [checkboxState, setCheckboxState] = useState({
    sarana: false,
    prasarana: false,
    mediabelajar: false,
    sumberbelajar: false,
    kreasiguru: false,
  });
  const [level, setLevel] = useState(0);
  const [classDetails, setClassDetails] = useState(null);
  const [isGuruSelected, setIsGuruSelected] = useState(false);
  const [isClassSelected, setIsClassSelected] = useState(false);

  useEffect(() => {
    const fetchDataGurus = async () => {
      try {
        const response = await fetch("http://localhost:8080/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        if (response.ok) {
          const filteredGurus = result.data.filter(
            (user) => user.role === "guru"
          );
          setGurus(filteredGurus);
        } else {
          console.error(result.status.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchDataClasses = async () => {
      try {
        const response = await fetch("http://localhost:8080/kelas", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        if (response.ok) {
          setClasses(result.data);
        } else {
          console.error(result.status.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataGurus();
    fetchDataClasses();
  }, []);

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString("en-GB", { hour12: false });
      setCurrentTime(formattedTime);
    };

    updateCurrentTime();
    const intervalId = setInterval(updateCurrentTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleClassSelect = async (classId, className) => {
    setSelectedClass({ id: classId, name: className });
    setIsClassSelected(true);
    console.log("Kelas yang dipilih dengan ID:", classId);

    try {
      const response = await fetch(`http://localhost:8080/kelas/${classId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (response.ok) {
        setClassDetails(result.data);
      } else {
        console.error(result.status.message);
      }
    } catch (error) {
      console.error("Error fetching class details:", error);
    }
  };

  const formatDate = (date) => {
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      locale: "id-ID",
    };
    return new Date(date).toLocaleDateString("id-ID", options);
  };

  const updateLevel = (checkboxes) => {
    const checkedCount = Object.values(checkboxes).filter(Boolean).length;
    if (checkedCount === 2) {
      setLevel(1);
    } else if (checkedCount === 3) {
      setLevel(2);
    } else if (checkedCount === 4) {
      setLevel(3);
    } else if (checkedCount === 5) {
      setLevel(4);
    } else {
      setLevel(0);
    }
  };

  const handleCheckboxChange = (name) => {
    setCheckboxState((prevState) => {
      const newState = { ...prevState, [name]: !prevState[name] };
      updateLevel(newState);
      return newState;
    });
  };

  const handleSaranaCheckboxChange = (isChecked, id) => {
    setClassDetails((prevDetails) => {
      const updatedSaranas = prevDetails.saranas.map((sarana) =>
        sarana._id === id ? { ...sarana, checked: isChecked } : sarana
      );

      const isAnySaranaChecked = updatedSaranas.some(
        (sarana) => sarana.checked
      );

      const newState = {
        ...checkboxState,
        sarana: isAnySaranaChecked,
      };

      setCheckboxState(newState);
      updateLevel(newState);

      return { ...prevDetails, saranas: updatedSaranas };
    });
  };

  const handlePrasaranaCheckboxChange = (isChecked, id) => {
    setClassDetails((prevDetails) => {
      const updatedPrasaranas = prevDetails.prasaranas.map((prasarana) =>
        prasarana._id === id ? { ...prasarana, checked: isChecked } : prasarana
      );

      const isAnyPrasaranaChecked = updatedPrasaranas.some(
        (prasarana) => prasarana.checked
      );

      const newState = {
        ...checkboxState,
        prasarana: isAnyPrasaranaChecked,
      };

      setCheckboxState(newState);
      updateLevel(newState);

      return { ...prevDetails, prasaranas: updatedPrasaranas };
    });
  };

  const handleMediaBelajarCheckboxChange = (isChecked, id) => {
    setClassDetails((prevDetails) => {
      const updatedMediaBelajars = prevDetails.mediaBelajars.map((media) =>
        media._id === id ? { ...media, checked: isChecked } : media
      );

      const isAnyMediaBelajarChecked = updatedMediaBelajars.some(
        (media) => media.checked
      );

      const newState = {
        ...checkboxState,
        mediabelajar: isAnyMediaBelajarChecked,
      };

      setCheckboxState(newState);
      updateLevel(newState);

      return { ...prevDetails, mediaBelajars: updatedMediaBelajars };
    });
  };

  const handleSumberBelajarCheckboxChange = (isChecked, id) => {
    setClassDetails((prevDetails) => {
      const updatedSumberBelajars = prevDetails.sumberBelajars.map((sumber) =>
        sumber._id === id ? { ...sumber, checked: isChecked } : sumber
      );

      const isAnySumberBelajarChecked = updatedSumberBelajars.some(
        (sumber) => sumber.checked
      );

      const newState = {
        ...checkboxState,
        sumberbelajar: isAnySumberBelajarChecked,
      };

      setCheckboxState(newState);
      updateLevel(newState);

      return { ...prevDetails, sumberBelajars: updatedSumberBelajars };
    });
  };

  const handleKreasiGuruRadioChange = (value) => {
    const isChecked = value === "Ada";

    const newState = {
      ...checkboxState,
      kreasiguru: isChecked,
    };

    setCheckboxState(newState);
    updateLevel(newState);
  };

  const handleGuruSelect = (guru) => {
    setSelectedGuru({
      username: guru.username,
      mapel: guru.mapel,
    });
    setIsGuruSelected(true);
  };

  const handleSubmit = async () => {
    const formattedDate = formatDate(new Date());

    const dataToSend = {
      namaGuru: selectedGuru.username,
      mapel: selectedGuru.mapel,
      kelas: selectedClass.name,
      level: level,
      sarana: checkboxState.sarana,
      prasarana: checkboxState.prasarana,
      mebel: checkboxState.mediabelajar,
      subel: checkboxState.sumberbelajar,
      kreagu: checkboxState.kreasiguru,
      tanggal: formattedDate,
      jam: currentTime,
    };

    try {
      const response = await fetch("http://localhost:8080/nilai-guru", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        window.alert("Data berhasil dikirim!");
        navigate("/kepsek-dashboard");
      } else {
        console.error("Gagal mengirim data:", await response.text());
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleBack = () => {
    navigate("/kepsek-dashboard");
  };

  return (
    <div className="formkepsek-container">
      <div className="formkepsek-card">
        <div className={isGuruSelected ? "hide" : "formkepsek-pilih-guru"}>
          <h1 className="formkepsek-pilih-guru-tit">Pilih Guru</h1>
          {gurus.map((guru) => (
            <div className="formkepsek-pilih-guru-row" key={guru._id}>
              <div className="formkepsek-pilih-guru-row-nama">
                {guru.username}
              </div>
              <div className="formkepsek-pilih-guru-row-mapel">
                {guru.mapel}
              </div>
              <button onClick={() => handleGuruSelect(guru)}>Pilih</button>
            </div>
          ))}
        </div>
        {isGuruSelected && (
          <div className={isClassSelected ? "hide" : "formkepsek-pilih-kelas"}>
            <h1>Pilih Kelas</h1>
            <div className="formkepsek-pilih-kelas-grid">
              {classes.map((kelas) => (
                <button
                  key={kelas._id}
                  onClick={() => handleClassSelect(kelas._id, kelas.className)}
                >
                  {kelas.className}
                </button>
              ))}
            </div>
          </div>
        )}
        <div
          className={`${
            !(isGuruSelected && isClassSelected) ? "hide" : "formauto"
          }`}
        >
          <h1>Form Penilaian Guru</h1>
          <div className="formauto-devide">
            <div className="formauto-devide-kiri">
              <h4>
                Nama Guru : {selectedGuru.username || "Silakan pilih guru"}
              </h4>
              <h4>
                Mata Pelajaran : {selectedGuru.mapel || "Silakan pilih guru"}
              </h4>
              <h4>Kelas : {selectedClass.name || "Silakan pilih kelas"}</h4>
              <h4>Tanggal : {formatDate(new Date())}</h4>
              <h4>Jam : {currentTime} - WIB</h4>
            </div>
            <div className="formauto-devide-kanan">
              <div className="devide-kanan-checkbox">
                <div className="checkbox-form">
                  <input
                    type="checkbox"
                    name="sarana"
                    checked={checkboxState.sarana}
                    onChange={() => handleCheckboxChange("sarana")}
                    disabled
                  />
                  <h4>Sarana</h4>
                </div>
                <div className="checkbox-form">
                  <input
                    type="checkbox"
                    name="prasarana"
                    checked={checkboxState.prasarana}
                    onChange={() => handleCheckboxChange("prasarana")}
                    disabled
                  />
                  <h4>Prasarana</h4>
                </div>
                <div className="checkbox-form">
                  <input
                    type="checkbox"
                    name="mediabelajar"
                    checked={checkboxState.mediabelajar}
                    onChange={() => handleCheckboxChange("mediabelajar")}
                    disabled
                  />
                  <h4>Media Belajar</h4>
                </div>
                <div className="checkbox-form">
                  <input
                    type="checkbox"
                    name="sumberbelajar"
                    checked={checkboxState.sumberbelajar}
                    onChange={() => handleCheckboxChange("sumberbelajar")}
                    disabled
                  />
                  <h4>Sumber Belajar</h4>
                </div>
                <div className="checkbox-form">
                  <input
                    type="checkbox"
                    name="kreasiguru"
                    checked={checkboxState.kreasiguru}
                    onChange={() => handleCheckboxChange("kreasiguru")}
                    disabled
                  />
                  <h4>Kreasi Guru</h4>
                </div>
              </div>
              <div className="devide-kanan-level">
                <h4>Level</h4>
                <h1>{level}</h1>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${
            !(isGuruSelected && isClassSelected) ? "hide" : "formcheckbox"
          }`}
        >
          <div className="formcheckbox-row">
            <div className="formchebox-column-category">
              <h1>Sarana</h1>
              {classDetails?.saranas?.map((sarana) => (
                <div className="checkbox-form" key={sarana._id}>
                  <input
                    type="checkbox"
                    name="sarana-item"
                    checked={sarana.checked || false}
                    onChange={(e) =>
                      handleSaranaCheckboxChange(e.target.checked, sarana._id)
                    }
                  />
                  <h4>{sarana.name}</h4>
                </div>
              ))}
            </div>
            <div className="formchebox-column-category">
              <h1>Media Belajar</h1>
              {classDetails?.mediaBelajars?.map((media) => (
                <div className="checkbox-form" key={media._id}>
                  <input
                    type="checkbox"
                    name="mediaBelajar-item"
                    checked={media.checked || false}
                    onChange={(e) =>
                      handleMediaBelajarCheckboxChange(
                        e.target.checked,
                        media._id
                      )
                    }
                  />
                  <h4>{media.name}</h4>
                </div>
              ))}
            </div>
          </div>
          <div className="formcheckbox-row">
            <div className="formchebox-column-category">
              <h1>Prasarana</h1>
              {classDetails?.prasaranas?.map((prasarana) => (
                <div className="checkbox-form" key={prasarana._id}>
                  <input
                    type="checkbox"
                    name="prasarana-item"
                    checked={prasarana.checked || false}
                    onChange={(e) =>
                      handlePrasaranaCheckboxChange(
                        e.target.checked,
                        prasarana._id
                      )
                    }
                  />
                  <h4>{prasarana.name}</h4>
                </div>
              ))}
            </div>
            <div className="formchebox-column-category">
              <h1>Sumber Belajar</h1>
              {classDetails?.sumberBelajars?.map((sumber) => (
                <div className="checkbox-form" key={sumber._id}>
                  <input
                    type="checkbox"
                    name="sumberBelajar-item"
                    checked={sumber.checked || false}
                    onChange={(e) =>
                      handleSumberBelajarCheckboxChange(
                        e.target.checked,
                        sumber._id
                      )
                    }
                  />
                  <h4>{sumber.name}</h4>
                </div>
              ))}
            </div>
          </div>
          <div className="formcheckbox-row">
            <div className="formchebox-column-category">
              <h1>Kreasi Guru</h1>
              <div className="checkbox-form">
                <input
                  type="radio"
                  name="kreasiGuru"
                  onChange={() => handleKreasiGuruRadioChange("Ada")}
                />
                <h4>Ada</h4>
              </div>
              <div className="checkbox-form">
                <input
                  type="radio"
                  name="kreasiGuru"
                  onChange={() => handleKreasiGuruRadioChange("Tidak")}
                />
                <h4>Tidak</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="button-submit-penilaian-container">
          <button className="button-submit-penilaian-guru" onClick={handleBack}>
            Kembali
          </button>
          <button
            className={`${
              !(isGuruSelected && isClassSelected)
                ? "hide"
                : "button-submit-penilaian-guru"
            }`}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormKepsek;
