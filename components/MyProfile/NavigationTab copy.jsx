import { Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faInstagram, faLinkedin, faTrash } from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import styles from "./MyProfile.module.css";
import { Nav, NavItem } from "react-bootstrap";
import axios from "axios";

export default function TabPortfolio() {
  const [activeTab, setActiveTab] = useState("portfolio");
  const [talent, setTalent] = useState([]);
  const router = useRouter();

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

  const handleTabSelect = (tab) => {
    setActiveTab(tab)
  }

  return (
    <>
      <Nav variant="pills" defaultActiveKey={activeTab} onSelect={handleTabSelect}>
        <NavItem>
          <Nav.Link eventKey="portfolio" className={`${styles.tab} ${activeTab === "portfolio" ? "text-white active" : "text-secondary"} me-2`} style={activeTab === "portfolio" ? { backgroundColor: "#5E50A1" } : {}}>
            Portofolio
          </Nav.Link>
        </NavItem>
        <NavItem>
          <Nav.Link eventKey="experience" className={`${styles.tab} ${activeTab === "experience" ? "text-white active" : "text-secondary"} ms-2`} style={activeTab === "experience" ? { backgroundColor: "#5E50A1" } : {}}>
            Pengalaman kerja
          </Nav.Link>
        </NavItem>
      </Nav>
      <hr />
      {activeTab === "portfolio" && (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mb-2">
          {talent && talent.detail_portfolio ? (
            talent.detail_portfolio[0] === "Portfolio worker not yet added" ? (
              <div key="no-portfolio" className="col">
                <div className="card border-0">
                  <div className="card-body">
                    <p className="card-title text-center">Portfolio worker not yet added</p>
                  </div>
                </div>
              </div>
            ) : (
              talent.detail_portfolio.map((portfolio, idx) => (
                <div key={idx} className="col">
                  <div className="card border-0">
                    <div className="card-body">
                      {portfolio.image_portfolio ? <Image src={`https://drive.google.com/uc?id=${portfolio.image_portfolio}`} className={`${styles.imageproject} rounded`} alt={portfolio.name_portfolio} /> : <Image src="https://cutewallpaper.org/24/image-placeholder-png/android-case-study-placeholder-image-and-memory-consumption-by-nemanja-kovacevic-nemanja-kovacevic-medium.png" className={`${styles.imageproject} rounded`} alt="Gambar Profile" />}
                      <h6 className="card-title text-center">{portfolio.name_portfolio}</h6>
                    </div>
                  </div>
                </div>
              ))
            )
          ) : (
            <div key="no-portfolio" className="col">
              <div className="card border-0">
                <div className="card-body">
                  <p className="card-title text-center">Portfolio worker not yet added</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {activeTab === "experience" && (
        <div className="row mb-3">
          {talent.detail_experience_work && talent.detail_experience_work[0] !== "Experience worker not yet added" ? (
            talent.detail_experience_work.map((experience, idx) => (
              <React.Fragment key={idx}>
                <div className="d-none d-sm-block col-12 col-sm-4 col-lg-3">
                  <Image src={experience.image_experience_company ? `https://drive.google.com/uc?id=${experience.image_experience_company}` : "https://www.market-research-companies.in//images/default.jpg"} className={`${styles.companyprofile}`} alt="Gambar Profile" />
                </div>
                <div className="col-12 col-sm-8 col-lg-9">
                  <h5>{experience.name_position}</h5>
                  <p className="m-0">{experience.name_company}</p>
                  <p className="text-secondary">
                    <small>{experience.start_work}</small> - <small>{experience.end_work}</small> | <small>{experience.duration_work}</small>
                  </p>
                  <p>{experience.job_description}</p>
                </div>
              </React.Fragment>
            ))
          ) : (
            <div className="col">
              <div className="card border-0">
                <div className="card-body">
                  <p className="card-title text-center">Experience worker not yet added</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
