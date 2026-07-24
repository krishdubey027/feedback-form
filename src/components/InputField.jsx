import React from 'react'

/**
 * InputField
 * Reusable accessible input with label, leading icon, error state.
 *
 * @param {string}    id           - Binds label ↔ input; used by tests
 * @param {string}    label        - Field label text
 * @param {string}    type         - input type (text | email | tel)
 * @param {string}    value        - Controlled value
 * @param {Function}  onChange     - Change handler
 * @param {string}    placeholder
 * @param {ReactNode} icon         - Optional leading icon element
 * @param {string}    error        - Validation error message (empty = no error)
 * @param {boolean}   required
 * @param {boolean}   optional     - Renders "(Optional)" hint
 * @param {string}    autoComplete
 */
export default function InputField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  icon,
  error = '',
  required = false,
  optional = false,
  autoComplete,
}) {
  const hasError = Boolean(error)

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="flex flex-wrap items-center gap-1 text-sm font-medium text-[#1A2B3C]"
      >
        {label}
        {required && <span className="text-red-500" aria-hidden="true">*</span>}
        {optional && <span className="text-xs font-normal text-[#9CA3AF]">(Optional)</span>}
      </label>

      <div className="relative flex items-center">
        {icon && (
          <span
            className="absolute left-3 flex items-center text-[#9CA3AF] pointer-events-none"
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          aria-required={required}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
          className={`field-input ${icon ? 'has-icon' : ''} ${hasError ? 'field-error' : ''}`}
        />
      </div>

      {hasError && (
        <p
          id={`${id}-error`}
          role="alert"
          className="flex items-center gap-1 text-xs text-red-500 mt-0.5"
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
