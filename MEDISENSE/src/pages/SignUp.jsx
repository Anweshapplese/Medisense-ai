import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate account creation
    setTimeout(() => {
      navigate('/dashboard');
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-box">
          <div className="auth-content">
            <div className="auth-header">
              <div className="auth-icon">🚀</div>
              <h1>
                <span className="gradient-text">JOIN MEDISENSE</span>
              </h1>
              <p>Start your health journey</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="email@ex.com"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Create password"
                  required
                  minLength="8"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Confirm</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Re-enter password"
                  required
                  minLength="8"
                />
              </div>

              <div className="checkbox-group">
                <label className="custom-checkbox">
                  <input type="checkbox" required />
                  <span className="checkmark"></span>
                </label>
                <label className="checkbox-label">
                  Agree to <a href="#">Terms</a> & <a href="#">Privacy</a>
                </label>
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading"></span> CREATING ACCOUNT...
                  </>
                ) : (
                  'CREATE ACCOUNT'
                )}
              </button>

              <div className="auth-footer">
                <p>
                  Have an account?{' '}
                  <a onClick={() => navigate('/signin')}>Sign In</a>
                </p>
              </div>

              <div className="social-login">
                <div className="social-login-label">OR SIGN UP WITH</div>
                <div className="social-buttons">
                  <button type="button" className="social-btn">
                    <span>G</span> Google
                  </button>
                  <button type="button" className="social-btn">
                    <span>M</span> Microsoft
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

export default SignUp;