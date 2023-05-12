import { Button, Image } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { faGithub, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import Link from "next/link"
import React from "react"
import styles from "./ProfileCompany.module.css"

export default function Worker() {
  return (
    <>
      <div className="container-fluid p-0 mb-4">
        <div className={styles["back-purple"]}></div>
        <div className="row mx-auto" style={{ maxWidth: "1200px" }}>
          <div className="col-12">
            <div className={`${styles["profile-left"]} w-100 p-3 text-center`}>
              <div className="mx-auto" style={{ position: "relative", height: 120, width: 120 }}>
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"
                  className={`${styles.imageprofile} rounded-circle cover`}
                  alt="Gambar Profile"
                />
              </div>
              <h5 className="mt-3">PT. Feriza Digital Nusantara</h5>
              <div className="mb-1">
                <small>Chief Technology Officer</small>
              </div>
              <div className="text-secondary">
                <small>
                  <FontAwesomeIcon icon={faLocationDot} style={{ color: "#FBB017", width: "20px", height: "20px", marginTop: "-3px" }} /> Jakarta
                </small>
              </div>
              <div className="text-secondary mt-2">
                <small>
                  Sebagai Software Engineer di Tokopedia, tugasnya meliputi mengembangkan, memelihara, dan meningkatkan fitur dan sistem aplikasi Tokopedia. Selain itu, Software Engineer di Tokopedia
                  juga diharapkan mampu mengimplementasikan teknologi-teknologi baru dan menghadapi tantangan teknis dalam lingkup bisnis e-commerce terbesar di Indonesia.
                </small>
              </div>
              <Link href="#">
                <Button className={`${styles.btnedit} mt-4 my-2`}>Edit Profile</Button>
              </Link>
              <div className="text-secondary d-flex flex-column justify-content-center">
                <div className="text-center">
                  <FontAwesomeIcon icon={faEnvelope} style={{ color: "#FBB017", width: "20px", height: "20px", marginTop: "-2px" }} /> <small>EMAIL</small>
                </div>
                <div className="text-center">
                  <FontAwesomeIcon icon={faInstagram} style={{ color: "#FBB017", width: "20px", height: "20px", marginTop: "-2px" }} /> <small>INSTAGRAM</small>
                </div>
                <div className="text-center">
                  <FontAwesomeIcon icon={faGithub} style={{ color: "#FBB017", width: "20px", height: "20px", marginTop: "-2px" }} /> <small>GITHUB</small>
                </div>
                <div className="text-center">
                  <FontAwesomeIcon icon={faLinkedin} style={{ color: "#FBB017", width: "20px", height: "20px", marginTop: "-2px" }} /> <small>LINKEDIN</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
