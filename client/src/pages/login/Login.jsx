import React from "react";
import "./login.css";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [authenticate, setAuthenticate] = useState(false);

  const responseGoogle = (response) => {
    const userInformation = {
      email: response.profileObj.email,
      googleId: response.profileObj.googleId,
      imageUrl: response.profileObj.imageUrl,
      name: response.profileObj.name,
    };

    if (response.profileObj.googleId) {
      axios
        .post("http://localhost:8000/authusers", userInformation)
        .then((data) => {
          setAuthenticate(true);
          localStorage.setItem("userToken", response.tokenId);
          localStorage.setItem("userData", JSON.stringify(response));
          navigate("feeds");
          console.log(data);
        })
        .catch((err) => console.log(err));
    } else {
      setAuthenticate(false);
      return;
    }
  };

  return (
    <>
      <div className="main">
        <div className="login_page">
          <div className="container">
            <img className="logo" src="/assets/ttnlogo.jpg" alt="logo" />
            <div className="content">
              <h3 className="main_heading">
                Enter your details and Start your journey with us
              </h3>
              <p className="main_para">Dont't stop until you're proud.</p>
            </div>
            <div className="auth_container">
              {/* <span className="auth_button">Sign in with Google</span> */}
              <GoogleLogin
                clientId="181370592160-7e2ekrj6dr7v2v2tuc5unbdhs0capuh8.apps.googleusercontent.com"
                buttonText="Sign in with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
