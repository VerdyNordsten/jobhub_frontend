import { Button, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import styles from "./ProfileUserEdit.module.css";
import axios from "axios";
import Swal from "sweetalert2";
import DetailProfile from "../EditProfile/DetailProfile/DetailProfile";
import Skill from "../EditProfile/Skill/Skill";
import SocialMedia from "../EditProfile/SocialMedia/SocialMedia";
import WorkExperience from "../EditProfile/WorkExperience/WorkExperience";
import Portofolio from "../EditProfile/Portofolio/Portofolio";

export default function EditWorker() {
  const [loading, setLoading] = useState(false);
  const [talent, setTalent] = useState({
    name: "",
    email: "",
    phone_number: "",
  });

  const [profile, setProfile] = useState({});
  const router = useRouter();

  const [editTalent, setEditTalent] = useState({
    name: "",
    email: "",
    phone_number: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:4444/api/v1/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setEditTalent({
          name: res.data.name,
          email: res.data.email,
          phone_number: res.data.phone_number,
        });
      })
      .catch((err) => {
        // console.log(err.response.data);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    const tokenData = JSON.parse(atob(token.split(".")[1]));
    if (!tokenData || !tokenData.role || !tokenData.role.includes("worker")) {
      router.push("/");
      return;
    }
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const { id } = res.data.data;
        setTalent(res.data.data);
        router.query.id = id;
      })
      .catch((error) => console.error(error));
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile/worker`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (!res.data.data || !res.data.data.id) {
          setProfile("Data profile worker not found");
          return;
        }
        const { id } = res.data.data;
        setProfile(res.data.data);
        router.query.id = id;
      })
      .catch((error) => console.error(error));
  }, [router]);

  const handleChangeTalent = (event) => {
    const { name, value } = event.target;
    setEditTalent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    setEditTalent(talent);
  }, [talent]);

  const handleSubmitTalent = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    setLoading(true);
    axios
      .put("http://localhost:4444/api/v1/user/edit-worker", editTalent, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setTimeout(() => {
          setLoading(false);
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Edit talent successfully.",
          }).then(() => {
            window.location.reload();
          });
        }, 2000);
      })
      .catch((err) => {
        // console.log(err.response.data);
        setTimeout(() => {
          setLoading(false);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Edit talent failed. Please try again later.",
          });
        }, 2000);
      });
  };

  return (
    <>
      <div className={`container-fluid p-0 ${styles.body}`}>
        <div className={styles["back-purple"]}></div>
        <div className="row mx-auto" style={{ maxWidth: "1200px" }}>
          <div className="col-12 col-md-4">
            <div className={`${styles["profile-left"]} w-100 p-3`}>
              <div className="d-flex justify-content-center" style={{ position: "relative" }}>
                {profile && profile.image_profile_worker && profile.image_profile_worker !== "Data profile worker not found" ? <Image src={`https://drive.google.com/uc?id=${profile.image_profile_worker}`} className={`${styles.imageprofile} rounded-circle cover`} alt={talent.name} /> : <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png" className={`${styles.imageprofile} rounded-circle cover`} alt="Gambar Profile" />}
              </div>
              <h5 className="mt-3">{talent.name}</h5>
              <div className="mb-1">
                <small>{profile && profile.job_title && profile.job_title !== "Data profile worker not found" ? profile.job_title : "Job title not yet added"}</small>
              </div>
              <div className="text-secondary">
                <small>
                  <FontAwesomeIcon icon={faLocationDot} style={{ color: "#FBB017", width: "20px", height: "20px", marginTop: "-3px" }} />
                  {profile && profile.location && profile.location !== "Data profile worker not found" ? profile.location : "Location not yet added"}
                </small>
              </div>
              <div className="text-secondary">
                <small>{profile && profile.work_type && profile.work_type !== "Data profile worker not found" ? profile.work_type : "Job type not yet added"}</small>
              </div>
              <div className="text-secondary mt-2">
                <small>{profile && profile.worker_description && profile.worker_description !== "Data profile worker not found" ? profile.worker_description : "Worker descripton not yet added"}</small>
              </div>
              {/* <Button className={`${styles.btnsave} mt-4 my-2 w-100`}>
                Simpan
              </Button>
              <Button className={`${styles.btncancel} mt-4 my-2 w-100`}>Batal</Button> */}
            </div>
          </div>

          <div className="col-12 col-md-8">
            <div className={`${styles["profile-right"]} w-100 p-3`}>
              <div className="col">
                <div className="card border-0">
                  <div className="card-body">
                    <form className="mb-2" onSubmit={handleSubmitTalent}>
                      <div className="mb-3">
                        <h5>Data Diri</h5>
                        <hr />
                        <label htmlFor="name" className="form-label">
                          Nama
                        </label>
                        <input type="text" className="form-control" name="name" defaultValue={editTalent.name} onChange={handleChangeTalent} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input type="text" className="form-control" name="email" defaultValue={editTalent.email} disabled />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="phone" className="form-label">
                          Nomor Handphone
                        </label>
                        <input type="number" className="form-control" name="phone_number" defaultValue={editTalent.phone_number} onChange={handleChangeTalent} />
                      </div>
                      <Button type="submit" className={`${styles.addbtn} mt-4 w-100`} disabled={loading}>
                        {loading ? "Loading..." : "Simpan"}
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <DetailProfile />
            <Skill />
            <SocialMedia />
            <WorkExperience />
            <Portofolio />
          </div>
        </div>
      </div>
    </>
  );
}
