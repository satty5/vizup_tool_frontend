import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/layout/Header'
import '../../styles/optimize.css'

export default function Optimize() {
  const [step, setStep] = useState(1)
  const [url, setUrl] = useState('')
  const [options, setOptions] = useState({ schema: true, faq: true, content: true, authority: true })
  const [scanIndex, setScanIndex] = useState(0)
  const [activities, setActivities] = useState([
    { title: 'Product schema implemented successfully', meta: '2 minutes ago • +3% visibility score' },
    { title: 'AI crawlers detected structured data improvements', meta: '15 minutes ago • ChatGPT, Claude' },
    { title: 'FAQ page created with 24 questions', meta: '1 hour ago • +5% visibility score' },
    { title: 'Google AI Overview started showing FAQ content', meta: '2 hours ago • 3 queries impacted' },
    { title: 'Heading structure optimized across 15 pages', meta: '3 hours ago • +2% visibility score' }
  ])

  const scanSteps = ['Scanning website structure...', 'Analyzing schema markup...', 'Evaluating content formats...', 'Checking authority signals...', 'Generating recommendations...']

  const [tasks, setTasks] = useState([
    {
      group: 'Schema Markup', impact: 'high',
      items: [
        { title: 'Add Organization schema', desc: 'Include company details, logo, and social profiles', completed: false },
        { title: 'Implement Article schema', desc: 'Add structured data to all blog posts and news articles', completed: false },
        { title: 'Add Product schema', desc: 'Structure product pages with pricing and reviews', completed: true },
        { title: 'Create HowTo schema', desc: 'Mark up tutorial and guide content', completed: false }
      ]
    },
    {
      group: 'FAQ Structure', impact: 'high',
      items: [
        { title: 'Create FAQ page', desc: 'Centralized FAQ with 20+ common questions', completed: true },
        { title: 'Add FAQ schema markup', desc: 'Structure FAQs with proper Question/Answer schema', completed: false },
        { title: 'Expand product FAQs', desc: 'Add 5-10 questions per product page', completed: false },
        { title: 'Create comparison tables', desc: 'Add structured comparisons vs competitors', completed: false }
      ]
    },
    {
      group: 'Content Format', impact: 'medium',
      items: [
        { title: 'Add executive summaries', desc: 'Include TL;DR sections at the top of long content', completed: false },
        { title: 'Use definition boxes', desc: 'Highlight key terms and concepts clearly', completed: false },
        { title: 'Improve heading structure', desc: 'Use proper H1-H4 hierarchy throughout', completed: true },
        { title: 'Add numbered lists', desc: 'Convert processes into step-by-step lists', completed: false }
      ]
    },
    {
      group: 'Authority Signals', impact: 'medium',
      items: [
        { title: 'Add author bios', desc: 'Include expertise credentials for all authors', completed: false },
        { title: 'Link to authoritative sources', desc: 'Cite industry reports and research papers', completed: false },
        { title: 'Display certifications', desc: 'Show trust badges and industry certifications', completed: false },
        { title: 'Update publication dates', desc: 'Show last updated dates on all content', completed: false }
      ]
    }
  ])

  const totalTasks = useMemo(() => tasks.reduce((sum, g) => sum + g.items.length, 0), [tasks])
  const completedTasks = useMemo(() => tasks.reduce((sum, g) => sum + g.items.filter(i => i.completed).length, 0), [tasks])
  const impact = useMemo(() => `+${Math.round((completedTasks / Math.max(1, totalTasks)) * 45)}%`, [completedTasks, totalTasks])

  const liveTimerRef = useRef(null)
  useEffect(() => {
    if (step === 5) {
      if (liveTimerRef.current) clearInterval(liveTimerRef.current)
      const pool = [
        { title: 'Schema validation completed', meta: 'Just now • All schemas valid' },
        { title: 'New AI citation detected', meta: '1 minute ago • Gemini Pro' },
        { title: 'Content structure improved', meta: '3 minutes ago • +1% score' },
        { title: 'Authority signal added', meta: '5 minutes ago • Expert bio' },
        { title: 'Visibility trending upward', meta: '8 minutes ago • +12% this week' }
      ]
      let idx = 0
      liveTimerRef.current = setInterval(() => {
        setActivities(prev => {
          const next = [{ ...pool[idx % pool.length] }, ...prev]
          idx++
          return next.slice(0, 8)
        })
      }, 15000)
      return () => { if (liveTimerRef.current) clearInterval(liveTimerRef.current) }
    }
  }, [step])

  useEffect(() => {
    if (step === 3) {
      setScanIndex(0)
      const id = setInterval(() => {
        setScanIndex(prev => {
          if (prev + 1 >= scanSteps.length) {
            clearInterval(id)
            setTimeout(() => setStep(4), 500)
            return prev + 1
          }
          return prev + 1
        })
      }, 1500)
      return () => clearInterval(id)
    }
  }, [step])

  const startAnalysis = () => {
    if (!url.trim()) return
    setStep(2)
  }

  const runOptimization = () => {
    setStep(3)
  }

  const showDashboard = () => {
    setStep(5)
  }

  const toggleOption = (key) => {
    setOptions(o => ({ ...o, [key]: !o[key] }))
  }

  const toggleTask = (groupIdx, itemIdx) => {
    setTasks(prev => prev.map((g, gi) => gi !== groupIdx ? g : {
      ...g,
      items: g.items.map((it, ii) => ii !== itemIdx ? it : { ...it, completed: !it.completed })
    }))
  }

  return (
    <div className="opt-root">
      <Header />
      <div className="opt-container">
        {/* Step 1 */}
        <div className={`opt-step ${step === 1 ? 'active' : ''}`} id="opt-step1">
          <div className="opt-url-section">
            <h1>Optimize for AI Visibility</h1>
            <p>Transform your content into AI-friendly formats that get cited more often</p>
            <div className="opt-url-input-wrapper">
              <input type="url" className="opt-url-input" placeholder="Enter your website URL to analyze" value={url} onChange={(e)=>setUrl(e.target.value)} />
            </div>
            <button className="opt-analyze-btn" disabled={!url.trim()} onClick={startAnalysis}>Start Optimization Analysis</button>
          </div>
        </div>

        {/* Step 2 */}
        <div className={`opt-step ${step === 2 ? 'active' : ''}`} id="opt-step2">
          <div className="opt-options-section">
            <h2>Select Optimization Areas</h2>
            <p className="opt-section-subtitle">Choose what to optimize (all selected by default)</p>
            <div className="opt-options-grid">
              <div className={`opt-option-card ${options.schema ? 'selected':''}`} onClick={()=>toggleOption('schema')}>
                <h3>Schema Markup</h3>
                <p>Analyze and optimize structured data for AI comprehension. Includes JSON-LD, microdata, and rich snippets.</p>
              </div>
              <div className={`opt-option-card ${options.faq ? 'selected':''}`} onClick={()=>toggleOption('faq')}>
                <h3>FAQ Structure</h3>
                <p>Optimize FAQ sections and knowledge bases for direct answer extraction by AI systems.</p>
              </div>
              <div className={`opt-option-card ${options.content ? 'selected':''}`} onClick={()=>toggleOption('content')}>
                <h3>Content Format</h3>
                <p>Structure content in answer-worthy formats with clear headers, summaries, and definitions.</p>
              </div>
              <div className={`opt-option-card ${options.authority ? 'selected':''}`} onClick={()=>toggleOption('authority')}>
                <h3>Authority Signals</h3>
                <p>Enhance E-E-A-T signals, citations, and link building for higher AI trust scores.</p>
              </div>
            </div>
            <div style={{ textAlign:'center', marginTop:'3rem' }}>
              <button className="opt-analyze-btn" onClick={runOptimization}>Run Optimization Analysis</button>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className={`opt-step ${step === 3 ? 'active' : ''}`} id="opt-step3">
          <div className="opt-scanning-section">
            <div className="opt-scan-animation">
              <div className="opt-scan-ring"></div>
              <div className="opt-scan-ring"></div>
              <div className="opt-scan-ring"></div>
              <div className="opt-scan-core">V</div>
            </div>
            <div className="opt-scan-status">
              <h2>Analyzing Your AI Optimization Potential</h2>
              <div className="opt-scan-progress">
                {scanSteps.map((label, idx) => (
                  <div key={idx} className={`opt-progress-item ${idx === scanIndex ? 'active' : ''} ${idx < scanIndex ? 'complete' : ''}`}>
                    <div className="opt-progress-dot"></div>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className={`opt-step ${step === 4 ? 'active' : ''}`} id="opt-step4">
          <div className="opt-results-overview">
            <div className="opt-score-card">
              <div className="opt-score-display">62%</div>
              <div className="opt-score-label">AI Optimization Score</div>
              <p className="opt-score-description">Your content has moderate AI visibility. Follow our recommendations to improve citation rates by up to 45%.</p>
              <div className="opt-score-breakdown">
                <div className="opt-breakdown-item"><div className="opt-breakdown-score">45%</div><div className="opt-breakdown-label">Schema Coverage</div></div>
                <div className="opt-breakdown-item"><div className="opt-breakdown-score">68%</div><div className="opt-breakdown-label">Content Structure</div></div>
                <div className="opt-breakdown-item"><div className="opt-breakdown-score">71%</div><div className="opt-breakdown-label">FAQ Optimization</div></div>
                <div className="opt-breakdown-item"><div className="opt-breakdown-score">64%</div><div className="opt-breakdown-label">Authority Signals</div></div>
              </div>
            </div>
            <div style={{ textAlign:'center' }}>
              <button className="opt-analyze-btn" onClick={showDashboard}>View Optimization Plan</button>
            </div>
          </div>
        </div>

        {/* Step 5 */}
        <div className={`opt-step ${step === 5 ? 'active' : ''}`} id="opt-step5">
          <div className="opt-optimization-dashboard">
            <div className="opt-dashboard-header">
              <div className="opt-dashboard-title">
                <h1>AI Optimization Roadmap</h1>
                <p>24 actionable improvements to boost your AI visibility</p>
              </div>
              <div className="opt-export-actions">
                <button className="opt-btn-secondary" onClick={()=>alert('Exporting report...')}>Export Report</button>
                <button className="opt-btn-primary" onClick={()=>alert('Starting implementation...')}>Start Implementation</button>
              </div>
            </div>

            <div className="opt-progress-overview">
              <div className="opt-progress-header">
                <h2>Implementation Progress</h2>
                <span className="opt-live-indicator"><span className="opt-live-dot"></span>Auto-updating</span>
              </div>
              <div className="opt-progress-stats">
                <div className="opt-stat-item"><div className="opt-stat-value">{totalTasks}</div><div className="opt-stat-label">Total Tasks</div></div>
                <div className="opt-stat-item"><div className="opt-stat-value">{completedTasks}</div><div className="opt-stat-label">Completed</div></div>
                <div className="opt-stat-item"><div className="opt-stat-value">{impact}</div><div className="opt-stat-label">Est. Impact</div></div>
                <div className="opt-stat-item"><div className="opt-stat-value">2-3d</div><div className="opt-stat-label">Time to Complete</div></div>
              </div>
            </div>

            <div className="opt-recommendations-grid">
              {tasks.map((group, gi) => (
                <div key={group.group} className="opt-recommendation-card">
                  <div className="opt-rec-header">
                    <div className="opt-rec-title"><h3>{group.group}</h3></div>
                    <span className={`opt-impact-badge ${group.impact === 'high' ? 'opt-impact-high' : 'opt-impact-medium'}`}>{group.impact === 'high' ? 'HIGH' : 'MEDIUM'}</span>
                  </div>
                  <div className="opt-rec-tasks">
                    {group.items.map((it, ii) => (
                      <div key={`${gi}-${ii}`} className={`opt-task-item ${it.completed ? 'completed' : ''}`} onClick={()=>toggleTask(gi, ii)}>
                        <div className="opt-task-checkbox"></div>
                        <div className="opt-task-content">
                          <div className="opt-task-title">{it.title}</div>
                          <div className="opt-task-description">{it.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="opt-activity-feed">
              <div className="opt-feed-header">
                <h3>Recent Optimization Updates</h3>
                <span className="opt-live-indicator"><span className="opt-live-dot"></span>Live</span>
              </div>
              <div className="opt-activity-list">
                {activities.map((a, idx) => (
                  <div key={idx} className="opt-activity-item">
                    <div className="opt-activity-content">
                      <div className="opt-activity-title">{a.title}</div>
                      <div className="opt-activity-meta">{a.meta}</div>
                    </div>
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


