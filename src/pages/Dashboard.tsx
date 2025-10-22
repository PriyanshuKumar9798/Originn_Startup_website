import { useState, useEffect } from 'react'
import { Sidebar } from '../components/Sidebar'
import { Header } from '../components/Header'
import { Startup } from './Startup'
import { Profile } from './Profile'
import { PreOrder } from './PreOrder'
import { CampaignBuilder } from './CampaignBuilder'
import { Jobs } from './Jobs'
import { BTS } from './BTS'
import { Collaborate } from './Collaborate'
import { HelpSupport } from './HelpSupport'
import { Settings } from './Settings'

export const DashboardPage = () => {
  const [isDark, setIsDark] = useState(false)
  const [selected, setSelected] = useState("Dashboard")

  useEffect(() => {
    // Ensure we start in light mode
    document.documentElement.classList.remove('dark')
  }, [])

  const renderContent = () => {
    switch (selected) {
      case "Dashboard":
        return (
          <div className="space-y-6">
            {/* Welcome Message */}
            <div className="text-center py-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome !!</h2>
            </div>

            {/* Admin Notices */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Admin Notices</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-1">•</span>
                  <span>Welcome to Originn! Make sure to complete your startup profile.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-1">•</span>
                  <span>New campaign guidelines have been updated. Please review them.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-1">•</span>
                  <span>Reminder: Your subscription will expire in 5 days.</span>
                </li>
              </ul>
            </div>

            {/* Campaign Guidelines */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Guidelines for a Successful Campaign</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Complete your startup profile and KYC verification.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Upload an engaging pitch deck and media content.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Keep campaign updates frequent to build backer trust.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Set realistic funding goals and perks for your backers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Share your campaign on social media to attract more supporters.</span>
                </li>
              </ul>
            </div>
          </div>
        )
      case "Startup Profile":
        return <Startup />
      case "Profile":
        return <Profile />
      case "Pre-order":
        return <PreOrder />
      case "Campaign Builder":
        return <CampaignBuilder />
      case "Jobs":
        return <Jobs />
      case "BTS":
        return <BTS />
      case "Collaborate":
        return <Collaborate />
      case "Help & Support":
        return <HelpSupport />
      case "Settings":
        return <Settings />
      case "Logout":
        return (
          <div className="space-y-6">
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">Logout</h2>
              <p className="text-gray-500">You have been logged out successfully</p>
            </div>
          </div>
        )
      default:
        return (
          <div className="space-y-6">
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
              <p className="text-gray-500">The requested page could not be found</p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex w-full bg-gray-50 text-gray-900">
        <Sidebar selected={selected} setSelected={setSelected} />
        <div className="flex-1 bg-gray-50 p-6 overflow-auto">
          <Header isDark={isDark} setIsDark={setIsDark} />
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
