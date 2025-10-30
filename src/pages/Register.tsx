import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Eye, EyeOff, Upload, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { applyForStartup } from '../services/startup'
import { TimelineDemo } from '../components/ui/timeline-demo'
import { fetchFilters, type FiltersResponse } from '../services/filters'

export const Register = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState<{ visible: boolean; message: string }>(() => ({ visible: false, message: '' }))
  const [filters, setFilters] = useState<FiltersResponse | null>(null)
  const [formData, setFormData] = useState({
    companyName: '',
    aboutStartup: '',
    productDescription: '',
    founderName: '',
    founderEmail: '',
    password: '',
    confirmPassword: '',
    companyWebsite: '',
    pitchDeck: null,
    instituteName: '',
    teamMembers: 0,
    stage: 'Idea',
    address: ''
  })

  const steps = [
    { id: 1, title: 'Company Details', description: 'Basic information about your startup' },
    { id: 2, title: 'Founder Information', description: 'Your personal details' },
    { id: 3, title: 'Additional Details', description: 'Team, stage, and other information' }
  ]

  useEffect(() => {
    const controller = new AbortController()
    fetchFilters(controller.signal)
      .then(setFilters)
      .catch(() => {})
    return () => controller.abort()
  }, [])

  const handleInputChange = (field: string, value: string | number | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (currentStep < 3) {
      if (isStepValid(currentStep)) {
        handleNext()
      }
      return
    }
    if (isSubmitting) return
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }

    setIsSubmitting(true)
    const controller = new AbortController()
    try {
      const allowedInstitutes = (filters?.institutes?.values || []).map(i => i.value)
      const allowedStages = (filters?.stages?.values || []).map(s => s.value)

      const chosenInstitute = formData.instituteName?.trim()
      const instituteIsAllowed = !!chosenInstitute && allowedInstitutes.includes(chosenInstitute)
      const finalStage = allowedStages.includes(mapStage(formData.stage)) ? mapStage(formData.stage) : mapStage(formData.stage)

      const payload = {
        company_name: formData.companyName || undefined,
        about_startup: formData.aboutStartup || undefined,
        founder_email: formData.founderEmail || undefined,
        product_description: formData.productDescription || undefined,
        founder_name: formData.founderName || undefined,
        stage: finalStage,
        company_website: formData.companyWebsite || undefined,
        pitch_deck_url: undefined as string | undefined,
        institute_name: instituteIsAllowed ? chosenInstitute : (chosenInstitute ? 'Other' : undefined),
        institute_custom: !instituteIsAllowed && chosenInstitute ? chosenInstitute : undefined,
        team_members: typeof formData.teamMembers === 'number' ? formData.teamMembers : undefined,
        address: formData.address || undefined,
        password: formData.password || undefined,
        confirm_password: formData.confirmPassword || undefined,
      }

      await applyForStartup(payload, controller.signal)

      setToast({ visible: true, message: 'Registration successful! Our team will reach out shortly.' })
      setTimeout(() => setToast({ visible: false, message: '' }), 3000)

      setFormData({
        companyName: '',
        aboutStartup: '',
        productDescription: '',
        founderName: '',
        founderEmail: '',
        password: '',
        confirmPassword: '',
        companyWebsite: '',
        pitchDeck: null,
        instituteName: '',
        teamMembers: 0,
        stage: 'Idea',
        address: ''
      })
      setCurrentStep(1)
    } catch (err: any) {
      setToast({ visible: true, message: err?.message || 'Registration failed' })
      setTimeout(() => setToast({ visible: false, message: '' }), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const mapStage = (stageValue: string) => {
    switch (stageValue) {
      case 'Idea':
        return 'Idea Stage'
      default:
        return stageValue
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentStep < 3) {
      e.preventDefault()
    }
  }

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.companyName && formData.aboutStartup && formData.productDescription
      case 2:
        return formData.founderName && formData.founderEmail && formData.password && formData.confirmPassword
      case 3:
        return true // Optional fields
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
        {/* Left Column - Marketing Content */}
        <div className="flex flex-col items-center justify-center text-center min-h-[600px]">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold ring-1 ring-blue-200 mb-6">Join India's Premier Startup Platform</div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-4">Launch Your Startup Today</h1>
          <p className="text-lg text-slate-600 max-w-xl mb-6">Join thousands of entrepreneurs who have successfully launched their startups on Originn. Get access to investors, customers, and the resources you need to succeed.</p>

          <div className="grid grid-cols-3 gap-6 max-w-md mt-8">
            <div className="text-center">
              <div className="text-2xl font-extrabold text-blue-600">₹0</div>
              <div className="text-xs text-slate-500">Registration Fee</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-extrabold text-emerald-600">100%</div>
              <div className="text-xs text-slate-500">Escrow Protected</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-extrabold text-indigo-600">24/7</div>
              <div className="text-xs text-slate-500">Support</div>
            </div>
          </div>
        </div>

        {/* Right Column - Wizard Form */}
        <div className="bg-white/70 supports-backdrop-filter:bg-white/60 backdrop-blur-xl rounded-2xl border border-white/60 shadow-[0_12px_40px_rgba(2,6,23,0.12)] p-6 sm:p-8">
          <h2 className="text-2xl font-bold mb-1">Application Form</h2>
          <p className="text-sm text-slate-600 mb-6">Complete the form below to apply for Originn</p>

          {/* Compact Progress Steps */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    currentStep >= step.id 
                      ? 'bg-blue-600 border-blue-600 text-white' 
                      : 'bg-white border-slate-300 text-slate-400'
                  }`}>
                    {currentStep > step.id ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <span className="text-xs font-semibold">{step.id}</span>
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 ${
                      currentStep > step.id ? 'bg-blue-600' : 'bg-slate-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <h3 className="text-sm font-semibold text-slate-900">{steps[currentStep - 1].title}</h3>
              <p className="text-xs text-slate-600">{steps[currentStep - 1].description}</p>
            </div>
          </div>

          {currentStep < 3 && (
            <div className="space-y-4" onKeyDown={handleKeyDown}>
              {/* Step 1: Company Details */}
              {currentStep === 1 && (
                <div className="space-y-4">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-slate-700 mb-2">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="companyName"
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    placeholder="Company Name"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="aboutStartup" className="block text-sm font-medium text-slate-700 mb-2">
                    About Startup <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="aboutStartup"
                    required
                    value={formData.aboutStartup}
                    onChange={(e) => handleInputChange('aboutStartup', e.target.value)}
                    placeholder="Brief about your startup"
                    rows={3}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent resize-none"
                  />
                </div>

                <div>
                  <label htmlFor="productDescription" className="block text-sm font-medium text-slate-700 mb-2">
                    Product Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="productDescription"
                    required
                    value={formData.productDescription}
                    onChange={(e) => handleInputChange('productDescription', e.target.value)}
                    placeholder="Describe your main product or service"
                    rows={3}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent resize-none"
                  />
                </div>
                </div>
              )}

              {/* Step 2: Founder Information */}
              {currentStep === 2 && (
                <div className="space-y-4">
                <div>
                  <label htmlFor="founderName" className="block text-sm font-medium text-slate-700 mb-2">
                    Founder Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="founderName"
                    type="text"
                    required
                    value={formData.founderName}
                    onChange={(e) => handleInputChange('founderName', e.target.value)}
                    placeholder="Founder Name"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="founderEmail" className="block text-sm font-medium text-slate-700 mb-2">
                    Founder Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="founderEmail"
                    type="email"
                    required
                    value={formData.founderEmail}
                    onChange={(e) => handleInputChange('founderEmail', e.target.value)}
                    placeholder="steffan@yopmail.com"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Enter your password"
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 pr-10 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-2">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      placeholder="Confirm your password"
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 pr-10 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                </div>
              )}

              {/* Navigation Buttons (steps 1-2) */}
              <div className="flex justify-between pt-4 border-t border-slate-200">
                <Button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  variant="secondary"
                  size="md"
                  className={currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={!isStepValid(currentStep)}
                  variant="primary"
                  size="md"
                  showArrow
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Step 3: Additional Details */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="companyWebsite" className="block text-sm font-medium text-slate-700 mb-2">
                    Company Website
                  </label>
                  <input
                    id="companyWebsite"
                    type="url"
                    value={formData.companyWebsite}
                    onChange={(e) => handleInputChange('companyWebsite', e.target.value)}
                    placeholder="https://technova.com"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="pitchDeck" className="block text-sm font-medium text-slate-700 mb-2">
                    Upload Pitch Deck (PDF or PPT)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      id="pitchDeck"
                      type="file"
                      accept=".pdf,.ppt,.pptx"
                      onChange={(e) => handleInputChange('pitchDeck', e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    <label
                      htmlFor="pitchDeck"
                      className="flex items-center gap-2 px-3 py-2 border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors"
                    >
                      <Upload className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-600">Choose File</span>
                    </label>
                    <span className="text-sm text-slate-500">No file chosen</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="instituteName" className="block text-sm font-medium text-slate-700 mb-2">
                      Institute Name
                    </label>
                    <input
                      id="instituteName"
                      type="text"
                      list="instituteOptions"
                      value={formData.instituteName}
                      onChange={(e) => handleInputChange('instituteName', e.target.value)}
                      placeholder="Start typing and select..."
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent"
                    />
                    <datalist id="instituteOptions">
                      {(filters?.institutes?.values || []).map(opt => (
                        <option key={opt.value} value={opt.value} />
                      ))}
                      <option value="Other" />
                    </datalist>
                  </div>

                  <div>
                    <label htmlFor="teamMembers" className="block text-sm font-medium text-slate-700 mb-2">
                      Team Members
                    </label>
                    <input
                      id="teamMembers"
                      type="number"
                      min="0"
                      value={formData.teamMembers}
                      onChange={(e) => handleInputChange('teamMembers', parseInt(e.target.value) || 0)}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="stage" className="block text-sm font-medium text-slate-700 mb-2">
                    Stage <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="stage"
                    required
                    value={mapStage(formData.stage)}
                    onChange={(e) => handleInputChange('stage', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent"
                  >
                    {(filters?.stages?.values || []).map(s => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                    {!(filters?.stages?.values?.length) && (
                      <>
                        <option value="Idea Stage">Idea Stage</option>
                        <option value="Prototype Stage">Prototype Stage</option>
                        <option value="Pre-Revenue Stage">Pre-Revenue Stage</option>
                        <option value="Early Revenue Stage">Early Revenue Stage</option>
                        <option value="Series A/B/C Stage">Series A/B/C Stage</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-2">
                    Address
                  </label>
                  <textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Jaipur, Rajasthan"
                    rows={2}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent resize-none"
                  />
                </div>
              </div>

              {/* Navigation Buttons (step 3) */}
              <div className="flex justify-between pt-4 border-t border-slate-200">
                <Button
                  type="button"
                  onClick={handlePrevious}
                  variant="secondary"
                  size="md"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={isSubmitting}
                  showArrow
                >
                  {isSubmitting ? 'Submitting…' : 'Submit Application'}
                </Button>
              </div>
            </form>
          )}

          <div className="text-center text-sm text-slate-600 mt-4">
            Already have an account? <Link to="/login" className="text-blue-600 hover:underline font-medium">Login</Link>
          </div>
        </div>
      </div>
    </section>
    
    {/* Timeline Section */}
    <div className="w-full">
      <TimelineDemo />
    </div>

    {/* Toast */}
    {toast.visible && (
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-slate-900 text-white px-4 py-2 rounded-lg shadow-lg border border-slate-800">
          <span className="text-sm">{toast.message}</span>
        </div>
      </div>
    )}
    </div>
  )
}
