import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="dot"></span>
              <span>AI-POWERED MEDICAL INTELLIGENCE</span>
            </div>
            <h1>
              DECODE YOUR
              <br />
              <span className="gradient-text">MEDICAL REPORTS</span>
              <br />
              WITH AI
            </h1>
            <p>
              Revolutionary artificial intelligence transforms complex medical
              reports into clear, personalized insights. Upload, analyze, and
              understand your health like never before.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => navigate('/signup')}>
                GET STARTED
              </button>
              <button className="btn-secondary" onClick={() => navigate('/dashboard')}>
                VIEW DEMO
              </button>
            </div>
          </div>

          <div className="hero-3d">
            <div className="report-3d">
              <div className="report-card">
                <div className="report-icon">🩸</div>
                <div className="report-title">HEMOGLOBIN</div>
                <div className="report-data">14.2 g/dL</div>
                <div className="report-label">Blood Count</div>
                <div className="status-badge">✓ NORMAL</div>
              </div>
              <div className="report-card">
                <div className="report-icon">🫀</div>
                <div className="report-title">CHOLESTEROL</div>
                <div className="report-data">180 mg/dL</div>
                <div className="report-label">Lipid Profile</div>
                <div className="status-badge">✓ OPTIMAL</div>
              </div>
              <div className="report-card">
                <div className="report-icon">🧬</div>
                <div className="report-title">GLUCOSE</div>
                <div className="report-data">95 mg/dL</div>
                <div className="report-label">Blood Sugar</div>
                <div className="status-badge">✓ HEALTHY</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">10K+</div>
            <div className="stat-label">Reports Analyzed</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">98%</div>
            <div className="stat-label">Accuracy Rate</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">5K+</div>
            <div className="stat-label">Active Users</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">AI Support</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <div className="section-title">
          <h2>
            <span className="gradient-text">FEATURES</span>
          </h2>
          <p>Next-generation medical intelligence at your fingertips</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <div className="feature-title">AI Analysis</div>
            <div className="feature-description">
              Advanced machine learning algorithms analyze your reports with
              medical-grade precision
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <div className="feature-title">3-Level Explanations</div>
            <div className="feature-description">
              Choose between Basic, Intermediate, or Doctor-level explanations
              tailored to your needs
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <div className="feature-title">Secure & Private</div>
            <div className="feature-description">
              HIPAA-compliant encryption ensures your medical data remains
              completely confidential
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <div className="feature-title">AI Chat Assistant</div>
            <div className="feature-description">
              Ask questions about your reports and get instant, intelligent
              answers
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <div className="feature-title">Trend Analysis</div>
            <div className="feature-description">
              Track your health over time with visual timelines and predictive
              insights
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔊</div>
            <div className="feature-title">Voice Explainer</div>
            <div className="feature-description">
              Listen to audio explanations of your reports for better
              understanding
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="dashboard-section">
        <div className="dashboard-container">
          <div className="section-title">
            <h2>
              <span className="gradient-text">INTELLIGENT</span> DASHBOARD
            </h2>
            <p>Monitor your health in real-time with AI-powered insights</p>
          </div>

          <div className="dashboard-preview">
            <div className="dashboard-screen">
              <div className="dashboard-header">
                <div className="dashboard-title">HEALTH OVERVIEW</div>
                <div
                  className="status-badge"
                  style={{ borderColor: '#10B981' }}
                >
                  ● ACTIVE
                </div>
              </div>

              <div className="dashboard-cards">
                <div className="dash-card">
                  <div className="dash-value">12</div>
                  <div className="dash-label">Total Reports</div>
                </div>
                <div className="dash-card">
                  <div className="dash-value">95%</div>
                  <div className="dash-label">Health Score</div>
                </div>
                <div className="dash-card">
                  <div className="dash-value">3</div>
                  <div className="dash-label">Insights Today</div>
                </div>
              </div>

              <div className="dashboard-activity-chart">
                <div className="activity-title">RECENT ACTIVITY</div>
                <div className="chart-bars">
                  <div className="chart-bar" style={{ height: '60%' }}></div>
                  <div className="chart-bar" style={{ height: '80%' }}></div>
                  <div className="chart-bar" style={{ height: '50%' }}></div>
                  <div className="chart-bar" style={{ height: '90%' }}></div>
                  <div className="chart-bar" style={{ height: '70%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>
            <span className="gradient-text">READY TO GET STARTED?</span>
          </h2>
          <p>
            Join thousands of users already understanding their health better
            with AI
          </p>
          <button
            className="btn-primary"
            onClick={() => navigate('/signup')}
            style={{ fontSize: '1.3rem', padding: '1.5rem 4rem' }}
          >
            START FREE TRIAL
          </button>
        </div>
      </section>
    </>
  );
};

export default Home;