import React, { useState } from 'react'

export default function SimpleDashboard({ onNewAnalysis, onEditInputs }) {
  console.log('🎯 SimpleDashboard rendered')
  const [activeSection, setActiveSection] = useState('overview')

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'platforms', label: 'Platforms', icon: '🤖' },
    { id: 'queries', label: 'Top Queries', icon: '🔍' },
    { id: 'insights', label: 'Insights', icon: '💡' },
    { id: 'reports', label: 'Reports', icon: '📈' }
  ]

  const renderOverviewContent = () => {
    return (
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {/* Visibility Rate */}
          <div style={{
            background: '#fff',
            border: '1px solid #e5e5e5',
            borderRadius: '12px',
            padding: '1.5rem'
          }}>
            <div style={{ 
              fontSize: '0.875rem', 
              color: '#737373', 
              textTransform: 'uppercase',
              marginBottom: '1rem',
              fontWeight: 500,
              letterSpacing: '0.5px'
            }}>
              Visibility Rate
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              40.0%
            </div>
            <div style={{ fontSize: '0.875rem', color: '#737373' }}>
              2 of 5 queries
            </div>
          </div>

          {/* Brand Mentions */}
          <div style={{
            background: '#fff',
            border: '1px solid #e5e5e5',
            borderRadius: '12px',
            padding: '1.5rem'
          }}>
            <div style={{ 
              fontSize: '0.875rem', 
              color: '#737373', 
              textTransform: 'uppercase',
              marginBottom: '1rem',
              fontWeight: 500,
              letterSpacing: '0.5px'
            }}>
              Brand Mentions
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              20
            </div>
            <div style={{ fontSize: '0.875rem', color: '#737373' }}>
              Across 3 platforms
            </div>
          </div>

          {/* Share of Voice */}
          <div style={{
            background: '#fff',
            border: '1px solid #e5e5e5',
            borderRadius: '12px',
            padding: '1.5rem'
          }}>
            <div style={{ 
              fontSize: '0.875rem', 
              color: '#737373', 
              textTransform: 'uppercase',
              marginBottom: '1rem',
              fontWeight: 500,
              letterSpacing: '0.5px'
            }}>
              Share of Voice
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              100%
            </div>
            <div style={{ fontSize: '0.875rem', color: '#737373' }}>
              When mentioned
            </div>
          </div>

          {/* Response Quality */}
          <div style={{
            background: '#fff',
            border: '1px solid #e5e5e5',
            borderRadius: '12px',
            padding: '1.5rem'
          }}>
            <div style={{ 
              fontSize: '0.875rem', 
              color: '#737373', 
              textTransform: 'uppercase',
              marginBottom: '1rem',
              fontWeight: 500,
              letterSpacing: '0.5px'
            }}>
              Response Quality
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              85.0
            </div>
            <div style={{ fontSize: '0.875rem', color: '#737373' }}>
              Average score
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

  const renderOtherContent = (title, icon, description) => {
    return (
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>
          {title}
        </h3>
        <div style={{
          background: '#fff',
          border: '1px solid #e5e5e5',
          borderRadius: '12px',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{icon}</div>
          <h4 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            {title}
          </h4>
          <p style={{ color: '#737373', marginBottom: '2rem' }}>
            {description}
          </p>
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
            Learn More
          </button>
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
        width: '240px',
        background: '#fff',
        borderRight: '1px solid #e5e5e5',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        height: '100vh',
        zIndex: 100,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Logo Section */}
        <div style={{
          padding: '2rem',
          borderBottom: '1px solid #e5e5e5'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: '#000',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 600,
              fontSize: '14px'
            }}>
              V
            </div>
            <span style={{
              fontSize: '16px',
              fontWeight: 600,
              letterSpacing: '-0.5px'
            }}>
              AI Monitor Pro
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <div style={{
          padding: '1.5rem 1rem',
          flex: 1,
          overflowY: 'auto'
        }}>
          <div style={{ marginBottom: '2rem' }}>
            <div style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: '#737373',
              marginBottom: '0.5rem',
              padding: '0 0.75rem',
              fontWeight: 500
            }}>
              MAIN
            </div>
            {navigationItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.625rem 0.75rem',
                  borderRadius: '8px',
                  color: activeSection === item.id ? '#fff' : '#404040',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  marginBottom: '0.125rem',
                  cursor: 'pointer',
                  fontSize: '14px',
                  border: 'none',
                  background: activeSection === item.id ? '#000' : 'transparent',
                  width: '100%',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== item.id) {
                    e.target.style.background = '#f5f5f5'
                    e.target.style.color = '#000'
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== item.id) {
                    e.target.style.background = 'transparent'
                    e.target.style.color = '#404040'
                  }
                }}
              >
                <span style={{ fontSize: '16px', opacity: 0.8 }}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {item.id === 'overview' && (
                  <span style={{
                    marginLeft: 'auto',
                    padding: '2px 6px',
                    background: activeSection === item.id ? '#fff' : '#000',
                    color: activeSection === item.id ? '#000' : '#fff',
                    borderRadius: '4px',
                    fontSize: '10px',
                    fontWeight: 600
                  }}>
                    5
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Analytics Section */}
          <div>
            <div style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: '#737373',
              marginBottom: '0.5rem',
              padding: '0 0.75rem',
              fontWeight: 500
            }}>
              ANALYTICS
            </div>
            {[
              { id: 'performance', label: 'Performance', icon: '⚡' },
              { id: 'competitors', label: 'Competitors', icon: '🎯' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.625rem 0.75rem',
                  borderRadius: '8px',
                  color: activeSection === item.id ? '#fff' : '#404040',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  marginBottom: '0.125rem',
                  cursor: 'pointer',
                  fontSize: '14px',
                  border: 'none',
                  background: activeSection === item.id ? '#000' : 'transparent',
                  width: '100%',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== item.id) {
                    e.target.style.background = '#f5f5f5'
                    e.target.style.color = '#000'
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== item.id) {
                    e.target.style.background = 'transparent'
                    e.target.style.color = '#404040'
                  }
                }}
              >
                <span style={{ fontSize: '16px', opacity: 0.8 }}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Live Status Indicator */}
        <div style={{
          padding: '1rem',
          borderTop: '1px solid #e5e5e5'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.375rem 0.75rem',
            background: '#f5f5f5',
            border: '1px solid #e5e5e5',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: 500
          }}>
            <div style={{
              width: '6px',
              height: '6px',
              background: '#000',
              borderRadius: '50%'
            }}></div>
            <span>Live Monitoring</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{
        flex: 1,
        marginLeft: '240px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          background: '#fff',
          borderBottom: '1px solid #e5e5e5',
          padding: '1.5rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600 }}>
              {activeSection === 'overview' ? 'AI Visibility Overview' :
               activeSection === 'platforms' ? 'Platform Performance' :
               activeSection === 'queries' ? 'Top Performing Queries' :
               activeSection === 'insights' ? 'AI Insights & Recommendations' :
               activeSection === 'reports' ? 'Reports & Analytics' :
               activeSection === 'performance' ? 'Performance Analytics' :
               activeSection === 'competitors' ? 'Competitor Analysis' :
               'AI Visibility Monitor'}
            </h1>
            <div style={{ fontSize: '0.875rem', color: '#737373', marginTop: '0.5rem' }}>
              <span>Monitor</span>
              <span style={{ margin: '0 0.5rem', color: '#a3a3a3' }}>›</span>
              <span style={{ color: '#000', fontWeight: 500 }}>
                {navigationItems.find(item => item.id === activeSection)?.label || 'Dashboard'}
              </span>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              onClick={onEditInputs}
              style={{
                padding: '0.625rem 1.25rem',
                background: '#fff',
                border: '1px solid #d4d4d4',
                borderRadius: '6px',
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              Edit Setup
            </button>
            <button 
              onClick={onNewAnalysis}
              style={{
                padding: '0.625rem 1.25rem',
                background: '#000',
                color: '#fff',
                border: '1px solid #000',
                borderRadius: '6px',
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              New Analysis
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ 
          padding: '2rem',
          background: '#fafafa',
          flex: 1,
          overflowY: 'auto'
        }}>
          {/* Render content based on active section */}
          {activeSection === 'overview' && renderOverviewContent()}
          {activeSection === 'platforms' && renderPlatformsContent()}
          {activeSection === 'queries' && renderQueriesContent()}
          {activeSection === 'insights' && renderInsightsContent()}
          {activeSection === 'reports' && renderOtherContent('Reports & Analytics', '📊', 'Export detailed CSV reports, schedule automated emails, and create custom analytics dashboards.')}
          {activeSection === 'performance' && renderPlatformsContent()}
          {activeSection === 'competitors' && renderOtherContent('Competitive Intelligence', '🎯', 'Deep competitive analysis showing how you rank against Kapiva, Gynoveda, and other Ayurvedic brands.')}
        </div>
      </div>
    </div>
  )
}
