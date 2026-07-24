import React, { useState, useCallback } from 'react'
import { validatePhone } from '../utils/phoneValidation'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import ProgressBar from '../components/ProgressBar'
import StepIndicator from '../components/StepIndicator'
import ClientInformation from '../components/ClientInformation'
import Ratings from '../components/Ratings'
import Experience from '../components/Experience'
import Suggestions from '../components/Suggestions'
import ThankYou from '../components/ThankYou'
import Footer from '../components/Footer'
import { HiOutlineStar, HiOutlineEmojiHappy, HiOutlineChatAlt2, HiLockClosed } from 'react-icons/hi'

// ─── Constants ──────────────────────────────────────────────────────────────

const TOTAL_STEPS = 4

/**
 * Canonical form data shape.
 * Backend developers: this object maps directly to your POST /api/feedback payload.
 */
const INITIAL_FORM_DATA = {
  companyName:  '',
  contactName:  '',
  designation:  '',
  email:        '',
  phone:        '',
  phoneMeta:    { dialCode: '91', country: { code: 'IN', name: 'India', dial: '91', minLen: 10, maxLen: 10 } },
  ratings: { overall: 0, support: 0, product: 0, value: 0 },
  experience:   '',
  suggestion:   '',
}

// ─── Validation ─────────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateStep(step, data) {
  const err = {}

  if (step === 1) {
    if (!data.companyName.trim())  err.companyName  = 'Company name is required.'
    if (!data.contactName.trim())  err.contactName  = 'Contact person name is required.'
    if (!data.designation.trim())  err.designation  = 'Designation is required.'
    if (!data.email.trim())        err.email        = 'Email address is required.'
    else if (!EMAIL_RE.test(data.email.trim()))
                                   err.email        = 'Please enter a valid email address.'
    // Phone is optional — only validate if something was entered beyond the dial code
    if (data.phone) {
      const dialLen    = (data.phoneMeta?.dialCode || '').length
      const hasDigits  = data.phone.replace(/\D/g, '').length > dialLen
      if (hasDigits) {
        const phoneErr = validatePhone(data.phone, data.phoneMeta?.countryData)
        if (phoneErr) err.phone = phoneErr
      }
    }
  }

  if (step === 2) {
    const anyRated = Object.values(data.ratings).some(v => v > 0)
    if (!anyRated) err.ratings = 'Please rate at least one category before continuing.'
  }

  if (step === 3) {
    if (!data.experience.trim()) err.experience = 'Please share your experience before continuing.'
  }

  return err
}

// ─── Locked step cards (shown below the active step card) ───────────────────

const LOCKED_STEPS = [
  { step: 2, Icon: HiOutlineStar,        title: 'Step 2 – Rate Our Services', desc: 'Rate your experience with our products and services.' },
  { step: 3, Icon: HiOutlineEmojiHappy,  title: 'Step 3 – Your Experience',   desc: 'Tell us about your overall experience with OHCTECH.' },
  { step: 4, Icon: HiOutlineChatAlt2,    title: 'Step 4 – Suggestions',       desc: 'Share your valuable suggestions and feedback.' },
]

function LockedCard({ Icon, title, desc }) {
  return (
    <div
      className="flex items-center justify-between bg-white rounded-xl border border-[#E5E7EB]
                 px-4 py-3.5 shadow-sm opacity-70 select-none"
      aria-hidden="true"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-8 h-8 rounded-full bg-[#F3F4F6] flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 text-[#9CA3AF]" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#6B7280] leading-tight truncate">{title}</p>
          <p className="text-xs text-[#9CA3AF] mt-0.5 leading-tight truncate">{desc}</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-[#9CA3AF] flex-shrink-0 ml-3">
        <HiLockClosed className="w-4 h-4" />
        <span className="text-xs font-medium hidden sm:inline">Locked</span>
      </div>
    </div>
  )
}

// ─── FeedbackForm (main page) ────────────────────────────────────────────────

export default function FeedbackForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isComplete,  setIsComplete]  = useState(false)
  const [formData,    setFormData]    = useState(INITIAL_FORM_DATA)
  const [errors,      setErrors]      = useState({})

  /** Update a single top-level field (or the nested ratings object). */
  const handleChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setErrors(prev => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }, [])

  /** Validate current step; advance only if valid. */
  const handleNext = useCallback(() => {
    const stepErrors = validateStep(currentStep, formData)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      const firstId = Object.keys(stepErrors)[0]
      document.getElementById(firstId)?.focus()
      return
    }
    setErrors({})
    setCurrentStep(s => s + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentStep, formData])

  /** Go back, preserving all entered data. */
  const handleBack = useCallback(() => {
    setErrors({})
    setCurrentStep(s => s - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  /**
   * Submit handler — frontend-only simulation.
   *
   * Backend integration point:
   *   const res = await fetch('/api/feedback', {
   *     method: 'POST',
   *     headers: { 'Content-Type': 'application/json' },
   *     body: JSON.stringify(formData),
   *   })
   *   if (res.ok) setIsComplete(true)
   */
  const handleSubmit = useCallback(() => {
    setErrors({})
    setIsComplete(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  /** Reset everything back to Step 1. */
  const handleReset = useCallback(() => {
    setFormData(INITIAL_FORM_DATA)
    setErrors({})
    setCurrentStep(1)
    setIsComplete(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const sharedProps = { formData, onChange: handleChange, errors }

  return (
    <div className="min-h-screen flex flex-col bg-[#F0FAF9]">
      <main className="flex-1">
        <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10 flex gap-6 items-start">

          {/* Sidebar — visible on lg+ */}
          <Sidebar />

          {/* Main content */}
          <div className="flex-1 flex flex-col gap-4 min-w-0">

            {!isComplete && <Header />}

            {isComplete ? (
              /* ── Thank You ── */
              <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-[0_2px_16px_rgba(0,0,0,0.07)] overflow-hidden">
                <ThankYou onClose={handleReset} />
              </div>
            ) : (
              <>
                {/* Progress + step indicator */}
                <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-[0_2px_16px_rgba(0,0,0,0.07)] px-4 sm:px-5 py-4">
                  <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
                  <StepIndicator currentStep={currentStep} />
                </div>

                {/* Active step card */}
                <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-[0_2px_16px_rgba(0,0,0,0.07)] px-4 sm:px-6 py-6">
                  {currentStep === 1 && (
                    <ClientInformation {...sharedProps} onNext={handleNext} />
                  )}
                  {currentStep === 2 && (
                    <Ratings {...sharedProps} onNext={handleNext} onBack={handleBack} />
                  )}
                  {currentStep === 3 && (
                    <Experience {...sharedProps} onNext={handleNext} onBack={handleBack} />
                  )}
                  {currentStep === 4 && (
                    <Suggestions {...sharedProps} onSubmit={handleSubmit} onBack={handleBack} />
                  )}
                </div>

                {/* Locked future steps */}
                {LOCKED_STEPS
                  .filter(s => s.step > currentStep)
                  .map(({ step, Icon, title, desc }) => (
                    <LockedCard key={step} Icon={Icon} title={title} desc={desc} />
                  ))
                }
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
