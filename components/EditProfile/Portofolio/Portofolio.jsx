import { Button } from "react-bootstrap";
import React, { useState } from "react";
import styles from "./Portofolio.module.css";
import axios from "axios";
import Swal from "sweetalert2";

export default function Portofolio() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const name_portfolio = e.target.elements["name-portfolio"].value;
    const link_repository = e.target.elements["link-repository"].value;
    const type_portfolio = e.target.elements["type-portfolio"].value;
    const image = e.target.elements.image.files[0];

    const formData = new FormData();
    formData.append("name_portfolio", name_portfolio);
    formData.append("link_repository", link_repository);
    formData.append("type_portfolio", type_portfolio);
    formData.append("image", image);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile/portfolio`, formData, {
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
                <h5>Portofolio</h5>
                <hr />
                <div className="mb-3">
                  <label htmlFor="name-portfolio" className="form-label">
                    Name portfolio
                  </label>
                  <input type="text" className="form-control" id="name-portfolio" placeholder="Masukkan nama portofolio" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="link-repository" className="form-label">
                    Link repository
                  </label>
                  <input type="text" className="form-control" id="link-repository" placeholder="Masukkan link repository" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Upload Foto Portofolio
                  </label>
                  <input type="file" className="form-control" id="image" name="image" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="type-portfolio" className="form-label">
                    Tipe portfolio
                  </label>
                  <select className="form-select" id="type-portfolio" required>
                    <option value="">-- Pilih Tipe Portfolio --</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Website">Website</option>
                  </select>
                </div>
                <Button type="submit" className={`${styles.addbtn} mt-4 w-100`} disabled={loading}>
                  {loading ? "Loading..." : "Add Portfolio"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
