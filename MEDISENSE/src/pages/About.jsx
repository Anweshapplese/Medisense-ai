import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      {/* About Header */}
      <div className="page-header">
        <h1>
          <span className="gradient-text">ABOUT MEDISENSE.AI</span>
        </h1>
        <p>Revolutionizing healthcare through artificial intelligence</p>
      </div>

      {/* Mission Section */}
      <section className="about-section">
        <div className="about-content-wrapper">
          <div className="about-icon-large">🎯</div>
          <h2 className="about-section-title">Our Mission</h2>
          <p className="about-text">
            MediSense AI is dedicated to making medical information accessible and
            understandable for everyone. We believe that every person deserves to
            comprehend their health data without needing a medical degree.
          </p>
          <p className="about-text">
            Through cutting-edge artificial intelligence and machine learning, we
            transform complex medical reports into clear, actionable insights that
            empower patients to take control of their health journey.
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="about-section about-section-alt">
        <div className="about-content-wrapper">
          <div className="about-icon-large">🔮</div>
          <h2 className="about-section-title">Our Vision</h2>
          <p className="about-text">
            We envision a future where healthcare is democratized through
            technology—where artificial intelligence serves as a bridge between
            medical complexity and patient understanding.
          </p>
          <p className="about-text">
            By 2030, we aim to be the world's most trusted AI-powered medical
            analysis platform, helping millions understand their health better and
            make informed decisions about their wellbeing.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="about-section">
        <div className="about-content-wrapper">
          <div className="about-icon-large">⚙️</div>
          <h2 className="about-section-title">How It Works</h2>
          
          <div className="how-it-works-grid">
            <div className="how-it-works-card">
              <div className="how-step-number">1</div>
              <div className="how-step-icon">📤</div>
              <h3 className="how-step-title">Upload Report</h3>
              <p className="how-step-description">
                Securely upload your medical reports, lab results, or diagnostic
                imaging. We support PDF, JPEG, PNG, and DICOM formats.
              </p>
            </div>

            <div className="how-it-works-card">
              <div className="how-step-number">2</div>
              <div className="how-step-icon">🤖</div>
              <h3 className="how-step-title">AI Analysis</h3>
              <p className="how-step-description">
                Our advanced AI algorithms process your data, extracting key
                metrics and identifying patterns using medical-grade precision.
              </p>
            </div>

            <div className="how-it-works-card">
              <div className="how-step-number">3</div>
              <div className="how-step-icon">📊</div>
              <h3 className="how-step-title">Get Insights</h3>
              <p className="how-step-description">
                Receive easy-to-understand explanations with visualizations,
                trends, and personalized health recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="about-section about-section-alt">
        <div className="about-content-wrapper">
          <h2 className="about-section-title">
            <span className="gradient-text">Key Features</span>
          </h2>
          
          <div className="features-list">
            <div className="feature-item">
              <div className="feature-item-icon">🔒</div>
              <div className="feature-item-content">
                <h3>HIPAA Compliant Security</h3>
                <p>
                  Bank-level encryption ensures your medical data remains private
                  and secure at all times.
                </p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-item-icon">🎯</div>
              <div className="feature-item-content">
                <h3>3-Level Explanations</h3>
                <p>
                  Choose from Basic, Intermediate, or Doctor-level explanations
                  based on your medical knowledge.
                </p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-item-icon">📈</div>
              <div className="feature-item-content">
                <h3>Trend Analysis</h3>
                <p>
                  Track your health metrics over time with visual charts and
                  predictive insights.
                </p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-item-icon">💬</div>
              <div className="feature-item-content">
                <h3>AI Chat Assistant</h3>
                <p>
                  Ask questions about your reports and get instant, intelligent
                  answers 24/7.
                </p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-item-icon">🔊</div>
              <div className="feature-item-content">
                <h3>Voice Explanations</h3>
                <p>
                  Listen to audio summaries of your reports for better
                  understanding on the go.
                </p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-item-icon">🌍</div>
              <div className="feature-item-content">
                <h3>Multi-Language Support</h3>
                <p>
                  Access your health insights in over 50 languages for global
                  accessibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="about-section">
        <div className="about-content-wrapper">
          <h2 className="about-section-title">Our Technology</h2>
          
          <div className="tech-grid">
            <div className="tech-card">
              <div className="tech-icon">🧠</div>
              <h3>Advanced AI Models</h3>
              <p>
                Powered by state-of-the-art machine learning models trained on
                millions of medical records.
              </p>
            </div>

            <div className="tech-card">
              <div className="tech-icon">🔬</div>
              <h3>Medical NLP</h3>
              <p>
                Natural Language Processing specifically designed to understand
                medical terminology.
              </p>
            </div>

            <div className="tech-card">
              <div className="tech-icon">☁️</div>
              <h3>Cloud Infrastructure</h3>
              <p>
                Scalable, reliable cloud architecture ensures fast processing and
                99.9% uptime.
              </p>
            </div>

            <div className="tech-card">
              <div className="tech-icon">🔐</div>
              <h3>End-to-End Encryption</h3>
              <p>
                Military-grade encryption protects your data from upload to
                storage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="about-section about-section-alt">
        <div className="about-content-wrapper">
          <h2 className="about-section-title">By The Numbers</h2>
          
          <div className="stats-grid-about">
            <div className="stat-card-about">
              <div className="stat-number-about">10,000+</div>
              <div className="stat-label-about">Reports Analyzed</div>
            </div>
            <div className="stat-card-about">
              <div className="stat-number-about">98%</div>
              <div className="stat-label-about">Accuracy Rate</div>
            </div>
            <div className="stat-card-about">
              <div className="stat-number-about">5,000+</div>
              <div className="stat-label-about">Active Users</div>
            </div>
            <div className="stat-card-about">
              <div className="stat-number-about">50+</div>
              <div className="stat-label-about">Medical Specialties</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-section">
        <div className="about-content-wrapper">
          <h2 className="about-section-title">Our Team</h2>
          <p className="about-text" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            A diverse team of medical professionals, AI researchers, and engineers
            working together to revolutionize healthcare.
          </p>
          
          <div className="team-grid">
            <div className="team-card">
              <div className="team-avatar">👨‍⚕️</div>
              <h3 className="team-name">Medical Advisors</h3>
              <p className="team-role">Board-certified physicians ensuring accuracy</p>
            </div>

            <div className="team-card">
              <div className="team-avatar">👨‍💻</div>
              <h3 className="team-name">AI Engineers</h3>
              <p className="team-role">Building cutting-edge ML models</p>
            </div>

            <div className="team-card">
              <div className="team-avatar">👩‍🔬</div>
              <h3 className="team-name">Data Scientists</h3>
              <p className="team-role">Analyzing patterns in health data</p>
            </div>

            <div className="team-card">
              <div className="team-avatar">🎨</div>
              <h3 className="team-name">UX Designers</h3>
              <p className="team-role">Creating intuitive experiences</p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy & Security */}
      <section className="about-section about-section-alt">
        <div className="about-content-wrapper">
          <div className="about-icon-large">🛡️</div>
          <h2 className="about-section-title">Privacy & Security</h2>
          <p className="about-text">
            Your health data is precious, and we treat it that way. MediSense AI
            is fully HIPAA compliant and follows the strictest international data
            protection standards.
          </p>
          
          <div className="security-features">
            <div className="security-item">
              <span className="security-check">✓</span>
              <span>256-bit AES encryption</span>
            </div>
            <div className="security-item">
              <span className="security-check">✓</span>
              <span>HIPAA compliant infrastructure</span>
            </div>
            <div className="security-item">
              <span className="security-check">✓</span>
              <span>GDPR compliant data handling</span>
            </div>
            <div className="security-item">
              <span className="security-check">✓</span>
              <span>Regular security audits</span>
            </div>
            <div className="security-item">
              <span className="security-check">✓</span>
              <span>No data selling or sharing</span>
            </div>
            <div className="security-item">
              <span className="security-check">✓</span>
              <span>User data deletion on request</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta-section">
        <div className="about-content-wrapper">
          <h2 className="about-cta-title">
            <span className="gradient-text">Ready to Get Started?</span>
          </h2>
          <p className="about-cta-text">
            Join thousands of users who are taking control of their health with AI
          </p>
          <div className="about-cta-buttons">
            <button
              className="btn-primary"
              onClick={() => navigate('/signup')}
              style={{ fontSize: '1.2rem', padding: '1.2rem 3rem' }}
            >
              CREATE FREE ACCOUNT
            </button>
            <button
              className="btn-secondary"
              onClick={() => navigate('/upload')}
              style={{ fontSize: '1.2rem', padding: '1.2rem 3rem' }}
            >
              UPLOAD YOUR FIRST REPORT
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;