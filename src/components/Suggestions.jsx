import React from 'react'
import PrimaryButton from './PrimaryButton'

/**
 * Suggestions — Step 4
 * Optional textarea for suggestions. No required validation.
 *
 * @param {object}   formData - { suggestion: string }
 * @param {Function} onChange - (field, value) => void
 * @param {Function} onSubmit - Triggers Thank You screen
 * @param {Function} onBack
 * @param {object}   errors   - (unused; kept for future API error handling)
 */

const MAX = 500

const PROMPT_CARDS = [
  { emoji: '💡', label: 'Feature Request', hint: "New features you'd like to see" },
  { emoji: '🛠️', label: 'Improvements',    hint: 'What we can do better'          },
  { emoji: '💬', label: 'General Feedback', hint: 'Any other thoughts'             },
]

export default function Suggestions({ formData, onChange, onSubmit, onBack }) {
  const value  = formData.suggestion ?? ''
  const charLen = value.length

  return (
    <section aria-labelledby="step4-heading" className="step-enter">
      {/* Heading */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 id="step4-heading" className="text-lg font-bold text-[#1A2B3C] mb-1">
            Step 4 – Suggestions
          </h2>
          <p className="text-sm text-[#6B7280]">Share your valuable suggestions and feedback.</p>
        </div>
        <div className="hidden sm:flex w-12 h-12 rounded-xl bg-[#E6F7F5] items-center justify-center flex-shrink-0" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
              stroke="#0E9E8E" strokeWidth="1.5" fill="#E6F7F5" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Prompt cards */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {PROMPT_CARDS.map(({ emoji, label, hint }) => (
          <div
            key={label}
            className="bg-[#F8FFFE] border border-[#E6F7F5] rounded-xl p-3 text-center"
            aria-hidden="true"
          >
            <span className="text-xl leading-none">{emoji}</span>
            <p className="text-xs font-semibold text-[#1A2B3C] mt-1">{label}</p>
            <p className="text-[11px] text-[#9CA3AF] mt-0.5 leading-tight">{hint}</p>
          </div>
        ))}
      </div>

      {/* Textarea */}
      <div className="flex flex-col gap-1 mb-2">
        <label htmlFor="suggestion" className="flex items-center gap-1.5 text-sm font-medium text-[#1A2B3C]">
          Your Suggestions
          <span className="text-xs font-normal text-[#9CA3AF]">(Optional)</span>
        </label>

        <textarea
          id="suggestion"
          name="suggestion"
          rows={6}
          value={value}
          onChange={e => onChange('suggestion', e.target.value)}
          maxLength={MAX}
          placeholder="Share any specific suggestions, feature requests, or ideas that would help us serve you better..."
          className="field-textarea"
        />

        <div className="flex justify-end mt-0.5">
          <span className={`text-xs font-medium ${charLen > MAX - 50 ? 'text-amber-500' : 'text-[#9CA3AF]'}`}>
            {charLen}/{MAX}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-4">
        <button id="step4-back" type="button" onClick={onBack} className="btn-back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
        <PrimaryButton id="step4-submit" onClick={onSubmit}>
          Submit Feedback
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </PrimaryButton>
      </div>
    </section>
  )
}
