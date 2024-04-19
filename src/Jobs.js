import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import JoblyApi from "./api";
import "./Jobs.css";
import UserContext from "./UserContext";

const Jobs = () => {
  const user = useContext(UserContext);
  const [jobs, setJobs] = useState([]);
  const [applied, setApplied] = useState([]);
  console.log(user.currentUser);

  // Lists all jobs
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`http://localhost:3001/jobs`);
        setJobs(response.data.jobs);
        console.log(response.data.jobs);
      } catch (e) {
        console.log(e);
      }
    }
    getData();
    if (user.currentUser?.applications) {
      setApplied(user.currentUser.applications);
    }
  }, [user.currentUser]);

  // Applys to selected job
  const handleApply = (e, job) => {
    e.preventDefault();
    console.log(e.target);
    console.log(job);
    let response = JoblyApi.applyToJob(user.currentUser.username, job.id).then(
      (res) => {
        console.log(res);
        setApplied([...applied, job.id]);
      }
    );
  };

  return (
    <div className="jobs-display">
      <ul>
        {jobs.map((job) => (
          <form onSubmit={(e) => handleApply(e, job)}>
            <li key={uuidv4()} className="job-listing">
              <h4>{job.title}</h4>
              <p>{job.companyName}</p>
              <p>Salary: {job.salary}</p>
              <p>Equity: {job.equity || 0}</p>
              <button className="apply-btn">
                {applied.includes(job.id) ? "Applied" : "Apply"}
              </button>
            </li>
          </form>
        ))}
      </ul>
    </div>
  );
};

export default Jobs;
