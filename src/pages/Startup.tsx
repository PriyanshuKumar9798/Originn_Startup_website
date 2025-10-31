import { useEffect, useState } from 'react'
import { Building, Globe, Users, UserPlus, Camera, Upload, Plus, X, Save, Edit3, Eye, ArrowLeft, Share2, CheckCircle, Linkedin, Twitter, Facebook, Bookmark, Building2, TrendingUp, GraduationCap, Package } from 'lucide-react'
import { authStorage } from '../services/auth'
import { getStartupById } from '../services/startup'
import { fetchFilters, type FiltersResponse } from '../services/filters'

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
  const [previewActiveTab, setPreviewActiveTab] = useState<'about' | 'behind' | 'team' | 'collaborate' | 'jobs'>('about')

  // Company Information State
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    companyName: '',
    registrationNo: '',
    website: '',
    category: '',
    productType: '',
    targetMarket: '',
    stage: '',
    stageDescription: '',
    productDescription: '',
    shortDescription: '',
    startupDescription: '',
    institute: '',
    instituteDescription: ''
  })

  // Social Media State
  const [socialMedia, setSocialMedia] = useState<SocialMedia>({
    linkedin: '',
    instagram: '',
    twitter: ''
  })

  // Founders State
  const [founders, setFounders] = useState<Founder[]>([
    
  ])

  // Team State
  const [team, setTeam] = useState<TeamMember[]>([
    
  ])
  const [filters, setFilters] = useState<FiltersResponse | null>(null)

  useEffect(() => {
    const info = authStorage.getStartup<{ id?: number }>()
    if (!info?.id) return
    const controller = new AbortController()
    
    getStartupById(info.id, controller.signal)
      .then((res) => {
        const d = res.data
        setCompanyInfo({
          companyName: d.company_name || '',
          registrationNo: d.registration_no ? String(d.registration_no) : '',
          website: d.company_website || '',
          category: d.category || '',
          productType: d.product_type || '',
          targetMarket: d.target_market || '',
          stage: d.stage || '',
          stageDescription: typeof d.stage_description === 'string' ? d.stage_description : '',
          productDescription: d.product_description || '',
          shortDescription: d.short_description || '',
          startupDescription: d.about_startup || '',
          institute: d.institute_name || '',
          instituteDescription: typeof d.institute_details === 'string' ? d.institute_details : '',
        })
        if (d.social_links && typeof d.social_links === 'object') {
          const s: any = d.social_links
          setSocialMedia({
            linkedin: s.linkedin || '',
            instagram: s.instagram || '',
            twitter: s.twitter || '',
          })
        }
      })
      .catch(() => {})
      .finally(() => {})
    return () => controller.abort()
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    fetchFilters(controller.signal).then(setFilters).catch(() => {})
    return () => controller.abort()
  }, [])

  const tabs = [
    { id: 'company', label: 'Company Info', icon: Building },
    { id: 'social', label: 'Social Media', icon: Globe },
    { id: 'founders', label: 'Founders', icon: Users },
    { id: 'team', label: 'Team', icon: UserPlus },
    { id: 'preview', label: 'Preview', icon: Eye }
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
              {(filters?.categories?.values || []).map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
              {companyInfo.category && !(filters?.categories?.values || []).some(c => c.value === companyInfo.category) && (
                <option value={companyInfo.category}>{companyInfo.category}</option>
              )}
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
              {(filters?.product_types?.values || []).map(p => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
              {companyInfo.productType && !(filters?.product_types?.values || []).some(p => p.value === companyInfo.productType) && (
                <option value={companyInfo.productType}>{companyInfo.productType}</option>
              )}
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
              {(filters?.target_markets?.values || []).map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
              {companyInfo.targetMarket && !(filters?.target_markets?.values || []).some(t => t.value === companyInfo.targetMarket) && (
                <option value={companyInfo.targetMarket}>{companyInfo.targetMarket}</option>
              )}
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
            {(filters?.stages?.values || []).map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
            {companyInfo.stage && !(filters?.stages?.values || []).some(s => s.value === companyInfo.stage) && (
              <option value={companyInfo.stage}>{companyInfo.stage}</option>
            )}
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

  const renderPreview = () => {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Startup Profile Preview</h3>
          <p className="text-gray-600">This is how your startup profile will appear to potential investors and backers</p>
        </div>

        {/* Full Startup Detail Preview */}
        <div className="min-h-screen bg-white">
          {/* Banner Section */}
          <section className="relative h-80 overflow-visible">
            <img
              src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=400&fit=crop&crop=center"
              alt={companyInfo.companyName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
            
            {/* Header Navigation */}
            <div className="absolute top-0 left-0 right-0 z-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-slate-700 hover:text-slate-900 transition-colors cursor-pointer px-4 py-2 rounded-full">
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </div>
                </div>
              </div>
            </div>

            {/* Overlaying Profile Card */}
            <div className="absolute inset-x-0 -bottom-30 z-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-5 sm:p-6 max-w-3xl relative">
                  {/* Actions row */}
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <button className="w-9 h-9 bg-white border border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer rounded-full flex items-center justify-center shadow-sm">
                      <Edit3 className="h-4 w-4 text-slate-600" />
                    </button>
                    <button className="w-9 h-9 bg-white border border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer rounded-full flex items-center justify-center shadow-sm">
                      <Bookmark className="h-4 w-4 text-slate-600" />
                    </button>
                    <button className="w-9 h-9 bg-white border border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer rounded-full flex items-center justify-center shadow-sm">
                      <Share2 className="h-4 w-4 text-slate-600" />
                    </button>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    {/* Profile Picture */}
                    <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center shrink-0">
                      <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                        <Building2 className="h-4 w-4 text-slate-900" />
                      </div>
                    </div>

                    {/* Profile Info */}
                    <div className="flex-1">
                      <h1 className="text-2xl font-extrabold text-slate-900 mb-1 tracking-tight">{companyInfo.companyName}</h1>
                      <div className="flex items-center gap-2 text-slate-700 text-sm sm:text-[15px] mb-3">
                        <span className="underline underline-offset-4">California, United States</span>
                        <span className="text-slate-400">•</span>
                        <span className="font-medium">{companyInfo.category}</span>
                        <span className="text-slate-400">•</span>
                        <span className="font-medium">{companyInfo.institute}</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed mb-4 text-sm sm:text-base">{companyInfo.shortDescription}</p>

                      {/* Social Links */}
                      <div className="flex items-center gap-2.5">
                        {socialMedia.linkedin && (
                          <a href={socialMedia.linkedin} className="w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer shadow-sm">
                            <Linkedin className="h-4 w-4 text-blue-600" />
                          </a>
                        )}
                        {socialMedia.twitter && (
                          <a href={socialMedia.twitter} className="w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer shadow-sm">
                            <Twitter className="h-4 w-4 text-blue-600" />
                          </a>
                        )}
                        {companyInfo.website && (
                          <a href={companyInfo.website} className="w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer shadow-sm">
                            <Globe className="h-4 w-4 text-slate-700" />
                          </a>
                        )}
                        {socialMedia.instagram && (
                          <a href={socialMedia.instagram} className="w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer shadow-sm">
                            <Facebook className="h-4 w-4 text-blue-600" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="pt-36 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Main Content */}
                <div className="lg:col-span-2">
                  {/* Navigation Tabs */}
                  <div className="border-b border-slate-200 mb-8">
                    <nav className="flex space-x-8">
                      {[
                        { id: 'about', label: 'About' },
                        { id: 'behind', label: 'Behind the Scenes' },
                        { id: 'team', label: 'Team' },
                        { id: 'collaborate', label: 'Collaborate' },
                        { id: 'jobs', label: 'Jobs' }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setPreviewActiveTab(tab.id as any)}
                          className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors cursor-pointer ${
                            previewActiveTab === tab.id
                              ? 'border-blue-500 text-blue-600'
                              : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </nav>
                  </div>

                  {/* Tab Content */}
                  {previewActiveTab === 'about' && (
                    <div className="space-y-8">
                      {/* Company Overview */}
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                            <Building2 className="h-4 w-4 text-slate-600" />
                          </div>
                          <h2 className="text-xl font-bold text-slate-900">Company Overview</h2>
                        </div>
                        <p className="text-slate-700 leading-relaxed">
                          {companyInfo.startupDescription}
                        </p>
                      </div>

                      {/* Incubation & Background */}
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                            <GraduationCap className="h-4 w-4 text-slate-600" />
                          </div>
                          <h2 className="text-xl font-bold text-slate-900">Incubation & Background</h2>
                        </div>
                        <p className="text-slate-700 leading-relaxed">
                          {companyInfo.instituteDescription}
                        </p>
                      </div>

                      {/* About the Product */}
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                            <Package className="h-4 w-4 text-slate-600" />
                          </div>
                          <h2 className="text-xl font-bold text-slate-900">About the Product</h2>
                        </div>
                        
                        {/* Current Development Stage */}
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold text-slate-900 mb-3">Current Development Stage</h3>
                          <div className="flex items-center gap-2 mb-3">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span className="font-medium text-slate-900">{companyInfo.stage}</span>
                          </div>
                          <p className="text-slate-700 leading-relaxed">
                            {companyInfo.stageDescription}
                          </p>
                        </div>

                        {/* Key Features */}
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold text-slate-900 mb-3">Key Features</h3>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 shrink-0" />
                              <span className="text-slate-700">Advanced technology integration</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 shrink-0" />
                              <span className="text-slate-700">User-friendly interface design</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 shrink-0" />
                              <span className="text-slate-700">Scalable solution for growing businesses</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 shrink-0" />
                              <span className="text-slate-700">24/7 customer support</span>
                            </li>
                          </ul>
                        </div>

                        {/* Problem We Solve */}
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-3">Problem We Solve</h3>
                          <p className="text-slate-700 leading-relaxed">
                            {companyInfo.productDescription}
                          </p>
                        </div>
                      </div>
                      
                      {/* Meet the Founders */}
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                            <Users className="h-4 w-4 text-slate-600" />
                          </div>
                          <h2 className="text-xl font-bold text-slate-900">Meet the Founders</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {founders.map((founder) => (
                            <div key={founder.id} className="flex items-start gap-4">
                              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                                {founder.photo ? (
                                  <img src={founder.photo} alt={founder.name} className="w-full h-full object-cover rounded-full" />
                                ) : (
                                  <Users className="w-8 h-8 text-gray-400" />
                                )}
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-slate-900 mb-1">{founder.name}</h3>
                                <p className="text-slate-600 text-sm mb-2">{founder.designation}</p>
                                <p className="text-slate-700 text-sm leading-relaxed">{founder.institution}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Other tabs content */}
                  {previewActiveTab !== 'about' && (
                    <div className="text-center py-12">
                      <p className="text-slate-500">Content for {previewActiveTab} tab coming soon...</p>
                    </div>
                  )}
                </div>

                {/* Right Column - Current Stage Card */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24">
                    <div className="bg-blue-900 text-white rounded-2xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                          <TrendingUp className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="font-bold text-white">Current Stage</h3>
                      </div>
                      
                      <div className="bg-blue-700 text-blue-100 px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                        {companyInfo.stage}
                      </div>
                      
                      <p className="text-blue-100 text-sm leading-relaxed mb-6">
                        {companyInfo.stageDescription}
                      </p>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-1.5 h-1.5 bg-blue-300 rounded-full" />
                            <span className="text-blue-200 text-sm font-medium">Product Type</span>
                          </div>
                          <div className="bg-blue-800 text-white px-3 py-1 rounded text-sm font-medium">
                            {companyInfo.productType}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-1.5 h-1.5 bg-blue-300 rounded-full" />
                            <span className="text-blue-200 text-sm font-medium">Target Market</span>
                          </div>
                          <div className="bg-blue-800 text-white px-3 py-1 rounded text-sm font-medium">
                            {companyInfo.targetMarket}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  }

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
        {activeTab === 'preview' && renderPreview()}
      </div>
    </div>
  )
}
