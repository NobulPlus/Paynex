import React from 'react';
import styles from './screenStyle_3-8.css';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate, NavLink } from "react-router-dom";
import basestyle from "../assets/styles/Base.module.css";


const Screen3 = () => {

  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [otp, setOtpDetails] = useState({
    code: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setOtpDetails({
      ...otp,
      [name]: value,
    });
  };
  const validateForm = (values) => {
    const error = {};
    if (!values.code) {
      error.code = "Code is required";
    }
    return error;
  };
    const verifyHandler = (e) => {
      e.preventDefault();
      setFormErrors(validateForm(otp));
      setIsSubmit(true);
      // if (!formErrors) {
      //   setIsSubmit(true);
      // }
    };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(otp);
      axios.post("http://localhost:4000/api/user/verify-account", otp).then((res) => {
        alert(res.data.message);
        navigate("/screen5", { replace: true });
      });
    }
  }, [formErrors]);



  return(
    <div className="{styles.content}">
      <h2 class="contentHeading">Verify your account</h2>
      <p>Enter the 6 digits security code sent to your mail</p>
      <form>
          <input 
            className='input' 
            type="text" 
            name="code" 
            id="code" 
            maxlength="6" 
            placeholder="Please enter your verification code"
            onChange={changeHandler}
            value={otp.code}
          />
        <p id="validation">Code expires in <b>5:00</b></p>

        <a class="reSend">Resend Code</a>
        <footer>
        <button className={basestyle.button_common} onClick={verifyHandler}>
          Continue
        </button>
        </footer>
    </form>
  </div>
  );
};

export default Screen3;