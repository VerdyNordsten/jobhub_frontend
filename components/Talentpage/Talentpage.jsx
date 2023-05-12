import React, { useEffect, useState } from "react"
import styles from "./Talentpage.module.css"
import { Button, Container, Image, Pagination } from "react-bootstrap"
// import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationDot } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"

export default function Talentpage() {
  const [talents, setTalents] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/talent?page=${currentPage}`)
      .then((res) => {
        setTalents(res.data.data)
        setTotalPages(res.data.totalPage)
      })
      .catch((error) => console.error(error))
  }, [currentPage])

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1) {
      pageNumber = 1
    } else if (pageNumber > totalPages) {
      pageNumber = totalPages
    }
    setCurrentPage(pageNumber)
  }

  return (
    <>
      <div className={styles.body}>
        <div className={styles.top}>
          <div className="container py-3">
            <h3 className="fw-bold m-0">Top Jobs</h3>
          </div>
        </div>
        <Container className="mt-5">
          <form className="d-flex mx-auto">
            <input className="form-control p-2 me-2" type="search" placeholder="Search for the best talent" style={{ height: "50px", border: "none" }} />
            <select className="form-select me-2" style={{ width: "100px", border: "none" }}>
              <option value="">Sort</option>
              <option value="name">Sort by Name</option>
              <option value="skill">Sort by Skill</option>
              <option value="location">Sort by Location</option>
            </select>
            <Button className="text-white" type="submit" style={{ backgroundColor: "#5E50A1", border: "none" }}>
              Search
            </Button>
          </form>

          <div className="mt-5">
            {talents.map((talent) => {
              if (talent.detail_worker) {
                const detailWorker = talent.detail_worker[0]
                return (
                  <div key={talent.id} className="row p-3">
                    <div className="col-12 col-sm-6 col-md-9 bg-white">
                      <div className="row">
                        <div className="d-flex justify-content-center align-items-center col-sm-12 col-md-2 my-2">
                          <div style={{ position: "relative", height: 80, width: 80 }}>
                            {talent.detail_worker === "Profile worker not yet added" ? <Image src="https://images227.netlify.app/mernuas/default.jpg" className={`${styles.imageprofile} rounded-circle cover`} alt="Gambar Profile" /> : <Image src={`https://drive.google.com/uc?id=${detailWorker.image_profile_worker}`} className={`${styles.imageprofile} rounded-circle cover`} alt={talent.name} />}
                          </div>
                        </div>
                        <div className="col-sm-12 col-md-9 my-2">
                          <div className="d-flex align-items-center h-100">
                            <div>
                              <div className={styles.name}>{talent.name}</div>
                              <small className="text-secondary">{talent.detail_worker === "Profile worker not yet added" ? "Title not yet added" : detailWorker.job_title}</small>
                              <div className="text-secondary mb-1">
                                <small>
                                  <FontAwesomeIcon icon={faLocationDot} style={{ color: "#5E50A1", width: "20px", height: "20px", marginTop: "3px" }} />
                                  {talent.detail_worker === "Profile worker not yet added" ? "Location not yet added" : detailWorker.location}
                                </small>
                              </div>
                              <div className="d-flex flex-wrap align-items-center">
                                {talent.skill === "Skill not yet added" ? (
                                  <span className={`mx-3 px-2 ${styles.skill}`}>Skill not yet added</span>
                                ) : (
                                  talent.skill.map((skill, index) => (
                                    <span key={index} className={`mx-1 my-1 px-2 ${styles.skill}`} style={{ maxWidth: `${skill.name_skill.length * 19}px` }}>
                                      {skill.name_skill}
                                    </span>
                                  ))
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3 bg-white">
                      <div className="d-flex align-items-center justify-content-center mb-3 h-100">
                        <Button href={`/profile/user/${talent.id}`} className={`${styles.btnprofile}`}>
                          Lihat Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              } else {
                return null
              }
            })}
          </div>

          <div className="d-flex justify-content-center mt-1">
            <Pagination>
              {currentPage !== 1 && <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} />}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Pagination.Item key={page} active={page === currentPage} className="mx-2" onClick={() => handlePageChange(page)}>
                  {page}
                </Pagination.Item>
              ))}
              {currentPage !== totalPages && <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />}
              {currentPage === totalPages && <Pagination.Next disabled />}
            </Pagination>
          </div>
        </Container>
      </div>
    </>
  )
}
