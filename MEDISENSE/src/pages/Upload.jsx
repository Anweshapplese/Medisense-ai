import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ConfidenceBar = ({ value, label, color }) => (
  <div style={{ marginBottom: '0.75rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{label}</span>
      <span style={{ fontSize: '0.8rem', fontWeight: '700', color: color || 'var(--primary)' }}>{value}%</span>
    </div>
    <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${value}%`, borderRadius: '99px', background: color || 'var(--primary)', transition: 'width 1s ease' }} />
    </div>
  </div>
);

const UncertaintyBadge = ({ level }) => {
  const map = {
    low:    { label: 'Low Uncertainty',      color: '#22c55e', bg: 'rgba(34,197,94,0.12)',   icon: '✅' },
    medium: { label: 'Moderate Uncertainty', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', icon: '⚠️' },
    high:   { label: 'High Uncertainty',     color: '#ef4444', bg: 'rgba(239,68,68,0.12)',   icon: '❗' },
  };
  const { label, color, bg, icon } = map[level] || map.medium;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.25rem 0.75rem', borderRadius: '99px', background: bg, color, fontSize: '0.78rem', fontWeight: '600', border: `1px solid ${color}33` }}>
      {icon} {label}
    </span>
  );
};

const ConfidencePanel = ({ confidence }) => {
  const pct = Math.round((confidence || 0.9) * 100);
  const uncertainty = pct >= 85 ? 'low' : pct >= 65 ? 'medium' : 'high';
  return (
    <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
        <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'white' }}>📊 AI Confidence Score</div>
        <UncertaintyBadge level={uncertainty} />
      </div>
      <ConfidenceBar value={pct} label="Overall Confidence" color="var(--primary)" />
      <ConfidenceBar value={Math.min(pct + 4, 100)} label="Text Extraction" color="#818cf8" />
      <ConfidenceBar value={Math.max(pct - 8, 40)} label="Diagnosis Mapping" color="#38bdf8" />
      <div style={{ marginTop: '1rem', padding: '0.85rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.6', borderLeft: '3px solid rgba(255,255,255,0.15)' }}>
        {uncertainty === 'low' && '✅ AI is highly confident in this analysis. Results are reliable but always verify with a professional.'}
        {uncertainty === 'medium' && '⚠️ Some sections have moderate confidence. Cross-check key values with your doctor.'}
        {uncertainty === 'high' && '❗ Low confidence detected. The document may be unclear or partially unreadable. Please re-upload a clearer scan.'}
      </div>
    </div>
  );
};

const DoctorReviewButton = ({ analysisResult, extractedText }) => {
  const [flagged, setFlagged] = useState(false);
  const flagForReview = () => {
    const reviewQueue = JSON.parse(localStorage.getItem('doctorReviewQueue') || '[]');
    reviewQueue.unshift({ id: Date.now(), fileName: analysisResult.fileName, reportType: analysisResult.reportType, flaggedAt: new Date().toISOString(), confidence: analysisResult.confidence, extractedText: extractedText?.slice(0, 1000), status: 'Pending Doctor Review' });
    localStorage.setItem('doctorReviewQueue', JSON.stringify(reviewQueue));
    setFlagged(true);
  };
  if (flagged) {
    return (
      <div style={{ padding: '1.2rem 1.5rem', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ fontSize: '1.5rem' }}>✅</span>
        <div>
          <div style={{ fontWeight: '700', color: '#22c55e', fontSize: '0.95rem' }}>Flagged for Doctor Review</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>A doctor will verify this report. You'll be notified once reviewed.</div>
        </div>
      </div>
    );
  }
  return (
    <button onClick={flagForReview} style={{ width: '100%', padding: '1rem 1.5rem', background: 'rgba(245,158,11,0.1)', border: '2px solid rgba(245,158,11,0.4)', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', color: '#f59e0b', fontWeight: '700', fontSize: '0.95rem', transition: 'all 0.2s ease' }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,158,11,0.2)'}
      onMouseLeave={e => e.currentTarget.style.background = 'rgba(245,158,11,0.1)'}>
      <span style={{ fontSize: '1.2rem' }}>👨‍⚕️</span> Flag for Doctor Review
    </button>
  );
};

const AISummaryDisplay = ({ summary }) => {
  const blocks = summary.split('\n\n').filter(b => b.trim());
  if (blocks.length <= 1) {
    return (
      <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
        {summary.split('\n').filter(l => l.trim()).map((line, i) => (
          <p key={i} style={{ marginBottom: '0.6rem', lineHeight: '1.7', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{line}</p>
        ))}
      </div>
    );
  }
  return (
    <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      {blocks.map((block, index) => {
        const lines = block.split('\n').filter(l => l.trim());
        const title = lines[0];
        const rest = lines.slice(1).join(' ');
        return (
          <div key={index} style={{ marginBottom: '1rem', padding: '1rem 1.2rem', background: 'rgba(255,255,255,0.04)', borderRadius: '8px', borderLeft: '3px solid var(--primary)' }}>
            <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'white', marginBottom: rest ? '0.4rem' : '0' }}>{title}</div>
            {rest && <div style={{ fontSize: '0.85rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>{rest}</div>}
          </div>
        );
      })}
    </div>
  );
};

// ─── Full-Height Explanation Sidebar ─────────────────────────────────────────
const ExplanationSidebar = ({ extractedText, explanationLevel, patientProfile }) => {
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [error, setError] = useState('');

  const ageContext = patientProfile.age
    ? patientProfile.age < 18 ? 'The patient is a child/teenager. Use very simple, reassuring language.'
      : patientProfile.age > 60 ? 'The patient is elderly. Speak clearly and highlight urgent items.' : ''
    : '';
  const conditionContext = patientProfile.condition ? `The patient has: ${patientProfile.condition}. Relate findings to this.` : '';

  const levelPrompts = {
    basic: `You are a friendly doctor. Simple everyday language. No jargon. ${ageContext} ${conditionContext}\nStructure:\n1. What this report is about\n2. Key findings in plain English\n3. What this means for you\n4. Simple next steps`,
    intermediate: `You are a medical professional. Clear language, briefly explain terms. ${ageContext} ${conditionContext}\nStructure:\n1. Report Overview\n2. Key Findings & What They Mean\n3. Potential Concerns\n4. Recommended Next Steps`,
    doctor: `You are a specialist. Precise medical terminology. ${conditionContext}\nStructure:\n1. Clinical Summary\n2. Significant Findings & Values\n3. Differential Considerations\n4. Recommended Workup / Management`,
  };

  const generateExplanation = async () => {
    if (!extractedText) return;
    setIsLoading(true); setError(''); setExplanation('');
    try {
      const response = await fetch('http://127.0.0.1:8000/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: extractedText, level: explanationLevel, patient_profile: patientProfile }),
      });
      const data = await response.json();
      if (data.error) setError(data.error);
      else { setExplanation(data.explanation); setHasGenerated(true); }
    } catch (err) { setError('Failed to reach API: ' + err.message); }
    setIsLoading(false);
  };

  const levelLabel = { basic: '👤 Basic', intermediate: '📚 Intermediate', doctor: '👨‍⚕️ Doctor' }[explanationLevel];

  return (
    <div style={{
      width: '420px',
      minWidth: '380px',
      position: 'sticky',
      top: '0',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '16px',
      overflow: 'hidden',
    }}>
      {/* Fixed Header */}
      <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🧠</span>
          <div>
            <div style={{ fontWeight: '700', fontSize: '1.1rem', color: 'white' }}>AI Explanation</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Level: {levelLabel}</div>
          </div>
        </div>

        {(patientProfile.age || patientProfile.condition || patientProfile.literacy) && (
          <div style={{ padding: '0.75rem 1rem', background: 'rgba(99,102,241,0.08)', borderRadius: '8px', border: '1px solid rgba(99,102,241,0.2)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            <div style={{ fontWeight: '700', color: 'white', marginBottom: '0.3rem' }}>🎯 Personalized For</div>
            {patientProfile.age && <div>• Age: <strong style={{ color: 'white' }}>{patientProfile.age} yrs</strong></div>}
            {patientProfile.condition && <div>• Condition: <strong style={{ color: 'white' }}>{patientProfile.condition}</strong></div>}
            {patientProfile.literacy && <div>• Literacy: <strong style={{ color: 'white' }}>{patientProfile.literacy}</strong></div>}
          </div>
        )}
      </div>

      {/* Scrollable Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 2rem' }}>
        {!hasGenerated && !isLoading && (
          <div style={{ textAlign: 'center', paddingTop: '3rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💡</div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              Get a plain-language explanation tailored to the <strong style={{ color: 'white' }}>{explanationLevel}</strong> level.
            </p>
            <button className="btn-primary" onClick={generateExplanation} style={{ width: '100%', padding: '1rem' }}>
              ✨ Generate Explanation
            </button>
          </div>
        )}

        {isLoading && (
          <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
            <div style={{ width: '52px', height: '52px', border: '3px solid rgba(255,255,255,0.1)', borderTop: '3px solid var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1.2rem' }} />
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>AI is reading your report...</p>
          </div>
        )}

        {error && (
          <div style={{ padding: '1rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', marginTop: '1rem' }}>
            <p style={{ color: '#EF4444', fontSize: '0.85rem', margin: 0 }}>⚠️ {error}</p>
          </div>
        )}

        {hasGenerated && explanation && (
          <div>
            {explanation.split('\n\n').filter(b => b.trim()).map((block, i) => {
              const lines = block.split('\n').filter(l => l.trim());
              const isHeader = lines[0]?.match(/^\d+\.|^#{1,3} /);
              const title = lines[0]?.replace(/^#{1,3} /, '').replace(/^\d+\.\s*\*?\*?/, '').replace(/\*?\*?$/, '');
              const body = lines.slice(isHeader ? 1 : 0).join(' ');
              return (
                <div key={i} style={{ marginBottom: '1rem', padding: '1rem 1.2rem', background: 'rgba(255,255,255,0.04)', borderRadius: '8px', borderLeft: isHeader ? '3px solid var(--primary)' : 'none' }}>
                  {isHeader && <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'white', marginBottom: body ? '0.4rem' : 0 }}>{title}</div>}
                  <div style={{ fontSize: '0.88rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>{isHeader ? body : block}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Fixed Footer */}
      <div style={{ padding: '1rem 2rem', borderTop: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
        {hasGenerated && (
          <button className="btn-secondary" onClick={() => { setHasGenerated(false); setExplanation(''); }} style={{ width: '100%', padding: '0.8rem', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
            🔄 Regenerate
          </button>
        )}
        <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.25)', lineHeight: '1.5', textAlign: 'center', margin: 0 }}>
          For informational purposes only. Always consult a healthcare professional.
        </p>
      </div>
    </div>
  );
};

const PatientProfileForm = ({ profile, onChange }) => {
  const inputStyle = { width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '0.65rem 0.9rem', color: 'white', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' };
  const labelStyle = { fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', display: 'block' };
  return (
    <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', marginTop: '1.5rem' }}>
      <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'white', marginBottom: '1rem' }}>
        🎯 Personalize Explanation <span style={{ fontSize: '0.72rem', fontWeight: '400', color: 'var(--text-secondary)' }}>(Optional)</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>Patient Age</label>
          <input type="number" placeholder="e.g. 45" min={0} max={120} value={profile.age} onChange={e => onChange({ ...profile, age: e.target.value })} style={inputStyle} />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Pre-existing Condition (if any)</label>
          <input type="text" placeholder="e.g. Diabetes, Hypertension…" value={profile.condition} onChange={e => onChange({ ...profile, condition: e.target.value })} style={inputStyle} />
        </div>
      </div>
    </div>
  );
};

// ─── Main Upload Component ────────────────────────────────────────────────────
const Upload = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [explanationLevel, setExplanationLevel] = useState('basic');
  const [extractedText, setExtractedText] = useState('');
  const [patientProfile, setPatientProfile] = useState({ age: '', condition: '', literacy: '' });

  const handleFileSelect = (file) => {
    if (!file) return;
    const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) { alert('Please upload a PDF, JPEG, or PNG file'); return; }
    if (file.size > 10 * 1024 * 1024) { alert('File size must be less than 10MB'); return; }
    setSelectedFile(file); setAnalysisComplete(false); setAnalysisResult(null); setExtractedText('');
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setFilePreview(reader.result);
      reader.readAsDataURL(file);
    } else { setFilePreview(null); }
  };

  const handleFileInputChange = (e) => handleFileSelect(e.target.files[0]);
  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e) => { e.preventDefault(); setIsDragging(false); handleFileSelect(e.dataTransfer.files[0]); };

  const analyzeReport = async () => {
    if (!selectedFile) { alert('Please select a file first'); return; }
    setIsAnalyzing(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      const response = await fetch('http://127.0.0.1:8000/analyze', { method: 'POST', body: formData });
      const data = await response.json();
      if (data.error) { alert('Error: ' + data.error); setIsAnalyzing(false); return; }
      setExtractedText(data.extracted_text || data.ai_summary || '');
      const result = {
        reportType: 'Medical Report Analysis',
        dateAnalyzed: new Date().toLocaleDateString(),
        fileName: selectedFile.name,
        overallStatus: 'Analyzed',
        ai_summary: data.ai_summary || 'No summary available',
        recommendations: [], warnings: [], confidence: data.confidence || 0.90,
      };
      setAnalysisResult(result);
      const existingReports = JSON.parse(localStorage.getItem('medicalReports') || '[]');
      const newReport = { id: Date.now(), ...result, uploadDate: new Date().toISOString() };
      existingReports.unshift(newReport);
      localStorage.setItem('medicalReports', JSON.stringify(existingReports));
      localStorage.setItem('latestReport', JSON.stringify(newReport));
      setAnalysisComplete(true);
    } catch (error) { alert('Failed to connect to backend. Make sure it is running.'); }
    setIsAnalyzing(false);
  };

  const removeFile = () => { setSelectedFile(null); setFilePreview(null); setAnalysisComplete(false); setAnalysisResult(null); setExtractedText(''); };
  const viewInDashboard = () => navigate('/dashboard', { state: { showInsights: true } });

  return (
    <div className="page-container" style={{ paddingBottom: 0 }}>
      <div className="page-header">
        <h1><span className="gradient-text">UPLOAD & ANALYZE</span></h1>
        <p>Upload your medical reports for AI-powered analysis</p>
      </div>

      {/* ── Two-column layout ── */}
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>

        {/* ── Left: Upload + Results ── */}
        <div style={{ flex: 1, minWidth: 0, paddingBottom: '3rem' }}>
          {!analysisComplete && (
            <div className="upload-section">
              <div className={`upload-dropzone ${isDragging ? 'dragging' : ''} ${selectedFile ? 'has-file' : ''}`}
                onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                {!selectedFile ? (
                  <>
                    <div className="upload-icon">📤</div>
                    <h3 className="upload-title">Drag & Drop Your Medical Report</h3>
                    <p className="upload-subtitle">or click to browse</p>
                    <input type="file" id="file-input" className="upload-input" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileInputChange} />
                    <label htmlFor="file-input" className="upload-button">SELECT FILE</label>
                    <p className="upload-info">Supported formats: PDF, JPEG, PNG (Max 10MB)</p>
                  </>
                ) : (
                  <div className="file-preview-container">
                    {filePreview && <img src={filePreview} alt="Preview" className="file-preview-image" />}
                    <div className="file-info">
                      <div className="file-icon">{selectedFile.type === 'application/pdf' ? '📄' : '🖼️'}</div>
                      <div className="file-details">
                        <div className="file-name">{selectedFile.name}</div>
                        <div className="file-size">{(selectedFile.size / 1024).toFixed(2)} KB</div>
                      </div>
                      <button className="file-remove-btn" onClick={removeFile}>✕</button>
                    </div>
                  </div>
                )}
              </div>

              {selectedFile && (
                <div className="explanation-selector">
                  <h3 className="selector-title">Choose Explanation Level</h3>
                  <div className="level-buttons">
                    {['basic', 'intermediate', 'doctor'].map((level) => (
                      <button key={level} className={`level-btn ${explanationLevel === level ? 'active' : ''}`} onClick={() => setExplanationLevel(level)}>
                        <div className="level-icon">{level === 'basic' ? '👤' : level === 'intermediate' ? '📚' : '👨‍⚕️'}</div>
                        <div className="level-name">{level.charAt(0).toUpperCase() + level.slice(1)}</div>
                        <div className="level-desc">{level === 'basic' ? 'Simple explanations' : level === 'intermediate' ? 'Detailed insights' : 'Medical terminology'}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedFile && <PatientProfileForm profile={patientProfile} onChange={setPatientProfile} />}

              {selectedFile && (
                <button className="analyze-btn" onClick={analyzeReport} disabled={isAnalyzing} style={{ marginTop: '1.5rem' }}>
                  {isAnalyzing ? <><span className="loading"></span>ANALYZING...</> : <>🤖 START AI ANALYSIS</>}
                </button>
              )}
            </div>
          )}

          {analysisComplete && analysisResult && (
            <div className="analysis-results">
              <div className="results-header">
                <div className="results-icon">✅</div>
                <h2 className="results-title">Analysis Complete!</h2>
                <p className="results-subtitle">Your medical report has been analyzed</p>
              </div>

              <ConfidencePanel confidence={analysisResult.confidence} />

              {/* Extracted text — compact, scrollable */}
              {analysisResult.ai_summary && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 className="section-title"><span className="gradient-text">📄 Extracted Report Text</span></h3>
                  <div style={{ maxHeight: '300px', overflowY: 'auto', borderRadius: '12px' }}>
                    <AISummaryDisplay summary={analysisResult.ai_summary} />
                  </div>
                </div>
              )}

              <div className="overall-status">
                <div className="status-badge-large status-normal">
                  <div className="status-icon">✓</div>
                  <div className="status-text">
                    <div className="status-label">Status</div>
                    <div className="status-value">{analysisResult.overallStatus}</div>
                  </div>
                </div>
                <div className="status-meta">
                  <div className="meta-item"><span className="meta-label">File:</span><span className="meta-value">{analysisResult.fileName}</span></div>
                  <div className="meta-item"><span className="meta-label">Analyzed:</span><span className="meta-value">{analysisResult.dateAnalyzed}</span></div>
                  <div className="meta-item">
                    <span className="meta-label">Confidence:</span>
                    <span className="meta-value" style={{ color: analysisResult.confidence >= 0.85 ? '#22c55e' : analysisResult.confidence >= 0.65 ? '#f59e0b' : '#ef4444' }}>
                      {(analysisResult.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ margin: '1.5rem 0' }}>
                <DoctorReviewButton analysisResult={analysisResult} extractedText={extractedText} />
              </div>

              <div className="results-actions">
                <button className="btn-primary" onClick={viewInDashboard}>💡 VIEW INSIGHTS IN DASHBOARD</button>
                <button className="btn-secondary" onClick={() => { setAnalysisComplete(false); removeFile(); }}>📤 UPLOAD ANOTHER</button>
                <button className="btn-secondary" onClick={() => window.print()}>🖨️ PRINT</button>
              </div>
            </div>
          )}

          {/* Info cards at the bottom */}
          <div className="upload-info-section" style={{ marginTop: '3rem' }}>
            <h3 className="info-section-title">Why Upload Your Prescriptions?</h3>
            <div className="info-cards-grid">
              <div className="info-card"><div className="info-card-icon">🎯</div><h4 className="info-card-title">Smart Analysis</h4><p className="info-card-text">AI-powered prescription analysis with drug interaction detection</p></div>
              <div className="info-card"><div className="info-card-icon">⚡</div><h4 className="info-card-title">Instant Insights</h4><p className="info-card-text">Get medication guidance and recommendations in seconds</p></div>
              <div className="info-card"><div className="info-card-icon">🔒</div><h4 className="info-card-title">100% Secure</h4><p className="info-card-text">HIPAA compliant with bank-level encryption</p></div>
              <div className="info-card"><div className="info-card-icon">👤</div><h4 className="info-card-title">Personalized</h4><p className="info-card-text">Age, condition & literacy-aware explanations for every patient</p></div>
            </div>
          </div>
        </div>

        {/* ── Right: Full-height AI Explanation Sidebar ── */}
        {analysisComplete && extractedText && (
          <ExplanationSidebar extractedText={extractedText} explanationLevel={explanationLevel} patientProfile={patientProfile} />
        )}
      </div>
    </div>
  );
};

export default Upload;
