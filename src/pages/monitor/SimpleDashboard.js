import React, { useState } from 'react'

export default function SimpleDashboard({ onNewAnalysis, onEditInputs }) {
  console.log('🎯 SimpleDashboard rendered')
  const [activeSection, setActiveSection] = useState('dashboard')
  const [expandedSections, setExpandedSections] = useState({ monitor: true })
  
  // Panel collapse states
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false)
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(true)
  
  // Data table state - must be at component level
  const [sortField, setSortField] = useState('query')
  const [sortDirection, setSortDirection] = useState('asc')
  const [filters, setFilters] = useState({
    queryType: 'all',
    platform: 'all',
    amrutamMentioned: 'all'
  })
  
  // Response view state
  const [selectedQuery, setSelectedQuery] = useState(0)
  const [responseFilters, setResponseFilters] = useState({
    queryType: 'all',
    amrutamMentioned: 'all'
  })

  // AI Agent state
  const [agentMessages, setAgentMessages] = useState([
    { type: 'agent', content: "Hi! I'm your AI Visibility Assistant. I can help you analyze your monitoring data, suggest optimizations, and answer questions about your AI presence.", timestamp: new Date() },
    { type: 'suggestion', content: "💡 I noticed you have 100% share of voice when mentioned. Would you like me to analyze opportunities to increase mention frequency?", timestamp: new Date() }
  ])
  const [agentInput, setAgentInput] = useState('')

  const navigationStructure = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      type: 'single'
    },
    {
      id: 'monitor',
      label: 'Monitor',
      type: 'expandable',
      children: [
        { id: 'monitor-home', label: 'Home' },
        { id: 'overall-setup', label: 'Overall Setup' },
        { id: 'raw-data', label: 'Raw Data' },
        { id: 'response-view', label: 'Response View' },
        { id: 'query-insights', label: 'Query Insights' },
        { id: 'visibility-dashboard', label: 'Visibility Dashboard' }
      ]
    },
    {
      id: 'optimize',
      label: 'Optimize',
      type: 'single'
    },
    {
      id: 'digital-presence',
      label: 'Digital Presence Management',
      type: 'single'
    },
    {
      id: 'attribution',
      label: 'Attribution',
      type: 'single'
    }
  ]

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const renderOverviewContent = () => {
    return (
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {/* Visibility Rate */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.02)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: 'translateY(0)',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)'
            e.currentTarget.style.boxShadow = '0 12px 48px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(0, 0, 0, 0.04)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.02)'
          }}
          >
            {/* Gradient Background */}
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.01) 100%)',
              borderRadius: '0 20px 0 60px'
            }}></div>
            <div style={{ 
              fontSize: '0.75rem', 
              color: 'rgba(55, 65, 81, 0.6)', 
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
              fontWeight: 600,
              letterSpacing: '1px'
            }}>
              AI Visibility Rate
            </div>
            <div style={{ 
              fontSize: '3rem', 
              fontWeight: 800, 
              marginBottom: '0.75rem',
              background: 'linear-gradient(135deg, #000 0%, #374151 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.03em'
            }}>
              40.0%
            </div>
            <div style={{ 
              fontSize: '0.875rem', 
              color: 'rgba(55, 65, 81, 0.7)',
              fontWeight: 500
            }}>
              2 of 5 queries • Live tracking
            </div>
          </div>

          {/* Brand Mentions */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.02)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: 'translateY(0)',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)'
            e.currentTarget.style.boxShadow = '0 12px 48px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(0, 0, 0, 0.04)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.02)'
          }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%)',
              borderRadius: '0 20px 0 60px'
            }}></div>
            <div style={{ 
              fontSize: '0.75rem', 
              color: 'rgba(55, 65, 81, 0.6)', 
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
              fontWeight: 600,
              letterSpacing: '1px'
            }}>
              AI Brand Mentions
            </div>
            <div style={{ 
              fontSize: '3rem', 
              fontWeight: 800, 
              marginBottom: '0.75rem',
              background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.03em'
            }}>
              20
            </div>
            <div style={{ 
              fontSize: '0.875rem', 
              color: 'rgba(55, 65, 81, 0.7)',
              fontWeight: 500
            }}>
              Across 3 AI platforms • +25% this week
            </div>
          </div>

          {/* Share of Voice */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.02)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: 'translateY(0)',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)'
            e.currentTarget.style.boxShadow = '0 12px 48px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(0, 0, 0, 0.04)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.02)'
          }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
              borderRadius: '0 20px 0 60px'
            }}></div>
            <div style={{ 
              fontSize: '0.75rem', 
              color: 'rgba(55, 65, 81, 0.6)', 
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
              fontWeight: 600,
              letterSpacing: '1px'
            }}>
              Share of Voice
            </div>
            <div style={{ 
              fontSize: '3rem', 
              fontWeight: 800, 
              marginBottom: '0.75rem',
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.03em'
            }}>
              100%
            </div>
            <div style={{ 
              fontSize: '0.875rem', 
              color: 'rgba(55, 65, 81, 0.7)',
              fontWeight: 500
            }}>
              Perfect dominance when mentioned
            </div>
          </div>

          {/* Response Quality */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.02)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: 'translateY(0)',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)'
            e.currentTarget.style.boxShadow = '0 12px 48px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(0, 0, 0, 0.04)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.02)'
          }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(168, 85, 247, 0.05) 100%)',
              borderRadius: '0 20px 0 60px'
            }}></div>
            <div style={{ 
              fontSize: '0.75rem', 
              color: 'rgba(55, 65, 81, 0.6)', 
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
              fontWeight: 600,
              letterSpacing: '1px'
            }}>
              AI Response Quality
            </div>
            <div style={{ 
              fontSize: '3rem', 
              fontWeight: 800, 
              marginBottom: '0.75rem',
              background: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.03em'
            }}>
              85.0
            </div>
            <div style={{ 
              fontSize: '0.875rem', 
              color: 'rgba(55, 65, 81, 0.7)',
              fontWeight: 500
            }}>
              Machine learning score • Improving
            </div>
          </div>
        </div>

        {/* Platform Performance */}
        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>
            Platform Performance
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {[
              { name: 'ChatGPT', code: 'CG', queries: 5, mentions: 2, responseTime: 2100, performance: 85 },
              { name: 'Claude', code: 'CL', queries: 5, mentions: 2, responseTime: 2600, performance: 88 },
              { name: 'Gemini', code: 'GM', queries: 5, mentions: 0, responseTime: 2400, performance: 70 }
            ].map(platform => (
              <div key={platform.name} style={{
                background: '#fff',
                border: '1px solid #e5e5e5',
                borderRadius: '12px',
                padding: '1.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: '#000',
                    color: '#fff',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    fontSize: '0.875rem'
                  }}>
                    {platform.code}
                  </div>
                  <div>
                    <div style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                      {platform.name}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#737373' }}>
                      {platform.queries} queries
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Mentions
                    </div>
                    <div style={{ fontSize: '1.125rem', fontWeight: 600 }}>
                      {platform.mentions}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Response Time
                    </div>
                    <div style={{ fontSize: '1.125rem', fontWeight: 600 }}>
                      {platform.responseTime}ms
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#737373', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Performance
                    </div>
                    <div style={{ fontSize: '1.125rem', fontWeight: 600, color: platform.performance >= 80 ? '#15803d' : '#ca8a04' }}>
                      {platform.performance}/100
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Queries */}
        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>
            Top Performing Queries
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { query: 'Amrutam vs Kapiva: Which is better?', mentions: 8, shareOfVoice: 100, score: 85 },
              { query: 'Amrutam vs Gynoveda for PCOS', mentions: 12, shareOfVoice: 100, score: 90 }
            ].map((item, index) => (
              <div key={index} style={{
                background: '#fff',
                border: '1px solid #e5e5e5',
                borderRadius: '12px',
                padding: '1.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    background: '#f5f5f5',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    fontSize: '0.875rem'
                  }}>
                    #{index + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500, marginBottom: '0.5rem', lineHeight: 1.4 }}>
                      {item.query}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#737373' }}>
                      {item.mentions} mentions • 100% share of voice
                    </div>
                  </div>
                  <div style={{
                    padding: '0.375rem 0.75rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    background: '#fef3c7',
                    color: '#92400e'
                  }}>
                    COMPETITIVE
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderPlatformsContent = () => {
    return (
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>
          Platform Performance Analysis
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {[
            { name: 'ChatGPT', code: 'CG', queries: 5, mentions: 2, responseTime: 2100, performance: 85, trend: '+12%' },
            { name: 'Claude', code: 'CL', queries: 5, mentions: 2, responseTime: 2600, performance: 88, trend: '+8%' },
            { name: 'Gemini', code: 'GM', queries: 5, mentions: 0, responseTime: 2400, performance: 70, trend: '+15%' }
          ].map(platform => (
            <div key={platform.name} style={{
              background: '#fff',
              border: '1px solid #e5e5e5',
              borderRadius: '12px',
              padding: '2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: '#000',
                  color: '#fff',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                  fontSize: '1rem'
                }}>
                  {platform.code}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                    {platform.name}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#737373' }}>
                    {platform.queries} queries • {platform.mentions} mentions
                  </div>
                </div>
                <div style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  background: platform.mentions > 0 ? '#f0fdf4' : '#fafafa',
                  color: platform.mentions > 0 ? '#15803d' : '#737373'
                }}>
                  {platform.mentions > 0 ? 'Active' : 'Monitoring'}
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.875rem', color: '#737373', marginBottom: '0.5rem' }}>
                    Performance Score
                  </div>
                  <div style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 700, 
                    color: platform.performance >= 80 ? '#15803d' : '#ca8a04',
                    marginBottom: '0.5rem'
                  }}>
                    {platform.performance}/100
                  </div>
                  <div style={{ 
                    height: '4px', 
                    background: '#f5f5f5', 
                    borderRadius: '2px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${platform.performance}%`,
                      background: platform.performance >= 80 ? '#15803d' : '#ca8a04',
                      borderRadius: '2px'
                    }}></div>
                  </div>
                </div>
                
                <div>
                  <div style={{ fontSize: '0.875rem', color: '#737373', marginBottom: '0.5rem' }}>
                    Avg Response Time
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                    {platform.responseTime}ms
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#15803d', fontWeight: 500 }}>
                    {platform.trend} vs last week
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderQueriesContent = () => {
    return (
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>
          Top Performing Queries
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { query: 'Amrutam vs Kapiva: Which is better for women health?', mentions: 8, shareOfVoice: 100, score: 85, platforms: ['ChatGPT', 'Claude', 'Gemini'] },
            { query: 'Amrutam vs Gynoveda for PCOS treatment', mentions: 12, shareOfVoice: 100, score: 90, platforms: ['ChatGPT', 'Claude', 'Gemini'] },
            { query: 'Best Ayurvedic supplements for hormonal balance', mentions: 0, shareOfVoice: 0, score: 45, platforms: [] }
          ].map((item, index) => (
            <div key={index} style={{
              background: '#fff',
              border: '1px solid #e5e5e5',
              borderRadius: '12px',
              padding: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: item.mentions > 0 ? '#000' : '#f5f5f5',
                  color: item.mentions > 0 ? '#fff' : '#737373',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                  fontSize: '0.875rem'
                }}>
                  #{index + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, marginBottom: '0.5rem', lineHeight: 1.4 }}>
                    {item.query}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#737373' }}>
                    {item.mentions} mentions • {item.shareOfVoice}% share of voice
                  </div>
                </div>
                <div style={{
                  padding: '0.375rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  background: item.mentions > 0 ? '#fef3c7' : '#fafafa',
                  color: item.mentions > 0 ? '#92400e' : '#737373'
                }}>
                  {item.mentions > 0 ? 'COMPETITIVE' : 'OPPORTUNITY'}
                </div>
              </div>
              
              {item.platforms.length > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid #f5f5f5' }}>
                  <span style={{ fontSize: '0.875rem', color: '#737373', fontWeight: 500 }}>
                    Active on:
                  </span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {item.platforms.map(platform => (
                      <span key={platform} style={{
                        padding: '0.25rem 0.5rem',
                        background: '#f5f5f5',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: 500
                      }}>
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderInsightsContent = () => {
    return (
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '2rem' }}>
          <div style={{
            background: '#fff',
            border: '1px solid #e5e5e5',
            borderRadius: '12px',
            padding: '2rem'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>
              Growth Opportunities
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { title: 'Brand Discovery Queries', description: '11,407 unbranded queries represent significant opportunity', impact: 'High', icon: '📈' },
                { title: 'Competitive Positioning', description: 'Strong performance in direct comparisons with 100% SOV', impact: 'Excellent', icon: '⚔️' },
                { title: 'Response Time Optimization', description: 'Average response time could be improved across platforms', impact: 'Medium', icon: '⚡' }
              ].map((item, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  padding: '1rem',
                  background: '#fafafa',
                  borderRadius: '8px'
                }}>
                  <div style={{ fontSize: '1.5rem' }}>
                    {item.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#737373', lineHeight: 1.4 }}>
                      {item.description}
                    </div>
                  </div>
                  <div style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    background: item.impact === 'High' ? '#fef2f2' : item.impact === 'Excellent' ? '#f0fdf4' : '#fefce8',
                    color: item.impact === 'High' ? '#dc2626' : item.impact === 'Excellent' ? '#15803d' : '#ca8a04'
                  }}>
                    {item.impact}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            background: '#000',
            color: '#fff',
            borderRadius: '12px',
            padding: '2rem'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>
              Performance Summary
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  40%
                </div>
                <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                  Overall Visibility
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  20
                </div>
                <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                  Total Mentions
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  2
                </div>
                <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                  Successful Queries
                </div>
              </div>
            </div>
            
            <div>
              <h4 style={{ marginBottom: '1rem', fontWeight: 600 }}>Key Insights</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  'Perfect share of voice when mentioned (100%)',
                  'Strong competitive positioning in direct comparisons',
                  'Claude shows best overall performance',
                  'Opportunity to improve brand discovery presence'
                ].map((insight, index) => (
                  <li key={index} style={{
                    padding: '0.5rem 0',
                    paddingLeft: '1rem',
                    position: 'relative',
                    fontSize: '0.875rem',
                    opacity: 0.9
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      fontWeight: 'bold'
                    }}>•</span>
                    {insight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 4. Query Insights - Risks | Opportunities | Hero
  const renderQueryInsightsContent = () => {
    const insights = {
      risks: [
        { query: 'Natural solutions for digestive issues', issue: 'Zero visibility on Gemini', impact: 'High', recommendation: 'Create targeted content for digestive health' },
        { query: 'Best Ayurvedic supplements', issue: 'Low mention rate (15%)', impact: 'Medium', recommendation: 'Optimize brand positioning in responses' },
        { query: 'Herbal remedies for stress', issue: 'Competitors dominating', impact: 'High', recommendation: 'Strengthen stress-relief content strategy' }
      ],
      opportunities: [
        { query: 'Amrutam vs Kapiva comparison', opportunity: '100% share of voice', potential: 'High', action: 'Expand to similar comparison queries' },
        { query: 'Ashwagandha benefits', opportunity: 'Strong visibility (75%)', potential: 'Medium', action: 'Create content series on key ingredients' },
        { query: 'Women health supplements', opportunity: 'Growing query trend', potential: 'High', action: 'Target female health segment' }
      ],
      heroes: [
        { query: 'Amrutam vs Kapiva: Which is better', score: '100', platforms: 'ChatGPT, Claude', strength: 'Perfect comparative positioning' },
        { query: 'Best immunity supplements Ayurveda', score: '92', platforms: 'ChatGPT', strength: 'Strong brand association with immunity' },
        { query: 'Traditional herbs for modern lifestyle', score: '88', platforms: 'Claude', strength: 'Excellent brand narrative alignment' }
      ]
    }

    return (
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
          
          {/* Risks */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04)'
          }}>
            <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem', fontWeight: '700', color: '#dc2626' }}>
              🚨 Risks & Threats
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {insights.risks.map((risk, index) => (
                <div key={index} style={{
                  padding: '1rem',
                  border: '1px solid #fecaca',
                  borderRadius: '12px',
                  background: 'rgba(254, 226, 226, 0.5)'
                }}>
                  <div style={{ fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    {risk.query}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#dc2626', marginBottom: '0.5rem' }}>
                    {risk.issue}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    Impact: {risk.impact} • {risk.recommendation}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Opportunities */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04)'
          }}>
            <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem', fontWeight: '700', color: '#059669' }}>
              🎯 Opportunities
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {insights.opportunities.map((opp, index) => (
                <div key={index} style={{
                  padding: '1rem',
                  border: '1px solid #a7f3d0',
                  borderRadius: '12px',
                  background: 'rgba(167, 243, 208, 0.5)'
                }}>
                  <div style={{ fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    {opp.query}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#059669', marginBottom: '0.5rem' }}>
                    {opp.opportunity}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    Potential: {opp.potential} • {opp.action}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Heroes */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04)'
          }}>
            <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem', fontWeight: '700', color: '#7c3aed' }}>
              🏆 Hero Queries
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {insights.heroes.map((hero, index) => (
                <div key={index} style={{
                  padding: '1rem',
                  border: '1px solid #c4b5fd',
                  borderRadius: '12px',
                  background: 'rgba(196, 181, 253, 0.5)'
                }}>
                  <div style={{ fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    {hero.query}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#7c3aed', marginBottom: '0.5rem' }}>
                    Score: {hero.score}/100 • {hero.platforms}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    {hero.strength}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 5. Visibility Dashboard with Competitor Insights
  const renderVisibilityDashboardContent = () => {
    return (
      <div>
        {/* Competitor Comparison */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04)'
        }}>
          <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem', fontWeight: '700', color: '#111827' }}>
            Competitive Visibility Analysis
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {[
              { brand: 'Amrutam', visibility: '64%', mentions: '47', color: '#059669', trend: '+8%' },
              { brand: 'Kapiva', visibility: '72%', mentions: '89', color: '#dc2626', trend: '+12%' },
              { brand: 'Gynoveda', visibility: '43%', mentions: '31', color: '#7c3aed', trend: '-3%' },
              { brand: 'Dabur', visibility: '91%', mentions: '156', color: '#ea580c', trend: '+5%' }
            ].map((competitor) => (
              <div key={competitor.brand} style={{
                padding: '1.5rem',
                border: `2px solid ${competitor.color}20`,
                borderRadius: '16px',
                background: `${competitor.color}05`,
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: competitor.color, marginBottom: '0.5rem' }}>
                  {competitor.visibility}
                </div>
                <div style={{ fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.25rem' }}>
                  {competitor.brand}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                  {competitor.mentions} mentions
                </div>
                <div style={{ fontSize: '0.75rem', fontWeight: '600', color: competitor.color }}>
                  {competitor.trend} this month
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform-wise Breakdown */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04)'
        }}>
          <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem', fontWeight: '700', color: '#111827' }}>
            Platform Performance Overview
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
            {[
              { platform: 'ChatGPT', visibility: '68%', queries: '42', topQuery: 'Best immunity supplements', performance: 'Strong' },
              { platform: 'Claude', visibility: '72%', queries: '38', topQuery: 'Amrutam vs Kapiva comparison', performance: 'Excellent' },
              { platform: 'Gemini', visibility: '42%', queries: '47', topQuery: 'Ayurvedic herbs benefits', performance: 'Needs Work' }
            ].map((platform) => (
              <div key={platform.platform} style={{
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.5)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#374151' }}>
                    {platform.platform}
                  </h4>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    background: platform.performance === 'Excellent' ? '#dcfce7' : 
                               platform.performance === 'Strong' ? '#fef3c7' : '#fecaca',
                    color: platform.performance === 'Excellent' ? '#166534' : 
                          platform.performance === 'Strong' ? '#92400e' : '#dc2626'
                  }}>
                    {platform.performance}
                  </span>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Visibility Rate</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>{platform.visibility}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Queries Tested</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>{platform.queries}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Top Query</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', maxWidth: '150px', textAlign: 'right' }}>
                      {platform.topQuery}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderOtherContent = (title, description) => {
    return (
      <div>
        <div style={{
          background: '#fff',
          border: '1px solid #e5e5e5',
          borderRadius: '12px',
          padding: '3rem',
          textAlign: 'center',
          maxWidth: '600px',
          margin: '2rem auto'
        }}>
          <h4 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
            {title}
          </h4>
          <p style={{ color: '#6b7280', marginBottom: '2rem', lineHeight: 1.6 }}>
            {description}
          </p>
          <button style={{
            padding: '0.75rem 1.5rem',
            background: '#111827',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: 'pointer'
          }}>
            Coming Soon
          </button>
        </div>
      </div>
    )
  }

  const renderDataTableContent = () => {

    // Sample data based on your CSV structure
    const sampleData = [
      {
        queryType: 'Branded',
        query: 'Amrutam vs Kapiva: Which is better for women health?',
        category: 'Women Health',
        chatgptMentioned: 'Yes',
        claudeMentioned: 'Yes',
        geminiMentioned: 'No',
        amrutamCount: 8,
        shareOfVoice: 100,
        bestPlatform: 'Claude',
        platformScore: 88,
        queryScore: 85
      },
      {
        queryType: 'Branded',
        query: 'Amrutam vs Gynoveda for PCOS treatment',
        category: 'PCOS',
        chatgptMentioned: 'Yes',
        claudeMentioned: 'Yes',
        geminiMentioned: 'Yes',
        amrutamCount: 12,
        shareOfVoice: 100,
        bestPlatform: 'Claude',
        platformScore: 90,
        queryScore: 90
      },
      {
        queryType: 'Unbranded',
        query: 'Best Ayurvedic supplements for hormonal balance',
        category: 'Hormonal Health',
        chatgptMentioned: 'No',
        claudeMentioned: 'No',
        geminiMentioned: 'No',
        amrutamCount: 0,
        shareOfVoice: 0,
        bestPlatform: 'N/A',
        platformScore: 0,
        queryScore: 45
      },
      {
        queryType: 'Branded',
        query: 'Amrutam Shatavaryadi Churna benefits',
        category: 'Product',
        chatgptMentioned: 'Yes',
        claudeMentioned: 'No',
        geminiMentioned: 'No',
        amrutamCount: 3,
        shareOfVoice: 75,
        bestPlatform: 'ChatGPT',
        platformScore: 82,
        queryScore: 78
      },
      {
        queryType: 'Comparison',
        query: 'Amrutam vs Baidyanath Ayurvedic medicines',
        category: 'Brand Comparison',
        chatgptMentioned: 'Yes',
        claudeMentioned: 'Yes',
        geminiMentioned: 'No',
        amrutamCount: 6,
        shareOfVoice: 85,
        bestPlatform: 'ChatGPT',
        platformScore: 85,
        queryScore: 82
      }
    ]

    const handleSort = (field) => {
      if (sortField === field) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
      } else {
        setSortField(field)
        setSortDirection('asc')
      }
    }

    const filteredAndSortedData = sampleData
      .filter(row => {
        if (filters.queryType !== 'all' && row.queryType !== filters.queryType) return false
        if (filters.platform !== 'all') {
          const platformMentioned = filters.platform === 'ChatGPT' ? row.chatgptMentioned :
                                   filters.platform === 'Claude' ? row.claudeMentioned :
                                   filters.platform === 'Gemini' ? row.geminiMentioned : true
          if (platformMentioned !== 'Yes') return false
        }
        if (filters.amrutamMentioned !== 'all') {
          const mentioned = row.amrutamCount > 0
          if (filters.amrutamMentioned === 'yes' && !mentioned) return false
          if (filters.amrutamMentioned === 'no' && mentioned) return false
        }
        return true
      })
      .sort((a, b) => {
        let aVal = a[sortField]
        let bVal = b[sortField]
        
        // Handle undefined values
        if (aVal === undefined) aVal = ''
        if (bVal === undefined) bVal = ''
        
        if (typeof aVal === 'string') {
          aVal = aVal.toLowerCase()
          bVal = bVal.toLowerCase()
        }
        
        if (sortDirection === 'asc') {
          return aVal < bVal ? -1 : aVal > bVal ? 1 : 0
        } else {
          return aVal > bVal ? -1 : aVal < bVal ? 1 : 0
        }
      })

    return (
      <div>
        {/* Filters */}
        <div style={{
          background: '#fff',
          border: '1px solid #e5e5e5',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>
            Filters & Controls
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.875rem', color: '#374151', marginBottom: '0.5rem', display: 'block', fontWeight: 500 }}>
                Query Type
              </label>
              <select 
                value={filters.queryType}
                onChange={(e) => setFilters({...filters, queryType: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  background: '#fff'
                }}
              >
                <option value="all">All Types</option>
                <option value="Branded">Branded</option>
                <option value="Unbranded">Unbranded</option>
                <option value="Comparison">Comparison</option>
              </select>
            </div>
            
            <div>
              <label style={{ fontSize: '0.875rem', color: '#374151', marginBottom: '0.5rem', display: 'block', fontWeight: 500 }}>
                Platform
              </label>
              <select 
                value={filters.platform}
                onChange={(e) => setFilters({...filters, platform: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  background: '#fff'
                }}
              >
                <option value="all">All Platforms</option>
                <option value="ChatGPT">ChatGPT</option>
                <option value="Claude">Claude</option>
                <option value="Gemini">Gemini</option>
              </select>
            </div>
            
            <div>
              <label style={{ fontSize: '0.875rem', color: '#374151', marginBottom: '0.5rem', display: 'block', fontWeight: 500 }}>
                Amrutam Mentioned
              </label>
              <select 
                value={filters.amrutamMentioned}
                onChange={(e) => setFilters({...filters, amrutamMentioned: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  background: '#fff'
                }}
              >
                <option value="all">All</option>
                <option value="yes">Mentioned</option>
                <option value="no">Not Mentioned</option>
              </select>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'end' }}>
              <button style={{
                padding: '0.5rem 1rem',
                background: '#f3f4f6',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '0.875rem',
                cursor: 'pointer',
                fontWeight: 500
              }}>
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div style={{
          background: '#fff',
          border: '1px solid #e5e5e5',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e5e5' }}>
                  {[
                    { key: 'queryType', label: 'Type' },
                    { key: 'query', label: 'Query' },
                    { key: 'category', label: 'Category' },
                    { key: 'amrutamCount', label: 'Mentions' },
                    { key: 'shareOfVoice', label: 'SOV %' },
                    { key: 'bestPlatform', label: 'Best Platform' },
                    { key: 'platformScore', label: 'Score' },
                    { key: 'chatgptMentioned', label: 'ChatGPT' },
                    { key: 'claudeMentioned', label: 'Claude' },
                    { key: 'geminiMentioned', label: 'Gemini' }
                  ].map(column => (
                    <th 
                      key={column.key}
                      onClick={() => handleSort(column.key)}
                      style={{
                        padding: '0.75rem',
                        textAlign: 'left',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: '#374151',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        cursor: 'pointer',
                        userSelect: 'none'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        {column.label}
                        <span style={{ fontSize: '0.625rem', color: '#9ca3af' }}>
                          {sortField === column.key ? (sortDirection === 'asc' ? '↑' : '↓') : '↕'}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedData.map((row, index) => (
                  <tr key={index} style={{ 
                    borderBottom: '1px solid #f3f4f6',
                    ':hover': { background: '#f9fafb' }
                  }}>
                    <td style={{ padding: '0.75rem', fontSize: '0.875rem' }}>
                      <span style={{
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        background: row.queryType === 'Branded' ? '#fef3c7' : 
                                   row.queryType === 'Unbranded' ? '#e0e7ff' : '#fce7f3',
                        color: row.queryType === 'Branded' ? '#92400e' : 
                               row.queryType === 'Unbranded' ? '#3730a3' : '#be185d'
                      }}>
                        {row.queryType}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem', fontSize: '0.875rem', maxWidth: '300px' }}>
                      <div style={{ 
                        whiteSpace: 'nowrap', 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis',
                        fontWeight: 500
                      }} title={row.query}>
                        {row.query}
                      </div>
                    </td>
                    <td style={{ padding: '0.75rem', fontSize: '0.875rem', color: '#6b7280' }}>
                      {row.category}
                    </td>
                    <td style={{ padding: '0.75rem', fontSize: '0.875rem', fontWeight: 600 }}>
                      {row.amrutamCount}
                    </td>
                    <td style={{ padding: '0.75rem', fontSize: '0.875rem', fontWeight: 600 }}>
                      <span style={{
                        color: row.shareOfVoice >= 80 ? '#15803d' : row.shareOfVoice >= 50 ? '#ca8a04' : '#dc2626'
                      }}>
                        {row.shareOfVoice}%
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem', fontSize: '0.875rem', fontWeight: 500 }}>
                      {row.bestPlatform}
                    </td>
                    <td style={{ padding: '0.75rem', fontSize: '0.875rem', fontWeight: 600 }}>
                      <span style={{
                        color: row.platformScore >= 80 ? '#15803d' : row.platformScore >= 60 ? '#ca8a04' : '#dc2626'
                      }}>
                        {row.platformScore}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                      <span style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        display: 'inline-block',
                        background: row.chatgptMentioned === 'Yes' ? '#15803d' : '#e5e7eb'
                      }}></span>
                    </td>
                    <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                      <span style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        display: 'inline-block',
                        background: row.claudeMentioned === 'Yes' ? '#15803d' : '#e5e7eb'
                      }}></span>
                    </td>
                    <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                      <span style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        display: 'inline-block',
                        background: row.geminiMentioned === 'Yes' ? '#15803d' : '#e5e7eb'
                      }}></span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Table Footer */}
          <div style={{
            padding: '1rem',
            borderTop: '1px solid #e5e5e5',
            background: '#f9fafb',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.875rem',
            color: '#6b7280'
          }}>
            <div>
              Showing {filteredAndSortedData.length} of {sampleData.length} entries
            </div>
            <div>
              Based on Amrutam Analytics Dataset
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 1. Monitoring Home - Platform | Query type | Query - Metric 1 | Metric 2 ... Metric i
  const renderMonitoringHomeContent = () => {
    const homeMetrics = [
      { platform: 'ChatGPT', queryType: 'Product', query: 'Best Ayurvedic supplement for immunity', visibility: '85%', mentions: '12', shareOfVoice: '40%', responseTime: '2.1s', score: '92/100' },
      { platform: 'Claude', queryType: 'Comparison', query: 'Amrutam vs Kapiva which is better', visibility: '100%', mentions: '8', shareOfVoice: '100%', responseTime: '2.6s', score: '88/100' },
      { platform: 'Gemini', queryType: 'Problem', query: 'Natural solution for digestive issues', visibility: '0%', mentions: '0', shareOfVoice: '0%', responseTime: '2.4s', score: '70/100' },
      { platform: 'ChatGPT', queryType: 'Ingredient', query: 'Benefits of Ashwagandha supplements', visibility: '75%', mentions: '6', shareOfVoice: '25%', responseTime: '1.9s', score: '85/100' },
      { platform: 'Claude', queryType: 'Usage', query: 'How to use Ayurvedic herbs daily', visibility: '60%', mentions: '4', shareOfVoice: '15%', responseTime: '3.1s', score: '78/100' }
    ]

    return (
      <div>
        {/* Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Total Queries', value: '127', change: '+12 this week', color: '#3b82f6' },
            { label: 'Avg Visibility', value: '64%', change: '+8% this month', color: '#10b981' },
            { label: 'Platforms Monitored', value: '3', change: 'ChatGPT, Claude, Gemini', color: '#8b5cf6' },
            { label: 'Response Quality', value: '84.6', change: 'AI Score', color: '#f59e0b' }
          ].map((metric, index) => (
            <div key={index} style={{
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '16px',
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: metric.color, marginBottom: '0.5rem' }}>
                {metric.value}
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.25rem' }}>
                {metric.label}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                {metric.change}
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Metrics Table */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04)'
        }}>
          <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>
            Platform Performance Matrix
          </h3>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                  <th style={{ textAlign: 'left', padding: '0.75rem', fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Platform</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem', fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Query Type</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem', fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Query</th>
                  <th style={{ textAlign: 'center', padding: '0.75rem', fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Visibility</th>
                  <th style={{ textAlign: 'center', padding: '0.75rem', fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Mentions</th>
                  <th style={{ textAlign: 'center', padding: '0.75rem', fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Share of Voice</th>
                  <th style={{ textAlign: 'center', padding: '0.75rem', fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Response Time</th>
                  <th style={{ textAlign: 'center', padding: '0.75rem', fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Score</th>
                </tr>
              </thead>
              <tbody>
                {homeMetrics.map((row, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '1rem 0.75rem' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        background: row.platform === 'ChatGPT' ? '#dbeafe' : row.platform === 'Claude' ? '#dcfce7' : '#fef3c7',
                        color: row.platform === 'ChatGPT' ? '#1e40af' : row.platform === 'Claude' ? '#166534' : '#92400e',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }}>
                        {row.platform}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 0.75rem', fontSize: '0.875rem', color: '#374151' }}>{row.queryType}</td>
                    <td style={{ padding: '1rem 0.75rem', fontSize: '0.875rem', color: '#374151', maxWidth: '200px' }}>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {row.query}
                      </div>
                    </td>
                    <td style={{ padding: '1rem 0.75rem', textAlign: 'center' }}>
                      <span style={{
                        color: parseInt(row.visibility) > 50 ? '#059669' : parseInt(row.visibility) > 0 ? '#d97706' : '#dc2626',
                        fontWeight: '600'
                      }}>
                        {row.visibility}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 0.75rem', textAlign: 'center', fontSize: '0.875rem', color: '#374151' }}>{row.mentions}</td>
                    <td style={{ padding: '1rem 0.75rem', textAlign: 'center', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>{row.shareOfVoice}</td>
                    <td style={{ padding: '1rem 0.75rem', textAlign: 'center', fontSize: '0.875rem', color: '#6b7280' }}>{row.responseTime}</td>
                    <td style={{ padding: '1rem 0.75rem', textAlign: 'center' }}>
                      <span style={{
                        color: parseInt(row.score) > 85 ? '#059669' : parseInt(row.score) > 75 ? '#d97706' : '#dc2626',
                        fontWeight: '600'
                      }}>
                        {row.score}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  // 2. Overall Setup Section - Query Manager | Generator | Evaluator
  const renderOverallSetupContent = () => {
    return (
      <div>
        {/* Three Main Setup Sections */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
          
          {/* Query Manager */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04)'
          }}>
            <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem', fontWeight: '700', color: '#111827' }}>
              Query Manager
            </h3>
            <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.875rem', color: '#6b7280' }}>
              Generate, type, or upload queries for monitoring
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button style={{
                padding: '1rem',
                border: '2px dashed #d1d5db',
                borderRadius: '12px',
                background: 'transparent',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.2s ease'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🤖</div>
                <div style={{ fontWeight: '600', color: '#374151' }}>AI Generate Queries</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Auto-generate based on your industry</div>
              </button>
              
              <button style={{
                padding: '1rem',
                border: '2px dashed #d1d5db',
                borderRadius: '12px',
                background: 'transparent',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.2s ease'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✏️</div>
                <div style={{ fontWeight: '600', color: '#374151' }}>Type Manually</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Create custom queries one by one</div>
              </button>
              
              <button style={{
                padding: '1rem',
                border: '2px dashed #d1d5db',
                borderRadius: '12px',
                background: 'transparent',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.2s ease'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📁</div>
                <div style={{ fontWeight: '600', color: '#374151' }}>Upload CSV</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Bulk import from spreadsheet</div>
              </button>
            </div>
            
            <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1e40af', marginBottom: '0.25rem' }}>
                Current Status
              </div>
              <div style={{ fontSize: '0.875rem', color: '#374151' }}>
                127 queries loaded • 5 query types • Ready for processing
              </div>
            </div>
          </div>

          {/* Generator */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04)'
          }}>
            <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem', fontWeight: '700', color: '#111827' }}>
              Generator
            </h3>
            <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.875rem', color: '#6b7280' }}>
              Platform selection, runs, configurations, and prompts
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                  Platform Selection
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {['ChatGPT', 'Claude', 'Gemini'].map(platform => (
                    <span key={platform} style={{
                      padding: '0.5rem 1rem',
                      background: '#10b981',
                      color: '#fff',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>
                      {platform} ✓
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                  Number of Runs
                </label>
                <select style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '0.875rem'
                }}>
                  <option>1 run per query</option>
                  <option>3 runs per query</option>
                  <option>5 runs per query</option>
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                  Prompt Configuration
                </label>
                <textarea style={{
                  width: '100%',
                  height: '80px',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  resize: 'vertical'
                }} placeholder="Enter custom prompt instructions..."></textarea>
              </div>
            </div>
          </div>

          {/* Evaluator */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04)'
          }}>
            <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem', fontWeight: '700', color: '#111827' }}>
              Evaluator
            </h3>
            <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.875rem', color: '#6b7280' }}>
              Post-processing levers and controls
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                  Scoring Weights
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    { label: 'Mention Count', value: '30%' },
                    { label: 'Share of Voice', value: '40%' },
                    { label: 'Response Quality', value: '20%' },
                    { label: 'Response Time', value: '10%' }
                  ].map(weight => (
                    <div key={weight.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.875rem', color: '#374151' }}>{weight.label}</span>
                      <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>{weight.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                  Analysis Filters
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {['Competitive Analysis', 'Sentiment Analysis', 'Brand Positioning', 'Content Quality'].map(filter => (
                    <label key={filter} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input type="checkbox" defaultChecked style={{ margin: 0 }} />
                      <span style={{ fontSize: '0.875rem', color: '#374151' }}>{filter}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button style={{
            padding: '1rem 2rem',
            background: 'linear-gradient(135deg, #000 0%, #374151 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
          }}>
            Start Monitoring Run
          </button>
          <button style={{
            padding: '1rem 2rem',
            background: 'rgba(255, 255, 255, 0.7)',
            color: '#374151',
            border: '1px solid #d1d5db',
            borderRadius: '12px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            Save Configuration
          </button>
        </div>
      </div>
    )
  }

  const renderResponseViewContent = () => {
    // Sample data with full responses based on your CSV structure
    const responseData = [
      {
        queryType: 'Branded',
        query: 'Amrutam vs Kapiva: Which is better for women health?',
        category: 'Women Health',
        amrutamMentioned: true,
        amrutamCount: 8,
        shareOfVoice: 100,
        responses: {
          ChatGPT: {
            mentioned: true,
            responseTime: 2100,
            score: 85,
            response: "Both Amrutam and Kapiva are reputable Ayurvedic brands focusing on women's health. Amrutam offers specialized formulations like Shatavaryadi Churna which is particularly effective for hormonal balance and reproductive health. Their products are known for using high-quality, organic ingredients and traditional Ayurvedic recipes. Kapiva also provides good women's health products, but Amrutam tends to have more targeted solutions for specific women's health concerns. For overall women's wellness, I'd recommend Amrutam for their specialized approach and proven formulations."
          },
          Claude: {
            mentioned: true,
            responseTime: 2600,
            score: 88,
            response: "When comparing Amrutam and Kapiva for women's health, both offer quality Ayurvedic solutions. Amrutam stands out with their research-backed formulations and specific focus on women's reproductive health. Their Shatavaryadi Churna has received excellent reviews for managing PCOS and hormonal imbalances. Kapiva offers a broader range but may not be as specialized. Amrutam's commitment to traditional Ayurvedic principles combined with modern quality standards makes it a preferred choice for women seeking natural health solutions."
          },
          Gemini: {
            mentioned: false,
            responseTime: 2400,
            score: 0,
            response: "Both brands offer Ayurvedic products for women's health. Kapiva has a wide range of products including immunity boosters and digestive aids. For women's health specifically, you should consider factors like ingredient quality, third-party testing, and customer reviews. Both brands have their strengths - Kapiva for variety and accessibility, while other brands may focus more on specific women's health concerns. I'd recommend consulting with an Ayurvedic practitioner to determine which products align best with your specific health needs."
          }
        }
      },
      {
        queryType: 'Branded',
        query: 'Amrutam vs Gynoveda for PCOS treatment',
        category: 'PCOS',
        amrutamMentioned: true,
        amrutamCount: 12,
        shareOfVoice: 100,
        responses: {
          ChatGPT: {
            mentioned: true,
            responseTime: 1950,
            score: 82,
            response: "For PCOS treatment, both Amrutam and Gynoveda offer targeted solutions. Amrutam's Shatavaryadi Churna is specifically formulated for PCOS and contains ingredients like Shatavari, Ashoka, and other herbs known for hormonal balance. Their approach focuses on traditional Ayurvedic principles with proven results. Gynoveda also specializes in women's health but with a more modern approach. Amrutam's advantage lies in their deeper understanding of classical Ayurvedic formulations and their effectiveness for PCOS management."
          },
          Claude: {
            mentioned: true,
            responseTime: 2200,
            score: 90,
            response: "Both Amrutam and Gynoveda are excellent choices for PCOS management through Ayurveda. Amrutam offers the Shatavaryadi Churna, which has shown remarkable results in regulating menstrual cycles and managing PCOS symptoms. Their formulation is based on ancient Ayurvedic texts and uses high-quality, organic ingredients. Gynoveda provides a comprehensive PCOS care system with multiple products. However, Amrutam's focused approach with their specialized churna, combined with their traditional preparation methods, often yields more consistent results for PCOS management."
          },
          Gemini: {
            mentioned: true,
            responseTime: 2350,
            score: 75,
            response: "PCOS management requires a holistic approach, and both Amrutam and Gynoveda offer Ayurvedic solutions. Amrutam's products are known for their traditional formulations, particularly their Shatavaryadi Churna which contains beneficial herbs for hormonal balance. Gynoveda takes a more systematic approach with their PCOS care kits. The choice depends on your preference for traditional vs. modern Ayurvedic approaches. Amrutam may be better for those seeking time-tested formulations, while Gynoveda might appeal to those wanting a more structured treatment plan."
          }
        }
      },
      {
        queryType: 'Unbranded',
        query: 'Best Ayurvedic supplements for hormonal balance',
        category: 'Hormonal Health',
        amrutamMentioned: false,
        amrutamCount: 0,
        shareOfVoice: 0,
        responses: {
          ChatGPT: {
            mentioned: false,
            responseTime: 1800,
            score: 0,
            response: "For hormonal balance, several Ayurvedic supplements are effective: Shatavari is excellent for women's reproductive health, Ashwagandha helps with stress-related hormonal issues, and Brahmi supports cognitive function. Look for supplements that combine multiple herbs for synergistic effects. Brands like Himalaya, Organic India, and Banyan Botanicals offer quality options. Always consult with an Ayurvedic practitioner for personalized recommendations based on your specific hormonal concerns."
          },
          Claude: {
            mentioned: false,
            responseTime: 2100,
            score: 0,
            response: "Ayurvedic supplements for hormonal balance include key herbs like Shatavari (supports female reproductive health), Ashoka (regulates menstrual cycles), Lodhra (hormonal stability), and Ashwagandha (stress hormones). Combination formulas often work better than single herbs. Reputable brands include Himalaya, Organic India, and traditional companies. Quality matters significantly - look for organic, third-party tested products. Consider consulting an Ayurvedic doctor for a personalized approach to your hormonal health needs."
          },
          Gemini: {
            mentioned: false,
            responseTime: 1950,
            score: 0,
            response: "Several Ayurvedic herbs support hormonal balance: Shatavari for reproductive health, Ashwagandha for stress hormones, Triphala for digestive health (which affects hormones), and Guggul for thyroid support. Popular supplement brands include Himalaya Wellness, Organic India, and Dabur. Choose standardized extracts when possible and ensure third-party testing. Since hormonal issues can be complex, it's advisable to work with a qualified Ayurvedic practitioner who can recommend specific herbs and dosages for your individual constitution and needs."
          }
        }
      }
    ]

    const filteredQueries = responseData.filter(item => {
      if (responseFilters.queryType !== 'all' && item.queryType !== responseFilters.queryType) return false
      if (responseFilters.amrutamMentioned !== 'all') {
        const mentioned = item.amrutamMentioned
        if (responseFilters.amrutamMentioned === 'yes' && !mentioned) return false
        if (responseFilters.amrutamMentioned === 'no' && mentioned) return false
      }
      return true
    })

    const currentQuery = filteredQueries[selectedQuery] || filteredQueries[0]

    return (
      <div>
        {/* Query Selection and Filters */}
        <div style={{
          background: '#fff',
          border: '1px solid #e5e5e5',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem', alignItems: 'end' }}>
            <div>
              <label style={{ fontSize: '0.875rem', color: '#374151', marginBottom: '0.5rem', display: 'block', fontWeight: 500 }}>
                Select Query to Analyze
              </label>
              <select 
                value={selectedQuery}
                onChange={(e) => setSelectedQuery(parseInt(e.target.value))}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  background: '#fff'
                }}
              >
                {filteredQueries.map((item, index) => (
                  <option key={index} value={index}>
                    {item.query.length > 60 ? item.query.substring(0, 60) + '...' : item.query}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label style={{ fontSize: '0.875rem', color: '#374151', marginBottom: '0.5rem', display: 'block', fontWeight: 500 }}>
                Query Type
              </label>
              <select 
                value={responseFilters.queryType}
                onChange={(e) => {
                  setResponseFilters({...responseFilters, queryType: e.target.value})
                  setSelectedQuery(0)
                }}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  background: '#fff'
                }}
              >
                <option value="all">All Types</option>
                <option value="Branded">Branded</option>
                <option value="Unbranded">Unbranded</option>
                <option value="Comparison">Comparison</option>
              </select>
            </div>
            
            <div>
              <label style={{ fontSize: '0.875rem', color: '#374151', marginBottom: '0.5rem', display: 'block', fontWeight: 500 }}>
                Amrutam Mentioned
              </label>
              <select 
                value={responseFilters.amrutamMentioned}
                onChange={(e) => {
                  setResponseFilters({...responseFilters, amrutamMentioned: e.target.value})
                  setSelectedQuery(0)
                }}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  background: '#fff'
                }}
              >
                <option value="all">All</option>
                <option value="yes">Mentioned</option>
                <option value="no">Not Mentioned</option>
              </select>
            </div>
          </div>
        </div>

        {/* Query Details */}
        {currentQuery && (
          <div style={{
            background: '#fff',
            border: '1px solid #e5e5e5',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', lineHeight: 1.4 }}>
                  {currentQuery.query}
                </h3>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    background: currentQuery.queryType === 'Branded' ? '#fef3c7' : 
                               currentQuery.queryType === 'Unbranded' ? '#e0e7ff' : '#fce7f3',
                    color: currentQuery.queryType === 'Branded' ? '#92400e' : 
                           currentQuery.queryType === 'Unbranded' ? '#3730a3' : '#be185d'
                  }}>
                    {currentQuery.queryType}
                  </span>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    {currentQuery.category}
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827' }}>
                    {currentQuery.amrutamCount}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase' }}>
                    Mentions
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 700, 
                    color: currentQuery.shareOfVoice >= 80 ? '#15803d' : currentQuery.shareOfVoice >= 50 ? '#ca8a04' : '#dc2626'
                  }}>
                    {currentQuery.shareOfVoice}%
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase' }}>
                    Share of Voice
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Platform Responses */}
        {currentQuery && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
            {Object.entries(currentQuery.responses).map(([platform, data]) => (
              <div key={platform} style={{
                background: '#fff',
                border: `2px solid ${data.mentioned ? '#15803d' : '#e5e7eb'}`,
                borderRadius: '12px',
                padding: '1.5rem',
                position: 'relative'
              }}>
                {/* Platform Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <h4 style={{ fontSize: '1.125rem', fontWeight: 600, margin: 0 }}>
                      {platform}
                    </h4>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: data.mentioned ? '#15803d' : '#e5e7eb'
                    }}></div>
                  </div>
                  <div style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    background: data.mentioned ? '#f0fdf4' : '#fafafa',
                    color: data.mentioned ? '#15803d' : '#737373'
                  }}>
                    {data.mentioned ? 'MENTIONED' : 'NOT MENTIONED'}
                  </div>
                </div>

                {/* Performance Metrics */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Response Time
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: 600 }}>
                      {data.responseTime}ms
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Score
                    </div>
                    <div style={{ 
                      fontSize: '1rem', 
                      fontWeight: 600,
                      color: data.score >= 80 ? '#15803d' : data.score >= 60 ? '#ca8a04' : data.score > 0 ? '#dc2626' : '#9ca3af'
                    }}>
                      {data.score}/100
                    </div>
                  </div>
                </div>

                {/* Response Text */}
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem' }}>
                    Response
                  </div>
                  <div style={{
                    fontSize: '0.875rem',
                    lineHeight: 1.6,
                    color: '#374151',
                    background: '#f9fafb',
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1px solid #f3f4f6',
                    maxHeight: '200px',
                    overflowY: 'auto'
                  }}>
                    {data.response}
                  </div>
                </div>

                {/* Amrutam Highlight */}
                {data.mentioned && (
                  <div style={{
                    position: 'absolute',
                    top: '-1px',
                    right: '-1px',
                    background: '#15803d',
                    color: '#fff',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '0 12px 0 8px',
                    fontSize: '0.75rem',
                    fontWeight: 600
                  }}>
                    AMRUTAM ✓
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Navigation Controls */}
        {filteredQueries.length > 1 && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginTop: '2rem',
            padding: '1rem'
          }}>
            <button
              onClick={() => setSelectedQuery(Math.max(0, selectedQuery - 1))}
              disabled={selectedQuery === 0}
              style={{
                padding: '0.5rem 1rem',
                background: selectedQuery === 0 ? '#f3f4f6' : '#111827',
                color: selectedQuery === 0 ? '#9ca3af' : '#fff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.875rem',
                cursor: selectedQuery === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              ← Previous Query
            </button>
            <span style={{ 
              display: 'flex', 
              alignItems: 'center', 
              fontSize: '0.875rem', 
              color: '#6b7280',
              padding: '0 1rem'
            }}>
              {selectedQuery + 1} of {filteredQueries.length}
            </span>
            <button
              onClick={() => setSelectedQuery(Math.min(filteredQueries.length - 1, selectedQuery + 1))}
              disabled={selectedQuery === filteredQueries.length - 1}
              style={{
                padding: '0.5rem 1rem',
                background: selectedQuery === filteredQueries.length - 1 ? '#f3f4f6' : '#111827',
                color: selectedQuery === filteredQueries.length - 1 ? '#9ca3af' : '#fff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.875rem',
                cursor: selectedQuery === filteredQueries.length - 1 ? 'not-allowed' : 'pointer'
              }}
            >
              Next Query →
            </button>
          </div>
        )}
      </div>
    )
  }

  const renderProfileContent = () => {
    return (
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
          <div style={{
            background: '#fff',
            border: '1px solid #e5e5e5',
            borderRadius: '12px',
            padding: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: '#000',
                color: '#fff',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 600
              }}>
                A
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                  Amrutam Team
                </h3>
                <p style={{ margin: 0, color: '#737373', fontSize: '0.875rem' }}>
                  admin@amrutam.co.in
                </p>
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.875rem', color: '#737373', marginBottom: '0.5rem', display: 'block' }}>
                  Organization
                </label>
                <div style={{ fontSize: '1rem', fontWeight: 500 }}>
                  Amrutam Healthcare
                </div>
              </div>
              <div>
                <label style={{ fontSize: '0.875rem', color: '#737373', marginBottom: '0.5rem', display: 'block' }}>
                  Plan
                </label>
                <div style={{ fontSize: '1rem', fontWeight: 500 }}>
                  Enterprise Pro
                </div>
              </div>
              <div>
                <label style={{ fontSize: '0.875rem', color: '#737373', marginBottom: '0.5rem', display: 'block' }}>
                  Member Since
                </label>
                <div style={{ fontSize: '1rem', fontWeight: 500 }}>
                  January 2024
                </div>
              </div>
              <div>
                <label style={{ fontSize: '0.875rem', color: '#737373', marginBottom: '0.5rem', display: 'block' }}>
                  Usage
                </label>
                <div style={{ fontSize: '1rem', fontWeight: 500 }}>
                  2,450 / 5,000 queries
                </div>
              </div>
            </div>
          </div>

          <div style={{
            background: '#fff',
            border: '1px solid #e5e5e5',
            borderRadius: '12px',
            padding: '2rem'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>
              Recent Activity
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { action: 'Monitoring run completed', time: '2 hours ago', type: 'success' },
                { action: 'New competitor analysis', time: '1 day ago', type: 'info' },
                { action: 'Profile updated', time: '3 days ago', type: 'neutral' }
              ].map((activity, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: '#fafafa',
                  borderRadius: '8px'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: activity.type === 'success' ? '#15803d' : activity.type === 'info' ? '#0ea5e9' : '#737373'
                  }}></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500, marginBottom: '0.25rem' }}>
                      {activity.action}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#737373' }}>
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderSettingsContent = () => {
    return (
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
          <div style={{
            background: '#fff',
            border: '1px solid #e5e5e5',
            borderRadius: '12px',
            padding: '2rem'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>
              Account Settings
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { label: 'Email Notifications', description: 'Receive alerts when monitoring is complete', enabled: true },
                { label: 'Weekly Reports', description: 'Get summary reports every Monday', enabled: true },
                { label: 'API Access', description: 'Enable programmatic access to your data', enabled: false },
                { label: 'Data Export', description: 'Allow CSV and JSON data exports', enabled: true }
              ].map((setting, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem',
                  background: '#fafafa',
                  borderRadius: '8px'
                }}>
                  <div>
                    <div style={{ fontWeight: 500, marginBottom: '0.25rem' }}>
                      {setting.label}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#737373' }}>
                      {setting.description}
                    </div>
                  </div>
                  <div style={{
                    width: '44px',
                    height: '24px',
                    borderRadius: '12px',
                    background: setting.enabled ? '#000' : '#d4d4d4',
                    position: 'relative',
                    cursor: 'pointer'
                  }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: '#fff',
                      position: 'absolute',
                      top: '2px',
                      left: setting.enabled ? '22px' : '2px',
                      transition: 'left 0.2s ease'
                    }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            background: '#fff',
            border: '1px solid #e5e5e5',
            borderRadius: '12px',
            padding: '2rem'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>
              Monitoring Configuration
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.875rem', color: '#737373', marginBottom: '0.5rem', display: 'block' }}>
                  Default Query Frequency
                </label>
                <select style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d4d4d4',
                  borderRadius: '6px',
                  fontSize: '0.875rem'
                }}>
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>
              
              <div>
                <label style={{ fontSize: '0.875rem', color: '#737373', marginBottom: '0.5rem', display: 'block' }}>
                  Platforms to Monitor
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {['ChatGPT', 'Claude', 'Gemini', 'Perplexity'].map(platform => (
                    <label key={platform} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input type="checkbox" defaultChecked={platform !== 'Perplexity'} />
                      <span style={{ fontSize: '0.875rem' }}>{platform}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderLogoutContent = () => {
    return (
      <div>
        <div style={{
          background: '#fff',
          border: '1px solid #e5e5e5',
          borderRadius: '12px',
          padding: '3rem',
          textAlign: 'center',
          maxWidth: '400px',
          margin: '2rem auto'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👋</div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Sign Out
          </h3>
          <p style={{ color: '#737373', marginBottom: '2rem', lineHeight: 1.5 }}>
            Are you sure you want to sign out of your Vizup account? Your monitoring will continue running in the background.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button style={{
              padding: '0.75rem 1.5rem',
              background: '#fff',
              border: '1px solid #d4d4d4',
              borderRadius: '6px',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer'
            }}>
              Cancel
            </button>
            <button style={{
              padding: '0.75rem 1.5rem',
              background: '#000',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer'
            }}>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#fafafa',
      display: 'flex',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", sans-serif'
    }}>
      {/* Left Navigation Panel */}
      <div style={{
        width: leftPanelCollapsed ? '60px' : '240px',
        background: '#fff',
        borderRight: '1px solid #e5e5e5',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        height: '100vh',
        zIndex: 100,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        {/* Logo Section */}
        <div style={{
          padding: leftPanelCollapsed ? '1.5rem 0.5rem' : '1.5rem 1.5rem',
          borderBottom: '1px solid #e5e5e5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: leftPanelCollapsed ? 'center' : 'space-between',
          minHeight: '80px'
        }}>
          {!leftPanelCollapsed ? (
            <>
              <div>
                <div style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  letterSpacing: '-0.5px',
                  color: '#000'
                }}>
                  Vizup
                </div>
                <div style={{
                  fontSize: '11px',
                  color: '#737373',
                  marginTop: '2px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  AI Visibility Platform
                </div>
              </div>
              <button
                onClick={() => setLeftPanelCollapsed(true)}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '4px',
                  background: 'transparent',
                  border: '1px solid #e5e5e5',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  color: '#6b7280',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#f9fafb'
                  e.target.style.borderColor = '#d1d5db'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent'
                  e.target.style.borderColor = '#e5e5e5'
                }}
                title="Collapse sidebar"
              >
                ←
              </button>
            </>
          ) : (
            <button
              onClick={() => setLeftPanelCollapsed(false)}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                color: '#1e293b',
                transition: 'all 0.2s ease',
                fontWeight: 600
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#e2e8f0'
                e.target.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#f8fafc'
                e.target.style.transform = 'scale(1)'
              }}
              title="Expand sidebar"
            >
              V
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <div style={{
          padding: leftPanelCollapsed ? '1.5rem 0.5rem' : '1.5rem 1rem',
          flex: 1,
          overflowY: 'auto'
        }}>
          <div style={{ marginBottom: '2rem' }}>
            {navigationStructure.map(section => (
              <div key={section.id} style={{ marginBottom: '0.25rem' }}>
                {section.type === 'single' ? (
                  <button
                    onClick={() => setActiveSection(section.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: leftPanelCollapsed ? 'center' : 'flex-start',
                      padding: leftPanelCollapsed ? '0.75rem 0.5rem' : '0.75rem 1rem',
                      borderRadius: '6px',
                      color: activeSection === section.id ? '#fff' : '#374151',
                      textDecoration: 'none',
                      transition: 'all 0.15s ease',
                      marginBottom: '0.25rem',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: activeSection === section.id ? 500 : 400,
                      border: 'none',
                      background: activeSection === section.id ? '#111827' : 'transparent',
                      width: '100%',
                      textAlign: 'left',
                      position: 'relative'
                    }}
                    onMouseEnter={(e) => {
                      if (activeSection !== section.id) {
                        e.target.style.background = '#f9fafb'
                        e.target.style.color = '#111827'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeSection !== section.id) {
                        e.target.style.background = 'transparent'
                        e.target.style.color = '#374151'
                      }
                    }}
                    title={leftPanelCollapsed ? section.label : ''}
                  >
                    {leftPanelCollapsed ? (
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        background: activeSection === section.id ? '#f1f5f9' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: activeSection === section.id ? '#1e293b' : '#64748b'
                      }}>
                        {section.id === 'dashboard' ? '⌘' : 
                         section.id === 'optimize' ? '⚡' : 
                         section.id === 'digital-presence' ? '◉' : 
                         section.id === 'attribution' ? '◈' : '●'}
                      </div>
                    ) : (
                      <>
                        <span>{section.label}</span>
                        {section.id === 'dashboard' && (
                          <span style={{
                            marginLeft: 'auto',
                            padding: '2px 8px',
                            background: activeSection === section.id ? '#374151' : '#f3f4f6',
                            color: activeSection === section.id ? '#fff' : '#6b7280',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: 500
                          }}>
                            5
                          </span>
                        )}
                      </>
                    )}
                  </button>
                ) : (
                  <div>
                    {/* Parent section */}
                    <button
                      onClick={() => leftPanelCollapsed ? setActiveSection('monitor-overview') : toggleSection(section.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: leftPanelCollapsed ? 'center' : 'flex-start',
                        padding: leftPanelCollapsed ? '0.75rem 0.5rem' : '0.75rem 1rem',
                        borderRadius: '6px',
                        color: '#374151',
                        textDecoration: 'none',
                        transition: 'all 0.15s ease',
                        marginBottom: '0.25rem',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 400,
                        border: 'none',
                        background: 'transparent',
                        width: '100%',
                        textAlign: 'left'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = '#f9fafb'
                        e.target.style.color = '#111827'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'transparent'
                        e.target.style.color = '#374151'
                      }}
                      title={leftPanelCollapsed ? section.label : ''}
                    >
                      {leftPanelCollapsed ? (
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '6px',
                          background: activeSection.startsWith('monitor') ? '#f1f5f9' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '14px',
                          fontWeight: 600,
                          color: activeSection.startsWith('monitor') ? '#1e293b' : '#64748b'
                        }}>
                          ◎
                        </div>
                      ) : (
                        <>
                          <span>{section.label}</span>
                          <span style={{
                            marginLeft: 'auto',
                            fontSize: '10px',
                            color: '#9ca3af',
                            transform: expandedSections[section.id] ? 'rotate(90deg)' : 'rotate(0deg)',
                            transition: 'transform 0.15s ease'
                          }}>
                            ▶
                          </span>
                        </>
                      )}
                    </button>
                    
                    {/* Child sections */}
                    {expandedSections[section.id] && !leftPanelCollapsed && (
                      <div style={{ marginLeft: '1rem', marginBottom: '0.5rem' }}>
                        {section.children.map(child => (
                          <button
                            key={child.id}
                            onClick={() => setActiveSection(child.id)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              padding: '0.5rem 0.75rem',
                              borderRadius: '4px',
                              color: activeSection === child.id ? '#fff' : '#6b7280',
                              textDecoration: 'none',
                              transition: 'all 0.15s ease',
                              marginBottom: '0.125rem',
                              cursor: 'pointer',
                              fontSize: '13px',
                              fontWeight: activeSection === child.id ? 500 : 400,
                              border: 'none',
                              background: activeSection === child.id ? '#111827' : 'transparent',
                              width: '100%',
                              textAlign: 'left'
                            }}
                            onMouseEnter={(e) => {
                              if (activeSection !== child.id) {
                                e.target.style.background = '#f3f4f6'
                                e.target.style.color = '#374151'
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (activeSection !== child.id) {
                                e.target.style.background = 'transparent'
                                e.target.style.color = '#6b7280'
                              }
                            }}
                          >
                            <span>{child.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* User Account Section */}
        <div style={{
          padding: '1rem',
          borderTop: '1px solid #e5e5e5'
        }}>
          {/* Status Indicator */}
          {!leftPanelCollapsed && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              background: '#f0fdf4',
              border: '1px solid #dcfce7',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 500,
              marginBottom: '1rem'
            }}>
              <div style={{
                width: '6px',
                height: '6px',
                background: '#16a34a',
                borderRadius: '50%'
              }}></div>
              <span style={{ color: '#15803d' }}>Live Monitoring Active</span>
            </div>
          )}

          {/* User Account Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
            {[
              { id: 'profile', label: 'Profile' },
              { id: 'settings', label: 'Settings' },
              { id: 'logout', label: 'Sign Out' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: leftPanelCollapsed ? 'center' : 'flex-start',
                  padding: leftPanelCollapsed ? '0.75rem 0.5rem' : '0.5rem 1rem',
                  borderRadius: '4px',
                  color: activeSection === item.id ? '#fff' : '#6b7280',
                  textDecoration: 'none',
                  transition: 'all 0.15s ease',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: activeSection === item.id ? 500 : 400,
                  border: 'none',
                  background: activeSection === item.id ? '#111827' : 'transparent',
                  width: '100%',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== item.id) {
                    e.target.style.background = '#f3f4f6'
                    e.target.style.color = '#374151'
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== item.id) {
                    e.target.style.background = 'transparent'
                    e.target.style.color = '#6b7280'
                  }
                }}
                title={leftPanelCollapsed ? item.label : ''}
              >
                {leftPanelCollapsed ? (
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '4px',
                    background: activeSection === item.id ? '#f1f5f9' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: activeSection === item.id ? '#1e293b' : '#64748b'
                  }}>
                    {item.id === 'profile' ? '◐' : item.id === 'settings' ? '◑' : '◈'}
                  </div>
                ) : (
                  <span>{item.label}</span>
                )}
                {item.id === 'logout' && (
                  <span style={{
                    marginLeft: 'auto',
                    fontSize: '11px',
                    color: '#9ca3af'
                  }}>
                    ⌘Q
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{
        flex: 1,
        marginLeft: leftPanelCollapsed ? '60px' : '240px',
        marginRight: rightPanelCollapsed ? '0' : '360px',
        display: 'flex',
        flexDirection: 'column',
        transition: 'margin 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>

        {/* Modern AI-Era Content */}
        <div style={{ 
          padding: '0',
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
          flex: 1,
          overflowY: 'auto',
          position: 'relative'
        }}>
          {/* Floating Action Button */}
          <div style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            <button 
              onClick={onNewAnalysis}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #000 0%, #374151 100%)',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: 'translateY(0)',
                backdropFilter: 'blur(8px)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-4px)'
                e.target.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.16), 0 8px 24px rgba(0, 0, 0, 0.12)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08)'
              }}
              title="New AI Analysis"
            >
              ⚡
            </button>
            <button 
              onClick={onEditInputs}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.9)',
                color: '#374151',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                backdropFilter: 'blur(8px)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 1)'
                e.target.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.9)'
                e.target.style.transform = 'scale(1)'
              }}
              title="Edit Setup"
            >
              ⚙
            </button>
          </div>

                  {/* Dynamic Page Header with Glass Effect */}
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(20px)',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                    padding: '1.5rem 2rem 1rem',
                    position: 'sticky',
                    top: 0,
                    zIndex: 100,
                    marginBottom: '0'
                  }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
              <div style={{
                width: '8px',
                height: '32px',
                background: 'linear-gradient(135deg, #000 0%, #374151 100%)',
                borderRadius: '4px'
              }}></div>
              <h1 style={{ 
                margin: 0, 
                fontSize: '2rem', 
                fontWeight: 700,
                background: 'linear-gradient(135deg, #000 0%, #374151 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em'
              }}>
                        {activeSection === 'dashboard' ? 'AI Visibility Intelligence' :
                         activeSection === 'monitor-home' ? 'Monitoring Home' :
                         activeSection === 'overall-setup' ? 'Overall Setup' :
                         activeSection === 'raw-data' ? 'Raw Data Management' :
                         activeSection === 'response-view' ? 'Response View Intelligence' :
                         activeSection === 'query-insights' ? 'Query Insights & Analysis' :
                         activeSection === 'visibility-dashboard' ? 'Visibility Dashboard' :
                 activeSection === 'optimize' ? 'Optimization Engine' :
                 activeSection === 'digital-presence' ? 'Digital Presence AI' :
                 activeSection === 'attribution' ? 'Attribution Intelligence' :
                 activeSection === 'profile' ? 'User Profile' :
                 activeSection === 'settings' ? 'Account Settings' :
                 activeSection === 'logout' ? 'Sign Out' :
                 'AI Visibility Platform'}
              </h1>
            </div>
            <div style={{ 
              fontSize: '0.875rem', 
              color: 'rgba(55, 65, 81, 0.7)', 
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
                      {['monitor-home', 'overall-setup', 'raw-data', 'response-view', 'query-insights', 'visibility-dashboard'].includes(activeSection) ? (
                        <>
                          <span style={{ opacity: 0.6 }}>Monitor</span>
                          <div style={{
                            width: '4px',
                            height: '4px',
                            borderRadius: '50%',
                            background: 'rgba(55, 65, 81, 0.3)'
                          }}></div>
                          <span style={{ fontWeight: 600, color: '#111827' }}>
                            {activeSection === 'monitor-home' ? 'Home' :
                             activeSection === 'overall-setup' ? 'Overall Setup' :
                             activeSection === 'raw-data' ? 'Raw Data' :
                             activeSection === 'response-view' ? 'Response View' :
                             activeSection === 'query-insights' ? 'Query Insights' :
                             activeSection === 'visibility-dashboard' ? 'Visibility Dashboard' : ''}
                          </span>
                        </>
                      ) : (
                <span style={{ fontWeight: 600, color: '#111827' }}>
                  {activeSection === 'dashboard' ? 'Real-time AI monitoring and analytics' :
                   activeSection === 'optimize' ? 'AI-powered optimization recommendations' :
                   activeSection === 'digital-presence' ? 'Automated digital presence management' :
                   activeSection === 'attribution' ? 'AI visibility impact measurement' :
                   activeSection === 'profile' ? 'Account management' :
                   activeSection === 'settings' ? 'Platform configuration' :
                   activeSection === 'logout' ? 'Session management' : 'AI-powered visibility insights'}
                </span>
              )}
            </div>
          </div>

                  {/* Main Content Container */}
                  <div style={{
                    padding: '1.5rem 2rem 2rem',
                    maxWidth: '1400px',
                    margin: '0 auto'
                  }}>
                  {/* Render content based on active section */}
                  {activeSection === 'dashboard' && renderOverviewContent()}
                  {activeSection === 'monitor-home' && renderMonitoringHomeContent()}
                  {activeSection === 'overall-setup' && renderOverallSetupContent()}
                  {activeSection === 'raw-data' && renderDataTableContent()}
                  {activeSection === 'response-view' && renderResponseViewContent()}
                  {activeSection === 'query-insights' && renderQueryInsightsContent()}
                  {activeSection === 'visibility-dashboard' && renderVisibilityDashboardContent()}
          {activeSection === 'optimize' && renderOtherContent('Optimization Center', 'AI-powered recommendations to improve your visibility across platforms and enhance your digital presence.')}
          {activeSection === 'digital-presence' && renderOtherContent('Digital Presence Management', 'Manage your brand presence across multiple digital platforms with automated monitoring and response suggestions.')}
          {activeSection === 'attribution' && renderOtherContent('Attribution Analytics', 'Track the impact of your AI visibility efforts on business metrics and customer acquisition.')}
          {activeSection === 'profile' && renderProfileContent()}
          {activeSection === 'settings' && renderSettingsContent()}
          {activeSection === 'logout' && renderLogoutContent()}
          </div>
        </div>
      </div>

      {/* Right AI Agent Panel */}
      <div style={{
        width: rightPanelCollapsed ? '0' : '360px',
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
        position: 'fixed',
        right: 0,
        top: 0,
        height: '100vh',
        zIndex: 100,
        boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.04), -4px 0 16px rgba(0, 0, 0, 0.02)',
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* AI Agent Header */}
        <div style={{
          padding: '1.5rem 1.5rem 1rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          background: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #000 0%, #374151 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '16px',
                fontWeight: 600,
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
              }}>
                AI
              </div>
              <div>
                <div style={{ 
                  fontSize: '18px', 
                  fontWeight: 700, 
                  color: '#111827',
                  background: 'linear-gradient(135deg, #000 0%, #374151 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.02em'
                }}>
                  Vizup Assistant
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>
                  AI Visibility Expert
                </div>
              </div>
            </div>
            <button
              onClick={() => setRightPanelCollapsed(!rightPanelCollapsed)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                color: '#6b7280',
                transition: 'all 0.2s ease',
                backdropFilter: 'blur(8px)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.8)'
                e.target.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.6)'
                e.target.style.transform = 'scale(1)'
              }}
              title="Collapse AI assistant"
            >
              →
            </button>
          </div>
          <div style={{
            padding: '0.5rem 0.75rem',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            borderRadius: '8px',
            fontSize: '11px',
            fontWeight: 600,
            color: '#059669',
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            ● Live Analysis Active
          </div>
        </div>

        {/* AI Agent Messages */}
        <div style={{
          flex: 1,
          padding: '1.5rem',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          background: 'rgba(248, 250, 252, 0.3)'
        }}>
          {agentMessages.map((message, index) => (
            <div key={index} style={{
              padding: '1rem 1.25rem',
              borderRadius: '16px',
              background: message.type === 'agent' 
                ? 'rgba(255, 255, 255, 0.7)' 
                : message.type === 'suggestion'
                ? 'rgba(254, 243, 199, 0.8)'
                : 'rgba(239, 246, 255, 0.8)',
              border: `1px solid ${
                message.type === 'agent' 
                  ? 'rgba(255, 255, 255, 0.3)' 
                  : message.type === 'suggestion'
                  ? 'rgba(253, 230, 138, 0.4)'
                  : 'rgba(191, 219, 254, 0.4)'
              }`,
              fontSize: '0.875rem',
              lineHeight: 1.6,
              color: '#374151',
              backdropFilter: 'blur(8px)',
              boxShadow: message.type === 'agent' 
                ? '0 2px 8px rgba(0, 0, 0, 0.04)' 
                : '0 2px 8px rgba(245, 158, 11, 0.1)',
              position: 'relative',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.boxShadow = message.type === 'agent' 
                ? '0 4px 16px rgba(0, 0, 0, 0.08)' 
                : '0 4px 16px rgba(245, 158, 11, 0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = message.type === 'agent' 
                ? '0 2px 8px rgba(0, 0, 0, 0.04)' 
                : '0 2px 8px rgba(245, 158, 11, 0.1)'
            }}
            >
              {message.type === 'suggestion' && (
                <div style={{
                  position: 'absolute',
                  top: '-6px',
                  left: '12px',
                  padding: '2px 8px',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: '#fff',
                  fontSize: '10px',
                  fontWeight: 600,
                  borderRadius: '6px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Insight
                </div>
              )}
              {message.content}
            </div>
          ))}
        </div>

        {/* AI Agent Input */}
        <div style={{
          padding: '1.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          background: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end' }}>
            <div style={{ flex: 1 }}>
              <label style={{
                display: 'block',
                fontSize: '11px',
                fontWeight: 600,
                color: '#64748b',
                marginBottom: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Ask AI Assistant
              </label>
              <input
                type="text"
                value={agentInput}
                onChange={(e) => setAgentInput(e.target.value)}
                placeholder="Type your question about AI visibility..."
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '12px',
                  fontSize: '0.875rem',
                  outline: 'none',
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(8px)',
                  color: '#374151',
                  transition: 'all 0.2s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(0, 0, 0, 0.2)'
                  e.target.style.background = 'rgba(255, 255, 255, 0.9)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                  e.target.style.background = 'rgba(255, 255, 255, 0.7)'
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && agentInput.trim()) {
                    setAgentMessages([...agentMessages, 
                      { type: 'user', content: agentInput, timestamp: new Date() },
                      { type: 'agent', content: "I'm analyzing your question about AI visibility. Let me check your current metrics and provide insights...", timestamp: new Date() }
                    ])
                    setAgentInput('')
                  }
                }}
              />
            </div>
            <button
              onClick={() => {
                if (agentInput.trim()) {
                  setAgentMessages([...agentMessages, 
                    { type: 'user', content: agentInput, timestamp: new Date() },
                    { type: 'agent', content: "Thanks for your question! I'm processing your AI visibility data to provide personalized recommendations.", timestamp: new Date() }
                  ])
                  setAgentInput('')
                }
              }}
              disabled={!agentInput.trim()}
              style={{
                padding: '0.875rem 1rem',
                background: agentInput.trim() 
                  ? 'linear-gradient(135deg, #000 0%, #374151 100%)' 
                  : 'rgba(156, 163, 175, 0.5)',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                cursor: agentInput.trim() ? 'pointer' : 'not-allowed',
                fontSize: '14px',
                fontWeight: 600,
                transition: 'all 0.2s ease',
                backdropFilter: 'blur(8px)',
                boxShadow: agentInput.trim() 
                  ? '0 4px 16px rgba(0, 0, 0, 0.1)' 
                  : 'none'
              }}
              onMouseEnter={(e) => {
                if (agentInput.trim()) {
                  e.target.style.transform = 'translateY(-1px)'
                  e.target.style.boxShadow = '0 6px 24px rgba(0, 0, 0, 0.15)'
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = agentInput.trim() 
                  ? '0 4px 16px rgba(0, 0, 0, 0.1)' 
                  : 'none'
              }}
              title="Send message"
            >
              ⚡
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel Collapse Button - Fixed Position */}
      {rightPanelCollapsed && (
        <button
          onClick={() => setRightPanelCollapsed(false)}
          style={{
            position: 'fixed',
            right: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #000 0%, #374151 100%)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            color: '#fff',
            zIndex: 1000,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08)',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-50%) scale(1.1)'
            e.target.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.16), 0 8px 24px rgba(0, 0, 0, 0.12)'
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(-50%) scale(1)'
            e.target.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08)'
          }}
          title="Open AI assistant"
        >
          AI
        </button>
      )}
    </div>
  )
}
