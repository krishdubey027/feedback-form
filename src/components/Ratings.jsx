import React from 'react'
import PrimaryButton from './PrimaryButton'

/**
 * Ratings — Step 2
 * Four star-rating cards (Overall, Support, Product, Value for Money).
 * At least one category must be rated to proceed.
 *
 * @param {object}   formData  - { ratings: { overall, support, product, value } }
 * @param {Function} onChange  - (field, value) => void  — field is always 'ratings'
 * @param {Function} onNext
 * @param {Function} onBack
 * @param {object}   errors    - { ratings?: string }
 */

/* ─── Arrow SVGs ─────────────────────────────────────────────────── */
const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12H19M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const ArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/* ─── Error icon ─────────────────────────────────────────────────── */
const ErrorIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <circle cx="6" cy="6" r="6" fill="#EF4444" />
    <path d="M6 3.5V6.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="6" cy="8.5" r="0.6" fill="white" />
  </svg>
)

/* ─── Category definitions ────────────────────────────────────────── */
const CATEGORIES = [
  {
    id: 'overall',
    label: 'Overall Experience',
    description: 'How would you rate your overall experience with OHCTECH?',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          stroke="#0E9E8E" strokeWidth="1.5" fill="#E6F7F5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'support',
    label: 'Support Quality',
    description: 'How satisfied are you with the quality of our support?',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
          stroke="#0E9E8E" strokeWidth="1.5" fill="#E6F7F5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'product',
    label: 'Product Quality',
    description: 'How would you rate the quality of our products and solutions?',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="#0E9E8E" strokeWidth="1.5" fill="#E6F7F5" />
        <path d="M9 12l2 2 4-4" stroke="#0E9E8E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'value',
    label: 'Value for Money',
    description: 'Do you feel our services provide good value for the investment?',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#0E9E8E" strokeWidth="1.5" fill="#E6F7F5" />
        <path d="M12 6v2m0 8v2M9.5 9.5C9.5 8.1 10.6 7 12 7s2.5 1.1 2.5 2.5C14.5 11 12 12 12 12s-2.5 1-2.5 2.5C9.5 15.9 10.6 17 12 17s2.5-1.1 2.5-2.5"
          stroke="#0E9E8E" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
]

/* ─── StarButton ─────────────────────────────────────────────────── */
function StarButton({ filled, onClick, label }) {
  return (
    <button type="button" onClick={onClick} aria-label={label} className="star-btn">
      <svg width="28" height="28" viewBox="0 0 24 24" fill={filled ? '#FBBF24' : 'none'}>
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          stroke={filled ? '#FBBF24' : '#D1D5DB'}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

/* ─── RatingCard ─────────────────────────────────────────────────── */
function RatingCard({ category, value, onRate }) {
  return (
    <div className={[
      'bg-white rounded-xl border p-4 transition-colors duration-200',
      value > 0
        ? 'border-[#0E9E8E] shadow-[0_0_0_2px_rgba(14,158,142,0.12)]'
        : 'border-[#E5E7EB] shadow-sm hover:border-[#0E9E8E]/40',
    ].join(' ')}>
      <div className="flex items-start gap-3 mb-3">
        <div className="w-9 h-9 rounded-lg bg-[#E6F7F5] flex items-center justify-center flex-shrink-0" aria-hidden="true">
          {category.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[#1A2B3C] leading-tight">{category.label}</p>
          <p className="text-xs text-[#6B7280] leading-snug mt-0.5">{category.description}</p>
        </div>
      </div>

      <div className="flex items-center gap-0.5" role="group" aria-label={`Rate ${category.label}`}>
        {[1, 2, 3, 4, 5].map(star => (
          <StarButton
            key={star}
            filled={star <= value}
            onClick={() => onRate(star)}
            label={`${star} star${star !== 1 ? 's' : ''} for ${category.label}`}
          />
        ))}
        {value > 0 && (
          <span className="ml-2 text-xs font-semibold text-[#0E9E8E]">{value}/5</span>
        )}
      </div>
    </div>
  )
}

/* ─── Ratings step ───────────────────────────────────────────────── */
export default function Ratings({ formData, onChange, onNext, onBack, errors }) {
  const ratings = formData.ratings ?? {}

  const handleRate = (id, stars) => {
    onChange('ratings', { ...ratings, [id]: stars })
  }

  return (
    <section aria-labelledby="step2-heading" className="step-enter">
      <div className="mb-5">
        <h2 id="step2-heading" className="text-lg font-bold text-[#1A2B3C] mb-1">
          Step 2 – Rate Our Services
        </h2>
        <p className="text-sm text-[#6B7280]">Rate your experience with our products and services.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
        {CATEGORIES.map(cat => (
          <RatingCard
            key={cat.id}
            category={cat}
            value={ratings[cat.id] ?? 0}
            onRate={stars => handleRate(cat.id, stars)}
          />
        ))}
      </div>

      {errors.ratings && (
        <p role="alert" className="flex items-center gap-1 text-xs text-red-500 mt-1 mb-3">
          <ErrorIcon />
          {errors.ratings}
        </p>
      )}

      <div className="flex justify-between mt-5">
        <button id="step2-back" type="button" onClick={onBack} className="btn-back">
          <ArrowLeft /> Back
        </button>
        <PrimaryButton id="step2-next" onClick={onNext}>
          Next <ArrowRight />
        </PrimaryButton>
      </div>
    </section>
  )
}
