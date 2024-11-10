import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateEmployee = ({ onSubmitSuccess }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isEmailUnique, setIsEmailUnique] = useState(true);
  const { getCreteEmployeeAccess } = useAuth();

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Redirect to login if the user is not an admin
    if (localStorage.getItem("role") !== "admin") {
      toast.warning("Access restricted to admin users only");
      navigate("/login");
      return;
    }

    getCreteEmployeeAccess()
      .then((response) => setMessage(response.data.message))
      .catch(() => {
        setMessage("Unauthorized");
        logout();
        navigate("/login");
      });
  }, [navigate]);

  const isEditing = !!location.state?.employeeData;
  const employeeData = location.state?.employeeData || {};

  const [formData, setFormData] = useState({
    name: employeeData.name || "",
    email: employeeData.email || "",
    mobile: employeeData.mobile || "",
    designation: employeeData.designation || "",
    gender: employeeData.gender || "",
    course: employeeData.course || "", // Single string value for course
  });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/.test(formData.email)) {
      newErrors.email = "Email must contain only letters";
    } else if (!isEmailUnique) {
      newErrors.email = "Email already exists";
    }

    if (!formData.mobile) {
      newErrors.mobile = "Mobile is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile must be 10 digits";
    }

    if (!formData.designation) {
      newErrors.designation = "Designation is required";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.course) {
      newErrors.course = "Course selection is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        course: checked ? value : "", // Set the course value or empty string
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

    // Check for unique email
    if (name === "email") {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employee/check-email?email=${value}`
        );
        setIsEmailUnique(true);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setIsEmailUnique(false);
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: "Email already exists",
          }));
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill out all required fields correctly.");
      return;
    }

    try {
      if (isEditing) {
        const response = await axios.put(
          `http://localhost:5000/api/employee/${employeeData._id}`,
          formData
        );
        toast.success("Updated successfully");
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/employee",
          formData
        );
        toast.success("Created successfully");
      }

      if (onSubmitSuccess) onSubmitSuccess();
      navigate("/employees-list");
    } catch (error) {
      console.error("Error submitting form:", error.response || error.message);
      toast.error("Form submission error");
    }
  };

  return (
    <main className="mb-5">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold my-4">Create Employee</h1>
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className="border border-gray-500 p-4 rounded-md"
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-5">
              <div>
                <label className="block mb-2 font-semibold">Enter Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  className="input input-bordered w-full max-w-xs"
                />
                {errors.name && (
                  <span className="text-red-500 block">{errors.name}</span>
                )}
              </div>

              <div>
                <label className="block mb-2 font-semibold">Enter Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter Mobile"
                  className="input input-bordered w-full max-w-xs"
                />
                {errors.mobile && (
                  <span className="text-red-500 block">{errors.mobile}</span>
                )}
              </div>
            </div>

            <div>
              <label className="block mb-2 font-semibold">Enter Email</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                className="input input-bordered w-full max-w-xs"
              />
              {errors.email && (
                <span className="text-red-500 block">{errors.email}</span>
              )}
            </div>

            <div className="flex flex-row justify-between">
              <div className="font-semibold">
                <label className="block">Select Designation</label>
                <div className="dropdown my-5">
                  <button className="btn m-1" type="button">
                    {formData.designation || "Select Designation"}
                  </button>
                  <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    {["HR", "Manager", "Sales"].map((role) => (
                      <li key={role}>
                        <button
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, designation: role })
                          }
                        >
                          {role}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                {errors.designation && (
                  <span className="text-red-500 block">
                    {errors.designation}
                  </span>
                )}
              </div>

              <div>
                <label className="font-semibold">Select Gender</label>
                <div className="flex flex-row gap-3">
                  {["Male", "Female"].map((gender) => (
                    <div key={gender}>
                      <label>{gender}</label>
                      <input
                        type="radio"
                        name="gender"
                        value={gender}
                        checked={formData.gender === gender}
                        onChange={handleChange}
                        className="radio"
                      />
                    </div>
                  ))}
                </div>
                {errors.gender && (
                  <span className="text-red-500">{errors.gender}</span>
                )}
              </div>
            </div>

            <div>
              <label className="font-semibold">Select Course</label>
              <div>
                {["MCA", "BCA", "BSC"].map((course) => (
                  <label key={course} className="flex items-center gap-2 my-2">
                    {course}
                    <input
                      type="checkbox"
                      name="course"
                      value={course}
                      checked={formData.course === course}
                      onChange={handleChange}
                      className="checkbox checkbox-success"
                    />
                  </label>
                ))}
              </div>
              {errors.course && (
                <span className="text-red-500">{errors.course}</span>
              )}
            </div>

            <div className="text-center">
              <button className="btn btn-accent btn-block" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateEmployee;
