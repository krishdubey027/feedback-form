import React from 'react'
import InputField from './InputField'
import PrimaryButton from './PrimaryButton'
import PhoneInputField from './PhoneInputField'
import {
  HiOutlineOfficeBuilding,
  HiOutlineUser,
  HiOutlineBriefcase,
  HiOutlineMail,
} from 'react-icons/hi'

/**
 * ClientInformation — Step 1
 * Collects: Company Name, Contact Person, Designation, Email, Mobile (optional).
 * All required fields are validated before Next is allowed.
 * Mobile Number uses PhoneInputField — optional, but validated if filled.
 *
 * @param {object}   formData
 * @param {Function} onChange  - (field: string, value: any) => void
 * @param {Function} onNext
 * @param {object}   errors    - { companyName?, contactName?, designation?, email?, phone? }
 */
export default function ClientInformation({ formData, onChange, onNext, errors }) {
  /**
   * Phone change handler.
   * Stores both raw digits and selected country metadata so the parent
   * can validate and — later — send the full number with dial code to the API.
   */
  const handlePhoneChange = (digits, meta) => {
    onChange('phone', digits)
    onChange('phoneMeta', meta) // { dialCode, country } — ready for backend
  }

  return (
    <section aria-labelledby="step1-heading" className="step-enter">
      {/* Heading row */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 id="step1-heading" className="text-lg font-bold text-[#1A2B3C] mb-1">
            Step 1 – Client Information
          </h2>
          <p className="text-sm text-[#6B7280]">
            Please provide your details to help us understand you better.
          </p>
        </div>
        <div
          className="hidden sm:flex w-12 h-12 rounded-xl bg-[#E6F7F5] items-center justify-center flex-shrink-0"
          aria-hidden="true"
        >
          <HiOutlineOfficeBuilding className="w-6 h-6 text-[#0E9E8E]" />
        </div>
      </div>

      {/* Form fields */}
      <div className="space-y-4">
        {/* Row 1: Company Name + Contact Person */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            id="companyName"
            label="Company Name"
            required
            placeholder="Enter your company name"
            icon={<HiOutlineOfficeBuilding />}
            value={formData.companyName}
            onChange={e => onChange('companyName', e.target.value)}
            error={errors.companyName}
            autoComplete="organization"
          />
          <InputField
            id="contactName"
            label="Contact Person Name"
            required
            placeholder="Enter your full name"
            icon={<HiOutlineUser />}
            value={formData.contactName}
            onChange={e => onChange('contactName', e.target.value)}
            error={errors.contactName}
            autoComplete="name"
          />
        </div>

        {/* Row 2: Designation + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            id="designation"
            label="Designation"
            required
            placeholder="Enter your designation"
            icon={<HiOutlineBriefcase />}
            value={formData.designation}
            onChange={e => onChange('designation', e.target.value)}
            error={errors.designation}
            autoComplete="organization-title"
          />
          <InputField
            id="email"
            label="Email Address"
            type="email"
            required
            placeholder="Enter your email address"
            icon={<HiOutlineMail />}
            value={formData.email}
            onChange={e => onChange('email', e.target.value)}
            error={errors.email}
            autoComplete="email"
          />
        </div>

        {/* Row 3: International phone + security illustration */}
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="w-full sm:w-1/2">
            <PhoneInputField
              id="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              error={errors.phone}
            />
          </div>

          {/* Security lock illustration */}
          <div className="hidden sm:flex sm:w-1/2 justify-end pb-1" aria-hidden="true">
            <div className="relative w-24 h-20">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="72" height="72" viewBox="0 0 80 80" fill="none">
                  <path
                    d="M40 8L12 20V40C12 57 24 70 40 75C56 70 68 57 68 40V20L40 8Z"
                    fill="#E6F7F5" stroke="#0E9E8E" strokeWidth="2"
                  />
                  <rect x="28" y="38" width="24" height="20" rx="4" fill="#0E9E8E" />
                  <path
                    d="M30 38V34C30 28 50 28 50 34V38"
                    stroke="#0E9E8E" strokeWidth="3" strokeLinecap="round" fill="none"
                  />
                  <circle cx="40" cy="47" r="3" fill="white" />
                  <rect x="38.5" y="49" width="3" height="5" rx="1" fill="white" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-7 h-7 bg-[#0E9E8E] rounded-full flex items-center justify-center shadow-md">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next button */}
      <div className="flex justify-end mt-6">
        <PrimaryButton id="step1-next" onClick={onNext}>
          Next
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12H19M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </PrimaryButton>
      </div>
    </section>
  )
}
