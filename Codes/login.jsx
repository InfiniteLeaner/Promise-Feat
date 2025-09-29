import React, { useState } from "react";
import "./login.css";

const LoginRegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="container">
      <audio autoPlay loop>
        <source
          src="/Promise Feats/background music Pf/Aurora - Runaway _ 8D Audio 🎧 __ Dawn of Music __(480P).mp4"
          type="audio/mp4"
        />
        Your browser does not support the audio element.
      </audio>

      <div className="curved-shape"></div>

      {isLogin ? (
        <div className="form-box login">
          <h2>Login</h2>
          <form action="#">
            <div className="input-box">
              <input type="text" id="login-username" required />
              <label>Username</label>
              <i className='bx bxs-user'></i>
            </div>

            <div className="input-box">
              <input type={showPassword ? "text" : "password"} id="login-password" required />
              <label>Password</label>
              <i className='bx bxs-lock'></i>
            </div>

            <div className="checkbox-row">
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="show-password-login"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                <label htmlFor="show-password-login">Show Password</label>
              </div>
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="remember-me-login"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="remember-me-login">Remember Me</label>
              </div>
            </div>

            <div className="input-box">
              <button className="btn" type="submit">Login</button>
            </div>

            <div className="regi-link">
              <p>
                Don't have an account? <button type="button" className="sign-up-link" onClick={toggleForm}>Sign up</button>
              </p>
            </div>
          </form>
        </div>
      ) : (
        <div className="form-box register">
          <h2>Register</h2>
          <form action="#">
            <div className="input-box">
              <input type="text" required />
              <label>Username</label>
              <i className='bx bxs-user'></i>
            </div>
            <div className="input-box">
              <input type="text" required />
              <label>Email</label>
              <i><img src="/Promise Feats/Icons/bx-envelope.png" alt="email" /></i>
            </div>
            <div className="input-box">
              <input type={showPassword ? "text" : "password"} required />
              <label>Password</label>
              <i className='bx bxs-lock'></i>
            </div>

            <div className="checkbox-row">
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="show-password-register"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                <label htmlFor="show-password-register">Show Password</label>
              </div>
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="remember-me-register"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="remember-me-register">Remember Me</label>
              </div>
            </div>

            <div className="input-box">
              <button className="btn" type="submit">Register</button>
            </div>

            <div className="regi-link">
              <p>
                Already have an account? <button type="button" className="sign-in-link" onClick={toggleForm}>Sign in</button>
              </p>
            </div>
          </form>
        </div>
      )}

      <div className="info-content">
        <h2>Welcome Back!</h2>
        <p>Please enter your details. Tips: it is not</p>
      </div>
    </div>
  );
};

export default LoginRegisterPage;
