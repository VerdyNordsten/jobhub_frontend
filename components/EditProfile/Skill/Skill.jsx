import { Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import styles from "./Skill.module.css";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Skill() {
  const [loading, setLoading] = useState(false);
  const [skillName, setSkillName] = useState("");
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoading(true);

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile/skill`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSkills(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to get skills.",
        });
      });
  }, []);

  const handleSubmit = (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    setLoading(true);

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile/skill`,
        { name_skill: skillName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Your skill has been added.",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
        setSkills([...skills, response.data]);
        setSkillName("");
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Maximum Skill Only 10!",
        });
      });
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    setLoading(true);

    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile/skill/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setLoading(false);
            setSkills(skills.filter((skill) => skill.id !== id));
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "Your skill has been deleted.",
            });
          })
          .catch((error) => {
            setLoading(false);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          });
      }
    });
  };

  const handleChange = (e) => {
    setSkillName(e.target.value);
  };

  return (
    <>
      <div className={`${styles["profile-right"]} w-100 p-3 mt-3`}>
        <div className="col">
          <div className="card border-0">
            <div className="card-body">
              <form onSubmit={handleSubmit} className="mb-2">
                <h5>Skill</h5>
                <hr />
                <div className="row">
                  <div className="col-9">
                    <div className="mb-1">
                      <input type="text" className="form-control" id="skill" placeholder="Masukkan nama skill" value={skillName} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="mb-1">
                      <Button type="submit" className={`${styles.addbtn} w-100`} disabled={loading || !skillName}>
                        {loading ? "Loading..." : "Add"}
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
              {skills.length > 0 ? (
                <div className="d-flex flex-wrap align-items-center">
                  {skills.map((skill) => (
                    <span key={skill.id} className={`mx-1 my-1 px-2 ${styles.skill}`}>
                      {skill.name_skill}
                      <FontAwesomeIcon icon={faTrash} style={{ color: "#FF0000", width: "16px", height: "16px" }} onClick={() => handleDelete(skill.id)} />
                    </span>
                  ))}
                </div>
              ) : (
                <p>No skills yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
