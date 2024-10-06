import { useEffect, useState } from "react";
import "./LogBookKepsek.style.css";

const LogbookKepsek = () => {
  const [dataGuru, setDataGuru] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/nilai-guru");
        const result = await response.json();
        if (result.status.code === 200) {
          setDataGuru(result.data);
        } else {
          console.error("Gagal mengambil data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="logbookkepsek-container">
      {dataGuru.map((guru) => (
        <div className="formauto formauto-gap" key={guru._id}>
          <div className="formauto-devide tambah-formauto-devide">
            <div className="formauto-devide-kiri">
              <h4>Nama : {guru.namaGuru}</h4>
              <h4>Mata Pelajaran : {guru.mapel}</h4>
              <h4>Kelas : {guru.kelas}</h4>
              <h4>Tanggal : {guru.tanggal}</h4>
              <h4>Jam : {guru.jam} - WIB</h4>
            </div>
            <div className="formauto-devide-kanan">
              <div className="devide-kanan-checkbox">
                <div className="checkbox-form">
                  <input
                    type="checkbox"
                    name="sarana"
                    checked={guru.sarana}
                    disabled
                  />
                  <h4>Sarana</h4>
                </div>
                <div className="checkbox-form">
                  <input
                    type="checkbox"
                    name="prasarana"
                    checked={guru.prasarana}
                    disabled
                  />
                  <h4>Prasarana</h4>
                </div>
                <div className="checkbox-form">
                  <input
                    type="checkbox"
                    name="mebel"
                    checked={guru.mebel}
                    disabled
                  />
                  <h4>Media Belajar</h4>
                </div>
                <div className="checkbox-form">
                  <input
                    type="checkbox"
                    name="subel"
                    checked={guru.subel}
                    disabled
                  />
                  <h4>Sumber Belajar</h4>
                </div>
                <div className="checkbox-form">
                  <input
                    type="checkbox"
                    name="kreagu"
                    checked={guru.kreagu}
                    disabled
                  />
                  <h4>Kreasi Guru</h4>
                </div>
              </div>
              <div className="devide-kanan-level">
                <h4>Level</h4>
                <h1>{guru.level}</h1>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LogbookKepsek;
