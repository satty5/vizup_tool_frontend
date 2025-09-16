import React, { useEffect } from 'react'
import '../../styles/monitor.css'

export default function Monitor() {
  useEffect(() => {
    const urlInput = document.getElementById('m-url')
    if (urlInput) urlInput.focus()
  }, [])

  const goToStep = (id) => {
    document.querySelectorAll('.m-step').forEach(s => s.classList.remove('active'))
    let usingNumber = typeof id === 'number'
    const step = usingNumber ? document.getElementById(`m-step${id}`) : document.getElementById(id)
    if (step) step.classList.add('active')
    const c = document.querySelector('.m-container')
    if (!c) return
    if (id === 5) {
      c.style.maxWidth = '1400px'; c.style.justifyContent = 'flex-start'; c.style.paddingTop = '6rem'
    } else {
      c.style.maxWidth = '1000px'; c.style.justifyContent = 'center'; c.style.paddingTop = '2rem'
    }
  }

  const analyze = () => {
    const input = document.getElementById('m-url')
    if (!input || !input.value) return
    const domain = input.value.replace(/^https?:\/\//,'').replace(/^www\./,'').split('/')[0]
    const brand = domain.split('.')[0].toUpperCase()
    const nameEl = document.getElementById('m-brand-name')
    const urlEl = document.getElementById('m-brand-url')
    if (nameEl) nameEl.textContent = brand
    if (urlEl) urlEl.textContent = domain
    goToStep(2)
  }

  const startProcessing = () => {
    goToStep(3)
    let progress = 0
    const center = document.querySelector('.m-ring .center')
    const id = setInterval(() => {
      progress += 5
      if (center) center.textContent = `${progress}%`
      if (progress >= 100) { clearInterval(id); setTimeout(() => goToStep(4), 500) }
    }, 150)
  }

  // CSV mode handlers
  const switchMode = (mode) => {
    const buttons = document.querySelectorAll('.m-tog-btn')
    buttons.forEach((b) => b.classList.remove('active'))
    const autoBtn = document.getElementById('m-auto-btn')
    const csvBtn = document.getElementById('m-csv-btn')
    const autoWrap = document.getElementById('m-auto')
    const csvWrap = document.getElementById('m-csv')
    if (!autoBtn || !csvBtn || !autoWrap || !csvWrap) return
    if (mode === 'auto') {
      autoBtn.classList.add('active')
      autoWrap.style.display = 'block'
      csvWrap.classList.remove('active')
      const input = document.getElementById('m-url')
      if (input) input.focus()
    } else {
      csvBtn.classList.add('active')
      autoWrap.style.display = 'none'
      csvWrap.classList.add('active')
    }
  }

  const processFile = (file) => {
    if (!file) return
    const nameEl = document.getElementById('m-file-name')
    const detEl = document.getElementById('m-file-det')
    if (nameEl) nameEl.textContent = file.name
    if (detEl) detEl.textContent = `128 queries • ${(file.size / 1024).toFixed(1)}KB`
    goToStep('m-csv-config')
  }

  const handleFileChange = (e) => {
    const f = e.target.files && e.target.files[0]
    if (f && f.type === 'text/csv') processFile(f)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.currentTarget.classList.remove('dragover')
    const f = e.dataTransfer.files && e.dataTransfer.files[0]
    if (f && f.type === 'text/csv') processFile(f)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.currentTarget.classList.add('dragover')
  }

  const removeFile = () => {
    const input = document.getElementById('m-csv-file')
    if (input) input.value = ''
    goToStep(1)
  }

  const downloadTemplate = () => {
    const csvContent = `Query,Category\n"What is VIZUP?",Brand Awareness\n"VIZUP pricing and plans",Purchase Intent\n"VIZUP vs competitors",Comparison\n"How to use VIZUP",Problem Solving\n"Best AI visibility tools",Industry`
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'vizup_query_template.csv'
    a.click()
  }

  const processCsv = () => {
    goToStep('m-csv-proc')
    let progress = 0
    const total = 128
    const queries = [
      'What is VIZUP and how does it work?',
      'VIZUP pricing and plans comparison',
      'Best AI visibility tools for startups',
      'VIZUP vs competitors analysis',
      'How to improve brand visibility in AI'
    ]
    const progressEl = document.getElementById('m-csv-progress')
    const barEl = document.getElementById('m-csv-bar')
    const completedEl = document.getElementById('m-csv-completed')
    const currEl = document.getElementById('m-csv-current')
    const id = setInterval(() => {
      progress += 2
      const completed = Math.floor((progress / 100) * total)
      if (progressEl) progressEl.textContent = `${progress}%`
      if (barEl) barEl.style.width = `${progress}%`
      if (completedEl) completedEl.textContent = String(completed)
      const idx = Math.floor((progress / 100) * queries.length)
      if (idx < queries.length && currEl) currEl.textContent = `Processing: "${queries[idx]}"`
      if (progress >= 100) { clearInterval(id); setTimeout(() => goToStep('m-csv-res'), 500) }
    }, 100)
  }

  const downloadResults = () => {
    const csvContent = `Query,ChatGPT_Response,Claude_Response,Gemini_Response,Google_AI_Response,Sentiment_Score,Brand_Mentioned,Recommendation\n"What is VIZUP?","VIZUP is an AI visibility platform...","VIZUP helps brands...","VIZUP is a tool for...","VIZUP enables...",0.92,Yes,Strong\n"VIZUP pricing","VIZUP offers flexible pricing...","Pricing ranges...","Tiered pricing...","Pricing starts $99...",0.85,Yes,Moderate`
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'vizup_ai_responses_enhanced.csv'
    a.click()
  }

  return (
    <div className="m-root">
      <div className="m-bg-grid"></div>
      <div className="m-glow glow1"></div>
      <div className="m-glow glow2"></div>

      <button className="m-close" onClick={() => window.history.back()}>✕</button>

      <div className="m-container">
        {/* Step 1 */}
        <div className="m-step m-url-step active" id="m-step1">
          <div className="m-logo">V</div>
          <h1 className="m-title">Start Monitoring</h1>
          <p className="m-sub">Choose how you want to begin</p>
          <div className="m-toggle"><button id="m-auto-btn" className="m-tog-btn active" onClick={() => switchMode('auto')}>Auto Generate</button><button id="m-csv-btn" className="m-tog-btn" onClick={() => switchMode('csv')}>Upload CSV</button></div>
          <div id="m-auto" className="m-url-wrap"><input id="m-url" className="m-input" type="url" placeholder="yourwebsite.com" /><button className="m-analyze" onClick={analyze}>Analyze</button></div>
          <div id="m-csv" className="m-csv"><div className="m-upload" onClick={() => document.getElementById('m-csv-file') && document.getElementById('m-csv-file').click()} onDragOver={handleDragOver} onDrop={handleDrop}><div className="m-upload-icon">📄</div><div className="m-upload-title">Upload Your Query List</div><div className="m-upload-sub">CSV file with queries to test across AI platforms</div><button className="m-upload-btn">Choose File</button><input id="m-csv-file" className="m-file" type="file" accept=".csv" onChange={handleFileChange} /></div><div className="m-template"><strong>Need a template?</strong><br />Download our <a onClick={downloadTemplate}>sample CSV format</a> with example queries</div></div>
        </div>

        {/* Step 2 */}
        <div className="m-step m-setup" id="m-step2">
          <div className="m-setup-header">
            <h1 className="m-title">Quick Setup</h1>
            <p className="m-sub">We've analyzed your site. Select what matters to you:</p>
          </div>
          <div className="m-brand">
            <div className="m-brand-logo">V</div>
            <div className="m-brand-info">
              <div className="m-brand-name" id="m-brand-name">VIZUP</div>
              <div className="m-brand-url" id="m-brand-url">vizup.com</div>
            </div>
            <button className="m-edit">Edit</button>
          </div>
          <div className="m-options">
            <div className="m-card selected" onClick={(e) => e.currentTarget.classList.toggle("selected")}><div className="option-icon">👁️</div><div className="option-content"><div className="option-title">Brand Visibility</div><div className="option-desc">Track when and how AI mentions your brand</div></div><div className="check"></div></div>
            <div className="m-card selected" onClick={(e) => e.currentTarget.classList.toggle("selected")}><div className="option-icon">⚔️</div><div className="option-content"><div className="option-title">Competitive Analysis</div><div className="option-desc">Compare your presence against competitors</div></div><div className="check"></div></div>
            <div className="m-card" onClick={(e) => e.currentTarget.classList.toggle("selected")}><div className="option-icon">💭</div><div className="option-content"><div className="option-title">Sentiment Tracking</div><div className="option-desc">Monitor how positively AI talks about you</div></div><div className="check"></div></div>
            <div className="m-card" onClick={(e) => e.currentTarget.classList.toggle("selected")}><div className="option-icon">⭐</div><div className="option-content"><div className="option-title">AI Recommendations</div><div className="option-desc">Track when AI recommends your brand</div></div><div className="check"></div></div>
          </div>
          <div className="m-footer"><button className="m-btn secondary" onClick={() => goToStep(1)}>Back</button><button className="m-btn primary" onClick={startProcessing}>Start Monitoring</button></div>
        </div>

        {/* CSV Config */}
        <div className="m-step m-csv-config" id="m-csv-config">
          <div className="m-setup-header"><h1 className="m-title">Configure Processing</h1><p className="m-sub">Review your queries and select AI platforms</p></div>
          <div className="m-file-prev"><div className="m-file-ico">📊</div><div className="m-file-info"><div className="m-file-name" id="m-file-name">queries.csv</div><div className="m-file-det" id="m-file-det">128 queries • 15KB</div></div><button className="m-file-change" onClick={removeFile}>Change File</button></div>
          <div className="m-q-prev"><div className="m-q-head"><div className="m-q-title">Query Preview</div><div className="m-q-count">First 5 of 128</div></div><div className="m-q-list"><div className="m-q-item"><span className="m-q-num">1.</span>What is VIZUP and how does it work?</div><div className="m-q-item"><span className="m-q-num">2.</span>VIZUP pricing and plans comparison</div><div className="m-q-item"><span className="m-q-num">3.</span>Best AI visibility tools for startups</div><div className="m-q-item"><span className="m-q-num">4.</span>VIZUP vs competitors analysis</div><div className="m-q-item"><span className="m-q-num">5.</span>How to improve brand visibility in AI</div></div></div>
          <h3 style={{ margin:'2rem 0 1rem', fontSize:'1.125rem' }}>Select AI Platforms</h3>
          <div className="m-options"><div className="m-card selected" onClick={(e)=>e.currentTarget.classList.toggle('selected')}><div className="option-icon">🤖</div><div className="option-content"><div className="option-title">ChatGPT</div><div className="option-desc">OpenAI's conversational AI</div></div><div className="check"></div></div><div className="m-card selected" onClick={(e)=>e.currentTarget.classList.toggle('selected')}><div className="option-icon">🧠</div><div className="option-content"><div className="option-title">Claude</div><div className="option-desc">Anthropic's AI assistant</div></div><div className="check"></div></div><div className="m-card" onClick={(e)=>e.currentTarget.classList.toggle('selected')}><div className="option-icon">💎</div><div className="option-content"><div className="option-title">Gemini</div><div className="option-desc">Google's AI model</div></div><div className="check"></div></div><div className="m-card" onClick={(e)=>e.currentTarget.classList.toggle('selected')}><div className="option-icon">🔍</div><div className="option-content"><div className="option-title">Google AI Overview</div><div className="option-desc">Search AI summaries</div></div><div className="check"></div></div></div>
          <div className="m-footer"><button className="m-btn secondary" onClick={() => goToStep(1)}>Back</button><button className="m-btn primary" onClick={processCsv}>Process Queries</button></div>
        </div>

        {/* CSV Processing */}
        <div className="m-step m-csv-proc" id="m-csv-proc">
          <div className="m-ring"><div className="outer"></div><div className="center" id="m-csv-progress">0%</div></div>
          <h2 className="m-p-title">Processing Your Queries</h2>
          <p className="m-p-sub">Getting responses from selected AI platforms</p>
          <div className="m-prog"><div className="m-prog-fill" id="m-csv-bar" style={{ width:'0%' }}></div></div>
          <div className="m-csv-stats"><div className="m-p-stat"><div className="m-p-val">128</div><div className="m-p-lbl">Total Queries</div></div><div className="m-p-stat"><div className="m-p-val">4</div><div className="m-p-lbl">Platforms</div></div><div className="m-p-stat"><div className="m-p-val" id="m-csv-completed">0</div><div className="m-p-lbl">Completed</div></div></div>
          <div className="m-live"><span className="m-dot"></span><span id="m-csv-current">Processing: &quot;What is VIZUP and how does it work?&quot;</span></div>
        </div>

        {/* CSV Results */}
        <div className="m-step m-csv-res" id="m-csv-res">
          <div className="m-ok">✓</div>
          <h1 className="m-title">Processing Complete!</h1>
          <p className="m-sub">Your enriched CSV is ready for download</p>
          <div className="m-dl"><h3 style={{ marginBottom:'.5rem' }}>Enhanced Query Results</h3><p style={{ color:'#888', marginBottom:'1.5rem' }}>128 queries × 4 platforms = 512 AI responses collected</p><button className="m-dl-btn" onClick={downloadResults}>Download Enhanced CSV</button><div className="m-sample"><strong>Sample Output:</strong><br /><br />Query, ChatGPT_Response, Claude_Response, Gemini_Response, Google_AI_Response, Sentiment_Score<br />"What is VIZUP?", "VIZUP is an AI visibility platform that...", "VIZUP helps brands...", "VIZUP is a tool for...", "VIZUP enables...", "0.92"</div></div>
          <div style={{ marginTop:'2rem' }}><button className="m-btn secondary" onClick={() => goToStep(1)}>Process Another File</button><button className="m-btn primary" onClick={() => window.history.back()} style={{ marginLeft:'1rem' }}>Go to Dashboard</button></div>
        </div>

        {/* Step 3 */}
        <div className="m-step m-processing" id="m-step3">
          <div className="m-ring"><div className="outer"></div><div className="center">75%</div></div>
          <h2 className="m-p-title">Scanning AI Platforms</h2>
          <p className="m-p-sub">This typically takes 2-3 minutes</p>
          <div className="m-p-stats">
            <div className="m-p-stat"><div className="m-p-val">48</div><div className="m-p-lbl">Queries</div></div>
            <div className="m-p-stat"><div className="m-p-val">4</div><div className="m-p-lbl">Platforms</div></div>
            <div className="m-p-stat"><div className="m-p-val">36</div><div className="m-p-lbl">Completed</div></div>
          </div>
          <div className="m-live"><span className="m-dot"></span>Currently scanning: ChatGPT - &quot;VIZUP alternatives and competitors&quot;</div>
        </div>

        {/* Step 4 */}
        <div className="m-step m-results" id="m-step4">
          <div className="m-r-header"><h1 className="m-title">Your AI Visibility Score</h1><p className="m-sub">Based on 48 queries across 4 major AI platforms</p></div>
          <div className="m-score"><svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="12"/><circle cx="100" cy="100" r="90" fill="none" stroke="#fff" strokeWidth="12" strokeDasharray="565" strokeDashoffset="169" strokeLinecap="round"/></svg><div className="val">72%</div></div>
          <div className="m-metrics"><div className="m-metric"><div className="metric-icon">📈</div><div className="metric-value">31</div><div className="metric-label">Direct Mentions</div></div><div className="m-metric"><div className="metric-icon">🏆</div><div className="metric-value">#3</div><div className="metric-label">Industry Ranking</div></div><div className="m-metric"><div className="metric-icon">✨</div><div className="metric-value">85%</div><div className="metric-label">Positive Sentiment</div></div></div>
          <div className="m-i"><div className="m-i-title">💡 Key Insights</div><ul className="m-i-list"><li className="m-i-item"><span className="m-i-dot"></span>Strong presence in ChatGPT and Claude for brand-related queries</li><li className="m-i-item"><span className="m-i-dot"></span>Limited visibility in Google AI Overview - opportunity for improvement</li><li className="m-i-item"><span className="m-i-dot"></span>Competitors mentioned 2x more often in comparison queries</li></ul></div>
          <div className="m-cta"><button className="m-btn secondary" onClick={() => alert('Downloading report...')}>Download Report</button><button className="m-btn primary" onClick={() => goToStep(5)}>View Live Dashboard</button></div>
        </div>

        {/* Step 5 */}
        <div className="m-step m-dash" id="m-step5">
          <div className="m-dh">
            <div className="m-d-title">AI Monitoring Dashboard</div>
            <div className="m-filters">
              <button className="m-f-btn active">24h</button>
              <button className="m-f-btn">7d</button>
              <button className="m-f-btn">30d</button>
              <button className="m-f-btn">All</button>
            </div>
          </div>
          <div className="m-ov">
            <div className="m-scard"><div className="m-slbl">Visibility Score</div><div className="m-sval">72%</div><div className="m-sch">↑ 5%</div></div>
            <div className="m-scard"><div className="m-slbl">Mentions Today</div><div className="m-sval">147</div><div className="m-sch">↑ 12</div></div>
            <div className="m-scard"><div className="m-slbl">Sentiment</div><div className="m-sval">85%</div><div className="m-sch">↑ 2%</div></div>
            <div className="m-scard"><div className="m-slbl">vs Competition</div><div className="m-sval">#3</div><div className="m-sch">↑ 1</div></div>
            <div className="m-scard"><div className="m-slbl">AI Recommendations</div><div className="m-sval">23</div><div className="m-sch">↑ 8</div></div>
          </div>
          <div className="m-main">
            <div className="charts-section">
              <div className="m-chart">
                <div className="m-chart-h">
                  <div className="m-chart-title">Mentions Over Time</div>
                  <span style={{ color:'#888', fontSize:'.875rem' }}>Last 7 days</span>
                </div>
                <div className="m-bars">
                  <div className="m-bar"><div className="m-fill" style={{ height:'60%' }}></div></div>
                  <div className="m-bar"><div className="m-fill" style={{ height:'75%' }}></div></div>
                  <div className="m-bar"><div className="m-fill" style={{ height:'45%' }}></div></div>
                  <div className="m-bar"><div className="m-fill" style={{ height:'80%' }}></div></div>
                  <div className="m-bar"><div className="m-fill" style={{ height:'65%' }}></div></div>
                  <div className="m-bar"><div className="m-fill" style={{ height:'90%' }}></div></div>
                  <div className="m-bar"><div className="m-fill" style={{ height:'70%' }}></div></div>
                </div>
              </div>
            </div>
            <div className="m-feed">
              <div className="m-feed-h">
                <div className="m-feed-title">Live Activity</div>
                <span className="m-feed-badge">3 New</span>
              </div>
              <div className="m-feed-items">
                <div className="m-feed-item pos">
                  <div className="m-feed-meta">ChatGPT • 2 min ago</div>
                  <div className="m-feed-q">&quot;Best AI visibility tools for startups&quot;</div>
                  <div className="m-feed-time">✅ VIZUP mentioned as top choice</div>
                </div>
                <div className="m-feed-item pos">
                  <div className="m-feed-meta">Claude • 8 min ago</div>
                  <div className="m-feed-q">&quot;VIZUP pricing and features&quot;</div>
                  <div className="m-feed-time">✅ Detailed response with positive tone</div>
                </div>
                <div className="m-feed-item neg">
                  <div className="m-feed-meta">Google AI • 15 min ago</div>
                  <div className="m-feed-q">&quot;AI monitoring platforms comparison&quot;</div>
                  <div className="m-feed-time">❌ Competitor mentioned, VIZUP absent</div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginTop:'2rem', textAlign:'center' }}>
            <button className="m-btn primary" onClick={() => alert('Open full monitoring suite')}>
              View Full Monitoring Suite &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


