import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import loader from "../assets/loading-screen.gif";
// return (
//     <img src={loader} alt="My GIF" />
//   )
import { setAvatarRoute } from "../utils/APIRoutes";

export default function SetAvatar() {
  const api = "https:api//api.multiavatar.com/45678945";
  const navigate = useNavigate();
  const [avatars, setAvatars]=useState([])
  const [isLoading, setIsLoading]=useState([true])
  const [selectedAvatar, setSelectedAvatar]= useState(undefined)
  return (
    <>
      <Container>
        <div className="title-container">
            <h1>Pick an avatar as your profile picture</h1>
        </div>
        <div className="avatars">
            {

            }
        </div>


      </Container>
      <ToastContainer />
    </>
  );
}

const Container = styled.div``;
