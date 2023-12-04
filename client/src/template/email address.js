import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate, NavLink } from "react-router-dom";
import basestyle from "../assets/styles/Base.module.css";
import styles from './screenStyle_2.css';

const Register = () => {
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    email: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };

  const validateForm = (values) => {
    const error = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "This is not a valid email format!";
    }
    return error;
  };
  const signupHandler = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    setIsSubmit(true);
    // if (!formErrors) {
    //   setIsSubmit(true);
    // }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(user);
      axios.post("http://localhost:4000/api/user/signup", user).then((res) => {
        alert(res.data.message);
        navigate("/screen3", { replace: true });
      });
    }
  }, [formErrors]);

  return (
    <>
    <div className="body">
      <div className="content-acc">
        <h2 className="contentHeading">Enter your email address</h2>
        <form>
            <label htmlFor="">Your Email Address</label>
            <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={changeHandler}
            value={user.email}
          />
          <p className={basestyle.error}>{formErrors.email}</p>
            <p>Already a user? <a href="#">Log in</a></p>
        <footer>
            <div className="text">
                <p>By registering, you accept our <a href="#" ><b><u>Privacy Policy</u></b></a></p>
            </div>
            <div>
            <button className={basestyle.button_common} onClick={signupHandler}>
            Continue
          </button>
            </div>
        </footer>
      </form>
    </div>
    </div>
    </>
    );
};

export default Register; 