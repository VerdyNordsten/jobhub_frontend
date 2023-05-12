import { Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import styles from "./WorkExperience.module.css";
import axios from "axios";
import Swal from "sweetalert2";

export default function WorkExperience() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const name_company = e.target.elements.company.value;
    const name_position = e.target.elements.position.value;
    const start_work = e.target.elements.start_date.value;
    const end_work = e.target.elements.end_date.value;
    const image = e.target.elements.image.files[0];
    const job_description = e.target.elements.description.value;

    const formData = new FormData();
    formData.append("name_company", name_company);
    formData.append("name_position", name_position);
    formData.append("start_work", start_work);
    formData.append("end_work", end_work);
    formData.append("image", image);
    formData.append("job_description", job_description);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile/experience`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: response.data.message,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.message,
      });
    } finally {
      setLoading(false);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  return (
    <>
      <div className={`${styles["profile-right"]} w-100 p-3 mt-3`}>
        <div className="col">
          <div className="card border-0">
            <div className="card-body">
              <form className="mb-2" onSubmit={handleSubmit}>
                <h5>Pengalaman Kerja</h5>
                <hr />
                <div className="mb-3">
                  <label htmlFor="company" className="form-label">
                    Perusahaan
                  </label>
                  <input type="text" className="form-control" id="company" placeholder="Masukkan nama perusahaan" />
                </div>
                <div className="mb-3">
                  <label htmlFor="position" className="form-label">
                    Posisi
                  </label>
                  <input type="text" className="form-control" id="position" placeholder="Masukkan nama posisi" />
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Upload Foto Perusahaan
                  </label>
                  <input type="file" className="form-control" id="image" name="image" />
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <label htmlFor="start_date" className="form-label">
                        Tanggal Mulai
                      </label>
                      <input type="date" className="form-control" id="start_date" placeholder="Masukkan tanggal mulai" />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <label htmlFor="end_date" className="form-label">
                        Tanggal Berakhir
                      </label>
                      <input type="date" className="form-control" id="end_date" placeholder="Masukkan tanggal berakhir" />
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Deskripsi Pekerjaan
                  </label>
                  <textarea className="form-control" id="description" placeholder="Masukkan deskripsi pekerjaan" cols="30" rows="5"></textarea>
                </div>
                <Button type="submit" className={`${styles.addbtn} mt-4 w-100`} disabled={loading}>
                  {loading ? "Loading..." : "Add Experience"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
