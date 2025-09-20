import React, { useState, useEffect } from 'react'
import { apiClient } from '../../lib/api'
import '../../styles/enterprise-dashboard.css'

export default function EnterpriseMonitorDashboard({ onNewAnalysis, onEditInputs }) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState({
    totalVisibility: 24.7,
    brandMentions: 2847,
    avgPosition: 3.8,
    shareOfVoice: 31.4,
    platforms: [
      { name: 'ChatGPT', code: 'CG', mentions: 847, share: 35.2, performance: 75 },
      { name: 'Google AI', code: 'GA', mentions: 623, share: 25.9, performance: 62 },
      { name: 'Perplexity', code: 'PP', mentions: 512, share: 21.3, performance: 48 },
      { name: 'Claude', code: 'CL', mentions: 289, share: 12.0, performance: 32 }
    ]
  })

  // Mock data matching the enterprise dashboard structure
  const mockTableData = [
    {
      id: 1,
      platform: 'ChatGPT',
      platformCode: 'CG',
      queryType: 'Branded Queries',
      queries: [
        { text: '"VIZUP pricing"', mentions: 124, visibility: 78.3, share: 68.2, position: 1, sentiment: 92 },
        { text: '"VIZUP reviews"', mentions: 98, visibility: 62.1, share: 54.3, position: 1, sentiment: 88 },
        { text: '"VIZUP alternatives"', mentions: 62, visibility: 31.5, share: 28.7, position: 5, sentiment: 65, disabled: true },
        { text: '"VIZUP login"', mentions: 58, visibility: 89.2, share: 76.3, position: 1, sentiment: 95 }
      ],
      totalMentions: 847,
      visibility: 28.4,
      share: 35.2,
      position: 2.8,
      sentiment: 75,
      citations: 156
    },
    {
      id: 2,
      platform: 'Google AI',
      platformCode: 'GA',
      queryType: 'Feature Queries',
      queries: [],
      totalMentions: 623,
      visibility: 21.2,
      share: 25.9,
      position: 4.1,
      sentiment: 69,
      citations: 98
    },
    {
      id: 3,
      platform: 'Perplexity',
      platformCode: 'PP',
      queryType: 'Competitive Analysis',
      queries: [],
      totalMentions: 512,
      visibility: 17.6,
      share: 21.3,
      position: 3.6,
      sentiment: 71,
      citations: 87
    }
  ]

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      // TODO: Replace with real API call
      // const response = await apiClient.get('/monitor/enterprise-dashboard')
      
      // For now, use mock data
      setTimeout(() => {
        setData(mockTableData)
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Error loading enterprise dashboard data:', error)
      setData(mockTableData) // Fallback to mock data
      setLoading(false)
    }
  }

  const switchTab = (tabName) => {
    setActiveTab(tabName)
  }

  const getPositionBadgeClass = (position) => {
    if (position === 1) return 'position-1'
    if (position <= 3) return 'position-2-3'
    return 'position-4-10'
  }

  if (loading) {
    return (
      <div className="enterprise-dashboard">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
          <div style={{ textAlign: 'center' }}>
            <div className="loading-spinner" style={{ margin: '0 auto 1rem' }}></div>
            <p>Loading enterprise dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="enterprise-dashboard">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <div className="dashboard-logo">
            <div className="logo-mark">
              V
              <div className="logo-status"></div>
            </div>
            <span className="logo-text">AI Monitor Pro</span>
          </div>
        </div>

        <nav className="dashboard-nav">
          <div className="nav-group">
            <div className="nav-label">Main</div>
            <a className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => switchTab('dashboard')}>
              <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 13h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zm0 8h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm10 0h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zM13 4v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1z"/>
              </svg>
              <span>Dashboard</span>
              <span className="nav-badge">5</span>
            </a>
            
            <a className={`nav-item ${activeTab === 'campaigns' ? 'active' : ''}`} onClick={() => switchTab('campaigns')}>
              <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span>Campaigns</span>
            </a>
            
            <a className={`nav-item ${activeTab === 'competitors' ? 'active' : ''}`} onClick={() => switchTab('competitors')}>
              <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
              </svg>
              <span>Competitors</span>
            </a>
          </div>

          <div className="nav-group">
            <div className="nav-label">Analytics</div>
            <a className={`nav-item ${activeTab === 'insights' ? 'active' : ''}`} onClick={() => switchTab('insights')}>
              <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
              </svg>
              <span>Insights</span>
            </a>
            
            <a className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`} onClick={() => switchTab('reports')}>
              <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
              </svg>
              <span>Reports</span>
            </a>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-content">
            <div className="header-left">
              <div>
                <h1 className="header-title">
                  {activeTab === 'dashboard' && 'AI Visibility Overview'}
                  {activeTab === 'campaigns' && 'Campaign Performance'}
                  {activeTab === 'competitors' && 'Competitor Analysis'}
                  {activeTab === 'insights' && 'AI Insights & Recommendations'}
                  {activeTab === 'reports' && 'Reports & Analytics'}
                </h1>
                <div className="breadcrumbs">
                  <span>Home</span>
                  <span className="breadcrumb-separator">›</span>
                  <span className="breadcrumb-active">
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="live-indicator">
                <div className="live-dot"></div>
                <span>Live Monitoring</span>
              </div>
            </div>

            <div className="header-controls">
              <div className="date-picker">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                </svg>
                <span>Last 7 days</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 10l5 5 5-5z"/>
                </svg>
              </div>
              
              <button className="dashboard-btn" onClick={onEditInputs}>
                <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"/>
                </svg>
                Edit Setup
              </button>
              
              <button className="dashboard-btn btn-primary" onClick={onNewAnalysis}>
                <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
                New Analysis
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="dashboard-content">
          {/* Dashboard Tab */}
          <div className={`tab-content ${activeTab === 'dashboard' ? 'active' : ''}`}>
            <div className="dashboard-grid">
              {/* Key Metrics Row */}
              <div className="widget widget-col-3">
                <div className="widget-header">
                  <span className="widget-title">Total Visibility</span>
                </div>
                <div className="widget-value">{summary.totalVisibility}%</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '13px', color: 'var(--gray-600)' }}>
                  <span style={{ color: 'var(--black)', fontWeight: '600' }}>↑ 2.3%</span>
                  <span>from last week</span>
                </div>
                <div className="progress-bar" style={{ marginTop: '1rem' }}>
                  <div className="progress-fill" style={{ width: `${summary.totalVisibility}%` }}></div>
                </div>
              </div>

              <div className="widget widget-col-3">
                <div className="widget-header">
                  <span className="widget-title">Brand Mentions</span>
                </div>
                <div className="widget-value">{summary.brandMentions.toLocaleString()}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '13px', color: 'var(--gray-600)' }}>
                  <span style={{ color: 'var(--black)', fontWeight: '600' }}>↑ 312</span>
                  <span>new this week</span>
                </div>
                <div className="mini-chart">
                  <div className="chart-bar" style={{ height: '40%' }}></div>
                  <div className="chart-bar" style={{ height: '55%' }}></div>
                  <div className="chart-bar" style={{ height: '48%' }}></div>
                  <div className="chart-bar" style={{ height: '62%' }}></div>
                  <div className="chart-bar" style={{ height: '71%' }}></div>
                  <div className="chart-bar" style={{ height: '85%' }}></div>
                  <div className="chart-bar" style={{ height: '92%' }}></div>
                </div>
              </div>

              <div className="widget widget-col-3">
                <div className="widget-header">
                  <span className="widget-title">Avg Position</span>
                </div>
                <div className="widget-value">#{summary.avgPosition}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '13px', color: 'var(--gray-600)' }}>
                  <span style={{ color: 'var(--black)', fontWeight: '600' }}>↑ 0.4</span>
                  <span>improvement</span>
                </div>
                <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <span style={{ fontSize: '10px', color: 'var(--gray-500)' }}>10</span>
                  <div style={{ flex: 1, height: '4px', background: 'var(--gray-200)', borderRadius: '2px', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '38%', top: '-3px', width: '10px', height: '10px', background: 'var(--black)', borderRadius: '50%', border: '2px solid white' }}></div>
                  </div>
                  <span style={{ fontSize: '10px', color: 'var(--gray-500)' }}>1</span>
                </div>
              </div>

              <div className="widget widget-col-3">
                <div className="widget-header">
                  <span className="widget-title">Share of Voice</span>
                </div>
                <div className="widget-value">{summary.shareOfVoice}%</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '13px', color: 'var(--gray-600)' }}>
                  <span style={{ color: 'var(--gray-500)' }}>↓ 1.2%</span>
                  <span>vs competitors</span>
                </div>
                <div style={{ marginTop: '1rem', display: 'flex', gap: '2px' }}>
                  <div style={{ flex: `0 0 ${summary.shareOfVoice}%`, height: '8px', background: 'var(--black)', borderRadius: '2px' }}></div>
                  <div style={{ flex: 1, height: '8px', background: 'var(--gray-200)', borderRadius: '2px' }}></div>
                </div>
              </div>

              {/* Platform Performance */}
              <div className="widget widget-col-8">
                <div className="widget-header">
                  <span className="widget-title">Platform Performance</span>
                  <button className="btn-ghost" style={{ padding: '0.25rem' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                    </svg>
                  </button>
                </div>
                
                <div className="platform-grid">
                  {summary.platforms.map((platform, index) => (
                    <div key={index} className="platform-card">
                      <div className="platform-logo">{platform.code}</div>
                      <div className="platform-stats">
                        <div className="platform-name">{platform.name}</div>
                        <div className="platform-mentions">{platform.mentions}</div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <span style={{ fontSize: '11px', color: 'var(--black)', fontWeight: '600' }}>{platform.share}%</span>
                        <span style={{ fontSize: '10px', color: 'var(--gray-500)' }}>share</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '1.5rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                    {summary.platforms.map((platform, index) => (
                      <div key={index}>
                        <div style={{ fontSize: '11px', color: 'var(--gray-500)', marginBottom: '0.5rem' }}>{platform.name.toUpperCase()}</div>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${platform.performance}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Top Queries */}
              <div className="widget widget-col-4">
                <div className="widget-header">
                  <span className="widget-title">Top Performing Queries</span>
                </div>
                
                <div className="query-list">
                  <div className="query-item">
                    <span className="query-text">"VIZUP pricing"</span>
                    <div className="query-metrics">
                      <span className="position-badge position-1">#1</span>
                      <span style={{ fontSize: '12px', color: 'var(--gray-600)' }}>92%</span>
                    </div>
                  </div>
                  
                  <div className="query-item">
                    <span className="query-text">"best AI visibility tools"</span>
                    <div className="query-metrics">
                      <span className="position-badge position-1">#1</span>
                      <span style={{ fontSize: '12px', color: 'var(--gray-600)' }}>88%</span>
                    </div>
                  </div>
                  
                  <div className="query-item">
                    <span className="query-text">"VIZUP vs competitors"</span>
                    <div className="query-metrics">
                      <span className="position-badge position-2-3">#2</span>
                      <span style={{ fontSize: '12px', color: 'var(--gray-600)' }}>75%</span>
                    </div>
                  </div>
                  
                  <div className="query-item">
                    <span className="query-text">"answer engine marketing"</span>
                    <div className="query-metrics">
                      <span className="position-badge position-2-3">#3</span>
                      <span style={{ fontSize: '12px', color: 'var(--gray-600)' }}>71%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Campaigns Tab */}
          <div className={`tab-content ${activeTab === 'campaigns' ? 'active' : ''}`}>
            <div className="table-container">
              <div className="table-header">
                <h2 className="table-title">Campaign Performance</h2>
                
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div className="view-tabs">
                    <button className="view-tab active">Hierarchy View</button>
                    <button className="view-tab">Platforms Only</button>
                    <button className="view-tab">All Queries</button>
                  </div>
                  
                  <button className="dashboard-btn">
                    <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                    </svg>
                    Export
                  </button>
                </div>
              </div>

              <table className="data-table">
                <thead>
                  <tr>
                    <th style={{ width: '40px' }}>
                      <input type="checkbox" />
                    </th>
                    <th>Platform / Query Type / Query</th>
                    <th style={{ width: '80px' }}>Status</th>
                    <th className="sortable">Mentions ↕</th>
                    <th className="sortable">Visibility ↕</th>
                    <th className="sortable">Share ↕</th>
                    <th className="sortable">Position ↕</th>
                    <th className="sortable">Sentiment ↕</th>
                    <th className="sortable">Citations ↕</th>
                    <th style={{ width: '40px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((platform) => (
                    <React.Fragment key={platform.id}>
                      {/* Platform Row */}
                      <tr>
                        <td><input type="checkbox" /></td>
                        <td>
                          <div className="platform-cell">
                            <div className="platform-badge">
                              <div className="platform-icon">{platform.platformCode}</div>
                              <span>{platform.platform}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="status-toggle active"></div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontWeight: '600' }}>{platform.totalMentions}</span>
                            <span style={{ fontSize: '11px', color: 'var(--gray-500)' }}>↑ 12%</span>
                          </div>
                        </td>
                        <td>{platform.visibility}%</td>
                        <td>{platform.share}%</td>
                        <td>
                          <span className={`position-badge ${getPositionBadgeClass(Math.floor(platform.position))}`}>
                            #{platform.position}
                          </span>
                        </td>
                        <td>{platform.sentiment}%</td>
                        <td>{platform.citations}</td>
                        <td>
                          <button className="actions-menu btn-ghost">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                            </svg>
                          </button>
                        </td>
                      </tr>

                      {/* Individual Query Rows */}
                      {platform.queries.map((query, queryIndex) => (
                        <tr key={queryIndex} className="query-row" style={{ opacity: query.disabled ? 0.5 : 1 }}>
                          <td><input type="checkbox" /></td>
                          <td>
                            <span className="query-text">{query.text}</span>
                          </td>
                          <td>
                            <div className={`status-toggle ${!query.disabled ? 'active' : ''}`}></div>
                          </td>
                          <td>{query.mentions}</td>
                          <td>{query.visibility}%</td>
                          <td>{query.share}%</td>
                          <td>
                            <span className={`position-badge ${getPositionBadgeClass(query.position)}`}>
                              #{query.position}
                            </span>
                          </td>
                          <td>
                            <span style={{ fontSize: '12px', color: 'var(--gray-600)' }}>{query.sentiment}%</span>
                          </td>
                          <td>{Math.floor(query.mentions * 0.3)}</td>
                          <td></td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>

              <div className="table-footer">
                <div className="footer-stats">
                  <span className="footer-stat"><strong>2,847</strong> Total Queries</span>
                  <span className="footer-stat"><strong>2,234</strong> Active</span>
                  <span className="footer-stat"><strong>84.1%</strong> Coverage</span>
                </div>
                
                <div className="pagination">
                  <button className="dashboard-btn btn-ghost">←</button>
                  <span className="page-info">1-10 of 2,847</span>
                  <button className="dashboard-btn btn-ghost">→</button>
                </div>
              </div>
            </div>
          </div>

          {/* Other tabs content can be added here */}
          <div className={`tab-content ${activeTab === 'competitors' ? 'active' : ''}`}>
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <h3>Competitor Analysis</h3>
              <p>Coming soon...</p>
            </div>
          </div>

          <div className={`tab-content ${activeTab === 'insights' ? 'active' : ''}`}>
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <h3>AI Insights & Recommendations</h3>
              <p>Coming soon...</p>
            </div>
          </div>

          <div className={`tab-content ${activeTab === 'reports' ? 'active' : ''}`}>
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <h3>Reports & Analytics</h3>
              <p>Coming soon...</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
