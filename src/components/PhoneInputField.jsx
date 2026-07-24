import React from 'react'
import PhoneInputLib from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

// CJS → ESM interop for Vite
const PhoneInput = PhoneInputLib.default || PhoneInputLib

/**
 * PhoneInputField — ONLY exports a React component (required for Vite Fast Refresh).
 * Validation logic lives in src/utils/phoneValidation.js
 *
 * @param {string}   value    - Full value including dial code (from react-phone-input-2)
 * @param {Function} onChange - (value, { dialCode, countryData }) => void
 * @param {string}   error    - Validation error message from parent
 * @param {string}   id       - Input id for label binding
 */
export default function PhoneInputField({ value, onChange, error, id = 'phone' }) {
  const hasError = Boolean(error)

  const handleChange = (val, countryData) => {
    onChange(val, { dialCode: countryData.dialCode, countryData })
  }

  return (
    <div className={`phone-field-root${hasError ? ' phone-field-error' : ''}`}>
      <label
        htmlFor={id}
        className="flex flex-wrap items-center gap-1 text-sm font-medium text-[#1A2B3C] mb-1"
      >
        Mobile Number
        <span className="text-xs font-normal text-[#9CA3AF]">(Optional)</span>
      </label>

      <PhoneInput
        country="in"
        value={value || ''}
        onChange={handleChange}
        enableSearch
        searchPlaceholder="Search country or code..."
        searchNotFound="No country found"
        disableSearchIcon={false}
        preferredCountries={['in', 'us', 'gb', 'ae', 'sg', 'au', 'ca']}
        inputProps={{
          id,
          name: id,
          autoComplete: 'tel',
          'aria-invalid': hasError,
          'aria-describedby': hasError ? `${id}-error` : undefined,
        }}
      />

      {hasError && (
        <p
          id={`${id}-error`}
          role="alert"
          className="flex items-center gap-1 text-xs text-red-500 mt-1"
        >
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="flex-shrink-0">
            <circle cx="6" cy="6" r="6" fill="#EF4444" />
            <path d="M6 3.5V6.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="6" cy="8.5" r="0.65" fill="white" />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}
