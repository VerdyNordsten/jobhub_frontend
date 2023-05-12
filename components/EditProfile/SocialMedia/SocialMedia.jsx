import { Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import styles from "./SocialMedia.module.css";
import axios from "axios";
import Swal from "sweetalert2";

export default function SocialMedia() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    instagram: "",
    linkedin: "",
    github: "",
  });
  const [hasSocialMedia, setHasSocialMedia] = useState(false);

  useEffect(() => {
    const fetchSocialMedia = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile/social-media`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const socialMediaData = response.data.data;
        if (socialMediaData) {
          setHasSocialMedia(true);
          setFormData({
            email: socialMediaData.email,
            instagram: socialMediaData.instagram,
            linkedin: socialMediaData.linkedin,
            github: socialMediaData.github,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSocialMedia();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (hasSocialMedia) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile/social-media`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile/social-media`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      Swal.fire({
        title: "Berhasil!",
        text: "Data telah disimpan.",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Gagal!",
        text: "Terjadi kesalahan saat menyimpan data.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    setLoading(false);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };


  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
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
                  <h5>Social Media</h5>
                  <hr />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input type="text" className="form-control" id="email" name="email" placeholder="Masukkan Email" value={formData.email} onChange={handleChange} />
                </div>
                <div className=" mb-3">
                  <label htmlFor="instagram" className="form-label">
                    Instagram
                  </label>
                  <input type="text" className="form-control" id="instagram" name="instagram" placeholder="Masukkan Instagram" value={formData.instagram} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="linkedin" className="form-label">
                    Linkedin
                  </label>
                  <input type="text" className="form-control" id="linkedin" name="linkedin" placeholder="Masukkan Linkedin" value={formData.linkedin} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="github" className="form-label">
                    Github
                  </label>
                  <input type="text" className="form-control" id="github" name="github" placeholder="Masukkan Github" value={formData.github} onChange={handleChange} />
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
