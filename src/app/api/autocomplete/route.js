import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query = (searchParams.get('q') || '').toLowerCase()

  const allSuggestions = [
    'Shell Station - Lagos, Nigeria',
    'TotalEnergies - Abuja, Nigeria',
    'NNPC Mega Station - Lagos, Nigeria',
    'Mobil Filling Station - Port Harcourt, Nigeria',
    'Oando Station - Ibadan, Nigeria',
    'Conoil - Victoria Island, Lagos',
    'MRS Oil - Ikeja, Lagos',
    'Chevron Station - Lekki, Lagos',
    'Exxon Station - Manhattan, New York',
    'BP Gas Station - London, UK',
    'Shell Station - Dubai Marina, UAE',
    'Petrol Station Near Me',
    'Diesel Station - Industrial Area',
    '24 Hour Fuel Station',
    'Cheapest Petrol in Lagos',
    'Fuel Station with ATM',
    'Gas Station on Highway',
    'NNPC Station Along Expressway',
    'Cooking Gas Refill Station',
    'Electric Vehicle Charging Station',
    'Texaco Station - Houston, Texas',
    'Aral Station - Berlin, Germany',
    'Total Station - Paris, France',
    'Indian Oil - New Delhi, India',
    'Petrobras - São Paulo, Brazil',
  ]

  const suggestions = allSuggestions
    .filter(s => s.toLowerCase().includes(query))
    .slice(0, 8)

  return NextResponse.json({ suggestions })
}