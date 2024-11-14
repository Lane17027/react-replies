import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import Logo from "../assets/React-Replies-logo.webp";
import { getOneUserRoute } from "../utils/APIRoutes";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
  });

  useEffect(() => {
    if (localStorage.getItem("react-replies-user")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email } = values;
      try {
        const { data } = await axios.post(getOneUserRoute, { email });

        // Check the response status and show appropriate toast
        if (data.status === false) {
          toast.error(
            data.msg || "No account associated with this email.",
            toastOptions
          );
        } else {
          console.log(data); // Handle the successful case (e.g., navigate to reset password page)
          toast.success(
            "Account found! Please proceed to reset your password.",
            toastOptions
          );
        }
      } catch (error) {
        // Log the error for debugging
        console.error("Error fetching user data:", error);

        // Check if error.response exists (to capture API errors like invalid email)
        if (error.response) {
          const errorMessage =
            error.response.data?.msg ||
            "Something went wrong. Please try again later.";
          toast.error(errorMessage, toastOptions);
        } else {
          // If there’s no response (e.g., network issues), show a generic message
          toast.error(
            "Network error. Please check your connection and try again.",
            toastOptions
          );
        }
      }
    }
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleValidation = () => {
    const { email } = values;
    if (email === "") {
      toast.error("Email is required", toastOptions);
      return false;
    } else return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>React Replies</h1>
          </div>

          <span
            style={{
              maxWidth: "11vw",
              textAlign: "center",
              display: "block",
              margin: "0 auto",
            }}
          >
            Please enter the email associated to your account
          </span>

          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />

          <button type="submit">Continue</button>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    border-radius: 4rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: #00000076 1rem solid #997af0;
        outline: none;
      }
    }
    button {
      background-color: #997af0;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;
