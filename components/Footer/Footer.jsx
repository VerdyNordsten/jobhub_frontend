import Link from "next/link"
import Image from "next/legacy/image"
import React from "react"
import Logo from "../../public/images/logo-white.png"
import styles from "./Footer.module.css"

export default function Footer() {
  return (
    <>
      <footer className={`${styles.footer} text-light`}>
        <div className="d-flex align-items-center">
          <div className={styles.logo}>
            <Image src={Logo} alt="Jobhub Logo" />
          </div>
          <h2 className="ms-2 mt-2">Jobhub</h2>
        </div>
        <p className="mt-3 mb-5">
          Kami mempertemukan perusahaan dan organisasi dengan talenta yang berpengalaman dan berkualitas untuk menjalankan proyek-proyek inovatif dan menghasilkan hasil yang luar biasa.
        </p>
        <hr />
        <div className="d-flex justify-content-between mt-4">
          <p className="m-0 p-0">Copyright © 2023 Jobhub</p>
          <div className="d-none d-sm-block d-flex align-items-center">
            <Link href="#" className="text-decoration-none">
              <span className="text-light me-3">Telepon</span>
            </Link>
            <Link href="#" className="text-decoration-none">
              <span className="text-light">Email</span>
            </Link>
          </div>
        </div>
      </footer>
    </>
  )
}
