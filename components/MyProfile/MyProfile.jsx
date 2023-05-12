import { Button, Image } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { faGithub, faInstagram, faLinkedin, faTrash } from "@fortawesome/free-brands-svg-icons"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useState, useEffect } from "react"
import styles from "./MyProfile.module.css"
import { Nav, NavItem } from "react-bootstrap"
import axios from "axios"
import NavigationTab from "./NavigationTab"

export default function Worker() {
  const [activeTab, setActiveTab] = useState("portfolio")
  const [talent, setTalent] = useState([])
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const userId = res.data.data.id;
        axios
          .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/talent/${userId}`)
          .then((res) => setTalent(res.data.data))
          .catch((error) => console.error(error));
      })
      .catch((error) => {
        console.error(error);
        router.push("/login");
      });
  }, []);

  return (
    <>
      <div className={`container-fluid p-0 ${styles.body}`}>
        <div className={styles["back-purple"]}></div>
        <div className="row mx-auto" style={{ maxWidth: "1200px" }}>
          <div className="col-12 col-md-4">
            <div className={`${styles["profile-left"]} w-100 p-3`}>
              <div className="d-flex justify-content-center" style={{ position: "relative" }}>
                {talent && talent.detail_worker && talent.detail_worker.image_profile_worker && talent.detail_worker.image_profile_worker !== "Profile worker not yet added" ? <Image src={`https://drive.google.com/uc?id=${talent.detail_worker.image_profile_worker}`} className={`${styles.imageprofile} rounded-circle cover`} alt={talent.name} /> : <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png" className={`${styles.imageprofile} rounded-circle cover`} alt="Gambar Profile" />}
              </div>
              <h5 className="mt-3">{talent.name}</h5>
                <div className="mb-1">
                  <small>{talent && talent.detail_worker && talent.detail_worker.job_title && talent.detail_worker.job_title !== "Profile worker not yet added" ? talent.detail_worker.job_title : "Job title not yet added"}</small>
                </div>
              <div className="text-secondary">
                <small>
                  <FontAwesomeIcon icon={faLocationDot} style={{ color: "#FBB017", width: "20px", height: "20px", marginTop: "-3px" }} />
                  {talent && talent.detail_worker && talent.detail_worker.location && talent.detail_worker.location !== "Profile worker not yet added" ? talent.detail_worker.location : "Location not yet added"}
                </small>
              </div>
              <div className="text-secondary">
                <small>{talent && talent.detail_worker && talent.detail_worker.work_type && talent.detail_worker.work_type !== "Profile worker not yet added" ? talent.detail_worker.work_type : "Job type not yet added"}</small>
              </div>
              <div className="text-secondary mt-2">
                <small>{talent && talent.detail_worker && talent.detail_worker.worker_description && talent.detail_worker.worker_description !== "Profile worker not yet added" ? talent.detail_worker.worker_description : "Worker description not yet added"}</small>
              </div>
              <Link href="/profile/edit/my-profile">
                <Button className={`${styles.btnhire} mt-4 my-2 w-100`}>Edit Profile</Button>
              </Link>
              <h5 className="mt-3">Skills</h5>
              <div className="my-2 mb-5">
                {talent && talent.detail_skill && talent.detail_skill[0] !== "Skill worker not yet added" ? (
                  talent.detail_skill.map((skill, idx) => (
                    <div key={idx} className={`${styles.skill} my-1 mx-1`}>
                      {skill.name_skill}
                    </div>
                  ))
                ) : (
                  <div key="no-skill" className={`${styles.skill} my-1 mx-1`}>
                    Skills not yet added
                  </div>
                )}
              </div>
              <span href="#" target="_blank" className="my-3 text-secondary d-block" rel="noreferrer">
                <FontAwesomeIcon icon={faEnvelope} style={{ color: "#FBB017", width: "20px", height: "20px", marginTop: "-2px" }} /> <small>{talent && talent.detail_social_media && talent.detail_social_media.email && talent.detail_social_media.email !== "Social Media not yet added" ? talent.detail_social_media.email : "Email not yet added"}</small>
              </span>
              <span href="#" target="_blank" className="my-3 text-secondary d-block" rel="noreferrer">
                <FontAwesomeIcon icon={faInstagram} style={{ color: "#FBB017", width: "20px", height: "20px", marginTop: "-2px" }} /> <small>{talent && talent.detail_social_media && talent.detail_social_media.instagram && talent.detail_social_media.instagram !== "Social Media not yet added" ? talent.detail_social_media.instagram : "Instagram not yet added"}</small>
              </span>
              <span href="#" target="_blank" className="my-3 text-secondary d-block" rel="noreferrer">
                <FontAwesomeIcon icon={faLinkedin} style={{ color: "#FBB017", width: "20px", height: "20px", marginTop: "-2px" }} /> <small>{talent && talent.detail_social_media && talent.detail_social_media.linkedin && talent.detail_social_media.linkedin !== "Social Media not yet added" ? talent.detail_social_media.linkedin : "Linkedin not yet added"}</small>
              </span>
              <span href="#" target="_blank" className="my-3 text-secondary d-block" rel="noreferrer">
                <FontAwesomeIcon icon={faGithub} style={{ color: "#FBB017", width: "20px", height: "20px", marginTop: "-2px" }} /> <small>{talent && talent.detail_social_media && talent.detail_social_media.github && talent.detail_social_media.github !== "Social Media not yet added" ? talent.detail_social_media.github : "Github not yet added"}</small>
              </span>
            </div>
          </div>
          <div className="col-12 col-md-8">
            <div className={`${styles["profile-right"]} w-100 p-3`}>
              <NavigationTab />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
