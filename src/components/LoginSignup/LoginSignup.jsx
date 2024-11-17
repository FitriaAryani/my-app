import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate untuk navigasi
import "./LoginSignup.css";

import email_icon from "/assets/images/email.png";
import password_icon from "/assets/images/password.png";
import person_icon from "/assets/images/person.png";

const LoginSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate(); // Inisialisasi useNavigate

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please fill out both fields.");
      return; // Stop further execution if fields are empty
    }

    // Logika autentikasi (misalnya, validasi email dan password)
    // Jika login berhasil, navigasi ke halaman produk atau halaman lain
    // Simulate login success
    navigate("/products"); // Mengarahkan ke halaman produk setelah login
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>Login</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        <div className='input'>
          <img className='img' src={email_icon} alt='email' />
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={error ? "input-error" : ""}
          />
        </div>
        <div className='input'>
          <img className='img' src={password_icon} alt='password' />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={error ? "input-error" : ""}
          />
        </div>
      </div>
      {error && <div className='error-message'>{error}</div>} {/* Error message display */}
      <div className='forgot-password'>
        Lost password? <span>Click Here!</span>
      </div>
      <div className='submit-container'>
        <div className='submit' onClick={handleLogin}>
          Login
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
