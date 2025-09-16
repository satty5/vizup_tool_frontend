import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/diagnose.css'

export default function Diagnose() {
  const [step, setStep] = useState(1)
  const [url, setUrl] = useState('')
  const [pillars, setPillars] = useState([true,true,true,true,true,true,true,true])
  const [scanIndex, setScanIndex] = useState(0)
  const scanLabels = [
    'Testing presence across 4 AI platforms...',
    'Analyzing source coverage...',
    'Checking structured data implementation...',
    'Evaluating content optimization...',
    'Measuring authority signals...',
    'Testing conversational readiness...',
    'Comparing against competitors...',
    'Generating comprehensive report...'
  ]

  useEffect(() => {
    if (step === 3) {
      setScanIndex(0)
      const id = setInterval(() => {
        setScanIndex(prev => {
          if (prev + 1 >= scanLabels.length) {
            clearInterval(id)
            setTimeout(() => setStep(4), 500)
            return prev + 1
          }
          return prev + 1
        })
      }, 1200)
      return () => clearInterval(id)
    }
  }, [step])

  const startAudit = () => {
    if (!url.trim()) return
    setStep(2)
  }

  const runAudit = () => setStep(3)
  const showAuditDashboard = () => setStep(5)

  const togglePillar = (idx) => {
    setPillars(prev => prev.map((v, i) => i === idx ? !v : v))
  }

  return (
    <div className="diag-root">
      <div className="diag-container">
        {/* Step 1 */}
        <div className={`diag-step ${step === 1 ? 'active' : ''}`} id="diag-step1">
          <div className="diag-url-section">
            <h1>AI Visibility Audit</h1>
            <p>Complete diagnosis of your brand's presence across AI answer engines</p>
            <div className="diag-url-input-wrapper">
              <input type="url" className="diag-url-input" placeholder="Enter your website URL to diagnose" value={url} onChange={(e)=>setUrl(e.target.value)} />
            </div>
            <button className="diag-analyze-btn" disabled={!url.trim()} onClick={startAudit}>Start Comprehensive Audit</button>
          </div>
        </div>

        {/* Step 2 */}
        <div className={`diag-step ${step === 2 ? 'active' : ''}`} id="diag-step2">
          <div className="diag-audit-scope">
            <h2>Select Audit Pillars</h2>
            <p style={{ color:'#666', marginBottom:'2rem' }}>Choose areas to audit (all selected for comprehensive analysis)</p>
            <div className="diag-audit-pillars">
              {[ 
                {t:'Presence Across Answer Engines', d:'ChatGPT, Gemini, Perplexity, Claude mentions • Top 5 rankings • Answer accuracy'},
                {t:'Source Coverage', d:'Wikipedia, Crunchbase, G2 • News coverage • Reviews • Q&A platforms'},
                {t:'Structured Data & Technical', d:'Schema markup • JSON-LD • OpenGraph • Sitemaps • NAP consistency'},
                {t:'Content Optimization', d:'FAQ pages • Blog structure • Featured snippets • Multi-modal content'},
                {t:'Brand Authority Signals', d:'E-A-T signals • Wikipedia presence • Backlinks • Directory mentions'},
                {t:'Conversational Experience', d:'Chatbot • Voice content • "People Also Ask" • Social bios'},
                {t:'Comparative Visibility', d:'Brand vs competitors • Citation frequency • Sentiment analysis'},
                {t:'User Intent & Metrics', d:'Query mapping • Share of Answer • Accuracy scores • Future readiness'}
              ].map((p, idx) => (
                <div key={idx} className={`diag-pillar-card ${pillars[idx] ? 'selected' : ''}`} onClick={()=>togglePillar(idx)}>
                  <div className="diag-pillar-number">{idx+1}</div>
                  <div className="diag-pillar-title">{p.t}</div>
                  <div className="diag-pillar-items">{p.d}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign:'center', marginTop:'3rem' }}>
              <button className="diag-analyze-btn" onClick={runAudit}>Run Full Audit</button>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className={`diag-step ${step === 3 ? 'active' : ''}`} id="diag-step3">
          <div className="diag-scanning-section">
            <div className="diag-scan-animation">
              <div className="diag-scan-ring"></div>
              <div className="diag-scan-ring" style={{ animationDelay: '.5s' }}></div>
              <div className="diag-scan-ring" style={{ animationDelay: '1s' }}></div>
              <div className="diag-scan-core">V</div>
            </div>
            <h2>Running Comprehensive AI Visibility Audit</h2>
            <div className="diag-scan-progress-list">
              {scanLabels.map((label, idx) => (
                <div key={idx} className={`diag-scan-item ${idx === scanIndex ? 'active' : ''} ${idx < scanIndex ? 'complete' : ''}`}>
                  <div className="diag-scan-dot"></div>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className={`diag-step ${step === 4 ? 'active' : ''}`} id="diag-step4">
          <div className="diag-score-overview">
            <div className="diag-main-score">
              <div className="diag-score-ring">
                <svg className="diag-score-circle" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="90" fill="none" stroke="#333" strokeWidth="8"/>
                  <circle cx="100" cy="100" r="90" fill="none" stroke="#fff" strokeWidth="8" strokeDasharray="424" strokeDashoffset="169" strokeLinecap="round"/>
                </svg>
                <div className="diag-score-value">68%</div>
              </div>
              <div className="diag-score-subtitle">AI Visibility Health Score</div>
              <p style={{ color:'#999', maxWidth:600, margin:'0 auto' }}>Your brand has good AI visibility with room for improvement. 47 gaps identified across 8 audit pillars.</p>
              <div className="diag-pillar-scores">
                {[
                  ['Answer Engine Presence','72%'],
                  ['Source Coverage','65%'],
                  ['Structured Data','58%'],
                  ['Content Quality','71%'],
                  ['Authority','69%']
                ].map(([lbl,val]) => (
                  <div key={lbl} className="diag-pillar-score-item"><div className="diag-pillar-score-value">{val}</div><div className="diag-pillar-score-label">{lbl}</div></div>
                ))}
              </div>
            </div>
            <div style={{ textAlign:'center' }}>
              <button className="diag-analyze-btn" onClick={showAuditDashboard}>View Detailed Audit Report</button>
            </div>
          </div>
        </div>

        {/* Step 5 */}
        <div className={`diag-step ${step === 5 ? 'active' : ''}`} id="diag-step5">
          <div className="diag-audit-dashboard">
            <div className="diag-dashboard-header">
              <div className="diag-dashboard-title"><h1>AI Visibility Audit Report</h1><p>Complete diagnosis with 47 actionable improvements</p></div>
              <div className="diag-action-buttons"><button className="diag-btn-secondary" onClick={()=>alert('Exporting PDF...')}>Export PDF</button><button className="diag-btn-primary" onClick={()=>alert('Creating Action Plan...')}>Create Action Plan</button></div>
            </div>

            <div className="diag-summary-cards">
              <div className="diag-summary-card"><div className="diag-summary-value">68%</div><div className="diag-summary-label">Overall Health</div></div>
              <div className="diag-summary-card"><div className="diag-summary-value diag-status-critical">12</div><div className="diag-summary-label">Critical Issues</div></div>
              <div className="diag-summary-card"><div className="diag-summary-value diag-status-warning">23</div><div className="diag-summary-label">Warnings</div></div>
              <div className="diag-summary-card"><div className="diag-summary-value diag-status-good">31</div><div className="diag-summary-label">Passed Checks</div></div>
            </div>

            <div className="diag-audit-pillars-list">
              <div className="diag-pillar-section expanded">
                <div className="diag-pillar-header" onClick={(e)=>e.currentTarget.parentElement.classList.toggle('expanded')}>
                  <div className="diag-pillar-header-left"><div className="diag-pillar-icon">1</div><div className="diag-pillar-info"><h3>Presence Across Answer Engines</h3><div className="diag-pillar-score-mini">Score: 72% • 5/7 checks passed</div></div></div>
                  <div className="diag-pillar-expand">▼</div>
                </div>
                <div className="diag-pillar-content">
                  <div className="diag-criteria-list">
                    {[
                      ['status-pass','✓','Brand mentioned in ChatGPT answers','Found in 78% of relevant queries tested'],
                      ['status-partial','!','Brand mentioned in Gemini answers','Found in only 45% of relevant queries','Action: Improve Google Business Profile and structured data'],
                      ['status-pass','✓','Brand mentioned in Perplexity answers','Strong presence with 82% coverage'],
                      ['status-pass','✓','Brand mentioned in Claude answers','Good coverage at 71%'],
                      ['status-fail','✗','Appears in Top 5 brands in category queries','Currently ranking 7th in category mentions','Action: Increase authority signals and category-specific content'],
                      ['status-pass','✓','Answers factually correct (no hallucinations)','94% accuracy rate across platforms']
                    ].map((c, idx) => (
                      <div key={idx} className="diag-criteria-item">
                        <div className={`diag-criteria-status ${c[0]}`}>{c[1]}</div>
                        <div className="diag-criteria-details">
                          <div className="diag-criteria-title">{c[2]}</div>
                          <div className="diag-criteria-description">{c[3]}</div>
                          {c[4] && <div className="diag-criteria-action">{c[4]}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="diag-pillar-section">
                <div className="diag-pillar-header" onClick={(e)=>e.currentTarget.parentElement.classList.toggle('expanded')}>
                  <div className="diag-pillar-header-left"><div className="diag-pillar-icon">2</div><div className="diag-pillar-info"><h3>Source Coverage (Indirect Inputs)</h3><div className="diag-pillar-score-mini">Score: 65% • 4/6 checks passed</div></div></div>
                  <div className="diag-pillar-expand">▼</div>
                </div>
                <div className="diag-pillar-content">
                  <div className="diag-criteria-list">
                    {[
                      ['status-fail','✗','Wikipedia/Wikidata entry exists & well-sourced','No Wikipedia page found','Action: Create Wikipedia page with proper citations'],
                      ['status-pass','✓','Brand present on Crunchbase/LinkedIn/G2','Active profiles on all major platforms'],
                      ['status-pass','✓','Industry news coverage','12 authoritative mentions in last 6 months'],
                      ['status-partial','!','Quora/Reddit/Q&A mentions','Limited presence - only 3 organic mentions found','Action: Develop Q&A platform strategy'],
                      ['status-pass','✓','Customer reviews on Google, Amazon, TrustPilot','Strong review presence with 4.2+ average rating']
                    ].map((c, idx) => (
                      <div key={idx} className="diag-criteria-item">
                        <div className={`diag-criteria-status ${c[0]}`}>{c[1]}</div>
                        <div className="diag-criteria-details">
                          <div className="diag-criteria-title">{c[2]}</div>
                          <div className="diag-criteria-description">{c[3]}</div>
                          {c[4] && <div className="diag-criteria-action">{c[4]}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="diag-pillar-section">
                <div className="diag-pillar-header" onClick={(e)=>e.currentTarget.parentElement.classList.toggle('expanded')}>
                  <div className="diag-pillar-header-left"><div className="diag-pillar-icon">3</div><div className="diag-pillar-info"><h3>Structured Data & Technical AEO</h3><div className="diag-pillar-score-mini">Score: 58% • 3/6 checks passed</div></div></div>
                  <div className="diag-pillar-expand">▼</div>
                </div>
                <div className="diag-pillar-content">
                  <div className="diag-criteria-list">
                    {[
                      ['status-fail','✗','Schema markup implemented','Missing Organization, Product, FAQ schemas','Action: Implement comprehensive schema markup'],
                      ['status-pass','✓','JSON-LD structured data validated','Existing data validates correctly'],
                      ['status-partial','!','OpenGraph & Twitter Card metadata','Basic implementation, missing on 40% of pages','Action: Add complete social metadata to all pages'],
                      ['status-pass','✓','Updated sitemaps (XML, schema)','Sitemaps current and properly submitted'],
                      ['status-fail','✗','NAP consistency across web','Inconsistent business information found on 8 directories','Action: Standardize NAP across all platforms'],
                      ['status-pass','✓','Crawlability (robots.txt, canonical tags)','Properly configured for AI crawlers']
                    ].map((c, idx) => (
                      <div key={idx} className="diag-criteria-item">
                        <div className={`diag-criteria-status ${c[0]}`}>{c[1]}</div>
                        <div className="diag-criteria-details">
                          <div className="diag-criteria-title">{c[2]}</div>
                          <div className="diag-criteria-description">{c[3]}</div>
                          {c[4] && <div className="diag-criteria-action">{c[4]}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="diag-gap-panel">
              <div className="diag-gap-header"><h2>Priority Gap Analysis</h2><span style={{ color:'#666' }}>Top issues impacting AI visibility</span></div>
              <div className="diag-gap-grid">
                {[
                  ['High Priority','Missing Wikipedia Presence','No Wikipedia page significantly reduces authority signals for AI systems','-25% visibility potential','priority-high'],
                  ['High Priority','Incomplete Schema Markup','Missing critical structured data types that AI systems rely on','-20% answer accuracy','priority-high'],
                  ['High Priority','Low Category Rankings','Not appearing in top 5 brands for category queries','-30% consideration rate','priority-high'],
                  ['Medium Priority','Weak Q&A Platform Presence','Minimal organic mentions on Quora, Reddit, and forums','-15% discovery potential','priority-medium'],
                  ['Medium Priority','NAP Inconsistencies','Business information varies across directories','-10% local visibility','priority-medium'],
                  ['Low Priority','Social Metadata Gaps','Missing OpenGraph tags on some pages','-5% social signals','priority-low']
                ].map((g, idx) => (
                  <div key={idx} className="diag-gap-card">
                    <span className={`diag-gap-priority ${g[4]}`}>{g[0]}</span>
                    <h3 className="diag-gap-title">{g[1]}</h3>
                    <p className="diag-gap-description">{g[2]}</p>
                    <p className="diag-gap-impact">Impact: {g[3]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


