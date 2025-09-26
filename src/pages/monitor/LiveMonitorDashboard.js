import React, { useState, useEffect } from 'react'
import '../../styles/live-monitor-dashboard.css'
import { generateMockCsvData } from '../../utils/csvProcessor'

export default function LiveMonitorDashboard({ csvData, onNewAnalysis, onEditInputs }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [dateRange, setDateRange] = useState('7d')
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(true)

  console.log('🚀 LiveMonitorDashboard rendered', { csvData, loading, metrics })

  useEffect(() => {
    // Load CSV data - use provided data or generate mock data
    const loadData = () => {
      console.log('🔄 Loading dashboard data...')
      try {
        const data = csvData || generateMockCsvData()
        console.log('📊 Data loaded:', data.length, 'rows')
        const processedMetrics = processCsvData(data)
        console.log('✅ Metrics processed:', processedMetrics)
        setMetrics(processedMetrics)
        setLoading(false)
      } catch (error) {
        console.error('❌ Error loading dashboard data:', error)
        // Create simple fallback data
        const fallbackMetrics = {
          overview: {
            totalQueries: 5,
            mentionedQueries: 2,
            totalMentions: 20,
            visibilityScore: 40.0,
            avgSentiment: 85.0,
            shareOfVoice: 100
          },
          platforms: [
            { name: 'ChatGPT', code: 'CG', queries: 5, mentions: 2, responseTime: 2100, performance: 85, share: 50 },
            { name: 'Claude', code: 'CL', queries: 5, mentions: 2, responseTime: 2600, performance: 88, share: 50 },
            { name: 'Gemini', code: 'GM', queries: 5, mentions: 0, responseTime: 2400, performance: 70, share: 0 }
          ],
          topQueries: [
            { query: 'Amrutam vs Kapiva: Which is better?', mentions: 8, shareOfVoice: 100, queryScore: 85, responseScore: 90, flag: 'COMPETITIVE', platforms: ['chatgpt', 'claude', 'gemini'] },
            { query: 'Amrutam vs Gynoveda for PCOS', mentions: 12, shareOfVoice: 100, queryScore: 90, responseScore: 92, flag: 'COMPETITIVE', platforms: ['chatgpt', 'claude', 'gemini'] }
          ],
          queryTypes: [
            { type: 'Brand Discovery (Unbranded)', total: 3, mentioned: 0, rate: 0 },
            { type: 'Comparative / Competitive', total: 2, mentioned: 2, rate: 100 }
          ],
          timeline: Array.from({ length: 7 }, (_, i) => ({ day: i + 1, queries: 1, mentions: 0, score: 70 }))
        }
        setMetrics(fallbackMetrics)
        setLoading(false)
      }
    }
    
    loadData()
  }, [csvData])

  // Process CSV data into dashboard metrics
  const processCsvData = (data) => {
    const totalQueries = data.length
    const mentionedQueries = data.filter(row => row['Amrutam Mentioned'] === 'Yes')
    const totalMentions = mentionedQueries.reduce((sum, row) => sum + parseInt(row['Amrutam Count'] || 0), 0)
    
    // Calculate platform performance
    const platforms = ['ChatGPT', 'Claude', 'Gemini'].map(platform => {
      const platformQueries = data.filter(row => row[platform] === 'Yes')
      const platformMentions = mentionedQueries.filter(row => row[platform] === 'Yes')
      const avgResponseTime = calculateAvgResponseTime(data, platform)
      const performanceScore = calculatePlatformScore(data, platform)
      
      return {
        name: platform,
        code: platform === 'ChatGPT' ? 'CG' : platform === 'Claude' ? 'CL' : 'GM',
        queries: platformQueries.length,
        mentions: platformMentions.length,
        responseTime: avgResponseTime,
        performance: performanceScore,
        share: totalMentions > 0 ? (platformMentions.length / totalMentions * 100) : 0
      }
    })

    // Get top performing queries
    const topQueries = mentionedQueries
      .sort((a, b) => parseInt(b['Amrutam Count'] || 0) - parseInt(a['Amrutam Count'] || 0))
      .slice(0, 5)
      .map(row => ({
        query: row.Query,
        mentions: parseInt(row['Amrutam Count'] || 0),
        shareOfVoice: parseFloat(row['Share of Voice %'] || 0),
        queryScore: parseInt(row['Query Score'] || 0),
        responseScore: parseFloat(row['Response Score'] || 0),
        flag: row['Query Flag'] || 'NEUTRAL',
        platforms: (row['Platforms with Amrutam'] || '').split(', ').filter(p => p)
      }))

    // Calculate visibility score (mentioned / total)
    const visibilityScore = totalQueries > 0 ? (mentionedQueries.length / totalQueries * 100) : 0
    
    // Calculate average sentiment from response scores
    const avgSentiment = mentionedQueries.length > 0 
      ? mentionedQueries.reduce((sum, row) => sum + parseFloat(row['Response Score'] || 0), 0) / mentionedQueries.length
      : 0

    return {
      overview: {
        totalQueries,
        mentionedQueries: mentionedQueries.length,
        totalMentions,
        visibilityScore: Math.round(visibilityScore * 100) / 100,
        avgSentiment: Math.round(avgSentiment * 100) / 100,
        shareOfVoice: mentionedQueries.length > 0 ? 100 : 0 // When mentioned, always 100%
      },
      platforms,
      topQueries,
      queryTypes: getQueryTypeBreakdown(data),
      timeline: generateTimelineData(data)
    }
  }

  const calculateAvgResponseTime = (data, platform) => {
    const responseTimes = data
      .map(row => parseFloat(row[`${platform.toLowerCase()} response time`] || 0))
      .filter(time => time > 0)
    return responseTimes.length > 0 
      ? Math.round(responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length)
      : 0
  }

  const calculatePlatformScore = (data, platform) => {
    const scores = data
      .map(row => {
        const performance = row[`${platform} Performance`] || ''
        const match = performance.match(/(\d+)/g)
        return match ? parseInt(match[match.length - 1]) : 0
      })
      .filter(score => score > 0)
    return scores.length > 0 
      ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
      : 0
  }

  const getQueryTypeBreakdown = (data) => {
    const types = {}
    data.forEach(row => {
      const type = row['Query Type'] || 'Unknown'
      if (!types[type]) {
        types[type] = { total: 0, mentioned: 0 }
      }
      types[type].total++
      if (row['Amrutam Mentioned'] === 'Yes') {
        types[type].mentioned++
      }
    })
    return Object.entries(types).map(([type, stats]) => ({
      type,
      total: stats.total,
      mentioned: stats.mentioned,
      rate: stats.total > 0 ? (stats.mentioned / stats.total * 100) : 0
    }))
  }

  const generateTimelineData = (data) => {
    // Since we don't have timestamps, create mock timeline data
    // In real implementation, this would use actual query timestamps
    return Array.from({ length: 7 }, (_, i) => ({
      day: i + 1,
      queries: Math.floor(data.length / 7),
      mentions: Math.floor(data.filter(row => row['Amrutam Mentioned'] === 'Yes').length / 7),
      score: 60 + Math.random() * 30
    }))
  }

  const switchTab = (tab) => {
    setActiveTab(tab)
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'score-excellent'
    if (score >= 60) return 'score-good'
    if (score >= 40) return 'score-fair'
    return 'score-poor'
  }

  const getFlagColor = (flag) => {
    switch (flag) {
      case 'COMPETITIVE': return 'flag-competitive'
      case 'EXCELLENT': return 'flag-excellent'
      case 'CONCERNING': return 'flag-concerning'
      default: return 'flag-neutral'
    }
  }

  if (loading) {
    return (
      <div className="live-dashboard">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Processing monitoring data...</p>
        </div>
      </div>
    )
  }

  if (!metrics) {
    return (
      <div className="live-dashboard">
        <div className="loading-state">
          <p>No data available. Generating sample dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="live-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-left">
          <h1 className="dashboard-title">AI Visibility Monitor</h1>
          <div className="breadcrumbs">
            <span>Monitor</span>
            <span className="separator">›</span>
            <span className="active">Live Dashboard</span>
          </div>
        </div>
        
        <div className="header-controls">
          <div className="date-selector">
            <button 
              className={`date-btn ${dateRange === '24h' ? 'active' : ''}`}
              onClick={() => setDateRange('24h')}
            >
              24h
            </button>
            <button 
              className={`date-btn ${dateRange === '7d' ? 'active' : ''}`}
              onClick={() => setDateRange('7d')}
            >
              7d
            </button>
            <button 
              className={`date-btn ${dateRange === '30d' ? 'active' : ''}`}
              onClick={() => setDateRange('30d')}
            >
              30d
            </button>
          </div>
          
          <button className="action-btn secondary" onClick={onEditInputs}>
            Edit Setup
          </button>
          
          <button className="action-btn primary" onClick={onNewAnalysis}>
            New Analysis
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="dashboard-nav">
        <button 
          className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => switchTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`nav-tab ${activeTab === 'platforms' ? 'active' : ''}`}
          onClick={() => switchTab('platforms')}
        >
          Platforms
        </button>
        <button 
          className={`nav-tab ${activeTab === 'queries' ? 'active' : ''}`}
          onClick={() => switchTab('queries')}
        >
          Top Queries
        </button>
        <button 
          className={`nav-tab ${activeTab === 'insights' ? 'active' : ''}`}
          onClick={() => switchTab('insights')}
        >
          Insights
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="tab-content">
          {/* Key Metrics */}
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-title">Visibility Rate</span>
                <span className="metric-trend positive">+2.3%</span>
              </div>
              <div className="metric-value">{metrics.overview.visibilityScore}%</div>
              <div className="metric-subtitle">
                {metrics.overview.mentionedQueries} of {metrics.overview.totalQueries} queries
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-title">Brand Mentions</span>
                <span className="metric-trend positive">+{metrics.overview.totalMentions}</span>
              </div>
              <div className="metric-value">{metrics.overview.totalMentions}</div>
              <div className="metric-subtitle">
                Across {metrics.platforms.length} platforms
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-title">Share of Voice</span>
                <span className="metric-trend positive">Strong</span>
              </div>
              <div className="metric-value">{metrics.overview.shareOfVoice}%</div>
              <div className="metric-subtitle">
                When mentioned
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-title">Response Quality</span>
                <span className={`metric-trend ${metrics.overview.avgSentiment > 70 ? 'positive' : 'neutral'}`}>
                  {metrics.overview.avgSentiment > 70 ? 'Good' : 'Fair'}
                </span>
              </div>
              <div className="metric-value">{metrics.overview.avgSentiment.toFixed(1)}</div>
              <div className="metric-subtitle">
                Average score
              </div>
            </div>
          </div>

          {/* Platform Performance */}
          <div className="section">
            <h3 className="section-title">Platform Performance</h3>
            <div className="platform-grid">
              {metrics.platforms.map(platform => (
                <div key={platform.name} className="platform-card">
                  <div className="platform-header">
                    <div className="platform-icon">{platform.code}</div>
                    <div className="platform-info">
                      <div className="platform-name">{platform.name}</div>
                      <div className="platform-stats">{platform.queries} queries</div>
                    </div>
                  </div>
                  
                  <div className="platform-metrics">
                    <div className="platform-metric">
                      <span className="metric-label">Mentions</span>
                      <span className="metric-value">{platform.mentions}</span>
                    </div>
                    <div className="platform-metric">
                      <span className="metric-label">Response Time</span>
                      <span className="metric-value">{platform.responseTime}ms</span>
                    </div>
                    <div className="platform-metric">
                      <span className="metric-label">Performance</span>
                      <span className={`metric-value ${getScoreColor(platform.performance)}`}>
                        {platform.performance}/100
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Query Type Breakdown */}
          <div className="section">
            <h3 className="section-title">Query Type Analysis</h3>
            <div className="query-types">
              {metrics.queryTypes.map(type => (
                <div key={type.type} className="query-type-card">
                  <div className="query-type-header">
                    <span className="query-type-name">{type.type}</span>
                    <span className="query-type-count">{type.total} queries</span>
                  </div>
                  <div className="query-type-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${Math.max(type.rate, 2)}%` }}
                      ></div>
                    </div>
                    <span className="progress-label">
                      {type.mentioned} mentions ({type.rate.toFixed(1)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Platforms Tab */}
      {activeTab === 'platforms' && (
        <div className="tab-content">
          <div className="platforms-detailed">
            {metrics.platforms.map(platform => (
              <div key={platform.name} className="platform-detailed-card">
                <div className="platform-detailed-header">
                  <div className="platform-icon large">{platform.code}</div>
                  <div className="platform-detailed-info">
                    <h3 className="platform-detailed-name">{platform.name}</h3>
                    <p className="platform-detailed-description">
                      {platform.queries} total queries • {platform.mentions} mentions
                    </p>
                  </div>
                  <div className={`platform-status ${platform.mentions > 0 ? 'active' : 'inactive'}`}>
                    {platform.mentions > 0 ? 'Active' : 'Monitoring'}
                  </div>
                </div>
                
                <div className="platform-detailed-metrics">
                  <div className="detailed-metric">
                    <span className="detailed-metric-label">Performance Score</span>
                    <div className="detailed-metric-value">
                      <span className={getScoreColor(platform.performance)}>
                        {platform.performance}/100
                      </span>
                      <div className="score-bar">
                        <div 
                          className={`score-fill ${getScoreColor(platform.performance)}`}
                          style={{ width: `${platform.performance}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="detailed-metric">
                    <span className="detailed-metric-label">Average Response Time</span>
                    <span className="detailed-metric-value">{platform.responseTime}ms</span>
                  </div>
                  
                  <div className="detailed-metric">
                    <span className="detailed-metric-label">Share of Mentions</span>
                    <span className="detailed-metric-value">{platform.share.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top Queries Tab */}
      {activeTab === 'queries' && (
        <div className="tab-content">
          <div className="queries-section">
            <div className="queries-header">
              <h3 className="section-title">Top Performing Queries</h3>
              <p className="section-subtitle">
                Queries where your brand achieved visibility
              </p>
            </div>
            
            <div className="queries-list">
              {metrics.topQueries.map((query, index) => (
                <div key={index} className="query-card">
                  <div className="query-header">
                    <div className="query-rank">#{index + 1}</div>
                    <div className="query-info">
                      <div className="query-text">{query.query}</div>
                      <div className="query-meta">
                        {query.mentions} mentions • {query.platforms.length} platforms
                      </div>
                    </div>
                    <div className={`query-flag ${getFlagColor(query.flag)}`}>
                      {query.flag}
                    </div>
                  </div>
                  
                  <div className="query-metrics">
                    <div className="query-metric">
                      <span className="metric-label">Share of Voice</span>
                      <span className="metric-value">{query.shareOfVoice}%</span>
                    </div>
                    <div className="query-metric">
                      <span className="metric-label">Query Score</span>
                      <span className={`metric-value ${getScoreColor(query.queryScore)}`}>
                        {query.queryScore}/100
                      </span>
                    </div>
                    <div className="query-metric">
                      <span className="metric-label">Response Quality</span>
                      <span className={`metric-value ${getScoreColor(query.responseScore)}`}>
                        {query.responseScore.toFixed(1)}/100
                      </span>
                    </div>
                  </div>
                  
                  <div className="query-platforms">
                    <span className="platforms-label">Active on:</span>
                    <div className="platforms-list">
                      {query.platforms.map(platform => (
                        <span key={platform} className="platform-tag">
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Insights Tab */}
      {activeTab === 'insights' && (
        <div className="tab-content">
          <div className="insights-grid">
            {/* Opportunities */}
            <div className="insight-card">
              <h3 className="insight-title">Growth Opportunities</h3>
              <div className="opportunities-list">
                <div className="opportunity-item">
                  <div className="opportunity-icon">📈</div>
                  <div className="opportunity-content">
                    <div className="opportunity-title">Brand Discovery Queries</div>
                    <div className="opportunity-description">
                      {metrics.queryTypes.find(t => t.type.includes('Brand Discovery'))?.total || 0} unbranded queries represent significant opportunity
                    </div>
                  </div>
                  <div className="opportunity-impact">High</div>
                </div>
                
                <div className="opportunity-item">
                  <div className="opportunity-icon">⚔️</div>
                  <div className="opportunity-content">
                    <div className="opportunity-title">Competitive Queries</div>
                    <div className="opportunity-description">
                      Strong performance in direct comparisons with 100% share of voice
                    </div>
                  </div>
                  <div className="opportunity-impact">Excellent</div>
                </div>
                
                <div className="opportunity-item">
                  <div className="opportunity-icon">⚡</div>
                  <div className="opportunity-content">
                    <div className="opportunity-title">Response Time Optimization</div>
                    <div className="opportunity-description">
                      Average response time of {Math.round(metrics.platforms.reduce((sum, p) => sum + p.responseTime, 0) / metrics.platforms.length)}ms could be improved
                    </div>
                  </div>
                  <div className="opportunity-impact">Medium</div>
                </div>
              </div>
            </div>

            {/* Performance Summary */}
            <div className="insight-card">
              <h3 className="insight-title">Performance Summary</h3>
              <div className="performance-summary">
                <div className="summary-stat">
                  <div className="summary-value">{metrics.overview.visibilityScore.toFixed(2)}%</div>
                  <div className="summary-label">Overall Visibility</div>
                </div>
                <div className="summary-stat">
                  <div className="summary-value">{metrics.overview.totalMentions}</div>
                  <div className="summary-label">Total Mentions</div>
                </div>
                <div className="summary-stat">
                  <div className="summary-value">{metrics.topQueries.length}</div>
                  <div className="summary-label">Successful Queries</div>
                </div>
              </div>
              
              <div className="key-insights">
                <h4>Key Insights</h4>
                <ul>
                  <li>Perfect share of voice when mentioned (100%)</li>
                  <li>Strong competitive positioning in direct comparisons</li>
                  <li>Claude shows best overall performance</li>
                  <li>Opportunity to improve brand discovery presence</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
