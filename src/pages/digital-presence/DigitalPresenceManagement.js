import React, { useState, useEffect } from 'react'
import Header from '../../components/layout/Header'
import '../../styles/digital-presence.css'

export default function DigitalPresenceManagement() {
  const [activeView, setActiveView] = useState('sources')
  const [selectedSource, setSelectedSource] = useState(null)
  const [timeRange, setTimeRange] = useState('30d')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('healthScore')
  const [sortDirection, setSortDirection] = useState('desc')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedMention, setSelectedMention] = useState(null)
  const [oppSearchTerm, setOppSearchTerm] = useState('')
  const [oppPriorityFilter, setOppPriorityFilter] = useState('all')
  const [oppSourceFilter, setOppSourceFilter] = useState('all')

  // Comprehensive mock data with depth
  const sourceData = [
    {
      id: 'wikipedia',
      name: 'Wikipedia',
      category: 'Knowledge Base',
      status: 'active',
      healthScore: 85,
      mentions: 8,
      lastUpdated: '2 days ago',
      sentiment: { positive: 75, neutral: 20, negative: 5 },
      trend: { week: 8, month: 12, quarter: 15 },
      metrics: {
        articleExists: true,
        articleQuality: 'B-Class',
        citations: 47,
        backlinks: 156,
        views30d: 12450,
        edits30d: 3,
        contributors: 12,
        languages: 8
      },
      recentActivity: [
        { date: '2 days ago', type: 'edit', description: 'Product features section updated', user: 'WikiEditor42' },
        { date: '5 days ago', type: 'citation', description: 'New citation added from TechCrunch', user: 'AutoBot' },
        { date: '8 days ago', type: 'view_spike', description: '2.5x increase in page views', impact: 'high' }
      ],
      opportunities: [
        { priority: 'high', title: 'Add missing infobox data', impact: 'Improve AI extraction accuracy by 30%' },
        { priority: 'medium', title: 'Request higher article quality rating', impact: 'Increase visibility in AI responses' }
      ]
    },
    {
      id: 'g2',
      name: 'G2',
      category: 'Review Platform',
      status: 'active',
      healthScore: 82,
      mentions: 156,
      lastUpdated: '1 hour ago',
      sentiment: { positive: 72, neutral: 20, negative: 8 },
      trend: { week: 12, month: 28, quarter: 45 },
      metrics: {
        totalReviews: 342,
        avgRating: 4.6,
        monthlyReviews: 12,
        responseRate: 95,
        avgResponseTime: '2.3 hours',
        verifiedReviews: 298,
        badges: ['Leader', 'High Performer', 'Users Love Us']
      },
      recentActivity: [
        { date: '1 hour ago', type: 'review', description: '5-star review from Enterprise customer', user: 'TechCorp' },
        { date: '3 hours ago', type: 'response', description: 'Response to customer inquiry', user: 'Support Team' },
        { date: '1 day ago', type: 'badge', description: 'Earned "Leader" badge for Q4 2024', impact: 'high' }
      ],
      opportunities: [
        { priority: 'high', title: 'Respond to 3 unanswered reviews', impact: 'Maintain 95%+ response rate' },
        { priority: 'low', title: 'Request reviews from recent customers', impact: 'Boost monthly review count' }
      ]
    },
    {
      id: 'quora',
      name: 'Quora',
      category: 'Q&A Platform',
      status: 'poor',
      healthScore: 42,
      mentions: 23,
      lastUpdated: '5 days ago',
      sentiment: { positive: 45, neutral: 35, negative: 20 },
      trend: { week: 2, month: 5, quarter: 8 },
      metrics: {
        questions: 156,
        answers: 23,
        brandMentions: 23,
        upvotes: 847,
        views: 125000,
        followers: 45,
        topAnswerRate: 15
      },
      recentActivity: [
        { date: '5 days ago', type: 'mention', description: 'Mentioned in "Best AI visibility tools" question', user: 'Anonymous' },
        { date: '8 days ago', type: 'answer', description: 'Official answer to pricing question', user: 'VIZUP Team' },
        { date: '12 days ago', type: 'upvote', description: 'Answer received 50+ upvotes', impact: 'medium' }
      ],
      opportunities: [
        { priority: 'high', title: 'Answer 12 relevant unanswered questions', impact: 'Increase visibility by 40%' },
        { priority: 'high', title: 'Create company account and verify', impact: 'Build authority and trust' },
        { priority: 'medium', title: 'Engage with existing mentions', impact: 'Improve sentiment score' }
      ]
    },
    {
      id: 'reddit',
      name: 'Reddit',
      category: 'Community Platform',
      status: 'poor',
      healthScore: 38,
      mentions: 18,
      lastUpdated: '7 days ago',
      sentiment: { positive: 40, neutral: 40, negative: 20 },
      trend: { week: 1, month: 3, quarter: 6 },
      metrics: {
        subredditMentions: 12,
        posts: 8,
        comments: 67,
        upvotes: 234,
        downvotes: 45,
        karma: 189,
        topSubreddits: ['r/marketing', 'r/SEO', 'r/startups']
      },
      recentActivity: [
        { date: '7 days ago', type: 'mention', description: 'Mentioned in r/marketing discussion', user: 'u/marketer123' },
        { date: '10 days ago', type: 'comment', description: 'Negative comment about pricing', user: 'u/startup_guy', sentiment: 'negative' },
        { date: '14 days ago', type: 'post', description: 'User asking about alternatives', impact: 'medium' }
      ],
      opportunities: [
        { priority: 'high', title: 'Engage authentically in relevant subreddits', impact: 'Build community presence' },
        { priority: 'high', title: 'Address pricing concerns in r/startups', impact: 'Improve sentiment' },
        { priority: 'medium', title: 'Share case studies in r/marketing', impact: 'Increase positive mentions' }
      ]
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      category: 'Professional Network',
      status: 'active',
      healthScore: 78,
      mentions: 234,
      lastUpdated: '15 min ago',
      sentiment: { positive: 68, neutral: 28, negative: 4 },
      trend: { week: 45, month: 89, quarter: 156 },
      metrics: {
        companyFollowers: 5420,
        postEngagement: 8.5,
        shares: 234,
        comments: 567,
        reactions: 3420,
        impressions: 125000,
        employeeAdvocacy: 85
      },
      recentActivity: [
        { date: '15 min ago', type: 'share', description: 'Industry report shared by follower', user: 'Sarah Chen' },
        { date: '2 hours ago', type: 'comment', description: 'Discussion on AI marketing trends', user: 'Multiple users' },
        { date: '1 day ago', type: 'mention', description: 'Tagged in customer success story', impact: 'high' }
      ],
      opportunities: [
        { priority: 'medium', title: 'Encourage employee advocacy program', impact: 'Increase reach by 3x' },
        { priority: 'low', title: 'Post more thought leadership content', impact: 'Boost engagement rate' }
      ]
    },
    {
      id: 'youtube',
      name: 'YouTube',
      category: 'Video Platform',
      status: 'warning',
      healthScore: 58,
      mentions: 45,
      lastUpdated: '2 days ago',
      sentiment: { positive: 55, neutral: 35, negative: 10 },
      trend: { week: 5, month: 12, quarter: 28 },
      metrics: {
        totalVideos: 45,
        totalViews: 125000,
        subscribers: 1240,
        avgViewDuration: '3:45',
        engagementRate: 6.2,
        tutorials: 23,
        reviews: 12,
        comparisons: 10
      },
      recentActivity: [
        { date: '2 days ago', type: 'video', description: 'New tutorial video published', user: 'TechReviewer Pro' },
        { date: '5 days ago', type: 'comment', description: 'Positive comments on demo video', user: 'Multiple users' },
        { date: '8 days ago', type: 'comparison', description: 'Comparison video vs competitor', impact: 'medium' }
      ],
      opportunities: [
        { priority: 'high', title: 'Create official YouTube channel', impact: 'Control narrative and SEO' },
        { priority: 'medium', title: 'Engage with video creators', impact: 'Improve sentiment' },
        { priority: 'low', title: 'Sponsor relevant tech channels', impact: 'Increase positive coverage' }
      ]
    },
    {
      id: 'twitter',
      name: 'Twitter / X',
      category: 'Social Media',
      status: 'active',
      healthScore: 72,
      mentions: 456,
      lastUpdated: '5 min ago',
      sentiment: { positive: 62, neutral: 32, negative: 6 },
      trend: { week: 89, month: 178, quarter: 342 },
      metrics: {
        followers: 8420,
        mentions: 456,
        retweets: 234,
        likes: 1240,
        impressions: 245000,
        engagementRate: 4.2,
        topHashtags: ['#AIMarketing', '#AEO', '#DigitalMarketing']
      },
      recentActivity: [
        { date: '5 min ago', type: 'mention', description: 'Mentioned in AI marketing discussion', user: '@marketingpro' },
        { date: '30 min ago', type: 'retweet', description: 'Case study retweeted by influencer', user: '@techinfluencer' },
        { date: '2 hours ago', type: 'reply', description: 'Support team responded to inquiry', impact: 'low' }
      ],
      opportunities: [
        { priority: 'medium', title: 'Increase posting frequency to 3x daily', impact: 'Boost engagement 25%' },
        { priority: 'low', title: 'Run Twitter/X Spaces sessions', impact: 'Build thought leadership' }
      ]
    },
    {
      id: 'crunchbase',
      name: 'Crunchbase',
      category: 'Business Directory',
      status: 'active',
      healthScore: 88,
      mentions: 12,
      lastUpdated: '1 day ago',
      sentiment: { positive: 80, neutral: 18, negative: 2 },
      trend: { week: 2, month: 5, quarter: 12 },
      metrics: {
        profileComplete: 95,
        funding: 'Series A',
        employees: '51-100',
        lastUpdate: '1 day ago',
        websiteClicks: 234,
        profileViews: 1240,
        similarCompanies: 45
      },
      recentActivity: [
        { date: '1 day ago', type: 'update', description: 'Funding information updated', user: 'Admin' },
        { date: '3 days ago', type: 'view_spike', description: '2x increase in profile views', impact: 'medium' },
        { date: '1 week ago', type: 'competitor', description: 'Added to 3 competitor lists', impact: 'low' }
      ],
      opportunities: [
        { priority: 'low', title: 'Complete remaining 5% of profile', impact: 'Improve search ranking' }
      ]
    }
  ]

  // All mentions data for detailed view
  const allMentions = [
    { id: 1, date: '5 min ago', source: 'Twitter', platform: 'twitter', author: '@marketingpro', content: 'Really impressed with VIZUP\'s AI visibility tracking. Game changer for our SEO strategy.', sentiment: 'positive', engagement: 45, reach: 12000, url: '#' },
    { id: 2, date: '15 min ago', source: 'LinkedIn', platform: 'linkedin', author: 'Sarah Chen', content: 'Our team has been using VIZUP for 3 months. Visibility improved by 40%!', sentiment: 'positive', engagement: 89, reach: 25000, url: '#' },
    { id: 3, date: '1 hour ago', source: 'G2', platform: 'g2', author: 'TechCorp', content: 'Excellent platform with great support. The AI insights are incredibly valuable.', sentiment: 'positive', engagement: 12, reach: 5000, url: '#' },
    { id: 4, date: '2 hours ago', source: 'Quora', platform: 'quora', author: 'Anonymous', content: 'How does VIZUP compare to traditional SEO tools?', sentiment: 'neutral', engagement: 23, reach: 8000, url: '#' },
    { id: 5, date: '4 hours ago', source: 'Reddit', platform: 'reddit', author: 'u/startup_guy', content: 'Pricing seems steep for startups. Anyone have experience with alternatives?', sentiment: 'negative', engagement: 34, reach: 15000, url: '#' },
    { id: 6, date: '6 hours ago', source: 'YouTube', platform: 'youtube', author: 'TechReviewer Pro', content: 'Comprehensive review of VIZUP - great for enterprise teams', sentiment: 'positive', engagement: 156, reach: 45000, url: '#' },
    { id: 7, date: '8 hours ago', source: 'Twitter', platform: 'twitter', author: '@seoexpert', content: 'Just started using VIZUP. The answer engine optimization features are next level.', sentiment: 'positive', engagement: 67, reach: 18000, url: '#' },
    { id: 8, date: '1 day ago', source: 'LinkedIn', platform: 'linkedin', author: 'Marketing Director', content: 'VIZUP helped us understand our AI visibility gaps. Highly recommend.', sentiment: 'positive', engagement: 112, reach: 32000, url: '#' },
    { id: 9, date: '1 day ago', source: 'G2', platform: 'g2', author: 'Enterprise User', content: 'Good tool but learning curve is steep. Support team is very helpful though.', sentiment: 'neutral', engagement: 15, reach: 6000, url: '#' },
    { id: 10, date: '2 days ago', source: 'Quora', platform: 'quora', author: 'Industry Expert', content: 'VIZUP is leading the AEO space. Essential for modern digital marketing.', sentiment: 'positive', engagement: 78, reach: 22000, url: '#' }
  ]

  // Filter and sort sources
  const getFilteredSources = () => {
    let filtered = [...sourceData]
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(source => 
        source.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        source.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(source => source.status === filterStatus)
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      let aVal = a[sortBy]
      let bVal = b[sortBy]
      
      if (sortBy === 'trend') {
        aVal = a.trend.month
        bVal = b.trend.month
      }
      
      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1
      } else {
        return aVal < bVal ? 1 : -1
      }
    })
    
    return filtered
  }

  const filteredSources = getFilteredSources()

  return (
    <div className="dpm-root">
      <Header />
      
      <div className="dpm-container">
        {/* Page Header */}
        <div className="dpm-header">
          <div className="dpm-title-section">
            <h1 className="dpm-title">Digital Presence Management</h1>
            <p className="dpm-subtitle">Monitor and optimize your brand's presence across all digital sources</p>
          </div>
          <div className="dpm-header-actions">
            <div className="dpm-time-filter">
              <button 
                className={`dpm-time-btn ${timeRange === '7d' ? 'active' : ''}`}
                onClick={() => setTimeRange('7d')}
              >
                7D
              </button>
              <button 
                className={`dpm-time-btn ${timeRange === '30d' ? 'active' : ''}`}
                onClick={() => setTimeRange('30d')}
              >
                30D
              </button>
              <button 
                className={`dpm-time-btn ${timeRange === '90d' ? 'active' : ''}`}
                onClick={() => setTimeRange('90d')}
              >
                90D
              </button>
            </div>
          </div>
        </div>

        {/* Main Navigation Tabs */}
        <div className="dpm-tabs">
          <button 
            className={`dpm-tab ${activeView === 'sources' ? 'active' : ''}`}
            onClick={() => setActiveView('sources')}
          >
            Sources Overview
          </button>
          <button 
            className={`dpm-tab ${activeView === 'mentions' ? 'active' : ''}`}
            onClick={() => setActiveView('mentions')}
          >
            All Mentions
          </button>
          <button 
            className={`dpm-tab ${activeView === 'opportunities' ? 'active' : ''}`}
            onClick={() => setActiveView('opportunities')}
          >
            Opportunities
          </button>
          <button 
            className={`dpm-tab ${activeView === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveView('analytics')}
          >
            Analytics
          </button>
        </div>

        {/* Sources Overview View */}
        {activeView === 'sources' && !selectedSource && (
          <div className="dpm-view">
            {/* Filters and Search */}
            <div className="dpm-controls">
              <div className="dpm-search">
                <input 
                  type="text" 
                  placeholder="Search sources..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="dpm-search-input"
                />
              </div>
              
              <div className="dpm-filters">
                <select 
                  value={filterStatus} 
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="dpm-filter-select"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active Only</option>
                  <option value="warning">Warning Only</option>
                  <option value="poor">Poor Only</option>
                </select>
                
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="dpm-filter-select"
                >
                  <option value="healthScore">Health Score</option>
                  <option value="mentions">Mentions</option>
                  <option value="trend">Trend</option>
                  <option value="name">Name</option>
                </select>
                
                <button 
                  onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                  className="dpm-sort-btn"
                >
                  {sortDirection === 'asc' ? '↑' : '↓'}
                </button>
              </div>
            </div>

            {/* Sources Table */}
            <div className="dpm-table-container">
              <table className="dpm-table">
                <thead>
                  <tr>
                    <th>Source</th>
                    <th>Category</th>
                    <th>Health</th>
                    <th>Mentions</th>
                    <th>Sentiment</th>
                    <th>Trend (30d)</th>
                    <th>Status</th>
                    <th>Last Updated</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSources.map((source) => (
                    <tr key={source.id} className="dpm-table-row">
                      <td>
                        <div className="dpm-source-cell">
                          <span className="dpm-source-name-table">{source.name}</span>
                        </div>
                      </td>
                      <td>
                        <span className="dpm-category-badge">{source.category}</span>
                      </td>
                      <td>
                        <div className="dpm-health-cell">
                          <div className="dpm-health-bar">
                            <div 
                              className="dpm-health-fill" 
                              style={{ width: `${source.healthScore}%` }}
                            ></div>
                          </div>
                          <span className="dpm-health-value">{source.healthScore}%</span>
                        </div>
                      </td>
                      <td>
                        <span className="dpm-number">{source.mentions}</span>
                      </td>
                      <td>
                        <div className="dpm-sentiment-cell">
                          <span className="dpm-sentiment-positive">{source.sentiment.positive}%</span>
                          <span className="dpm-sentiment-neutral">{source.sentiment.neutral}%</span>
                          <span className="dpm-sentiment-negative">{source.sentiment.negative}%</span>
                        </div>
                      </td>
                      <td>
                        <span className="dpm-trend-value">+{source.trend.month}</span>
                      </td>
                      <td>
                        <span className={`dpm-status-badge ${source.status}`}>
                          {source.status}
                        </span>
                      </td>
                      <td>
                        <span className="dpm-date">{source.lastUpdated}</span>
                      </td>
                      <td>
                        <button 
                          className="dpm-action-btn"
                          onClick={() => setSelectedSource(source)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Selected Source Detail View */}
        {selectedSource && activeView === 'sources' && (
          <div className="dpm-detail-view">
            <button 
              className="dpm-back-btn"
              onClick={() => setSelectedSource(null)}
            >
              ← Back to Sources
            </button>

            <div className="dpm-detail-header">
              <div>
                <h2 className="dpm-detail-title">{selectedSource.name}</h2>
                <p className="dpm-detail-category">{selectedSource.category}</p>
              </div>
              <span className={`dpm-status-badge-large ${selectedSource.status}`}>
                {selectedSource.status}
              </span>
            </div>

            {/* Key Metrics Grid */}
            <div className="dpm-metrics-grid">
              <div className="dpm-metric-card">
                <div className="dpm-metric-label">Health Score</div>
                <div className="dpm-metric-value-large">{selectedSource.healthScore}%</div>
              </div>
              <div className="dpm-metric-card">
                <div className="dpm-metric-label">Total Mentions</div>
                <div className="dpm-metric-value-large">{selectedSource.mentions}</div>
              </div>
              <div className="dpm-metric-card">
                <div className="dpm-metric-label">Positive Sentiment</div>
                <div className="dpm-metric-value-large">{selectedSource.sentiment.positive}%</div>
              </div>
              <div className="dpm-metric-card">
                <div className="dpm-metric-label">30d Trend</div>
                <div className="dpm-metric-value-large">+{selectedSource.trend.month}</div>
              </div>
            </div>

            {/* Detailed Metrics */}
            <div className="dpm-detail-section">
              <h3 className="dpm-section-title">Detailed Metrics</h3>
              <div className="dpm-metrics-table">
                {Object.entries(selectedSource.metrics).map(([key, value]) => (
                  <div key={key} className="dpm-metric-row">
                    <span className="dpm-metric-key">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                    <span className="dpm-metric-value-detail">{Array.isArray(value) ? value.join(', ') : value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="dpm-detail-section">
              <h3 className="dpm-section-title">Recent Activity</h3>
              <div className="dpm-activity-list">
                {selectedSource.recentActivity.map((activity, index) => (
                  <div key={index} className="dpm-activity-item">
                    <div className="dpm-activity-date">{activity.date}</div>
                    <div className="dpm-activity-content">
                      <div className="dpm-activity-type">{activity.type}</div>
                      <div className="dpm-activity-description">{activity.description}</div>
                      {activity.user && <div className="dpm-activity-user">by {activity.user}</div>}
                    </div>
                    {activity.impact && (
                      <span className={`dpm-impact-badge ${activity.impact}`}>{activity.impact}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Opportunities */}
            <div className="dpm-detail-section">
              <h3 className="dpm-section-title">Opportunities</h3>
              <div className="dpm-opportunities-list">
                {selectedSource.opportunities.map((opp, index) => (
                  <div key={index} className="dpm-opportunity-card">
                    <div className="dpm-opportunity-header">
                      <span className={`dpm-priority-badge ${opp.priority}`}>{opp.priority}</span>
                      <h4 className="dpm-opportunity-title">{opp.title}</h4>
                    </div>
                    <p className="dpm-opportunity-impact">{opp.impact}</p>
                    <button className="dpm-opportunity-action">Take Action</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* All Mentions View */}
        {activeView === 'mentions' && (
          <div className="dpm-view">
            <div className="dpm-mentions-header">
              <h3>All Brand Mentions</h3>
              <div className="dpm-controls">
                <input 
                  type="text" 
                  placeholder="Search mentions..." 
                  className="dpm-search-input"
                />
                <select className="dpm-filter-select">
                  <option>All Platforms</option>
                  <option>Twitter</option>
                  <option>LinkedIn</option>
                  <option>G2</option>
                  <option>Quora</option>
                  <option>Reddit</option>
                </select>
                <select className="dpm-filter-select">
                  <option>All Sentiment</option>
                  <option>Positive</option>
                  <option>Neutral</option>
                  <option>Negative</option>
                </select>
              </div>
            </div>

            <div className="dpm-mentions-table">
              {allMentions.map((mention) => (
                <div key={mention.id} className="dpm-mention-card" onClick={() => setSelectedMention(mention)}>
                  <div className="dpm-mention-card-header">
                    <div className="dpm-mention-platform-info">
                      <span className="dpm-mention-source">{mention.source}</span>
                      <span className="dpm-mention-author">by {mention.author}</span>
                    </div>
                    <span className="dpm-mention-date">{mention.date}</span>
                  </div>
                  <p className="dpm-mention-content">"{mention.content}"</p>
                  <div className="dpm-mention-card-footer">
                    <span className={`dpm-sentiment-tag ${mention.sentiment}`}>{mention.sentiment}</span>
                    <div className="dpm-mention-stats">
                      <span>{mention.engagement} engagement</span>
                      <span>•</span>
                      <span>{mention.reach.toLocaleString()} reach</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Opportunities View */}
        {activeView === 'opportunities' && (
          <div className="dpm-view">
            <div className="dpm-opportunities-header">
              <h3 className="dpm-view-title">Action Items & Opportunities</h3>
              <div className="dpm-controls">
                <input 
                  type="text" 
                  placeholder="Search opportunities..." 
                  className="dpm-search-input"
                  value={oppSearchTerm}
                  onChange={(e) => setOppSearchTerm(e.target.value)}
                />
                <select 
                  className="dpm-filter-select"
                  value={oppPriorityFilter}
                  onChange={(e) => setOppPriorityFilter(e.target.value)}
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High Only</option>
                  <option value="medium">Medium Only</option>
                  <option value="low">Low Only</option>
                </select>
                <select 
                  className="dpm-filter-select"
                  value={oppSourceFilter}
                  onChange={(e) => setOppSourceFilter(e.target.value)}
                >
                  <option value="all">All Sources</option>
                  {sourceData.map(source => (
                    <option key={source.id} value={source.name}>{source.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="dpm-table-container">
              <table className="dpm-opportunities-table">
                <thead>
                  <tr>
                    <th style={{width: '5%'}}>#</th>
                    <th style={{width: '12%'}}>Priority</th>
                    <th style={{width: '15%'}}>Source</th>
                    <th style={{width: '30%'}}>Action Item</th>
                    <th style={{width: '23%'}}>Impact</th>
                    <th style={{width: '15%'}}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sourceData.flatMap(source => 
                    source.opportunities.map((opp, index) => ({
                      ...opp,
                      source: source.name,
                      sourceId: source.id,
                      sourceCategory: source.category,
                      sourceHealth: source.healthScore
                    }))
                  )
                  .filter(opp => {
                    // Search filter
                    if (oppSearchTerm && !opp.title.toLowerCase().includes(oppSearchTerm.toLowerCase()) && 
                        !opp.impact.toLowerCase().includes(oppSearchTerm.toLowerCase()) &&
                        !opp.source.toLowerCase().includes(oppSearchTerm.toLowerCase())) {
                      return false
                    }
                    // Priority filter
                    if (oppPriorityFilter !== 'all' && opp.priority !== oppPriorityFilter) {
                      return false
                    }
                    // Source filter
                    if (oppSourceFilter !== 'all' && opp.source !== oppSourceFilter) {
                      return false
                    }
                    return true
                  })
                  .sort((a, b) => {
                    const priorityOrder = { high: 0, medium: 1, low: 2 }
                    return priorityOrder[a.priority] - priorityOrder[b.priority]
                  }).map((opp, index) => (
                    <tr key={index} className="dpm-opportunity-row">
                      <td className="dpm-opp-number">{index + 1}</td>
                      <td>
                        <span className={`dpm-priority-tag ${opp.priority}`}>
                          {opp.priority.toUpperCase()}
                        </span>
                      </td>
                      <td>
                        <div className="dpm-opp-source-cell">
                          <span className="dpm-opp-source-name">{opp.source}</span>
                          <span className="dpm-opp-source-category">{opp.sourceCategory}</span>
                        </div>
                      </td>
                      <td>
                        <span className="dpm-opp-title">{opp.title}</span>
                      </td>
                      <td>
                        <span className="dpm-opp-impact">{opp.impact}</span>
                      </td>
                      <td>
                        <div className="dpm-opp-actions">
                          <button className="dpm-opp-action-btn">Take Action</button>
                          <button className="dpm-opp-dismiss-btn">Dismiss</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary Stats */}
            <div className="dpm-opp-summary">
              <div className="dpm-opp-stat">
                <span className="dpm-opp-stat-value">
                  {sourceData.flatMap(source => 
                    source.opportunities.map(opp => ({
                      ...opp,
                      source: source.name
                    }))
                  ).filter(opp => {
                    if (oppSearchTerm && !opp.title.toLowerCase().includes(oppSearchTerm.toLowerCase()) && 
                        !opp.impact.toLowerCase().includes(oppSearchTerm.toLowerCase()) &&
                        !opp.source.toLowerCase().includes(oppSearchTerm.toLowerCase())) {
                      return false
                    }
                    if (oppPriorityFilter !== 'all' && opp.priority !== oppPriorityFilter) {
                      return false
                    }
                    if (oppSourceFilter !== 'all' && opp.source !== oppSourceFilter) {
                      return false
                    }
                    return opp.priority === 'high'
                  }).length}
                </span>
                <span className="dpm-opp-stat-label">High Priority</span>
              </div>
              <div className="dpm-opp-stat">
                <span className="dpm-opp-stat-value">
                  {sourceData.flatMap(source => 
                    source.opportunities.map(opp => ({
                      ...opp,
                      source: source.name
                    }))
                  ).filter(opp => {
                    if (oppSearchTerm && !opp.title.toLowerCase().includes(oppSearchTerm.toLowerCase()) && 
                        !opp.impact.toLowerCase().includes(oppSearchTerm.toLowerCase()) &&
                        !opp.source.toLowerCase().includes(oppSearchTerm.toLowerCase())) {
                      return false
                    }
                    if (oppPriorityFilter !== 'all' && opp.priority !== oppPriorityFilter) {
                      return false
                    }
                    if (oppSourceFilter !== 'all' && opp.source !== oppSourceFilter) {
                      return false
                    }
                    return opp.priority === 'medium'
                  }).length}
                </span>
                <span className="dpm-opp-stat-label">Medium Priority</span>
              </div>
              <div className="dpm-opp-stat">
                <span className="dpm-opp-stat-value">
                  {sourceData.flatMap(source => 
                    source.opportunities.map(opp => ({
                      ...opp,
                      source: source.name
                    }))
                  ).filter(opp => {
                    if (oppSearchTerm && !opp.title.toLowerCase().includes(oppSearchTerm.toLowerCase()) && 
                        !opp.impact.toLowerCase().includes(oppSearchTerm.toLowerCase()) &&
                        !opp.source.toLowerCase().includes(oppSearchTerm.toLowerCase())) {
                      return false
                    }
                    if (oppPriorityFilter !== 'all' && opp.priority !== oppPriorityFilter) {
                      return false
                    }
                    if (oppSourceFilter !== 'all' && opp.source !== oppSourceFilter) {
                      return false
                    }
                    return opp.priority === 'low'
                  }).length}
                </span>
                <span className="dpm-opp-stat-label">Low Priority</span>
              </div>
              <div className="dpm-opp-stat">
                <span className="dpm-opp-stat-value">
                  {sourceData.flatMap(source => 
                    source.opportunities.map(opp => ({
                      ...opp,
                      source: source.name
                    }))
                  ).filter(opp => {
                    if (oppSearchTerm && !opp.title.toLowerCase().includes(oppSearchTerm.toLowerCase()) && 
                        !opp.impact.toLowerCase().includes(oppSearchTerm.toLowerCase()) &&
                        !opp.source.toLowerCase().includes(oppSearchTerm.toLowerCase())) {
                      return false
                    }
                    if (oppPriorityFilter !== 'all' && opp.priority !== oppPriorityFilter) {
                      return false
                    }
                    if (oppSourceFilter !== 'all' && opp.source !== oppSourceFilter) {
                      return false
                    }
                    return true
                  }).length}
                </span>
                <span className="dpm-opp-stat-label">Total Shown</span>
              </div>
            </div>
          </div>
        )}

        {/* Analytics View */}
        {activeView === 'analytics' && (
          <div className="dpm-view">
            <h3 className="dpm-view-title">Analytics & Trends</h3>
            
            <div className="dpm-analytics-placeholder">
              <div className="dpm-placeholder-card">
                <h4>Sentiment Trend Analysis</h4>
                <p>Chart showing sentiment changes over time across all sources</p>
              </div>
              <div className="dpm-placeholder-card">
                <h4>Mention Volume Over Time</h4>
                <p>Timeline chart of mention frequency by platform</p>
              </div>
              <div className="dpm-placeholder-card">
                <h4>Source Performance Comparison</h4>
                <p>Comparative analysis of all source health scores</p>
              </div>
              <div className="dpm-placeholder-card">
                <h4>Top Performing Content</h4>
                <p>Analysis of highest engagement mentions and topics</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}