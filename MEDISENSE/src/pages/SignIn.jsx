import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [captchaCode, setCaptchaCode] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaStatus, setCaptchaStatus] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setCaptchaInput("");
    setCaptchaStatus("");
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const validateCaptcha = () => {
    if (captchaInput.toUpperCase() === captchaCode) {
      setCaptchaStatus("success");
      return true;
    } else {
      setCaptchaStatus("error");
      setTimeout(() => generateCaptcha(), 1000);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateCaptcha()) return;

    setIsSubmitting(true);

    try {
      // Set persistence based on Remember Me
      await setPersistence(
        auth,
        rememberMe ? browserLocalPersistence : browserSessionPersistence
      );

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("Logged in:", userCredential.user);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password");
      generateCaptcha();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();

      await setPersistence(
        auth,
        rememberMe ? browserLocalPersistence : browserSessionPersistence
      );

      const result = await signInWithPopup(auth, provider);

      console.log("Google user:", result.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Google login error:", error);
      setError("Google login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-box">
          <div className="auth-content">
            <div className="auth-header">
              <div className="auth-icon">🔐</div>
              <h1>
                <span className="gradient-text">WELCOME BACK</span>
              </h1>
              <p>Sign in to access your dashboard</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Security Verification</label>
                <div className="captcha-container">
                  <div className="captcha-display">
                    <span className="captcha-code">{captchaCode}</span>
                    <button
                      type="button"
                      className="captcha-refresh"
                      onClick={generateCaptcha}
                    >
                      ↻
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-input captcha-input"
                    placeholder="Enter code above"
                    maxLength="6"
                    value={captchaInput}
                    onChange={(e) =>
                      setCaptchaInput(e.target.value.toUpperCase())
                    }
                    required
                  />
                </div>

                {captchaStatus === "success" && (
                  <div className="captcha-feedback captcha-feedback--success">
                    ✓ Verified
                  </div>
                )}
                {captchaStatus === "error" && (
                  <div className="captcha-feedback captcha-feedback--error">
                    ✗ Incorrect Code — Try Again
                  </div>
                )}
              </div>

              {error && <div className="error-message">⚠ {error}</div>}

              <div className="checkbox-group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label>Remember me</label>
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "SIGNING IN..." : "SIGN IN"}
              </button>

              <div className="auth-footer">
                <p>
                  Don't have an account?{" "}
                  <a onClick={() => navigate("/signup")}>Sign Up</a>
                </p>
              </div>

              <div className="social-login">
                <div className="social-login-label">
                  OR CONTINUE WITH
                </div>
                <div className="social-buttons">
                  <button
                    type="button"
                    className="social-btn"
                    onClick={handleGoogleLogin}
                  >
                    Google
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;