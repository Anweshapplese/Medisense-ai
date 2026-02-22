import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AISummaryDisplay = ({ summary }) => {
  const blocks = summary.split('\n\n').filter(b => b.trim());
  if (blocks.length <= 1) {
    const lines = summary.split('\n').filter(l => l.trim());
    return (
      <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
        {lines.map((line, i) => (
          <p key={i} style={{ marginBottom: '0.8rem', lineHeight: '1.7', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{line}</p>
        ))}
      </div>
    );
  }
  return (
    <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      {blocks.map((block, index) => {
        const lines = block.split('\n').filter(l => l.trim());
        const title = lines[0];
        const rest = lines.slice(1).join(' ');
        return (
          <div key={index} style={{ marginBottom: '1.5rem', padding: '1.2rem 1.5rem', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', borderLeft: '4px solid var(--primary)' }}>
            <div style={{ fontWeight: '700', fontSize: '1rem', color: 'white', marginBottom: rest ? '0.5rem' : '0' }}>{title}</div>
            {rest && <div style={{ fontSize: '0.9rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>{rest}</div>}
          </div>
        );
      })}
    </div>
  );
};

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showInsights, setShowInsights] = useState(false);
  const [latestReport, setLatestReport] = useState(null);
  const [allReports, setAllReports] = useState([]);

  useEffect(() => {
    if (location.state?.showInsights) setShowInsights(true);
    const storedReports = JSON.parse(localStorage.getItem('medicalReports') || '[]');
    const latest = JSON.parse(localStorage.getItem('latestReport') || 'null');
    setAllReports(storedReports);
    setLatestReport(latest);
  }, [location.state]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const calculateHealthScore = () => {
    if (!latestReport) return 85;
    const baseScore = latestReport.confidence * 100;
    const warningPenalty = (latestReport.warnings?.length || 0) * 2;
    return Math.max(70, Math.min(100, Math.round(baseScore - warningPenalty)));
  };

  if (!showInsights) {
    return (
      <div className="page-container">
        <div className="page-header">
          <h1><span className="gradient-text">DASHBOARD</span></h1>
          <p>Your personalized health command center</p>
        </div>

        <div className="dashboard-cards" style={{ marginBottom: '3rem' }}>
          <div className="dash-card" style={{ padding: '3rem' }}>
            <div className="dash-value">{allReports.length}</div>
            <div className="dash-label">Total Reports</div>
            <div className="status-badge" style={{ marginTop: '1rem', borderColor: '#10B981' }}>✓ ALL PROCESSED</div>
          </div>
          <div className="dash-card" style={{ padding: '3rem' }}>
            <div className="dash-value">{calculateHealthScore()}%</div>
            <div className="dash-label">Health Score</div>
            <div className="status-badge" style={{ marginTop: '1rem', borderColor: '#10B981' }}>
              ✓ {calculateHealthScore() >= 90 ? 'EXCELLENT' : calculateHealthScore() >= 80 ? 'GOOD' : 'FAIR'}
            </div>
          </div>
          <div className="dash-card" style={{ padding: '3rem' }}>
            <div className="dash-value">{latestReport ? latestReport.recommendations?.length || 0 : 0}</div>
            <div className="dash-label">New Insights</div>
            <div className="status-badge" style={{ marginTop: '1rem', borderColor: 'var(--primary)' }}>
              {latestReport ? '● PENDING REVIEW' : '○ NO DATA'}
            </div>
          </div>
        </div>

        <div className="dashboard-grid-2-1">
          <div className="dashboard-recent-reports">
            <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1.8rem', marginBottom: '2rem' }}>RECENT REPORTS</h3>
            <div className="reports-list">
              {allReports.length > 0 ? (
                allReports.slice(0, 5).map((report, index) => (
                  <div key={report.id || index} className="report-item">
                    <div>
                      <div className="report-info-title">{report.reportType}</div>
                      <div className="report-info-date">{formatDate(report.uploadDate)}</div>
                    </div>
                    <button className={index === 0 ? "btn-primary" : "btn-secondary"} style={{ padding: '0.8rem 2rem' }}
                      onClick={() => { setLatestReport(report); setShowInsights(true); }}>
                      VIEW
                    </button>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                  <p>No reports uploaded yet</p>
                  <button className="btn-primary" style={{ marginTop: '1rem' }} onClick={() => navigate('/upload')}>Upload Your First Report</button>
                </div>
              )}
            </div>
          </div>

          <div className="dashboard-quick-actions">
            <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1.8rem', marginBottom: '2rem' }}>QUICK ACTIONS</h3>
            <div className="actions-list">
              <button className="btn-primary action-btn-full" onClick={() => navigate('/upload')}>📤 UPLOAD NEW</button>
              <button className="btn-secondary action-btn-full" onClick={() => setShowInsights(true)} disabled={!latestReport}>💡 VIEW INSIGHTS</button>
              <button className="btn-secondary action-btn-full" onClick={() => navigate('/chat')}>💬 AI CHAT</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!latestReport) {
    return (
      <div className="page-container">
        <div className="page-header">
          <h1><span className="gradient-text">INSIGHTS</span></h1>
          <p>No report data available</p>
        </div>
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Upload a medical report to see insights</p>
          <button className="btn-primary" onClick={() => navigate('/upload')}>📤 Upload Report</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div>
            <h1><span className="gradient-text">HEALTH INSIGHTS</span></h1>
            <p>AI-powered analysis and personalized recommendations</p>
          </div>
          <button className="btn-secondary" onClick={() => setShowInsights(false)} style={{ padding: '1rem 2rem' }}>← Back to Dashboard</button>
        </div>
      </div>

      <div className="overall-status" style={{ marginBottom: '2rem' }}>
        <div className="status-badge-large status-normal">
          <div className="status-icon">📋</div>
          <div className="status-text">
            <div className="status-label">{latestReport.reportType}</div>
            <div className="status-value" style={{ fontSize: '1.2rem' }}>{latestReport.fileName || 'Medical Report'}</div>
          </div>
        </div>
        <div className="status-meta">
          <div className="meta-item"><span className="meta-label">Analyzed:</span><span className="meta-value">{latestReport.dateAnalyzed}</span></div>
          <div className="meta-item"><span className="meta-label">Confidence:</span><span className="meta-value">{(latestReport.confidence * 100).toFixed(0)}%</span></div>
          <div className="meta-item"><span className="meta-label">Status:</span><span className="meta-value">{latestReport.overallStatus}</span></div>
        </div>
      </div>

      {latestReport.ai_summary && (
        <div className="recommendations-section" style={{ marginBottom: '3rem' }}>
          <h3 className="section-title"><span className="gradient-text">🤖 AI Analysis Summary</span></h3>
          <AISummaryDisplay summary={latestReport.ai_summary} />
        </div>
      )}

      <div className="dashboard-cards" style={{ marginBottom: '3rem' }}>
        <div className="dash-card" style={{ padding: '2rem' }}>
          <div className="dash-value" style={{ fontSize: '2.5rem' }}>{latestReport.medications?.length || latestReport.keyFindings?.length || 0}</div>
          <div className="dash-label">{latestReport.medications ? 'Medications' : 'Key Findings'}</div>
          <div className="status-badge" style={{ marginTop: '1rem', borderColor: '#10B981' }}>✓ ANALYZED</div>
        </div>
        <div className="dash-card" style={{ padding: '2rem' }}>
          <div className="dash-value" style={{ fontSize: '2.5rem' }}>{latestReport.recommendations?.length || 0}</div>
          <div className="dash-label">Recommendations</div>
          <div className="status-badge" style={{ marginTop: '1rem', borderColor: 'var(--primary)' }}>● ACTION ITEMS</div>
        </div>
        <div className="dash-card" style={{ padding: '2rem' }}>
          <div className="dash-value" style={{ fontSize: '2.5rem' }}>{latestReport.warnings?.length || 0}</div>
          <div className="dash-label">Warnings</div>
          <div className="status-badge" style={{ marginTop: '1rem', borderColor: latestReport.warnings?.length > 0 ? '#EF4444' : '#10B981' }}>
            {latestReport.warnings?.length > 0 ? '⚠ REVIEW' : '✓ NONE'}
          </div>
        </div>
      </div>

      {latestReport.warnings && latestReport.warnings.length > 0 && (
        <div className="recommendations-section" style={{ marginBottom: '3rem', background: 'rgba(239, 68, 68, 0.1)', border: '2px solid rgba(239, 68, 68, 0.3)' }}>
          <h3 className="section-title"><span style={{ color: '#EF4444' }}>⚠️ Important Warnings</span></h3>
          <div className="recommendations-list">
            {latestReport.warnings.map((warning, index) => (
              <div key={index} className="recommendation-item" style={{ background: 'rgba(239, 68, 68, 0.05)' }}>
                <span className="rec-text" style={{ color: '#EF4444', fontWeight: '500' }}>{warning}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {latestReport.recommendations && latestReport.recommendations.length > 0 && (
        <div className="recommendations-section" style={{ marginBottom: '3rem' }}>
          <h3 className="section-title"><span className="gradient-text">💡 Personalized Recommendations</span></h3>
          <div className="recommendations-list">
            {latestReport.recommendations.map((rec, index) => (
              <div key={index} className="recommendation-item"><span className="rec-text">{rec}</span></div>
            ))}
          </div>
        </div>
      )}

      {latestReport.nextSteps && latestReport.nextSteps.length > 0 && (
        <div className="recommendations-section" style={{ marginBottom: '3rem' }}>
          <h3 className="section-title"><span className="gradient-text">📅 Next Steps</span></h3>
          <div className="recommendations-list">
            {latestReport.nextSteps.map((step, index) => (
              <div key={index} className="recommendation-item">
                <span className="rec-icon">✓</span>
                <span className="rec-text">{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="results-actions">
        <button className="btn-primary" onClick={() => navigate('/upload')}>📤 Upload Another Report</button>
        <button className="btn-secondary" onClick={() => navigate('/chat')}>💬 Ask AI Questions</button>
        <button className="btn-secondary" onClick={() => window.print()}>🖨️ Print Report</button>
        <button className="btn-secondary" onClick={() => setShowInsights(false)}>📊 Back to Dashboard</button>
      </div>

      <div style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.3)', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
          <strong>Medical Disclaimer:</strong> This analysis is for informational purposes only and should not replace professional medical advice. 
          Always consult with your healthcare provider before making any changes to your treatment plan.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
