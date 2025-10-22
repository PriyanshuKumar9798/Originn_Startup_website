import { Login } from './Login'
import DisappearingFeatures from '../components/DisappearingFeatures'
import AboutOriginn from '../components/AboutOriginn'
import { Footer } from '../components/Footer'

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <Login />
      <DisappearingFeatures />
      <AboutOriginn />
      <Footer />
    </div>
  )
}
