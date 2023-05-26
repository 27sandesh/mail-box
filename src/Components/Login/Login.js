import React from "react";
import { useRef, useState } from "react";
import "./Login.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { mailAction } from "../Store";
const Login = () => {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const enterdEmail = useRef();
  const history = useHistory();
  const enterdPassowrd = useRef();
  function swithAuthmodehandler() {
    setIsLoggedIn((prevstate) => !prevstate);
  }
  function submitHandler(event) {
    event.preventDefault();
    const emailInput = enterdEmail.current.value;
    const passwordInput = enterdPassowrd.current.value;
    dispatch(mailAction.setemail(emailInput));

    let url;
    if (isLoggedIn) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCcExJUpqq8URUORrJzakh7uOaRAiz1yMU";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCcExJUpqq8URUORrJzakh7uOaRAiz1yMU";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          console.log(data);
          console.log("Redirecting to Home page");
          history.replace("/Home");
          console.log("Redirected to Home page");
        });
      } else {
        res.json().then((data) => alert(data.error.message));
      }
    });
  }
  return (
    <div className="outer-box">
      <section>"Welcome to Mail-Box"</section>
      <div className="inner-box">
        <form onSubmit={submitHandler}>
          <div className="sign-upbody">
            <h2>{isLoggedIn ? "Sign-up" : "Login"}</h2>
            <p>
              <label htmlFor="email">Email</label>
            </p>
            <input type="email" ref={enterdEmail}></input>
            <p>
              <label htmlFor="password">password</label>
            </p>
            <input type="password" required ref={enterdPassowrd}></input>
            {!isLoggedIn && (
              <div>
                <p>
                  <label htmlFor="password">Confirm password</label>
                </p>
                <input type="password"></input>
              </div>
            )}
            <button className="submit" onClick={swithAuthmodehandler}>
              {isLoggedIn ? "login" : "create-Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
