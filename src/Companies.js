import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import JoblyApi from "./api";
import "./Companies.css";
import UserContext from "./UserContext";

const Companies = () => {
  const user = useContext(UserContext);
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({ search: "" });
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [applied, setApplied] = useState([]);
  const [compJobs, setCompJobs] = useState([]);

  useEffect(() => {
    // Populate all companies
    async function getData() {
      console.log(user);
      try {
        const response = await JoblyApi.getAllCompanies();
        setCompanies(response.data.companies);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    }
    getData();
    console.log(companies);
  }, []);

  // filter companies based on search form
  const filterData = async (searchTerm) => {
    try {
      console.log(searchTerm);
      const filterData = await JoblyApi.getCompanies(searchTerm);
      setFilteredCompanies(filterData.data.companies);
      console.log("Filtered:", filteredCompanies);
    } catch (error) {
      console.error("Error fetching filtered companies:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    filterData(formData.search);
  };

  // adds job to jobs you have applied to
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

  // show all jobs for a selected company
  const showCompJobs = async (comp) => {
    const response = await JoblyApi.getJobs().then((res) => {
      const jobs = res.filter((job) => {
        return job.companyName === comp;
      });
      console.log(jobs);
      setCompJobs(jobs);
    });
  };

  return (
    <div className="comp-display">
      <ul>
        {compJobs.length > 0 ? (
          compJobs.map((job) => (
            <form key={uuidv4()} onSubmit={(e) => handleApply(e, job)}>
              <li className="job-listing">
                <h4>{job.title}</h4>
                <p>{job.companyName}</p>
                <p>Salary: {job.salary}</p>
                <p>Equity: {job.equity || 0}</p>
                <button className="apply-btn">
                  {user.currentUser.applications.includes(job.id) ? "Applied" : "Apply"}
                </button>
              </li>
            </form>
          ))
        ) : filteredCompanies.length > 0 ? (
          filteredCompanies.map((company) => (
            <li
              key={uuidv4()}
              className="comp-listing"
              onClick={() => showCompJobs(company.name)}
            >
              <h4>{company.name}</h4>
              <p>{company.description}</p>
            </li>
          ))
        ) : (
          <>
            <form onSubmit={handleSubmit}>
              <input
                id="search"
                name="search"
                value={formData.search}
                onChange={handleChange}
              />
              <button>Search</button>
            </form>
            {companies.map((company) => (
              <li
                key={uuidv4()}
                className="comp-listing"
                onClick={() => showCompJobs(company.name)}
              >
                <h4>{company.name}</h4>
                <p>{company.description}</p>
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
  
  
};

export default Companies;
