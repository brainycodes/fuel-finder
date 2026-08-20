'use client'

export default function PriceDisplay({ prices, countryCode }) {
  if (!prices) return null

  const currencySymbols = {
    NGN: '₦', USD: '$', GBP: '£', EUR: '€', 
    INR: '₹', JPY: '¥', AUD: 'A$', CAD: 'C$'
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: '16px',
      marginBottom: '24px'
    }}>
      {Object.entries(prices).map(([name, price]) => (
        <div key={name} style={{
          background: 'white',
          padding: '20px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--gray-200)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ fontSize: '12px', color: 'var(--gray-500)', marginBottom: '6px', fontWeight: '500' }}>
            {name}
          </div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--gray-900)' }}>
            {currencySymbols[price.currency] || price.symbol || '$'}{price.price}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--gray-400)', marginTop: '4px' }}>
            per {price.unit || 'unit'}
          </div>
          {price.source && (
            <div style={{ fontSize: '10px', color: 'var(--gray-400)', marginTop: '6px' }}>
              Source: {price.source}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}