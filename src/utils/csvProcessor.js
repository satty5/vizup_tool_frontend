// CSV Data Processing Utilities for Live Dashboard
export const parseCsvData = (csvContent) => {
  const lines = csvContent.split('\n')
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
  
  const data = lines.slice(1)
    .filter(line => line.trim())
    .map(line => {
      const values = parseCSVLine(line)
      const row = {}
      headers.forEach((header, index) => {
        row[header] = values[index] || ''
      })
      return row
    })
  
  return data
}

// Helper function to properly parse CSV lines with quoted values
const parseCSVLine = (line) => {
  const result = []
  let current = ''
  let inQuotes = false
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    
    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  
  result.push(current.trim())
  return result
}

// Mock CSV data generator for demo purposes
export const generateMockCsvData = () => {
  return [
    {
      'Query Type': 'Brand Discovery (Unbranded)',
      'Query': 'Best Ayurvedic supplements for women health',
      'Category/Product': 'Women Health',
      'no of runs': '1',
      'Chatgpt': 'Yes',
      'Claude': 'Yes',
      'Gemini': 'Yes',
      'Chatgpt response time': '2100.5',
      'Claude response time': '2800.3',
      'Gemini response time': '3200.1',
      'Amrutam Mentioned': 'No',
      'Amrutam Count': '0',
      'Share of Voice %': '0%',
      'Top Competitors': 'Patanjali, Dabur, Baidyanath',
      'Platforms with Amrutam': '',
      'Summary': 'MISSING: Amrutam not mentioned - 0% share of voice',
      'Best Platform': 'ChatGPT',
      'Platform Score': '65/100',
      'ChatGPT Performance': '✓ | 2100.5ms | 120w',
      'Claude Performance': '✓ | 2800.3ms | 150w',
      'Gemini Performance': '✓ | 3200.1ms | 98w',
      'Query Flag': 'NEUTRAL',
      'Query Score': '50',
      'Flag Reason': 'No clear positive or negative indicators',
      'Response Flag': 'CONCERNING',
      'Response Score': '30.0',
      'Response Reason': 'Brand not mentioned in any response'
    },
    {
      'Query Type': 'Comparative / Competitive',
      'Query': 'Amrutam vs Kapiva: Which is better for women health?',
      'Category/Product': 'Women Health',
      'no of runs': '1',
      'Chatgpt': 'Yes',
      'Claude': 'Yes',
      'Gemini': 'Yes',
      'Chatgpt response time': '1800.2',
      'Claude response time': '2400.7',
      'Gemini response time': '2100.9',
      'Amrutam Mentioned': 'Yes',
      'Amrutam Count': '8',
      'Share of Voice %': '100.0%',
      'Top Competitors': 'Kapiva',
      'Platforms with Amrutam': 'chatgpt, claude, gemini',
      'Summary': 'STRONG: Amrutam dominates with 100% share of voice',
      'Best Platform': 'Claude',
      'Platform Score': '85/100',
      'ChatGPT Performance': '✓ | 1800.2ms | 145w',
      'Claude Performance': '✓ | 2400.7ms | 210w',
      'Gemini Performance': '✓ | 2100.9ms | 168w',
      'Query Flag': 'COMPETITIVE',
      'Query Score': '85',
      'Flag Reason': 'Competitive query with Amrutam present',
      'Response Flag': 'EXCELLENT',
      'Response Score': '90.0',
      'Response Reason': 'Strong positive responses across all platforms'
    },
    {
      'Query Type': 'Brand Discovery (Unbranded)',
      'Query': 'Natural remedies for hormonal balance',
      'Category/Product': 'Hormonal Health',
      'no of runs': '1',
      'Chatgpt': 'Yes',
      'Claude': 'Yes',
      'Gemini': 'Yes',
      'Chatgpt response time': '2300.1',
      'Claude response time': '2950.4',
      'Gemini response time': '2650.8',
      'Amrutam Mentioned': 'No',
      'Amrutam Count': '0',
      'Share of Voice %': '0%',
      'Top Competitors': 'Himalaya, Organic India, Patanjali',
      'Platforms with Amrutam': '',
      'Summary': 'MISSING: Amrutam not mentioned - 0% share of voice',
      'Best Platform': 'ChatGPT',
      'Platform Score': '70/100',
      'ChatGPT Performance': '✓ | 2300.1ms | 135w',
      'Claude Performance': '✓ | 2950.4ms | 180w',
      'Gemini Performance': '✓ | 2650.8ms | 122w',
      'Query Flag': 'NEUTRAL',
      'Query Score': '55',
      'Flag Reason': 'Standard informational query',
      'Response Flag': 'GOOD',
      'Response Score': '65.0',
      'Response Reason': 'Quality responses but missing brand presence'
    },
    {
      'Query Type': 'Comparative / Competitive',
      'Query': 'Amrutam vs Gynoveda for PCOS treatment',
      'Category/Product': 'PCOS',
      'no of runs': '1',
      'Chatgpt': 'Yes',
      'Claude': 'Yes',
      'Gemini': 'Yes',
      'Chatgpt response time': '2000.3',
      'Claude response time': '2600.5',
      'Gemini response time': '2350.7',
      'Amrutam Mentioned': 'Yes',
      'Amrutam Count': '12',
      'Share of Voice %': '100.0%',
      'Top Competitors': 'Gynoveda',
      'Platforms with Amrutam': 'chatgpt, claude, gemini',
      'Summary': 'STRONG: Amrutam dominates with 100% share of voice',
      'Best Platform': 'Claude',
      'Platform Score': '88/100',
      'ChatGPT Performance': '✓ | 2000.3ms | 160w',
      'Claude Performance': '✓ | 2600.5ms | 240w',
      'Gemini Performance': '✓ | 2350.7ms | 195w',
      'Query Flag': 'COMPETITIVE',
      'Query Score': '90',
      'Flag Reason': 'High-value competitive comparison',
      'Response Flag': 'EXCELLENT',
      'Response Score': '92.0',
      'Response Reason': 'Exceptional performance across all platforms'
    },
    {
      'Query Type': 'Brand Discovery (Unbranded)',
      'Query': 'Ayurvedic products for digestive health',
      'Category/Product': 'Digestive Health',
      'no of runs': '1',
      'Chatgpt': 'Yes',
      'Claude': 'Yes',
      'Gemini': 'Yes',
      'Chatgpt response time': '2150.6',
      'Claude response time': '2750.2',
      'Gemini response time': '2480.4',
      'Amrutam Mentioned': 'No',
      'Amrutam Count': '0',
      'Share of Voice %': '0%',
      'Top Competitors': 'Dabur, Zandu, Baidyanath',
      'Platforms with Amrutam': '',
      'Summary': 'MISSING: Amrutam not mentioned - 0% share of voice',
      'Best Platform': 'ChatGPT',
      'Platform Score': '68/100',
      'ChatGPT Performance': '✓ | 2150.6ms | 128w',
      'Claude Performance': '✓ | 2750.2ms | 165w',
      'Gemini Performance': '✓ | 2480.4ms | 110w',
      'Query Flag': 'NEUTRAL',
      'Query Score': '45',
      'Flag Reason': 'Standard category query',
      'Response Flag': 'FAIR',
      'Response Score': '55.0',
      'Response Reason': 'Average responses with competitor focus'
    }
  ]
}

export const loadAmrutamCsvData = async () => {
  try {
    // In a real implementation, this would fetch from your API
    // For now, return mock data based on the actual Amrutam CSV structure
    const response = await fetch('/api/monitor/csv-data/amrutam')
    if (!response.ok) {
      throw new Error('Failed to load CSV data')
    }
    return await response.json()
  } catch (error) {
    console.log('Using mock data due to API unavailability:', error.message)
    return generateMockCsvData()
  }
}
