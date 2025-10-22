import { useState } from 'react'
import { Info, DollarSign, Shield, Upload, Users, Save, Edit3, CheckCircle } from 'lucide-react'

interface BasicInfo {
  productName: string
  category: string
  description: string
}

interface FundingDetails {
  fundAmount: string
  ticketSize: string
  numberOfPerks: string
  mrsp: string
}

interface ComplianceKYC {
  gstNumber: string
  panNumber: string
  kycDocuments: File | null
  securityDocs: File | null
}

interface Media {
  pitchDeck: File | null
  shortVideo: File | null
}

interface TeamVision {
  teamDetails: string
  problemSolving: string
}

export const CampaignBuilder = () => {
  const [activeTab, setActiveTab] = useState('basic')
  const [hasChanges, setHasChanges] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Basic Information State
  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    productName: 'EcoSmart Water Purifier',
    category: 'Technology',
    description: 'Revolutionary water purification system using advanced nanotechnology to remove 99.9% of contaminants while being energy-efficient and eco-friendly. Perfect for homes and offices.'
  })

  // Funding Details State
  const [fundingDetails, setFundingDetails] = useState<FundingDetails>({
    fundAmount: '₹2,500,000',
    ticketSize: '₹5,000',
    numberOfPerks: '3',
    mrsp: '₹15,000'
  })

  // Compliance & KYC State
  const [complianceKYC, setComplianceKYC] = useState<ComplianceKYC>({
    gstNumber: '29ABCDE1234F1Z5',
    panNumber: 'ABCDE1234F',
    kycDocuments: null,
    securityDocs: null
  })

  // Media State
  const [media, setMedia] = useState<Media>({
    pitchDeck: null,
    shortVideo: null
  })

  // Team & Vision State
  const [teamVision, setTeamVision] = useState<TeamVision>({
    teamDetails: 'CEO: Dr. Priya Sharma (PhD in Environmental Science, 12 years experience)\nCTO: Rajesh Kumar (M.Tech in Nanotechnology, 8 years in water tech)\nHead of Operations: Anjali Patel (MBA, 10 years in manufacturing)\nMarketing Director: Vikram Singh (MBA Marketing, 7 years in consumer goods)',
    problemSolving: 'Water contamination is a critical global issue affecting millions. Our EcoSmart system addresses this by providing affordable, efficient water purification that removes heavy metals, bacteria, and chemical contaminants. Unlike traditional systems, our nanotechnology-based approach is more effective, requires less maintenance, and is environmentally sustainable.'
  })

  const tabs = [
    { id: 'basic', label: 'Basic Information', icon: Info },
    { id: 'funding', label: 'Funding Details', icon: DollarSign },
    { id: 'compliance', label: 'Compliance & KYC', icon: Shield },
    { id: 'media', label: 'Media', icon: Upload },
    { id: 'team', label: 'Team & Vision', icon: Users }
  ]

  const handleInputChange = (field: string, value: string, section: string) => {
    setHasChanges(true)
    if (section === 'basic') {
      setBasicInfo(prev => ({ ...prev, [field]: value }))
    } else if (section === 'funding') {
      setFundingDetails(prev => ({ ...prev, [field]: value }))
    } else if (section === 'compliance') {
      setComplianceKYC(prev => ({ ...prev, [field]: value }))
    } else if (section === 'team') {
      setTeamVision(prev => ({ ...prev, [field]: value }))
    }
  }

  const handleFileChange = (field: string, file: File | null, section: string) => {
    setHasChanges(true)
    if (section === 'compliance') {
      setComplianceKYC(prev => ({ ...prev, [field]: file }))
    } else if (section === 'media') {
      setMedia(prev => ({ ...prev, [field]: file }))
    }
  }

  const handleSave = () => {
    // Simulate save operation
    console.log('Saving campaign...', { basicInfo, fundingDetails, complianceKYC, media, teamVision })
    setHasChanges(false)
    setIsEditing(false)
    alert('Campaign saved successfully!')
  }

  const handleSubmit = () => {
    // Simulate submit operation
    console.log('Submitting campaign...', { basicInfo, fundingDetails, complianceKYC, media, teamVision })
    setIsSubmitted(true)
    setHasChanges(false)
    setIsEditing(false)
    alert('Campaign submitted successfully! Our team will review it and get back to you within 3-5 business days.')
  }

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Name *
        </label>
        <input
          type="text"
          value={basicInfo.productName}
          onChange={(e) => handleInputChange('productName', e.target.value, 'basic')}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Product Name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category *
        </label>
        <select
          value={basicInfo.category}
          onChange={(e) => handleInputChange('category', e.target.value, 'basic')}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select Category</option>
          <option value="Technology">Technology</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Finance">Finance</option>
          <option value="Education">Education</option>
          <option value="E-commerce">E-commerce</option>
          <option value="Manufacturing">Manufacturing</option>
          <option value="Environment">Environment</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description *
        </label>
        <textarea
          value={basicInfo.description}
          onChange={(e) => handleInputChange('description', e.target.value, 'basic')}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Description"
        />
      </div>
    </div>
  )

  const renderFundingDetails = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fund Amount (₹) *
          </label>
          <input
            type="text"
            value={fundingDetails.fundAmount}
            onChange={(e) => handleInputChange('fundAmount', e.target.value, 'funding')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Fund Amount (₹)"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ticket Size (₹)
          </label>
          <input
            type="text"
            value={fundingDetails.ticketSize}
            onChange={(e) => handleInputChange('ticketSize', e.target.value, 'funding')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ticket Size (₹)"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            No. of Perks
          </label>
          <input
            type="text"
            value={fundingDetails.numberOfPerks}
            onChange={(e) => handleInputChange('numberOfPerks', e.target.value, 'funding')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="No. of Perks"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            MRSP (₹)
          </label>
          <input
            type="text"
            value={fundingDetails.mrsp}
            onChange={(e) => handleInputChange('mrsp', e.target.value, 'funding')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="MRSP (₹)"
          />
        </div>
      </div>
    </div>
  )

  const renderComplianceKYC = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            GST Number
          </label>
          <input
            type="text"
            value={complianceKYC.gstNumber}
            onChange={(e) => handleInputChange('gstNumber', e.target.value, 'compliance')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="GST Number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PAN Number
          </label>
          <input
            type="text"
            value={complianceKYC.panNumber}
            onChange={(e) => handleInputChange('panNumber', e.target.value, 'compliance')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="PAN Number"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload KYC Documents
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors cursor-pointer">
            <input
              type="file"
              onChange={(e) => handleFileChange('kycDocuments', e.target.files?.[0] || null, 'compliance')}
              className="hidden"
              id="kyc-upload"
              accept=".pdf,.doc,.docx"
            />
            <label htmlFor="kyc-upload" className="cursor-pointer">
              <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-500">Choose File</p>
              <p className="text-xs text-gray-400 mt-1">
                {complianceKYC.kycDocuments ? complianceKYC.kycDocuments.name : 'No file chosen'}
              </p>
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Security / Registration Docs
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors cursor-pointer">
            <input
              type="file"
              onChange={(e) => handleFileChange('securityDocs', e.target.files?.[0] || null, 'compliance')}
              className="hidden"
              id="security-upload"
              accept=".pdf,.doc,.docx"
            />
            <label htmlFor="security-upload" className="cursor-pointer">
              <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-500">Choose File</p>
              <p className="text-xs text-gray-400 mt-1">
                {complianceKYC.securityDocs ? complianceKYC.securityDocs.name : 'No file chosen'}
              </p>
            </label>
          </div>
        </div>
      </div>
    </div>
  )

  const renderMedia = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pitch Deck (PDF)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors cursor-pointer">
            <input
              type="file"
              onChange={(e) => handleFileChange('pitchDeck', e.target.files?.[0] || null, 'media')}
              className="hidden"
              id="pitch-upload"
              accept=".pdf"
            />
            <label htmlFor="pitch-upload" className="cursor-pointer">
              <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-500">Choose File</p>
              <p className="text-xs text-gray-400 mt-1">
                {media.pitchDeck ? media.pitchDeck.name : 'No file chosen'}
              </p>
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Short Video
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors cursor-pointer">
            <input
              type="file"
              onChange={(e) => handleFileChange('shortVideo', e.target.files?.[0] || null, 'media')}
              className="hidden"
              id="video-upload"
              accept=".mp4,.mov,.avi"
            />
            <label htmlFor="video-upload" className="cursor-pointer">
              <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-500">Choose File</p>
              <p className="text-xs text-gray-400 mt-1">
                {media.shortVideo ? media.shortVideo.name : 'No file chosen'}
              </p>
            </label>
          </div>
        </div>
      </div>
    </div>
  )

  const renderTeamVision = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Team Details *
        </label>
        <textarea
          value={teamVision.teamDetails}
          onChange={(e) => handleInputChange('teamDetails', e.target.value, 'team')}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Team Details"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What specific problem are you solving? *
        </label>
        <textarea
          value={teamVision.problemSolving}
          onChange={(e) => handleInputChange('problemSolving', e.target.value, 'team')}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="What specific problem are you solving?"
        />
      </div>
    </div>
  )

  if (isSubmitted) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Campaign Created Successfully!</h2>
          <p className="text-gray-600 mb-6">Your campaign has been submitted for review. Our team will evaluate it and get back to you within 3-5 business days.</p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Create Another Campaign
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Create Your Campaign</h2>
          <p className="text-gray-600 mt-1">Build and launch your funding campaign</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <Edit3 className="w-4 h-4" />
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          <button
            onClick={handleSave}
            disabled={!hasChanges}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors ${
              hasChanges
                ? 'bg-green-600 text-white hover:bg-green-700 cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Save className="w-4 h-4" />
            Save Draft
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {activeTab === 'basic' && renderBasicInfo()}
        {activeTab === 'funding' && renderFundingDetails()}
        {activeTab === 'compliance' && renderComplianceKYC()}
        {activeTab === 'media' && renderMedia()}
        {activeTab === 'team' && renderTeamVision()}
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Submit Campaign
        </button>
      </div>
    </div>
  )
}
