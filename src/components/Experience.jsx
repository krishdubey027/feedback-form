import React from 'react'
import PrimaryButton from './PrimaryButton'

/**
 * Experience — Step 3
 * Textarea where users describe their overall OHCTECH experience.
 * Field is required. Character limit: 500.
 *
 * @param {object}   formData - { experience: string }
 * @param {Function} onChange - (field, value) => void
 * @param {Function} onNext
 * @param {Function} onBack
 * @param {object}   errors   - { experience?: string }
 */

const MAX = 500

const PROMPT_CHIPS = ['What went well?', 'Areas to improve', 'Standout features', 'Team experience']

export default function Experience({ formData, onChange, onNext, onBack, errors }) {
  const value   = formData.experience ?? ''
  const charLen = value.length
  const hasErr  = Boolean(errors.experience)

  const appendChip = (chip) => {
    if (!value.includes(chip)) {
      onChange('experience', value ? `${value} ${chip}: ` : `${chip}: `)
    }
  }

  return (
    <section aria-labelledby="step3-heading" className="step-enter">
      {/* Heading */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 id="step3-heading" className="text-lg font-bold text-[#1A2B3C] mb-1">
            Step 3 – Your Experience
          </h2>
          <p className="text-sm text-[#6B7280]">Tell us about your overall experience with OHCTECH.</p>
        </div>
        <div className="hidden sm:flex w-12 h-12 rounded-xl bg-[#E6F7F5] items-center justify-center flex-shrink-0" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="#0E9E8E" strokeWidth="1.5" fill="#E6F7F5" />
            <circle cx="9" cy="10" r="1.2" fill="#0E9E8E" />
            <circle cx="15" cy="10" r="1.2" fill="#0E9E8E" />
            <path d="M8.5 14.5C9.5 16 14.5 16 15.5 14.5" stroke="#0E9E8E" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Textarea */}
      <div className="flex flex-col gap-1 mb-2">
        <label htmlFor="experience" className="flex items-center gap-1 text-sm font-medium text-[#1A2B3C]">
          Share your overall experience
          <span className="text-red-500" aria-hidden="true">*</span>
        </label>

        <textarea
          id="experience"
          name="experience"
          rows={7}
          value={value}
          onChange={e => onChange('experience', e.target.value)}
          maxLength={MAX}
          placeholder="Tell us about your overall journey with OHCTECH — what worked well, what could be improved, and any highlights that stood out..."
          aria-required="true"
          aria-invalid={hasErr}
          aria-describedby={hasErr ? 'experience-error' : 'experience-count'}
          className={`field-textarea ${hasErr ? 'field-error' : ''}`}
        />

        <div className="flex items-center justify-between mt-0.5">
          {hasErr ? (
            <p id="experience-error" role="alert" className="flex items-center gap-1 text-xs text-red-500">
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="flex-shrink-0">
                <circle cx="6" cy="6" r="6" fill="#EF4444" />
                <path d="M6 3.5V6.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="6" cy="8.5" r="0.65" fill="white" />
              </svg>
              {errors.experience}
            </p>
          ) : (
            <span />
          )}
          <span
            id="experience-count"
            className={`text-xs font-medium ${charLen > MAX - 50 ? 'text-amber-500' : 'text-[#9CA3AF]'}`}
          >
            {charLen}/{MAX}
          </span>
        </div>
      </div>

      {/* Prompt chips */}
      <div className="flex flex-wrap gap-2 mb-5">
        {PROMPT_CHIPS.map(chip => (
          <button
            key={chip}
            type="button"
            onClick={() => appendChip(chip)}
            className="text-xs font-medium px-3 py-1.5 rounded-full border border-[#E5E7EB]
                       text-[#6B7280] bg-white hover:border-[#0E9E8E] hover:text-[#0E9E8E]
                       transition-colors duration-150"
          >
            + {chip}
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button id="step3-back" type="button" onClick={onBack} className="btn-back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
        <PrimaryButton id="step3-next" onClick={onNext}>
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
