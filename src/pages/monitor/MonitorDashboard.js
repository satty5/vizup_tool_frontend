import React, { useState, useEffect } from 'react'
import { apiClient } from '../../lib/api'
import '../../styles/monitor-dashboard.css'

export default function MonitorDashboard({ onNewAnalysis, onEditInputs }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    platform: 'all',
    status: 'all',
    search: ''
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(20)
  const [summary, setSummary] = useState({
    totalQueries: 0,
    mentionedQueries: 0,
    avgSentiment: 0,
    topPlatform: 'ChatGPT'
  })

  // Mock data for demonstration - replace with real API call
  const mockData = [
    {
      id: 1,
      query: "What is VIZUP and how does it work?",
      category: "Brand Awareness",
      platforms: {
        chatgpt: {
          mentioned: true,
          status: "mentioned",
          response: "VIZUP is an AI visibility platform that helps brands optimize their presence across AI-powered platforms and search engines...",
          sentiment: 0.85,
          ranking: 1
        },
        claude: {
          mentioned: true,
          status: "mentioned", 
          response: "VIZUP appears to be a comprehensive AI visibility tool designed for modern brands looking to establish their presence...",
          sentiment: 0.78,
          ranking: 2
        },
        gemini: {
          mentioned: false,
          status: "not_mentioned",
          response: "I don't have specific information about VIZUP in my current knowledge base...",
          sentiment: 0.5,
          ranking: null
        },
        google_ai: {
          mentioned: true,
          status: "partial",
          response: "VIZUP is mentioned in relation to AI marketing tools and visibility optimization...",
          sentiment: 0.72,
          ranking: 3
        }
      },
      overall_sentiment: 0.71,
      mention_rate: 0.75,
      last_updated: "2025-01-20T10:30:00Z"
    },
    {
      id: 2,
      query: "VIZUP pricing and subscription plans",
      category: "Purchase Intent",
      platforms: {
        chatgpt: {
          mentioned: true,
          status: "mentioned",
          response: "VIZUP offers several pricing tiers starting from a free tier for small businesses up to enterprise plans...",
          sentiment: 0.80,
          ranking: 1
        },
        claude: {
          mentioned: false,
          status: "not_mentioned",
          response: "I don't have current pricing information for VIZUP. I'd recommend checking their official website...",
          sentiment: 0.6,
          ranking: null
        },
        gemini: {
          mentioned: false,
          status: "not_mentioned", 
          response: "I don't have access to current VIZUP pricing information...",
          sentiment: 0.5,
          ranking: null
        },
        google_ai: {
          mentioned: true,
          status: "partial",
          response: "VIZUP pricing varies based on features and usage. Check their website for current rates...",
          sentiment: 0.65,
          ranking: 2
        }
      },
      overall_sentiment: 0.64,
      mention_rate: 0.50,
      last_updated: "2025-01-20T10:30:00Z"
    },
    {
      id: 3,
      query: "Best AI visibility tools for startups",
      category: "Competitive Analysis",
      platforms: {
        chatgpt: {
          mentioned: true,
          status: "mentioned",
          response: "For startups looking to improve AI visibility, tools like VIZUP, BrightEdge, and Conductor offer comprehensive solutions...",
          sentiment: 0.75,
          ranking: 1
        },
        claude: {
          mentioned: true,
          status: "mentioned",
          response: "Several AI visibility platforms serve startups well, including VIZUP which specializes in answer engine optimization...",
          sentiment: 0.82,
          ranking: 1
        },
        gemini: {
          mentioned: false,
          status: "not_mentioned",
          response: "Popular AI and SEO tools for startups include Semrush, Ahrefs, and various content optimization platforms...",
          sentiment: 0.7,
          ranking: null
        },
        google_ai: {
          mentioned: true,
          status: "partial",
          response: "AI visibility tools gaining traction include several platforms, with VIZUP being noted for answer engine focus...",
          sentiment: 0.78,
          ranking: 2
        }
      },
      overall_sentiment: 0.76,
      mention_rate: 0.75,
      last_updated: "2025-01-20T10:30:00Z"
    }
  ]

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      // TODO: Replace with real API call
      // const response = await apiClient.get('/monitor/dashboard')
      // setData(response.queries)
      
      // For now, use mock data
      setTimeout(() => {
        setData(mockData)
        calculateSummary(mockData)
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
      setData(mockData) // Fallback to mock data
      calculateSummary(mockData)
      setLoading(false)
    }
  }

  const calculateSummary = (data) => {
    const totalQueries = data.length
    const mentionedQueries = data.filter(item => item.mention_rate > 0).length
    const avgSentiment = data.reduce((sum, item) => sum + item.overall_sentiment, 0) / totalQueries
    
    setSummary({
      totalQueries,
      mentionedQueries,
      avgSentiment: avgSentiment.toFixed(2),
      topPlatform: 'ChatGPT' // Could be calculated from data
    })
  }

  const filteredData = data.filter(item => {
    if (filters.search && !item.query.toLowerCase().includes(filters.search.toLowerCase())) {
      return false
    }
    if (filters.platform !== 'all' && !item.platforms[filters.platform]?.mentioned) {
      return false
    }
    if (filters.status !== 'all') {
      const hasStatus = Object.values(item.platforms).some(p => p.status === filters.status)
      if (!hasStatus) return false
    }
    return true
  })

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const getStatusBadge = (status) => {
    const classes = {
      'mentioned': 'status-mentioned',
      'not_mentioned': 'status-not-mentioned', 
      'partial': 'status-partial'
    }
    
    const labels = {
      'mentioned': 'Mentioned',
      'not_mentioned': 'Not Mentioned',
      'partial': 'Partial'
    }

    return (
      <span className={`response-status ${classes[status]}`}>
        {labels[status]}
      </span>
    )
  }

  const getSentimentColor = (sentiment) => {
    if (sentiment >= 0.7) return 'sentiment-positive'
    if (sentiment >= 0.5) return 'sentiment-neutral'
    return 'sentiment-negative'
  }

  if (loading) {
    return (
      <div className="monitor-dashboard">
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <div className="loading-spinner" style={{ margin: '0 auto 1rem' }}></div>
          <p>Loading monitoring dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="monitor-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>AI Monitoring Dashboard</h1>
          <div className="dashboard-subtitle">
            Monitor your brand presence across AI platforms • Last updated: {new Date().toLocaleString()}
          </div>
        </div>
        <div className="dashboard-actions">
          <button className="btn-edit-inputs" onClick={onEditInputs}>
            Edit Monitoring Setup
          </button>
          <button className="btn-new-analysis" onClick={onNewAnalysis}>
            + New Analysis
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card">
          <div className="summary-value">{summary.totalQueries}</div>
          <div className="summary-label">Total Queries</div>
        </div>
        <div className="summary-card">
          <div className="summary-value">{summary.mentionedQueries}</div>
          <div className="summary-label">Brand Mentions</div>
          <div className="summary-change positive">
            +{Math.round((summary.mentionedQueries / summary.totalQueries) * 100)}% mention rate
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-value">{(summary.avgSentiment * 100).toFixed(0)}%</div>
          <div className="summary-label">Avg Sentiment</div>
          <div className={`summary-change ${summary.avgSentiment > 0.7 ? 'positive' : 'neutral'}`}>
            {summary.avgSentiment > 0.7 ? 'Positive' : 'Mixed'} sentiment
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-value">{summary.topPlatform}</div>
          <div className="summary-label">Top Platform</div>
          <div className="summary-change positive">
            Best mention rate
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <div className="filter-group">
          <label className="filter-label">Platform:</label>
          <select 
            className="filter-select"
            value={filters.platform}
            onChange={(e) => setFilters({...filters, platform: e.target.value})}
          >
            <option value="all">All Platforms</option>
            <option value="chatgpt">ChatGPT</option>
            <option value="claude">Claude</option>
            <option value="gemini">Gemini</option>
            <option value="google_ai">Google AI</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label className="filter-label">Status:</label>
          <select 
            className="filter-select"
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
          >
            <option value="all">All Statuses</option>
            <option value="mentioned">Mentioned</option>
            <option value="not_mentioned">Not Mentioned</option>
            <option value="partial">Partial Mention</option>
          </select>
        </div>

        <div className="search-box">
          <input
            type="text"
            className="search-input"
            placeholder="Search queries..."
            value={filters.search}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="data-table-container">
        <div className="table-header">
          <div className="table-title">Query Performance Analysis</div>
          <div className="table-controls">
            <button className="export-btn">Export CSV</button>
            <span className="results-count">{filteredData.length} queries</span>
          </div>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Query</th>
              <th>ChatGPT</th>
              <th>Claude</th>
              <th>Gemini</th>
              <th>Google AI</th>
              <th>Metrics</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => (
              <tr key={item.id}>
                <td className="query-cell">
                  <div className="query-text">{item.query}</div>
                  <div className="query-meta">
                    <span className="query-tag">{item.category}</span>
                    <span className="query-tag">{(item.mention_rate * 100).toFixed(0)}% mentioned</span>
                  </div>
                </td>
                
                {/* Platform Columns */}
                {['chatgpt', 'claude', 'gemini', 'google_ai'].map(platform => {
                  const platformData = item.platforms[platform]
                  return (
                    <td key={platform} className="platform-cell">
                      <div className="platform-response">
                        {getStatusBadge(platformData.status)}
                        {platformData.ranking && (
                          <span style={{ marginLeft: '0.5rem', color: '#888', fontSize: '0.75rem' }}>
                            #{platformData.ranking}
                          </span>
                        )}
                        <div className="response-preview">
                          {platformData.response}
                        </div>
                      </div>
                    </td>
                  )
                })}

                <td className="metrics-cell">
                  <div className="metric-item">
                    <span className="metric-label">Sentiment:</span>
                    <span className="metric-value">{(item.overall_sentiment * 100).toFixed(0)}%</span>
                  </div>
                  <div className="sentiment-score">
                    <div className="sentiment-bar">
                      <div 
                        className={`sentiment-fill ${getSentimentColor(item.overall_sentiment)}`}
                        style={{ width: `${item.overall_sentiment * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">Mention Rate:</span>
                    <span className="metric-value">{(item.mention_rate * 100).toFixed(0)}%</span>
                  </div>
                </td>

                <td className="actions-cell">
                  <button className="action-btn">Details</button>
                  <button className="action-btn">Re-test</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          <div className="pagination-info">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} queries
          </div>
          <div className="pagination-controls">
            <button 
              className="page-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            
            <button 
              className="page-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

