import React from "react"
import styles from "../../styles/Landing.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons"
import Slider from "react-slick"
import { Image } from "react-bootstrap"
import Link from "next/link"

function CustomNextArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#5E50A1",
        borderRadius: "100%",
        width: "35px",
        height: "35px",
        zIndex: "999",
      }}
      onClick={onClick}
    />
  )
}

function CustomPrevArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#5E50A1",
        borderRadius: "100%",
        width: "35px",
        height: "35px",
        zIndex: "999",
      }}
      onClick={onClick}
    />
  )
}

export default function Homepage() {
  const settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    dots: true,
    swipeToSlide: true,
    infinite: true,
    pauseOnHover: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }
  return (
    <>
      <div className="container my-5">
        <div className={`${styles.imagetop} row d-flex align-items-center mb-5 px-3 px-md-0`}>
          <div className="col-12 col-md-7 col-lg-6">
            <p className="display-5 fw-bold">Talenta terbaik negeri untuk perubahan revolusi 4.0</p>
            <p className="text-secondary">Selamat datang di Jobhub, platform yang menyediakan akses kepada talenta terbaik negeri untuk membantu perusahaan dan organisasi mencapai kesuksesan di era revolusi industri 4.0</p>
            <Link href="/talent">
              <div className="btn btn-lg text-white" style={{ backgroundColor: "#5E50A1" }}>
                Mulai Dari Sekarang
              </div>
            </Link>
          </div>
          <div className="col-md-5 col-lg-6 d-none d-md-block">
            <div className="d-flex justify-content-end">
              <div className="position-relative">
                <img className={`${styles["z-index"]} position-absolute`} src="https://images227.netlify.app/gohired/landing1.webp" alt="Landing Top Image" />
                <div className={`${styles.box1}`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-lg">
        <div className={`${styles.imagemiddle} row mb-5`}>
          <div className="col-12 col-md-6">
            <div className="position-relative d-flex align-items-center justify-content-center h-100">
              <img className={`${styles["z-index"]} position-absolute`} src="https://images227.netlify.app/gohired/landing2.webp" alt="Landing Middle Image" />
              <div className={styles.box2}></div>
            </div>
          </div>
          <div className={`${styles.side} col-12 col-md-6`}>
            <h1 className="fw-bold">Kenapa harus mencari talent di Jobhub</h1>
            <ul className="list-unstyled mt-3 text-start">
              <li className="mb-1">
                <div className="d-flex">
                  <FontAwesomeIcon icon={faCheckCircle} style={{ color: "#5E50A1", width: "20px", height: "20px", marginTop: "3px" }} />
                  <p className="ms-2">Pilihan talenta yang beragam dan berkualitas.</p>
                </div>
              </li>
              <li className="mb-1">
                <div className="d-flex">
                  <FontAwesomeIcon icon={faCheckCircle} style={{ color: "#5E50A1", width: "20px", height: "20px", marginTop: "3px" }} />
                  <p className="ms-2">Fitur pencarian dan filtrasi yang mudah digunakan.</p>
                </div>
              </li>
              <li className="mb-1">
                <div className="d-flex">
                  <FontAwesomeIcon icon={faCheckCircle} style={{ color: "#5E50A1", width: "20px", height: "20px", marginTop: "3px" }} />
                  <p className="ms-2">Platform terpercaya dengan dukungan pelanggan yang baik.</p>
                </div>
              </li>
              <li className="mb-1">
                <div className="d-flex">
                  <FontAwesomeIcon icon={faCheckCircle} style={{ color: "#5E50A1", width: "20px", height: "20px", marginTop: "3px" }} />
                  <p className="ms-2">Fleksibilitas dalam memilih talenta freelance, kontrak, atau full-time.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container-lg">
        <div className={`${styles.imagebottom} row mb-5`}>
          <div className={`${styles.side} col-12 col-md-6`}>
            <h1 className="fw-bold">Skill Talent</h1>
            <p className="text-secondary text-start mt-3 mb-4">Kami memahami bahwa perusahaan dan organisasi memerlukan sumber daya manusia yang memiliki keterampilan dan pengetahuan terkini untuk menghadapi tantangan dan memanfaatkan peluang yang ditawarkan oleh teknologi baru.</p>
            <div className="row mb-1">
              <div className="col-6">
                <div className="d-flex">
                  <FontAwesomeIcon icon={faCheckCircle} style={{ color: "#FBB017", width: "20px", height: "20px", marginTop: "3px" }} />
                  <p className="ms-2">Java</p>
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex">
                  <FontAwesomeIcon icon={faCheckCircle} style={{ color: "#FBB017", width: "20px", height: "20px", marginTop: "3px" }} />
                  <p className="ms-2">PHP</p>
                </div>
              </div>
            </div>
            <div className="row mb-1">
              <div className="col-6">
                <div className="d-flex">
                  <FontAwesomeIcon icon={faCheckCircle} style={{ color: "#FBB017", width: "20px", height: "20px", marginTop: "3px" }} />
                  <p className="ms-2">Python</p>
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex">
                  <FontAwesomeIcon icon={faCheckCircle} style={{ color: "#FBB017", width: "20px", height: "20px", marginTop: "3px" }} />
                  <p className="ms-2">Javascript</p>
                </div>
              </div>
            </div>
            <div className="row mb-1">
              <div className="col-6">
                <div className="d-flex">
                  <FontAwesomeIcon icon={faCheckCircle} style={{ color: "#FBB017", width: "20px", height: "20px", marginTop: "3px" }} />
                  <p className="ms-2">Golang</p>
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex">
                  <FontAwesomeIcon icon={faCheckCircle} style={{ color: "#FBB017", width: "20px", height: "20px", marginTop: "3px" }} />
                  <p className="ms-2">Ruby</p>
                </div>
              </div>
            </div>
            <div className="row mb-1">
              <div className="col-6">
                <div className="d-flex">
                  <FontAwesomeIcon icon={faCheckCircle} style={{ color: "#FBB017", width: "20px", height: "20px", marginTop: "3px" }} />
                  <p className="ms-2">.NET</p>
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex">
                  <FontAwesomeIcon icon={faCheckCircle} style={{ color: "#FBB017", width: "20px", height: "20px", marginTop: "3px" }} />
                  <p className="ms-2">SQL</p>
                </div>
              </div>
            </div>
            <div className="row mb-1">
              <div className="col-6">
                <div className="d-flex">
                  <FontAwesomeIcon icon={faCheckCircle} style={{ color: "#FBB017", width: "20px", height: "20px", marginTop: "3px" }} />
                  <p className="ms-2">C++</p>
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex">
                  <FontAwesomeIcon icon={faCheckCircle} style={{ color: "#FBB017", width: "20px", height: "20px", marginTop: "3px" }} />
                  <p className="ms-2">C#</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 d-none d-md-block">
            <div className="position-relative d-flex align-items-center justify-content-center h-100">
              <img className={`${styles["z-index"]} position-absolute`} src="https://images227.netlify.app/gohired/landing3.webp" alt="Landing Bottom Image" />
              <div className={styles.box3}></div>
            </div>
          </div>
        </div>
      </div>

      <div className={`container-fluid ${styles["slider-container"]}`}>
        <h1 className="fw-bold text-center mb-5">Their opinion about Jobhub</h1>
        <Slider {...settings}>
          <div className="h-100">
            <div className="shadow p-4 mb-5 bg-body rounded mx-2" style={{ height: "350px" }}>
              <div
                style={{
                  position: "relative",
                  height: 120,
                  width: 120,
                }}
                className="mx-auto"
              >
                <Image src="https://i.ibb.co/r6bGCpB/Bassal-Laura.jpg" className={`${styles.customImage} rounded-circle cover`} alt="Profile Review" />
              </div>
              <p className="text-center mt-2 fw-bold my-0">Bassal Laura</p>
              <p className="text-center text-secondary">
                <small>Chief Operating Officer</small>
              </p>
              <p className="text-center">Saya sangat terbantu dengan Jobhub. Cepat dan mudah mencari talenta berkualitas dengan harga yang kompetitif.</p>
            </div>
          </div>
          <div className="h-100">
            <div className="shadow p-4 mb-5 bg-body rounded mx-2" style={{ height: "350px" }}>
              <div
                style={{
                  position: "relative",
                  height: 120,
                  width: 120,
                }}
                className="mx-auto"
              >
                <Image src="https://i.ibb.co/p21B7DL/Dentons-Victor.jpg" className={`${styles.customImage} rounded-circle cover`} alt="Profile Review" />
              </div>
              <p className="text-center mt-2 fw-bold my-0">Denton Victor</p>
              <p className="text-center text-secondary">
                <small>Senior Software Engineering</small>
              </p>
              <p className="text-center">Pengalaman kerja dengan Jobhub sangat menyenangkan. Dukungan pelanggan luar biasa dan platform yang mudah digunakan.</p>
            </div>
          </div>
          <div className="h-100">
            <div className="shadow p-4 mb-5 bg-body rounded mx-2" style={{ height: "350px" }}>
              <div
                style={{
                  position: "relative",
                  height: 120,
                  width: 120,
                }}
                className="mx-auto"
              >
                <Image src="https://i.ibb.co/714zhjS/Guy-Tessier.jpg" className={`${styles.customImage} rounded-circle cover`} alt="Profile Review" />
              </div>
              <p className="text-center mt-2 fw-bold my-0">Guy Tessier</p>
              <p className="text-center text-secondary">
                <small>Senior Hardware Engineering</small>
              </p>
              <p className="text-center">Talent pool Jobhub sangat luas dan bervariasi. Saya menemukan talenta yang sesuai dengan kebutuhan proyek saya.</p>
            </div>
          </div>
          <div className="h-100">
            <div className="shadow p-4 mb-5 bg-body rounded mx-2" style={{ height: "350px" }}>
              <div
                style={{
                  position: "relative",
                  height: 120,
                  width: 120,
                }}
                className="mx-auto"
              >
                <Image src="https://i.ibb.co/RBZC0qX/Kholam-Sabrina.jpg" className={`${styles.customImage} rounded-circle cover`} alt="Profile Review" />
              </div>
              <p className="text-center mt-2 fw-bold my-0">Kholam Sabrina</p>
              <p className="text-center text-secondary">
                <small>Chief Human Resources</small>
              </p>
              <p className="text-center">Jobhub memberikan kemudahan dan fleksibilitas dalam mencari pekerjaan freelance. Saya merekomendasikan Jobhub untuk freelancer.</p>
            </div>
          </div>
          <div className="h-100">
            <div className="shadow p-4 mb-5 bg-body rounded mx-2" style={{ height: "350px" }}>
              <div
                style={{
                  position: "relative",
                  height: 120,
                  width: 120,
                }}
                className="mx-auto"
              >
                <Image src="https://i.ibb.co/Wkk251q/Leduc-William.jpg" className={`${styles.customImage} rounded-circle cover`} alt="Profile Review" />
              </div>
              <p className="text-center mt-2 fw-bold my-0">Leduc William</p>
              <p className="text-center text-secondary">
                <small>Chief Financial Officer</small>
              </p>
              <p className="text-center">Saya menemukan pekerjaan impian saya melalui Jobhub. Terima kasih!</p>
            </div>
          </div>
          <div className="h-100">
            <div className="shadow p-4 mb-5 bg-body rounded mx-2" style={{ height: "350px" }}>
              <div
                style={{
                  position: "relative",
                  height: 120,
                  width: 120,
                }}
                className="mx-auto"
              >
                <Image src="https://i.ibb.co/mDJ6hZV/Luo-Alan.jpg" className={`${styles.customImage} rounded-circle cover`} alt="Profile Review" />
              </div>
              <p className="text-center mt-2 fw-bold my-0">Luo Alan</p>
              <p className="text-center text-secondary">
                <small>Server and Tools Business</small>
              </p>
              <p className="text-center">Saya sangat merekomendasikan Jobhub untuk perusahaan yang membutuhkan talenta berkualitas dan andal.</p>
            </div>
          </div>
        </Slider>
      </div>

      <div className={`container ${styles["invitation-container"]}`}>
        <div className={styles.invitation}>
          <div className="d-block d-md-flex justify-content-between">
            <h3 style={{ maxWidth: "300px" }}>Pilih talenta terbaik yang ada disini</h3>
            <br />
            <div className="d-flex align-items-center">
              <button className="btn bg-light py-3">Mulai Dari Sekarang</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
