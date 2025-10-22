import { useState } from 'react'
import { Package, DollarSign, FileText, Save, Edit3, CheckCircle } from 'lucide-react'

interface ProductInfo {
  productName: string
  description: string
  category: string
  mrsp: string
}

interface FundingInfo {
  fundsRequired: string
  ticketSize: string
  milestones: string
  fundUtilization: string
}

interface LegalTeamInfo {
  registrationNumber: string
  gstNumber: string
  pan: string
  aadhaar: string
  teamDetails: string
  address: string
  patentTrademark: string
}

export const PreOrder = () => {
  const [activeTab, setActiveTab] = useState('product')
  const [hasChanges, setHasChanges] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Product Information State
  const [productInfo, setProductInfo] = useState<ProductInfo>({
    productName: 'AI-Powered Smart Home Hub',
    description: 'Revolutionary smart home automation system with AI-driven learning capabilities, voice control, and seamless integration with all your devices.',
    category: 'Technology',
    mrsp: '$299'
  })

  // Funding Information State
  const [fundingInfo, setFundingInfo] = useState<FundingInfo>({
    fundsRequired: '$500,000',
    ticketSize: '$1,000',
    milestones: 'Q1: Prototype Development\nQ2: Beta Testing\nQ3: Manufacturing Setup\nQ4: Market Launch',
    fundUtilization: '40% - R&D and Product Development\n30% - Manufacturing and Supply Chain\n20% - Marketing and Sales\n10% - Operations and Legal'
  })

  // Legal & Team Information State
  const [legalTeamInfo, setLegalTeamInfo] = useState<LegalTeamInfo>({
    registrationNumber: 'REG-2024-001',
    gstNumber: '29ABCDE1234F1Z5',
    pan: 'ABCDE1234F',
    aadhaar: '1234-5678-9012',
    teamDetails: 'CEO: Sarah Johnson (10 years in IoT)\nCTO: Michael Chen (8 years in AI/ML)\nHead of Engineering: David Kim (6 years in embedded systems)\nMarketing Director: Lisa Wang (7 years in consumer electronics)',
    address: '123 Innovation Street, Tech City, TC 12345, United States',
    patentTrademark: 'Patent Pending: AI-2024-001, Trademark: SmartHomeAI™'
  })

  const tabs = [
    { id: 'product', label: 'Product Info', icon: Package },
    { id: 'funding', label: 'Funding Info', icon: DollarSign },
    { id: 'legal', label: 'Legal & Team Info', icon: FileText }
  ]

  const handleInputChange = (field: string, value: string, section: string) => {
    setHasChanges(true)
    if (section === 'product') {
      setProductInfo(prev => ({ ...prev, [field]: value }))
    } else if (section === 'funding') {
      setFundingInfo(prev => ({ ...prev, [field]: value }))
    } else if (section === 'legal') {
      setLegalTeamInfo(prev => ({ ...prev, [field]: value }))
    }
  }

  const handleSave = () => {
    // Simulate save operation
    console.log('Saving preorder...', { productInfo, fundingInfo, legalTeamInfo })
    setHasChanges(false)
    setIsEditing(false)
    alert('Preorder saved successfully!')
  }

  const handleSubmit = () => {
    // Simulate submit operation
    console.log('Submitting preorder...', { productInfo, fundingInfo, legalTeamInfo })
    setIsSubmitted(true)
    setHasChanges(false)
    setIsEditing(false)
    alert('Preorder submitted successfully! You will receive a confirmation email shortly.')
  }

  const renderProductInfo = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Name *
        </label>
        <input
          type="text"
          value={productInfo.productName}
          onChange={(e) => handleInputChange('productName', e.target.value, 'product')}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Product Name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description *
        </label>
        <textarea
          value={productInfo.description}
          onChange={(e) => handleInputChange('description', e.target.value, 'product')}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Description"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category *
        </label>
        <select
          value={productInfo.category}
          onChange={(e) => handleInputChange('category', e.target.value, 'product')}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select Category</option>
          <option value="Technology">Technology</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Finance">Finance</option>
          <option value="Education">Education</option>
          <option value="E-commerce">E-commerce</option>
          <option value="Manufacturing">Manufacturing</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          MRSP (Manufacturer's Suggested Retail Price) *
        </label>
        <input
          type="text"
          value={productInfo.mrsp}
          onChange={(e) => handleInputChange('mrsp', e.target.value, 'product')}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="MRSP"
        />
      </div>
    </div>
  )

  const renderFundingInfo = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Funds Required *
        </label>
        <input
          type="text"
          value={fundingInfo.fundsRequired}
          onChange={(e) => handleInputChange('fundsRequired', e.target.value, 'funding')}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Funds Required"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ticket Size of Preorder *
        </label>
        <input
          type="text"
          value={fundingInfo.ticketSize}
          onChange={(e) => handleInputChange('ticketSize', e.target.value, 'funding')}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Ticket Size of Preorder"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Milestones *
        </label>
        <textarea
          value={fundingInfo.milestones}
          onChange={(e) => handleInputChange('milestones', e.target.value, 'funding')}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Milestones"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Explain Fund Utilization *
        </label>
        <textarea
          value={fundingInfo.fundUtilization}
          onChange={(e) => handleInputChange('fundUtilization', e.target.value, 'funding')}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Explain Fund Utilization"
        />
      </div>
    </div>
  )

  const renderLegalTeamInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Registration Number *
          </label>
          <input
            type="text"
            value={legalTeamInfo.registrationNumber}
            onChange={(e) => handleInputChange('registrationNumber', e.target.value, 'legal')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Registration Number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            GST Number *
          </label>
          <input
            type="text"
            value={legalTeamInfo.gstNumber}
            onChange={(e) => handleInputChange('gstNumber', e.target.value, 'legal')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="GST Number"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PAN *
          </label>
          <input
            type="text"
            value={legalTeamInfo.pan}
            onChange={(e) => handleInputChange('pan', e.target.value, 'legal')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="PAN"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Aadhaar *
          </label>
          <input
            type="text"
            value={legalTeamInfo.aadhaar}
            onChange={(e) => handleInputChange('aadhaar', e.target.value, 'legal')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Aadhaar"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Team Details *
        </label>
        <textarea
          value={legalTeamInfo.teamDetails}
          onChange={(e) => handleInputChange('teamDetails', e.target.value, 'legal')}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Team Details"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Address *
        </label>
        <textarea
          value={legalTeamInfo.address}
          onChange={(e) => handleInputChange('address', e.target.value, 'legal')}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Address"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Patent / Trademark
        </label>
        <input
          type="text"
          value={legalTeamInfo.patentTrademark}
          onChange={(e) => handleInputChange('patentTrademark', e.target.value, 'legal')}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Patent / Trademark"
        />
      </div>
    </div>
  )

  if (isSubmitted) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Preorder Submitted Successfully!</h2>
          <p className="text-gray-600 mb-6">Thank you for your preorder submission. Our team will review your application and get back to you within 2-3 business days.</p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Submit Another Preorder
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
          <h2 className="text-2xl font-semibold text-gray-800">Originn Preorder Form</h2>
          <p className="text-gray-600 mt-1">Submit your product for preorder funding</p>
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
        {activeTab === 'product' && renderProductInfo()}
        {activeTab === 'funding' && renderFundingInfo()}
        {activeTab === 'legal' && renderLegalTeamInfo()}
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Submit Preorder
        </button>
      </div>
    </div>
  )
}
