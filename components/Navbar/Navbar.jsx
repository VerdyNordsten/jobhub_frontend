import { useState, useEffect } from "react";
import { Button, Navbar, Dropdown } from "react-bootstrap";
import Link from "next/link";
import Logo from "../../public/images/logo.png";
import styles from "./Navbar.module.css";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Image from "next/legacy/image";
import axios from "axios";

export default function CustomNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState([]);
  const [talent, setTalent] = useState({});
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      axios
        .get("http://localhost:4444/api/v1/profile/worker", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.data.Message === "Data profile worker not found") {
            setProfileImage("https://images227.netlify.app/mernuas/default.jpg");
          } else {
            const imageProfileWorker = res.data.data.image_profile_worker;
            setProfileImage(imageProfileWorker);
          }
        })
        .catch((error) => {
          if (error.response && error.response.data.message === "Token expired") {
            localStorage.removeItem("token");
            setIsLoggedIn(false);
            window.location.href = "/login"; // redirect to login page
          } else {
            console.error(error);
          }
        });
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <Navbar bg="transparent" variant="light" expand="sm" className="p-3">
      <div className="container">
        <Link href="/" className="text-decoration-none">
          <Navbar.Brand style={{ color: "#5E50A1" }}>
            <div className="d-flex align-items-center mt-4">
              <div style={{ height: 35, width: 35 }}>
                <Image src={Logo} alt="Jobhub Logo" />
              </div>
              <span className="ms-2">Jobhub</span>
            </div>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="navbarMenu" data-toggle="collapse" data-target="#navbarMenu" />
        <Navbar.Collapse id="navbarMenu">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 flex-row justify-content-end">
            {isLoggedIn ? (
              <>
                <li className="mx-4 my-2 flex-column">
                  <FontAwesomeIcon icon={faBell} style={{ color: "#5E50A1", width: "20px", height: "20px", marginTop: "3px" }} />
                </li>
                <li className="mx-4 my-2 flex-column">
                  <FontAwesomeIcon icon={faEnvelope} style={{ color: "#5E50A1", width: "20px", height: "20px", marginTop: "3px" }} />
                </li>
                <li className="mx-4 my-1 flex-column">
                  <Dropdown>
                    <Dropdown.Toggle style={{ backgroundColor: "transparent", border: "none" }} id="dropdown-basic">
                      {profileImage === "https://images227.netlify.app/mernuas/default.jpg" ? <Image src={profileImage} layout="fill" className={`${styles.imageprofile} rounded-circle cover`} alt="Gambar Profile" /> : <img src={`https://drive.google.com/uc?id=${profileImage}`} layout="fill" className={`${styles.imageprofile} rounded-circle cover`} alt="Profile" />}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="/profile/my-profile">Profile</Dropdown.Item>
                      <Dropdown.Item>
                        <span onClick={handleLogout}>Logout</span>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              </>
            ) : (
              <>
                <li className="mx-1 my-1 flex-column">
                  <Button href="/login" className={`${styles.register}`}>
                    Masuk
                  </Button>
                </li>
                <li className="mx-1 my-1 flex-column">
                  <Button href="/register" className={`${styles.register}`}>
                    Daftar
                  </Button>
                </li>
              </>
            )}
          </ul>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
