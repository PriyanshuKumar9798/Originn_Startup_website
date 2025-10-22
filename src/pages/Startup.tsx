import { useState } from 'react'
import { Building, Globe, Users, UserPlus, Camera, Upload, Plus, X, Save, Edit3 } from 'lucide-react'

interface Founder {
  id: string
  name: string
  designation: string
  institution: string
  photo?: string
}

interface TeamMember {
  id: string
  name: string
  designation: string
  institution: string
  photo?: string
}

interface SocialMedia {
  linkedin: string
  instagram: string
  twitter: string
}

interface CompanyInfo {
  companyName: string
  registrationNo: string
  website: string
  category: string
  productType: string
  targetMarket: string
  stage: string
  stageDescription: string
  productDescription: string
  shortDescription: string
  startupDescription: string
  institute: string
  instituteDescription: string
}

export const Startup = () => {
  const [activeTab, setActiveTab] = useState('company')
  const [hasChanges, setHasChanges] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  // Company Information State
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    companyName: 'TechFlow Solutions',
    registrationNo: 'REG-2024-001',
    website: 'https://techflow.com',
    category: 'Technology',
    productType: 'Software',
    targetMarket: 'B2B',
    stage: 'Growth',
    stageDescription: 'We are in the growth stage with 50+ employees and expanding to new markets.',
    productDescription: 'TechFlow is an AI-powered workflow automation platform that helps businesses streamline their operations and increase productivity by 40%.',
    shortDescription: 'AI-powered workflow automation platform for modern businesses.',
    startupDescription: 'Founded in 2022, TechFlow Solutions is revolutionizing how businesses manage their workflows through cutting-edge AI technology.',
    institute: 'IIT Delhi',
    instituteDescription: 'Incubated at IIT Delhi Innovation Hub, we have access to world-class research facilities and mentorship.'
  })

  // Social Media State
  const [socialMedia, setSocialMedia] = useState<SocialMedia>({
    linkedin: 'https://linkedin.com/company/techflow',
    instagram: 'https://instagram.com/techflow',
    twitter: 'https://twitter.com/techflow'
  })

  // Founders State
  const [founders, setFounders] = useState<Founder[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      designation: 'CEO & Co-Founder',
      institution: 'IIT Delhi',
      photo: '/api/placeholder/150/150'
    },
    {
      id: '2',
      name: 'Michael Chen',
      designation: 'CTO & Co-Founder',
      institution: 'Stanford University',
      photo: '/api/placeholder/150/150'
    }
  ])

  // Team State
  const [team, setTeam] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Emily Rodriguez',
      designation: 'Head of Product',
      institution: 'MIT',
      photo: '/api/placeholder/150/150'
    },
    {
      id: '2',
      name: 'David Kim',
      designation: 'Lead Developer',
      institution: 'IIT Bombay',
      photo: '/api/placeholder/150/150'
    },
    {
      id: '3',
      name: 'Lisa Wang',
      designation: 'Marketing Director',
      institution: 'Harvard Business School',
      photo: '/api/placeholder/150/150'
    }
  ])

  const tabs = [
    { id: 'company', label: 'Company Info', icon: Building },
    { id: 'social', label: 'Social Media', icon: Globe },
    { id: 'founders', label: 'Founders', icon: Users },
    { id: 'team', label: 'Team', icon: UserPlus }
  ]

  const handleInputChange = (field: string, value: string, section: string) => {
    setHasChanges(true)
    if (section === 'company') {
      setCompanyInfo(prev => ({ ...prev, [field]: value }))
    } else if (section === 'social') {
      setSocialMedia(prev => ({ ...prev, [field]: value }))
    }
  }

  const addFounder = () => {
    const newFounder: Founder = {
      id: Date.now().toString(),
      name: '',
      designation: '',
      institution: '',
      photo: ''
    }
    setFounders(prev => [...prev, newFounder])
    setHasChanges(true)
  }

  const removeFounder = (id: string) => {
    setFounders(prev => prev.filter(f => f.id !== id))
    setHasChanges(true)
  }

  const updateFounder = (id: string, field: string, value: string) => {
    setFounders(prev => prev.map(f => f.id === id ? { ...f, [field]: value } : f))
    setHasChanges(true)
  }

  const addTeamMember = () => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: '',
      designation: '',
      institution: '',
      photo: ''
    }
    setTeam(prev => [...prev, newMember])
    setHasChanges(true)
  }

  const removeTeamMember = (id: string) => {
    setTeam(prev => prev.filter(m => m.id !== id))
    setHasChanges(true)
  }

  const updateTeamMember = (id: string, field: string, value: string) => {
    setTeam(prev => prev.map(m => m.id === id ? { ...m, [field]: value } : m))
    setHasChanges(true)
  }

  const handleSave = () => {
    // Simulate save operation
    console.log('Saving startup profile...', { companyInfo, socialMedia, founders, team })
    setHasChanges(false)
    setIsEditing(false)
    // Show success message
    alert('Startup profile saved successfully!')
  }

  const renderCompanyInfo = () => (
    <div className="space-y-6">
      {/* Cover Photo Section */}
      <div className="relative">
        <div className="h-48 bg-linear-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <div className="text-center text-white">
            <Camera className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm">Add Cover Photo</p>
          </div>
        </div>
        <div className="absolute -bottom-8 left-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full border-4 border-white flex items-center justify-center">
            <Camera className="w-6 h-6 text-gray-400" />
          </div>
          <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <Upload className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      <div className="pt-12 space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name *
            </label>
            <input
              type="text"
              value={companyInfo.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value, 'company')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter company name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Registration No. *
            </label>
            <input
              type="text"
              value={companyInfo.registrationNo}
              onChange={(e) => handleInputChange('registrationNo', e.target.value, 'company')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Registration No."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website
            </label>
            <input
              type="url"
              value={companyInfo.website}
              onChange={(e) => handleInputChange('website', e.target.value, 'company')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://yourwebsite.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={companyInfo.category}
              onChange={(e) => handleInputChange('category', e.target.value, 'company')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Category</option>
              <option value="Technology">Technology</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Finance">Finance</option>
              <option value="Education">Education</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Type
            </label>
            <select
              value={companyInfo.productType}
              onChange={(e) => handleInputChange('productType', e.target.value, 'company')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Product Type</option>
              <option value="Software">Software</option>
              <option value="Hardware">Hardware</option>
              <option value="Service">Service</option>
              <option value="Platform">Platform</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Market
            </label>
            <select
              value={companyInfo.targetMarket}
              onChange={(e) => handleInputChange('targetMarket', e.target.value, 'company')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Target Market</option>
              <option value="B2B">B2B</option>
              <option value="B2C">B2C</option>
              <option value="B2B2C">B2B2C</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stage
          </label>
          <select
            value={companyInfo.stage}
            onChange={(e) => handleInputChange('stage', e.target.value, 'company')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Stage</option>
            <option value="Idea">Idea</option>
            <option value="MVP">MVP</option>
            <option value="Growth">Growth</option>
            <option value="Scale">Scale</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Describe your stage
          </label>
          <textarea
            value={companyInfo.stageDescription}
            onChange={(e) => handleInputChange('stageDescription', e.target.value, 'company')}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Describe your stage"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Description
          </label>
          <textarea
            value={companyInfo.productDescription}
            onChange={(e) => handleInputChange('productDescription', e.target.value, 'company')}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Describe your product in detail"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Short Description
          </label>
          <textarea
            value={companyInfo.shortDescription}
            onChange={(e) => handleInputChange('shortDescription', e.target.value, 'company')}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Enter a short summary of your startup (1-2 lines)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Startup Description
          </label>
          <textarea
            value={companyInfo.startupDescription}
            onChange={(e) => handleInputChange('startupDescription', e.target.value, 'company')}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Tell us about your company..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Institute
            </label>
            <select
              value={companyInfo.institute}
              onChange={(e) => handleInputChange('institute', e.target.value, 'company')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Institute</option>
              <option value="IIT Delhi">IIT Delhi</option>
              <option value="IIT Bombay">IIT Bombay</option>
              <option value="IIT Madras">IIT Madras</option>
              <option value="Stanford University">Stanford University</option>
              <option value="MIT">MIT</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Institute Description
          </label>
          <textarea
            value={companyInfo.instituteDescription}
            onChange={(e) => handleInputChange('instituteDescription', e.target.value, 'company')}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Write a brief description about your institute"
          />
        </div>
      </div>
    </div>
  )

  const renderSocialMedia = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            LinkedIn URL
          </label>
          <input
            type="url"
            value={socialMedia.linkedin}
            onChange={(e) => handleInputChange('linkedin', e.target.value, 'social')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://linkedin.com/..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Instagram URL
          </label>
          <input
            type="url"
            value={socialMedia.instagram}
            onChange={(e) => handleInputChange('instagram', e.target.value, 'social')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://instagram.com/..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Twitter/X URL
          </label>
          <input
            type="url"
            value={socialMedia.twitter}
            onChange={(e) => handleInputChange('twitter', e.target.value, 'social')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://twitter.com/..."
          />
        </div>
      </div>
    </div>
  )

  const renderFounders = () => (
    <div className="space-y-6">
      {founders.map((founder, index) => (
        <div key={founder.id} className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Founder {index + 1}</h3>
            {founders.length > 1 && (
              <button
                onClick={() => removeFounder(founder.id)}
                className="text-red-500 hover:text-red-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={founder.name}
                onChange={(e) => updateFounder(founder.id, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Full Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Designation
              </label>
              <input
                type="text"
                value={founder.designation}
                onChange={(e) => updateFounder(founder.id, 'designation', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Designation"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Institution
              </label>
              <select
                value={founder.institution}
                onChange={(e) => updateFounder(founder.id, 'institution', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Institution</option>
                <option value="IIT Delhi">IIT Delhi</option>
                <option value="IIT Bombay">IIT Bombay</option>
                <option value="Stanford University">Stanford University</option>
                <option value="MIT">MIT</option>
                <option value="Harvard University">Harvard University</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Photo
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-500">Upload Photo</p>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <button
        onClick={addFounder}
        className="w-full border-2 border-dashed border-blue-300 rounded-lg p-4 text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer"
      >
        <Plus className="w-5 h-5 mx-auto mb-2" />
        <span className="font-medium">+ Add Founder</span>
      </button>
    </div>
  )

  const renderTeam = () => (
    <div className="space-y-6">
      {team.map((member, index) => (
        <div key={member.id} className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Member {index + 1}</h3>
            <button
              onClick={() => removeTeamMember(member.id)}
              className="text-red-500 hover:text-red-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={member.name}
                onChange={(e) => updateTeamMember(member.id, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Full Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Designation
              </label>
              <input
                type="text"
                value={member.designation}
                onChange={(e) => updateTeamMember(member.id, 'designation', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Designation"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Institution
              </label>
              <select
                value={member.institution}
                onChange={(e) => updateTeamMember(member.id, 'institution', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Institution</option>
                <option value="IIT Delhi">IIT Delhi</option>
                <option value="IIT Bombay">IIT Bombay</option>
                <option value="Stanford University">Stanford University</option>
                <option value="MIT">MIT</option>
                <option value="Harvard University">Harvard University</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Photo
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-500">Upload Photo</p>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <button
        onClick={addTeamMember}
        className="w-full border-2 border-dashed border-blue-300 rounded-lg p-4 text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer"
      >
        <Plus className="w-5 h-5 mx-auto mb-2" />
        <span className="font-medium">+ Add Team Member</span>
      </button>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Startup Profile</h2>
          <p className="text-gray-600 mt-1">Manage your startup information and team details</p>
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
            Save Profile
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
        {activeTab === 'company' && renderCompanyInfo()}
        {activeTab === 'social' && renderSocialMedia()}
        {activeTab === 'founders' && renderFounders()}
        {activeTab === 'team' && renderTeam()}
      </div>
    </div>
  )
}
