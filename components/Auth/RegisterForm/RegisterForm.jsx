import { Button } from "react-bootstrap"
import Link from "next/link"
import Image from "next/legacy/image"
import React, { useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import Logo from "../../../public/images/logo-white.png"
import styles from "./RegisterForm.module.css"
import { Nav, NavItem } from "react-bootstrap"

export default function Register() {
  const [activeTab, setActiveTab] = useState("worker")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [position, setPosition] = useState("")
  const [password, setPassword] = useState("")
  const [rePassword, setRePassword] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRegisterWorker = async (event) => {
    setLoading(true)
    event.preventDefault()
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/register-worker`, {
        name,
        email,
        password,
        re_password: rePassword,
        phone_number: phoneNumber,
      })
      setTimeout(() => {
        setLoading(false)
        if (response.data.message === "Register has been success") {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: response.data.message,
          })
          window.location.href = "/login"
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.data.message,
          })
        }
      }, 2000)
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error Server",
      })
    }
  }

  const handleRegisterCompany = async (event) => {
    setLoading(true)
    event.preventDefault()
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/register-company`, {
        name,
        email,
        password,
        re_password: rePassword,
        phone_number: phoneNumber,
        company,
        position,
      })
      setTimeout(() => {
        setLoading(false)
        if (response.data.message === "Register has been success") {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: response.data.message,
          })
          window.location.href = "/login"
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.data.message,
          })
        }
      }, 2000)
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error Server",
      })
    }
  }

  const handleTabSelect = (tab) => {
    setActiveTab(tab)
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className={`${styles.side} col-sm-5 col-md-6 d-none d-sm-flex`}>
            <div className={`${styles.content} mx-1 mx-md-2 mx-lg-5 text-white w-100`}>
              <div className={styles.icon}>
                <Link href="/" className="text-decoration-none">
                  <span>
                    <div className="d-flex align-items-center">
                      <div style={{ position: "relative", height: 40, width: 40 }}>
                        <Image src={Logo} alt="Jobhub Logo" />
                      </div>
                      <p className="ms-2 mt-3 text-white">Jobhub</p>
                    </div>
                  </span>
                </Link>
              </div>
              <h1 className="fw-bold">Temukan developer berbakat & terbaik di berbagai bidang keahlian</h1>
            </div>
          </div>
          <div className={`${styles.auth} ${styles.login} col-sm-7 col-md-6`}>
            <div className={styles.content}>
              <h1 className="fs-4 fw-bold mb-3">Hello, Welcome To Jobhub</h1>
              <h2 className="fs-6 text-secondary mb-4">Daftarkan diri anda sekarang, dan bergabung bersama Jobhub</h2>
              <Nav variant="pills" className="justify-content-center" defaultActiveKey={activeTab} onSelect={handleTabSelect}>
                <NavItem>
                  <Nav.Link eventKey="worker" className={`${styles.tab} ${activeTab === "worker" ? "text-white active" : "text-secondary"} mb-3 me-2`} style={activeTab === "worker" ? { backgroundColor: "#5E50A1" } : {}}>
                    Worker
                  </Nav.Link>
                </NavItem>
                <NavItem>
                  <Nav.Link eventKey="company" className={`${styles.tab} ${activeTab === "company" ? "text-white active" : "text-secondary"} mb-3 ms-2`} style={activeTab === "company" ? { backgroundColor: "#5E50A1" } : {}}>
                    Company
                  </Nav.Link>
                </NavItem>
              </Nav>
              {activeTab === "worker" && (
                <form>
                  <div className="mb-3">
                    <input type="name" className="form-control form-control-sm p-3" id="name" placeholder="Masukkan nama" value={name} onChange={(event) => setName(event.target.value)} />
                  </div>
                  <div className="mb-3">
                    <input type="email" className="form-control form-control-sm p-3" id="email" placeholder="Masukkan email" value={email} onChange={(event) => setEmail(event.target.value)} />
                  </div>
                  <div className="mb-3">
                    <input type="number" className="form-control form-control-sm p-3" id="number" placeholder="Masukkan no handphone" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} />
                  </div>
                  <div className="mb-3">
                    <input type="password" className="form-control form-control-sm p-3" id="password" placeholder="Masukkan password" value={password} onChange={(event) => setPassword(event.target.value)} />
                  </div>
                  <div className="mb-3">
                    <input type="password" className="form-control form-control-sm p-3" id="re-password" placeholder="Masukkan ulang password" value={rePassword} onChange={(event) => setRePassword(event.target.value)} />
                  </div>
                  <div className="d-grid gap-2">
                    {loading ? (
                      <button type="submit" className="btn w-100 text-light mb-2 mt-4" style={{ backgroundColor: "#FBB017" }} disabled>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Loading...
                      </button>
                    ) : (
                      <button type="submit" className="btn w-100 text-light mb-2 mt-4" style={{ backgroundColor: "#FBB017" }} onClick={handleRegisterWorker}>
                        Register as Worker
                      </button>
                    )}
                  </div>
                </form>
              )}
              {activeTab === "company" && (
                <form>
                  <div className="mb-3">
                    <input type="name" className="form-control form-control-sm p-3" id="name" placeholder="Masukkan nama" value={name} onChange={(event) => setName(event.target.value)} />
                  </div>
                  <div className="mb-3">
                    <input type="name" className="form-control form-control-sm p-3" id="perusahaan" placeholder="Masukkan nama perusahaan" value={company} onChange={(event) => setCompany(event.target.value)} />
                  </div>
                  <div className="mb-3">
                    <input type="name" className="form-control form-control-sm p-3" id="jabatan" placeholder="Masukkan nama jabatan" value={position} onChange={(event) => setPosition(event.target.value)}/>
                  </div>
                  <div className="mb-3">
                    <input type="email" className="form-control form-control-sm p-3" id="email" placeholder="Masukkan email" value={email} onChange={(event) => setEmail(event.target.value)} />
                  </div>
                  <div className="mb-3">
                    <input type="number" className="form-control form-control-sm p-3" id="number" placeholder="Masukkan no handphone" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} />
                  </div>
                  <div className="mb-3">
                    <input type="password" className="form-control form-control-sm p-3" id="password" placeholder="Masukkan password" value={password} onChange={(event) => setPassword(event.target.value)} />
                  </div>
                  <div className="mb-3">
                    <input type="password" className="form-control form-control-sm p-3" id="re-password" placeholder="Masukkan ulang password" value={rePassword} onChange={(event) => setRePassword(event.target.value)} />
                  </div>
                  <div className="d-grid gap-2">
                    {loading ? (
                      <button type="submit" className="btn w-100 text-light mb-2 mt-4" style={{ backgroundColor: "#FBB017" }} disabled>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Loading...
                      </button>
                    ) : (
                      <button type="submit" className="btn w-100 text-light mb-2 mt-4" style={{ backgroundColor: "#FBB017" }} onClick={handleRegisterCompany}>
                        Register as Company
                      </button>
                    )}
                  </div>
                </form>
              )}
              <p className="text-center text-secondary mt-4">
                Already have an account?{" "}
                <Link href="/login" className="text-decoration-none">
                  <span className="text-orange text-decoration-none">Login here</span>
                </Link>
              </p>
              <br />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
