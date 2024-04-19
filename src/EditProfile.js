import { useState, useContext } from "react";
import UserContext from "./UserContext";
import { useNavigate } from "react-router-dom";
import JoblyApi from "./api";
import "./EditProfile.css";

const EditProfile = () => {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const INITIAL_STATE = {
    username: user.currentUser.username,
    firstName: user.currentUser.firstName,
    lastName: user.currentUser.lastName,
    email: user.currentUser.email,
  };
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let firstName = formData.firstName || user.currentUser.firstName;
    let lastName = formData.lastName || user.currentUser.lastName;
    let email = formData.email || user.currentUser.email;

    const editUser = {
      firstName,
      lastName,
      email,
    };

    let response = JoblyApi.saveProfile(user.currentUser.username, editUser)
    .then(res =>{
      user.setCurrentUser(res);
    })
    navigate("/");
  };

  return (
    <div className="display">
      <form className="form-box" onSubmit={handleSubmit}>
        <h2>Edit {user.currentUser.username}'s Profile</h2>
        
        <div className="field-set">
          <label htmlFor="firstName">First Name:</label>
          <input
            className="edit-field"
            type="text"
            name="firstName"
            placeholder={user.currentUser.firstName}
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="field-set">
          <label htmlFor="lastName">Last Name:</label>
          <input
            className="edit-field"
            type="text"
            name="lastName"
            placeholder={user.currentUser.lastName}
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="field-set">
          <label htmlFor="email">Email:</label>
          <input
            className="edit-field"
            type="text"
            name="email"
            placeholder={user.currentUser.email}
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <button className="edit-btn">Edit</button>
      </form>
    </div>
  );
};

export default EditProfile;
