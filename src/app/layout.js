import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/globals.css'

export const metadata = {
  title: 'FindFuel - Best Fuel Prices Near You',
  description: 'Find the cheapest fuel prices at stations near you. Real-time prices, live directions, and station details.',
  icons: { icon: '/favicon.png' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}