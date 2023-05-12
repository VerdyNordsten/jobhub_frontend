import { Button } from "react-bootstrap"
import Link from "next/link"
import Image from "next/legacy/image"
import React, { useEffect, useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import Logo from "../../../public/images/logo-white.png"
import styles from "./LoginForm.module.css"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      window.location.href = "/"
    }
  }, [])

  const handleLogin = async (event) => {
    setLoading(true)
    event.preventDefault()
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/login`, {
        email,
        password,
      })
      setTimeout(() => {
        setLoading(false)
        if (response.data && response.data.data && response.data.data.token) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: response.data.message,
          })
          localStorage.setItem("token", response.data.data.token)
          if (response.data.message === "Login is successful") {
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: response.data.message,
            })
          }
          window.location.href = "/"
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
              <h2 className="fs-6 text-secondary mb-4">Login ke akun anda yang telah terdaftar</h2>
              <form>
                <div className="mb-3">
                  <input type="email" className="form-control form-control-sm p-3" id="email" placeholder="Masukkan email" value={email} onChange={(event) => setEmail(event.target.value)} required />
                </div>
                <input type="password" className="form-control form-control-sm p-3" id="password" placeholder="Masukkan password" value={password} onChange={(event) => setPassword(event.target.value)} required />
                <div className="d-flex justify-content-end mb-3">
                  <Link href="/forgot" className="text-decoration-none">
                    <span className="text-secondary">Lupa kata sandi?</span>
                  </Link>
                </div>
                <div className="d-grid gap-2">
                  {loading ? (
                    <button type="submit" className="btn w-100 text-light mb-2" style={{ backgroundColor: "#FBB017" }}disabled>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Loading...
                    </button>
                  ) : (
                    <button type="submit" className="btn w-100 text-light mb-2" style={{ backgroundColor: "#FBB017" }} onClick={handleLogin}>
                      Log in
                    </button>
                  )}
                </div>
              </form>
              <p className="text-center text-secondary mt-4">
                Anda belum punya akun?{" "}
                <Link href="/register" className="text-decoration-none">
                  <span className="text-orange text-decoration-none">Daftar di sini</span>
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
