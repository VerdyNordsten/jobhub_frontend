import { Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import styles from "./DetailProfile.module.css";
import axios from "axios";
import Swal from "sweetalert2";

export default function DetailProfile() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: "",
    location: "",
    workType: "",
    workerDescription: "",
    image: null,
  });

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile/worker`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const workerData = response.data.data;
        if (workerData) {
          setFormData({
            jobTitle: workerData.job_title,
            location: workerData.location,
            workType: workerData.work_type,
            workerDescription: workerData.worker_description,
            image: null,
            id: workerData.id,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchWorker();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const form = new FormData();
      form.append("job_title", formData.jobTitle);
      form.append("location", formData.location);
      form.append("work_type", formData.workType);
      form.append("worker_description", formData.workerDescription);
      form.append("image", formData.image);
      let response;
      if (formData.id) {
        response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile/edit-worker`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile/worker`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }
      setLoading(false);
      Swal.fire({
        title: "Berhasil!",
        text: "Data telah disimpan.",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire({
        title: "Gagal!",
        text: "Terjadi kesalahan saat menyimpan data.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.name === "image" ? e.target.files[0] : e.target.value,
    }));
  };

  return (
    <>
      <div className={`${styles["profile-right"]} w-100 p-3 mt-3`}>
        <div className="col">
          <div className="card border-0">
            <div className="card-body">
              <form className="mb-2" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <h5>Detail Profile User</h5>
                  <hr />
                </div>
                <div className="mb-3">
                  <label htmlFor="jobTitle" className="form-label">
                    Title
                  </label>
                  <input type="text" className="form-control" id="jobTitle" name="jobTitle" placeholder="Masukkan title" value={formData.jobTitle} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="location" className="form-label">
                    Lokasi
                  </label>
                  <input type="text" className="form-control" id="location" name="location" placeholder="Masukkan lokasi" value={formData.location} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="workType" className="form-label">
                    Jenis Pekerjaan
                  </label>
                  <input type="text" className="form-control" id="workType" name="workType" placeholder="Masukkan jenis pekerjaan" value={formData.workType} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="workerDescription" className="form-label">
                    Deskripsi Singkat
                  </label>
                  <textarea className="form-control" id="workerDescription" name="workerDescription" cols="30" rows="5" placeholder="Masukkan deskripsi singkat" value={formData.workerDescription} onChange={handleChange}></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Upload Foto Profil
                  </label>
                  <input type="file" className="form-control" id="image" name="image" onChange={handleChange} />
                </div>
                <Button type="submit" className={`${styles.addbtn} mt-4 w-100`} disabled={loading}>
                  {loading ? "Loading..." : "Simpan"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
